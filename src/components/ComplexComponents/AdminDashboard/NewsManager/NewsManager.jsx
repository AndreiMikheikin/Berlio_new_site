import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import CreateNewsModal from './CreateNewsModal.jsx';
import EditNewsModal from './EditNewsModal.jsx';
import ConfirmDeleteModal from './ConfirmDeleteNewsModal.jsx';
import '../../../../styles/components/ComplexComponents/Admin/UserManager.scss';

function NewsManager() {
  const { role } = useOutletContext();

  // Разрешаем только admin и superadmin работать с новостями
  if (role !== 'admin' && role !== 'superadmin') {
    return <p>У вас нет прав для управления новостями.</p>;
  }

  const [news, setNews] = useState({});
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editNews, setEditNews] = useState(null);
  const [newsToDelete, setNewsToDelete] = useState(null);

  const fetchNews = () => {
    setLoading(true);
    const token = localStorage.getItem('authToken');

    fetch('/api/admin/news', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error('Ошибка загрузки новостей');
        const data = await res.json();
        setNews(data);
      })
      .catch((err) => console.error('Ошибка загрузки новостей:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleConfirmDelete = async () => {
    if (!newsToDelete) return;

    const token = localStorage.getItem('authToken');

    try {
      const res = await fetch(`/api/admin/news/${newsToDelete}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.error || 'Ошибка удаления новости');
      }

      setNewsToDelete(null);
      fetchNews();
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p>Загрузка новостей...</p>;

  // Преобразуем объект новостей в массив [id, news]
  const newsArray = Object.entries(news);

  return (
    <div className="aam_news-manager">
      <h2>Управление новостями</h2>
      <button className="aam-news-btn aam-news-btn--add" onClick={() => setShowCreateModal(true)}>
        ➕ Новая новость
      </button>

      {newsArray.length === 0 ? (
        <p>Новостей пока нет.</p>
      ) : (
        <table className="aam_news-manager__table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Slug</th>
              <th>Priority</th>
              <th>Дата</th>
              <th>Заголовок (RU)</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {newsArray.map(([id, item]) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{item.slug}</td>
                <td>{item.priority}</td>
                <td>{item.dates.date ? new Date(item.dates.date).toLocaleDateString('ru-RU') : '-'}</td>
                <td>{item.titles.ru || '-'}</td>
                <td>
                  <button className="aam-news-btn aam-news-btn--edit" onClick={() => setEditNews({ id, ...item })}>
                    ✏️
                  </button>
                  <button className="aam-news-btn aam-news-btn--delete" onClick={() => setNewsToDelete(id)}>
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showCreateModal && (
        <CreateNewsModal onClose={() => setShowCreateModal(false)} onCreated={fetchNews} />
      )}

      {editNews && (
        <EditNewsModal news={editNews} onClose={() => setEditNews(null)} onUpdated={fetchNews} />
      )}

      {newsToDelete && (
        <ConfirmDeleteModal
          username={news[newsToDelete]?.titles.ru || `Новость #${newsToDelete}`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setNewsToDelete(null)}
        />
      )}
    </div>
  );
}

export default NewsManager;
