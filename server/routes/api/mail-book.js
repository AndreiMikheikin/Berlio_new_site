import express from 'express';
import mailBookPool from '../../db/mailBookPool.js';
import { logAction } from '../../utils/mailBookLogger.js';
import { authenticateMailBook } from '../../middlewares/auth-mailbook.js';
import { requireMailRole } from '../../middlewares/requireMailRole.js';
import { buildMailBookNumber } from "../../utils/mailBookNumber.js";

const router = express.Router();

/* ===========================
   Helpers
=========================== */

function handleServerError(res, err, message = 'Server error') {
    console.error(message, err);
    return res.status(500).json({ message });
}

function normalizeDate(date) {
    return new Date(date).toISOString().slice(0, 10);
}

function filterConfigPayload(payload) {
    if (!payload || typeof payload !== 'object') return {};

    const allowedKeys = ['inactivityTimeoutMs', 'configVersion'];

    return Object.keys(payload).reduce((acc, key) => {
        if (allowedKeys.includes(key)) {
            acc[key] = payload[key];
        }
        return acc;
    }, {});
}

async function validateReference(connection, referenceSeq, year, direction) {

    if (!referenceSeq) return;

    const [rows] = await connection.execute(
        `
        SELECT COUNT(*) AS cnt
        FROM mail_journal
        WHERE reg_sequence=?
        AND reg_year=?
        AND direction=?
        `,
        [referenceSeq, year, direction]
    );

    if (!rows[0].cnt) {
        throw new Error("Reference registry entry not found");
    }
}

/* ===========================
   GET Mail Book List
=========================== */

router.get(
  '/',
  authenticateMailBook,
  requireMailRole('admin', 'editor', 'viewer'),
  async (req, res) => {
    try {
      const {
        direction,
        registryYear,
        reg_number,
        counterparty,
        dateFrom,
        dateTo,
        sort = 'document_date',
        order = 'DESC',
        page = 1
      } = req.query;

      const allowedSort = [
        'id',
        'reg_number',
        'counterparty',
        'document_date',
        'created_at',
        'reg_sequence',
        'reg_year'
      ];

      const allowedOrder = ['ASC', 'DESC'];

      const safeSort = allowedSort.includes(sort) ? sort : 'document_date';
      const safeOrder = allowedOrder.includes(String(order).toUpperCase())
        ? String(order).toUpperCase()
        : 'DESC';

      const limit = 15;
      const currentPage = Math.max(1, Number(page) || 1);
      const offset = (currentPage - 1) * limit;

      /* -----------------------------
         Query conditions
      ----------------------------- */

      const conditions = [];
      const values = [];

      if (direction && ['IN', 'OUT'].includes(String(direction).toUpperCase())) {
        conditions.push('mj.direction = ?');
        values.push(String(direction).toUpperCase());
      }

      if (registryYear) {
        conditions.push('mj.reg_year = ?');
        values.push(Number(registryYear));
      }

      if (reg_number) {
        conditions.push('mj.reg_number LIKE ?');
        values.push(`%${reg_number}%`);
      }

      if (counterparty) {
        conditions.push('mj.counterparty LIKE ?');
        values.push(`%${counterparty}%`);
      }

      if (dateFrom) {
        conditions.push('mj.document_date >= ?');
        values.push(dateFrom);
      }

      if (dateTo) {
        conditions.push('mj.document_date < DATE_ADD(?, INTERVAL 1 DAY)');
        values.push(dateTo);
      }

      const where = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

      /* -----------------------------
         Total count (pagination meta)
      ----------------------------- */
      const countSql = `
        SELECT COUNT(*) AS total
        FROM mail_journal mj
        ${where}
      `;
      const [countRows] = await mailBookPool.execute(countSql, values);
      const total = Number(countRows[0]?.total) || 0;

      /* -----------------------------
         Main list query with created_by_name
      ----------------------------- */
      const listSql = `
        SELECT
          mj.*,
          mbu.login AS created_by_name
        FROM mail_journal mj
        LEFT JOIN mail_book_users mbu ON mj.created_by = mbu.id
        ${where}
        ORDER BY ${safeSort} ${safeOrder}
        LIMIT ?
        OFFSET ?
      `;
      const listValues = [...values, limit, offset];
      const [rows] = await mailBookPool.execute(listSql, listValues);

      const lastPage = total > 0 ? Math.ceil(total / limit) : 0;

      res.json({
        list: rows,
        total,
        page: currentPage,
        limit,
        lastPage
      });

    } catch (err) {
      return handleServerError(res, err, 'Error fetching mail book data');
    }
  }
);

