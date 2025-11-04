import React, { useState } from 'react';
import Button from '../../Button/Button';

function EditLogBookModal({ entry, onClose, onSubmit, userName }) {
  const [form, setForm] = useState(entry);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // добавляем подпись автоматически из имени пользователя
    const entryWithSignature = {
      ...form,
      recipient_signature: userName,
    };

    await onSubmit(entryWithSignature);
    onClose();
  };

  return (
    <div className="aam_modal">
      <div className="aam_modal__content">
        <h3>Редактировать запись #{entry.id}</h3>
        <form onSubmit={handleSubmit}>
          <input name="recipient" value={form.recipient} onChange={handleChange} required />
          <input name="document_info" value={form.document_info} onChange={handleChange} required />
          <input name="confidential_info" value={form.confidential_info} onChange={handleChange} required />
          <input name="provided_at" type="date" value={form.provided_at?.split('T')[0] || ''} onChange={handleChange} required />
          <div className="aam_modal__actions">
            <Button variant='green' type="submit" label='Сохранить'>Сохранить</Button>
            <Button variant='gray' type="button" onClick={onClose} label='Отмена'>Отмена</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditLogBookModal;
