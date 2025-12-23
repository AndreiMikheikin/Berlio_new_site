import React, { useState } from 'react';
import Button from '../../Button/Button';

function CreateLogBookModal({ onClose, onSubmit, userName }) {
  const [form, setForm] = useState({
    recipient: '',
    document_info: '',
    confidential_info: '',
    provided_at: '',
    access_method: '',
  });

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
        <h3>Добавить запись</h3>
        <form onSubmit={handleSubmit}>
          <input
            name="recipient"
            placeholder="Получатель"
            onChange={handleChange}
            required
          />
          <input
            name="document_info"
            placeholder="Наименование документа"
            onChange={handleChange}
            required
          />
          <input
            name="confidential_info"
            placeholder="Наименование сведений"
            onChange={handleChange}
            required
          />
          <input
            name="provided_at"
            type="date"
            onChange={handleChange}
            required
          />
          <input
            name="access_method"
            placeholder="Способ предоставления"
            onChange={handleChange}
            required
          />

          <div className="aam_modal__actions">
            <Button variant="green" type="submit" label="Сохранить" />
            <Button variant="gray" type="button" onClick={onClose} label="Отмена" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateLogBookModal;