/* ===========================
   GET Dashboard & MailBookPage Stats 
=========================== */

router.get('/dashboard-stats', async (req, res) => {
  try {
    const [rows] = await mailBookPool.execute(`
      SELECT
        (SELECT MIN(document_date)
         FROM mail_journal
         WHERE direction = 'OUT' AND cancelled_at IS NULL) AS outgoing_started_from,

        (SELECT reg_number
         FROM mail_journal
         WHERE direction = 'OUT' AND cancelled_at IS NULL
         ORDER BY reg_year DESC, reg_sequence DESC
         LIMIT 1) AS outgoing_last_number,

        (SELECT COUNT(*)
         FROM mail_journal
         WHERE direction = 'OUT' AND cancelled_at IS NULL
           AND reg_year = YEAR(CURDATE())) AS outgoing_total_year,

        (SELECT MIN(document_date)
         FROM mail_journal
         WHERE direction = 'IN' AND cancelled_at IS NULL) AS incoming_started_from,

        (SELECT reg_number
         FROM mail_journal
         WHERE direction = 'IN' AND cancelled_at IS NULL
         ORDER BY reg_year DESC, reg_sequence DESC
         LIMIT 1) AS incoming_last_number,

        (SELECT COUNT(*)
         FROM mail_journal
         WHERE direction = 'IN' AND cancelled_at IS NULL
           AND reg_year = YEAR(CURDATE())) AS incoming_total_year,

        (SELECT COUNT(*)
         FROM mail_journal
         WHERE cancelled_at IS NULL) AS total_mails;
    `);

    const result = rows?.[0] ?? {};

    res.json({
      outgoing: {
        startedFrom: result.outgoing_started_from,
        lastNumber: result.outgoing_last_number,
        totalYear: Number(result.outgoing_total_year) || 0,
      },
      incoming: {
        startedFrom: result.incoming_started_from,
        lastNumber: result.incoming_last_number,
        totalYear: Number(result.incoming_total_year) || 0,
      },
      totalMails: Number(result.total_mails) || 0,
    });

  } catch (err) {
    console.error("Dashboard stats load failed:", err);
    res.status(500).json({ message: 'Failed to fetch dashboard stats' });
  }
});

/* ===========================
   CREATE Mail Entry
=========================== */

router.post(
    "/",
    authenticateMailBook,
    requireMailRole("admin", "editor"),
    async (req, res) => {

        const connection = await mailBookPool.getConnection();

        try {

            await connection.beginTransaction();
            await connection.execute("SET innodb_lock_wait_timeout = 5");

            const {
                document_date,
                counterparty,
                direction,
                description,
                backdated = false,
                reference_reg_sequence
            } = req.body || {};

            if (!counterparty || !direction || !document_date) {
                return res.status(400).json({
                    message: "Required fields missing"
                });
            }

            if (!["IN", "OUT"].includes(direction)) {
                return res.status(400).json({
                    message: "Invalid direction"
                });
            }

            const userId = req.mailUser.id;
            const userRole = req.mailUser.role;

            /* ===========================
               Registry date selection
            =========================== */

            let registryDate = new Date();

            if (userRole === "admin" && backdated && document_date) {
                registryDate = new Date(document_date);
            }

            const year = registryDate.getFullYear();
            const mysqlDate = registryDate
                .toISOString()
                .slice(0, 10);

            /* ===========================
               Reference validation
            =========================== */

            if (reference_reg_sequence) {
                await validateReference(
                    connection,
                    reference_reg_sequence,
                    year,
                    direction
                );
            }

            /* ===========================
               Sequence generation
            =========================== */

            const [seqRows] = await connection.execute(
                `
                SELECT COALESCE(MAX(reg_sequence),0)+1 AS next_seq
                FROM mail_journal
                WHERE direction=?
                AND reg_year=?
                FOR UPDATE
                `,
                [direction, year]
            );

            const sequence = seqRows[0].next_seq;

            /* ===========================
               Registry number builder
            =========================== */

            const nestedIndex = reference_reg_sequence
                ? await (async () => {

                    const [[{ cnt }]] = await connection.execute(
                        `
                        SELECT COUNT(*) AS cnt
                        FROM mail_journal
                        WHERE direction=?
                        AND reg_year=?
                        AND reference_reg_sequence=?
                        `,
                        [direction, year, reference_reg_sequence]
                    );

                    return cnt + 1;

                })()
                : null;

            const regNumber = buildMailBookNumber(
                direction,
                reference_reg_sequence || sequence,
                year,
                nestedIndex
            );

            /* ===========================
               Insert registry record
            =========================== */

            await connection.execute(
                `
                INSERT INTO mail_journal
                (
                    direction,
                    reg_year,
                    reg_sequence,
                    reference_reg_sequence,
                    reg_number,
                    counterparty,
                    description,
                    document_date,
                    registration_date,
                    created_by
                )
                VALUES (?,?,?,?,?,?,?,?,?,?)
                `,
                [
                    direction,
                    year,
                    sequence,
                    reference_reg_sequence || null,
                    regNumber,
                    counterparty,
                    description || null,
                    mysqlDate,
                    mysqlDate,
                    userId
                ]
            );

            await connection.commit();

            res.status(201).json({
                number: regNumber,
                sequence
            });

        } catch (err) {

            await connection.rollback();
            return handleServerError(
                res,
                err,
                "Create journal failed"
            );

        } finally {
            connection.release();
        }
    }
);

