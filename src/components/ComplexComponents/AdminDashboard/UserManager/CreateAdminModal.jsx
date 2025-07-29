import React, { useState } from 'react';
import Button from '../../../Button/Button';

function CreateAdminModal({ onClose, onCreated }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCreate = async () => {
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('authToken');
      const res = await fetch('/api/admin/admins', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.error || 'Ошибка создания');
      }

      onCreated(); // Обновить список
      onClose();   // Закрыть модалку
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="aam_modal">
      <div className="aam_modal__content">
        <h3 className="aam_modal__title">Создать администратора</h3>
        {error && <p className="aam_modal__error">{error}</p>}
        <input
          className="aam_modal__input"
          type="text"
          placeholder="Имя пользователя"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="aam_modal__input"
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="aam_modal__actions">
          <Button type='submit' variant='green' label={loading ? 'Создание...' : 'Создать'} onClick={handleCreate} disabled={loading} />
          <Button type='reset' variant='green' label='Отмена' onClick={onClose} />
        </div>
      </div>
    </div>
  );
}

export default CreateAdminModal;
