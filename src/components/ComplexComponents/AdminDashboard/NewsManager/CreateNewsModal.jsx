import React, { useState, useEffect } from 'react';
import Button from '../../../Button/Button';
import slugify from 'slugify';
import RichTextEditor from '../UI/RichTextEditor/RichTextEditor';

function CreateNewsModal({ onClose, onCreated }) {
  const [slug, setSlug] = useState('');
  const [priority, setPriority] = useState('B');
  const [date, setDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [expireDate, setExpireDate] = useState('');
  const [titles, setTitles] = useState({ ru: '', en: '' });
  const [descriptions, setDescriptions] = useState({ ru: '', en: '' });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!slug.trim()) {
      const firstTitle = titles.ru || titles.en;
      if (firstTitle.trim()) {
        setSlug(slugify(firstTitle, { lower: true, strict: true }));
      }
    }
  }, [titles.ru, titles.en]);

  const handleCreate = async () => {
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
      const res = await fetch('/api/admin/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.error || 'Ошибка создания новости');
      }

      onCreated();
      onClose();
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
        <h3 className="aam_modal__title">Создать новость</h3>
        {error && <p className="aam_modal__error">{error}</p>}

        <input
          className="aam_modal__input"
          type="text"
          placeholder="Автоматически сгенерируется из заголовка"
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

        <label htmlFor="publishDate">
          Дата публикации
          <input
            className="aam_modal__input"
            type="date"
            id="publishDate"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>

        <label htmlFor="startDate">
          Начало отображения
          <input
            className="aam_modal__input"
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>

        <label htmlFor="expireDate">
          Конец отображения
          <input
            className="aam_modal__input"
            type="date"
            id="expireDate"
            value={expireDate}
            onChange={(e) => setExpireDate(e.target.value)}
          />
        </label>

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
          <Button type="submit" variant="green" label={loading ? 'Создание...' : 'Создать'} onClick={handleCreate} disabled={loading} />
          <Button type="reset" variant="green" label="Отмена" onClick={onClose} />
        </div>
      </div>
    </div>
  );
}

export default CreateNewsModal;
