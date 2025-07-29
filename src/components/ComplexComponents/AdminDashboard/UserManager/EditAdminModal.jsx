import React, { useState } from 'react';
import Button from '../../../Button/Button';

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
    <div className="aam_modal">
      <div className="aam_modal__content">
        <h3 className="aam_modal__title">Редактировать администратора</h3>
        <input
          className="aam_modal__input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Имя пользователя"
        />
        <input
          className="aam_modal__input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Новый пароль (необязательно)"
        />
        {error && <p className="aam_modal__error">{error}</p>}
        <div className="aam_modal__actions">
          <Button type='submit' variant='green' label='Сохранить' onClick={handleUpdate} disabled={loading} />
          <Button type='reset' variant='green' label='Отмена' onClick={onClose} />
        </div>
      </div>
    </div>
  );
}

export default EditAdminModal;
