import React from 'react';

function ConfirmDeleteModal({ onConfirm, onCancel, username }) {
  return (
    <div className="aam_modal">
      <div className="aam_modal__content">
        <h3>Удаление администратора</h3>
        <p>Вы уверены, что хотите удалить <strong>{username}</strong>?</p>
        <div className="aam_modal__actions">
          <button className="aam_btn aam_btn--danger" onClick={onConfirm}>Удалить</button>
          <button className="aam_btn" onClick={onCancel}>Отмена</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
