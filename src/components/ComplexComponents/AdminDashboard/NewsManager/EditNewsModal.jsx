import React, { useState } from 'react';
import Button from '../../../Button/Button';
import RichTextEditor from '../UI/RichTextEditor/RichTextEditor';

function EditNewsModal({ news, onClose, onUpdated }) {
  const [slug, setSlug] = useState(news.slug);
  const [priority, setPriority] = useState(news.priority);
  const [date, setDate] = useState(news.dates?.date || '');
  const [startDate, setStartDate] = useState(news.dates?.startDate || '');
  const [expireDate, setExpireDate] = useState(news.dates?.expireDate || '');
  const [titles, setTitles] = useState(news.titles || { ru: '', en: '' });
  const [descriptions, setDescriptions] = useState(news.descriptions || { ru: '', en: '' });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUpdate = async () => {
    setLoading(true);
    setError('');

    const payload = {
      slug,
      priority,
      dates: { date, startDate, expireDate },
      titles,
      descriptions,
    };

    try {
      const token = localStorage.getItem('authToken');
      const res = await fetch(`/api/admin/news/${news.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
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

  const handleTitleChange = (lang, value) => {
    setTitles((prev) => ({ ...prev, [lang]: value }));
  };

  const handleDescriptionChange = (lang, value) => {
    setDescriptions((prev) => ({ ...prev, [lang]: value }));
  };

  return (
    <div className="aam_modal">
      <div className="aam_modal__content">
        <h3 className="aam_modal__title">Редактировать новость</h3>
        {error && <p className="aam_modal__error">{error}</p>}

        <input
          className="aam_modal__input"
          type="text"
          placeholder="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />

        <select
          className="aam_modal__input"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="A">Приоритет A</option>
          <option value="B">Приоритет B</option>
        </select>

        <input
          className="aam_modal__input"
          type="date"
          placeholder="Дата публикации"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          className="aam_modal__input"
          type="date"
          placeholder="Начало отображения"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <input
          className="aam_modal__input"
          type="date"
          placeholder="Конец отображения"
          value={expireDate}
          onChange={(e) => setExpireDate(e.target.value)}
        />

        <hr className="aam_modal__divider" />

        {['ru', 'en'].map((lang) => (
          <div key={lang}>
            <h4>Язык: {lang.toUpperCase()}</h4>

            <input
              className="aam_modal__input"
              type="text"
              placeholder={`Заголовок (${lang})`}
              value={titles[lang]}
              onChange={(e) => handleTitleChange(lang, e.target.value)}
            />

            <RichTextEditor
              value={descriptions[lang]}
              onChange={(value) => handleDescriptionChange(lang, value)}
              placeholder={`Описание (${lang})`}
            />
          </div>
        ))}

        <div className="aam_modal__actions">
          <Button type="submit" variant="green" label={loading ? 'Сохранение...' : 'Сохранить'} onClick={handleUpdate} disabled={loading} />
          <Button type="reset" variant="green" label="Отмена" onClick={onClose} />
        </div>
      </div>
    </div>
  );
}

export default EditNewsModal;
