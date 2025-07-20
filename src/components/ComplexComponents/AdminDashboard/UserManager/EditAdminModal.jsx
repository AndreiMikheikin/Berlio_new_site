import React, { useState } from 'react';

function EditAdminModal({ admin, onClose, onUpdated }) {
  const [username, setUsername] = useState(admin.username);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUpdate = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('authToken');
      const res = await fetch(`/api/admin/admins/${admin.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username, password: password || undefined }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.error || 'Ошибка обновления');
      }

      onUpdated(); // обновим список
      onClose();   // закроем модалку
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal">
      <h3>Редактировать администратора</h3>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Имя пользователя"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Новый пароль (необязательно)"
      />
      {error && <p className="error">{error}</p>}
      <button onClick={handleUpdate} disabled={loading}>Сохранить</button>
      <button onClick={onClose}>Отмена</button>
    </div>
  );
}

export default EditAdminModal;