/* ===========================
   UPDATE Mail Entry
=========================== */

router.put(
    '/:id',
    authenticateMailBook,
    requireMailRole('admin'),
    async (req, res) => {
        try {
            const { id } = req.params;
            const { reg_number, document_date, counterparty } = req.body;

            if (!reg_number || !document_date || !counterparty) {
                return res.status(400).json({
                    message: 'Required fields missing'
                });
            }

            const userName = req.mailUser.username;
            const mysqlDate = normalizeDate(document_date);

            const [result] = await mailBookPool.execute(
                `
                UPDATE mail_journal
                SET reg_number = ?,
                    document_date = ?,
                    counterparty = ?
                WHERE id = ?
                `,
                [
                    reg_number,
                    mysqlDate,
                    counterparty,
                    id,
                ]
            );

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: 'Entry not found'
                });
            }

            await logAction('UPDATE', id, userName);

            res.json({ message: 'Updated successfully' });

        } catch (err) {
            return handleServerError(res, err, 'Error updating mail book entry');
        }
    }
);

/* ===========================
   CANCEL Mail Entry
=========================== */

router.put(
    '/:id/cancel',
    authenticateMailBook,
    requireMailRole('admin'),
    async (req, res) => {
        try {
            const { id } = req.params;
            const { reason } = req.body;

            if (!reason) {
                return res.status(400).json({
                    message: 'Cancel reason required'
                });
            }

            const userName = req.mailUser.username;

            const [result] = await mailBookPool.execute(
                `
                UPDATE mail_journal
                SET cancelled_at = NOW(),
                    cancel_reason = ?
                WHERE id = ?
                `,
                [reason, id]
            );

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: 'Entry not found'
                });
            }

            await logAction('CANCEL', id, userName);

            res.json({ message: 'Cancelled successfully' });

        } catch (err) {
            return handleServerError(res, err, 'Error cancelling mail book entry');
        }
    }
);

/* ===========================
   USER CONFIG
=========================== */

router.get(
    '/config',
    authenticateMailBook,
    async (req, res) => {
        try {
            const userId = req.mailUser.id;

            const [rows] = await mailBookPool.execute(
                `
                SELECT config
                FROM mail_book_users
                WHERE id = ?
                `,
                [userId]
            );

            if (!rows.length) {
                return res.status(404).json({
                    message: 'User not found'
                });
            }

            res.json(rows[0].config);

        } catch (err) {
            return handleServerError(res, err, 'Error fetching user config');
        }
    }
);

router.put(
    '/config',
    authenticateMailBook,
    async (req, res) => {
        try {
            const userId = req.mailUser.id;

            const filteredConfig = filterConfigPayload(req.body);

            if (!Object.keys(filteredConfig).length) {
                return res.status(400).json({
                    message: 'Config payload required'
                });
            }

            await mailBookPool.execute(
                `
                UPDATE mail_book_users
                SET config = JSON_MERGE_PATCH(config, ?)
                WHERE id = ?
                `,
                [
                    filteredConfig,
                    userId
                ]
            );

            const [rows] = await mailBookPool.execute(
                `
                SELECT config
                FROM mail_book_users
                WHERE id = ?
                `,
                [userId]
            );

            res.json(rows[0]?.config || {});

        } catch (err) {
            return handleServerError(res, err, 'Error updating user config');
        }
    }
);

export default router;