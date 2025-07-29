import React from 'react';
import Button from '../../../Button/Button';

function ConfirmDeleteNewsModal({ onConfirm, onCancel, title }) {
  return (
    <div className="aam_modal">
      <div className="aam_modal__content">
        <h3 className="aam_modal__title">Удаление новости</h3>
        <p className="aam_modal__text">
          Вы уверены, что хотите удалить новость <strong>{title}</strong>?
        </p>
        <div className="aam_modal__actions">
          <Button type="submit" label="Удалить" variant="danger" onClick={onConfirm} />
          <Button type="reset" label="Отмена" variant="green" onClick={onCancel} />
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteNewsModal;
