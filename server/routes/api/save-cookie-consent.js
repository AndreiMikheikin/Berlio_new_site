// server/api/cookie-consent.js
import express from 'express';
import pool from '../../db/connection.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const {
      user_uuid,
      functional,
      analytics,
      marketing,
    } = req.body;

    if (!user_uuid) {
      return res.status(400).json({ error: 'Missing user_uuid' });
    }

    function toMySQLDatetime(date) {
      return date.toISOString().slice(0, 19).replace('T', ' ');
    }

    const now = new Date();
    const consentFields = ['functional', 'analytics', 'marketing'];

    // Соберём значения с временными метками
    const updates = consentFields.flatMap((field) => {
      const value = req.body[field];
      const timestamp = toMySQLDatetime(now);
      return [
        value,
        timestamp,
        value ? timestamp : null,
        value ? null : timestamp,
      ];
    });

    const [result] = await pool.execute(
      `
        INSERT INTO cookie_consents (
          user_uuid,
          functional, functional_timestamp, functional_last_true, functional_last_false,
          analytics, analytics_timestamp, analytics_last_true, analytics_last_false,
          marketing, marketing_timestamp, marketing_last_true, marketing_last_false
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          functional = VALUES(functional),
          functional_timestamp = VALUES(functional_timestamp),
          functional_last_true = IF(VALUES(functional), VALUES(functional_timestamp), functional_last_true),
          functional_last_false = IF(VALUES(functional) = FALSE, VALUES(functional_timestamp), functional_last_false),

          analytics = VALUES(analytics),
          analytics_timestamp = VALUES(analytics_timestamp),
          analytics_last_true = IF(VALUES(analytics), VALUES(analytics_timestamp), analytics_last_true),
          analytics_last_false = IF(VALUES(analytics) = FALSE, VALUES(analytics_timestamp), analytics_last_false),

          marketing = VALUES(marketing),
          marketing_timestamp = VALUES(marketing_timestamp),
          marketing_last_true = IF(VALUES(marketing), VALUES(marketing_timestamp), marketing_last_true),
          marketing_last_false = IF(VALUES(marketing) = FALSE, VALUES(marketing_timestamp), marketing_last_false),

          updated_at = CURRENT_TIMESTAMP
      `,
      [user_uuid, ...updates]
    );

    res.json({ success: true, result });
  } catch (err) {
    console.error('Error saving consent:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
