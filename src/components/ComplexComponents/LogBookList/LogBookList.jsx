import React, { useState, useEffect } from 'react';
import Button from '../../Button/Button';
import CreateLogBookModal from './CreateLogBookModal';
import EditLogBookModal from './EditLogBookModal';
import PlusIcon from '../../SVGIcons/PlusIcon';
import PencilIcon from '../../SVGIcons/PencilIcon';
import TrashIcon from '../../SVGIcons/TrashIcon';
import '../../../styles/components/ComplexComponents/LogBook/LogBookList.scss';
import '../../../styles/components/ComplexComponents/Admin/UserManager.scss';

function LogBookList({ token, userRole, userName }) {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editEntry, setEditEntry] = useState(null);

  // серверные фильтры
  const [filters, setFilters] = useState({
    recipient: '',
    document_info: '',
    confidential_info: '',
    dateFrom: '',
    dateTo: '',
    access_method: '',
    recipient_signature: '',
  });

  // локальные значения input
  const [localFilters, setLocalFilters] = useState({ ...filters });

  const [sortConfig, setSortConfig] = useState({
    key: 'provided_at',
    direction: 'DESC',
  });

  const fetchEntries = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });

      params.append('sort', sortConfig.key);
      params.append('direction', sortConfig.direction);

      const res = await fetch(`/api/log-book?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Ошибка загрузки данных');
      const data = await res.json();
      setEntries(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, [filters, sortConfig]);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'ASC' ? 'DESC' : 'ASC',
    }));
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Удалить запись?')) return;
    try {
      const res = await fetch(`/api/log-book/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Ошибка при удалении');
      setEntries(entries.filter(e => e.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleCreate = async (newEntry) => {
    const res = await fetch('/api/log-book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newEntry),
    });
    if (!res.ok) throw new Error('Ошибка добавления');
    await fetchEntries();
  };

  const handleUpdate = async (id, updatedData) => {
    const res = await fetch(`/api/log-book/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    });
    if (!res.ok) throw new Error('Ошибка обновления');
    await fetchEntries();
  };

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  const columns = [
    { key: 'id', label: 'ID', filterable: false },
    { key: 'recipient', label: 'Получатель', filterable: true },
    { key: 'document_info', label: 'Наименование документа', filterable: true },
    { key: 'confidential_info', label: 'Наименование сведений', filterable: true },
    { key: 'provided_at', label: 'Дата', filterable: true, type: 'date' },
    { key: 'access_method', label: 'Способ предоставления', filterable: true },
    { key: 'recipient_signature', label: 'Подпись', filterable: true },
  ];

  return (
    <div className="aam_logbook">
      <div className="aam_logbook__header">
        <h2>Учет документов</h2>
        <Button
          variant='green'
          onClick={() => setShowCreateModal(true)}
          label={<PlusIcon />}
        />
      </div>

      {/* Фильтры */}
      <div
        className="aam_logbook__filters"
        style={{ marginBottom: '10px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}
      >
        {columns.map(col => {
          if (!col.filterable) return null;

          if (col.type === 'date') {
            return (
              <React.Fragment key={col.key}>
                <input
                  type="date"
                  value={localFilters.dateFrom}
                  onChange={e => setLocalFilters(f => ({ ...f, dateFrom: e.target.value }))}
                  placeholder="С"
                />
                <input
                  type="date"
                  value={localFilters.dateTo}
                  onChange={e => setLocalFilters(f => ({ ...f, dateTo: e.target.value }))}
                  placeholder="По"
                />
              </React.Fragment>
            );
          }

          return (
            <input
              key={col.key}
              type="text"
              placeholder={col.label}
              value={localFilters[col.key]}
              onChange={e =>
                setLocalFilters(f => ({ ...f, [col.key]: e.target.value }))
              }
            />
          );
        })}

        <Button
          variant="green"
          label="Применить"
          onClick={() => setFilters({ ...localFilters })}
        />

        <Button
          variant="danger"
          label="Сброс"
          onClick={() => {
            setLocalFilters({
              recipient: '',
              document_info: '',
              confidential_info: '',
              dateFrom: '',
              dateTo: '',
              access_method: '',
              recipient_signature: '',
            });
            setFilters({
              recipient: '',
              document_info: '',
              confidential_info: '',
              dateFrom: '',
              dateTo: '',
              access_method: '',
              recipient_signature: '',
            });
          }}
        />
      </div>

      <div className="aam_logbook__table-wrapper">
        <table className="aam_logbook__table">
          <thead>
            <tr>
              {columns.map(col => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  style={{ cursor: 'pointer', userSelect: 'none' }}
                >
                  {col.label}{' '}
                  <span
                    style={{
                      fontSize: '12px',
                      color: sortConfig.key === col.key && sortConfig.direction === 'ASC' ? '#000' : '#A3A3A3',
                    }}
                  >
                    ▲
                  </span>
                  <span
                    style={{
                      fontSize: '12px',
                      marginLeft: '-5px',
                      color: sortConfig.key === col.key && sortConfig.direction === 'DESC' ? '#000' : '#A3A3A3',
                    }}
                  >
                    ▼
                  </span>
                </th>
              ))}
              {userRole === 'superadmin' && <th className="aam_last-child-th">Действия</th>}
            </tr>
          </thead>
          <tbody>
            {entries.map(e => (
              <tr key={e.id}>
                <td>{e.id}</td>
                <td>{e.recipient}</td>
                <td>{e.document_info}</td>
                <td>{userRole === 'superadmin' || e.recipient_signature === userName ? e.confidential_info : '***'}</td>
                <td>{new Date(e.provided_at).toLocaleDateString('ru-RU')}</td>
                <td>{e.access_method}</td>
                <td>{e.recipient_signature}</td>
                {userRole === 'superadmin' && (
                  <td className="aam_last-child-td">
                    <Button
                      className="aam_edit"
                      variant="green"
                      onClick={() => setEditEntry(e)}
                      label={<PencilIcon />}
                    />
                    <Button
                      className="aam_delete"
                      variant="danger"
                      onClick={() => handleDelete(e.id)}
                      label={<TrashIcon />}
                    />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showCreateModal && (
        <CreateLogBookModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreate}
          userName={userName}
        />
      )}

      {editEntry && (
        <EditLogBookModal
          entry={editEntry}
          onClose={() => setEditEntry(null)}
          onSubmit={(data) => handleUpdate(editEntry.id, data)}
          userName={userName}
        />
      )}
    </div>
  );
}

export default LogBookList;
