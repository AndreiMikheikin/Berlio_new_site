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
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });

  const fetchEntries = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/log-book', {
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
  }, []);

  const sortedEntries = [...entries].sort((a, b) => {
    const { key, direction } = sortConfig;
    let valA = a[key];
    let valB = b[key];

    // для дат
    if (key === 'provided_at') {
      valA = new Date(valA);
      valB = new Date(valB);
    }

    // приводим текст к одному регистру, чтобы сортировка была корректной
    if (typeof valA === 'string') valA = valA.toLowerCase();
    if (typeof valB === 'string') valB = valB.toLowerCase();

    if (valA < valB) return direction === 'asc' ? -1 : 1;
    if (valA > valB) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
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

  return (
    <div className="aam_logbook">
      <div className="aam_logbook__header">
        <h2>Учет документов</h2>
        <Button variant='green' onClick={() => setShowCreateModal(true)} label={<PlusIcon />} />
      </div>

      <div className="aam_logbook__table-wrapper">
        <table className="aam_logbook__table">
          <thead>
            <tr>
              {[
                { key: 'id', label: 'ID' },
                { key: 'recipient', label: 'Получатель' },
                { key: 'document_info', label: 'Наименование документа' },
                { key: 'confidential_info', label: 'Наименование сведений' },
                { key: 'provided_at', label: 'Дата' },
                { key: 'recipient_signature', label: 'Подпись' }
              ].map(col => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  style={{ cursor: 'pointer', userSelect: 'none' }}
                >
                  {col.label}{' '}
                  <span style={{ fontSize: '12px', color: sortConfig.key === col.key && sortConfig.direction === 'asc' ? '#000' : '#A3A3A3' }}>▲</span>
                  <span style={{ fontSize: '12px', marginLeft: '-5px', color: sortConfig.key === col.key && sortConfig.direction === 'desc' ? '#000' : '#A3A3A3' }}>▼</span>
                </th>
              ))}
              {userRole === 'superadmin' && <th className='aam_last-child-th'>Действия</th>}
            </tr>
          </thead>
          <tbody>
            {sortedEntries.map(e => (
              <tr key={e.id}>
                <td>{e.id}</td>
                <td>{e.recipient}</td>
                <td>{e.document_info}</td>
                <td>{userRole === 'superadmin' || e.recipient_signature === userName ? e.confidential_info : '***'}</td>
                <td>{new Date(e.provided_at).toLocaleDateString('ru-RU')}</td>
                <td>{e.recipient_signature}</td>
                {userRole === 'superadmin' && (
                  <td className='aam_last-child-td'>

                    <Button className='aam_edit' variant='green' onClick={() => setEditEntry(e)} label={<PencilIcon />} />
                    <Button className='aam_delete' variant='danger' onClick={() => handleDelete(e.id)} label={<TrashIcon />} />

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
