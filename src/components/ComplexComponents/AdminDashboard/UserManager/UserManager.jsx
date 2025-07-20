import React, { useEffect, useState } from 'react';
import CreateAdminModal from './CreateAdminModal.jsx';
import EditAdminModal from './EditAdminModal.jsx';
import ConfirmDeleteModal from './ConfirmDeleteModal.jsx';

function UserManager() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editAdmin, setEditAdmin] = useState(null);
  const [adminToDelete, setAdminToDelete] = useState(null);

  const fetchAdmins = () => {
    setLoading(true);
    const token = localStorage.getItem('authToken');

    fetch('/api/admin/admins', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error('Ошибка загрузки данных');
        const data = await res.json();
        setAdmins(data);
      })
      .catch((err) => console.error('Ошибка загрузки администраторов:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleConfirmDelete = async () => {
    if (!adminToDelete) return;

    const token = localStorage.getItem('authToken');

    try {
      const res = await fetch(`/api/admin/admins/${adminToDelete.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.error || 'Ошибка удаления');
      }

      setAdminToDelete(null);
      fetchAdmins();
    } catch (err) {
      alert(err.message);
    }
  };


  if (loading) return <p>Загрузка администраторов...</p>;

  return (
    <div className="aam_user-manager">
      <h2>Управление администраторами</h2>
      <button onClick={() => setShowCreateModal(true)}>➕ Новый админ</button>

      {admins.length === 0 ? (
        <p>Нет администраторов с ролью <code>admin</code>.</p>
      ) : (
        <table className="aam_user-manager__table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Имя пользователя</th>
              <th>Роль</th>
              <th>Создан</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id}>
                <td>{admin.id}</td>
                <td>{admin.username}</td>
                <td>{admin.role}</td>
                <td>{new Date(admin.created_at).toLocaleString('ru-RU')}</td>
                <td>
                  <button onClick={() => setEditAdmin(admin)}>✏️</button>
                  <button onClick={() => setAdminToDelete(admin)}>🗑️</button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showCreateModal && (
        <CreateAdminModal
          onClose={() => setShowCreateModal(false)}
          onCreated={fetchAdmins}
        />
      )}

      {editAdmin && (
        <EditAdminModal
          admin={editAdmin}
          onClose={() => setEditAdmin(null)}
          onUpdated={fetchAdmins}
        />
      )}

      {adminToDelete && (
        <ConfirmDeleteModal
          username={adminToDelete.username}
          onConfirm={handleConfirmDelete}
          onCancel={() => setAdminToDelete(null)}
        />
      )}
    </div>
  );
}

export default UserManager;
