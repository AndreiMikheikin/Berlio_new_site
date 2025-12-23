import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import '../../../../styles/components/ComplexComponents/Admin/PageViewsManager.scss';

export default function PageViewsManager() {
  const { role } = useOutletContext();
  const [views, setViews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchViews = async () => {
      const token = localStorage.getItem('authToken');
      try {
        const res = await fetch('/api/page-views', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Ошибка загрузки просмотров');
        const data = await res.json();
        setViews(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchViews();
  }, []);

  if (loading) return <p>Загрузка просмотров...</p>;

  if (views.length === 0) return <p>Показы ещё не зафиксированы.</p>;

  return (
    <div className="aam_page-views-manager">
      <h2>Показы страниц</h2>
      <table className="aam_page-views-manager__table">
        <thead>
          <tr>
            <th>Route</th>
            <th>Entity</th>
            <th>Entity ID</th>
            <th>Views</th>
            <th>Последний просмотр</th>
          </tr>
        </thead>
        <tbody>
          {views.map(v => (
            <tr key={v.id}>
              <td>{v.route}</td>
              <td>{v.entity || '-'}</td>
              <td>{v.entity_id || '-'}</td>
              <td>{v.views}</td>
              <td>{v.last_view_at ? new Date(v.last_view_at).toLocaleString('ru-RU') : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
