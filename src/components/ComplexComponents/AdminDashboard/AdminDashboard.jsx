import React, { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import AdminMenu from './AdminMenu/AdminMenu';
import '../../../styles/components/ComplexComponents/Admin/AdminDashboard.scss';

function AdminDashboard() {
  const [message, setMessage] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSecureInfo = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        navigate('/administrator');
        return;
      }

      try {
        const res = await fetch('/api/admin/secure', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401) {
          throw new Error('Unauthorized');
        }

        if (!res.ok) {
          throw new Error('Ошибка сервера');
        }

        const data = await res.json();
        setMessage(data.message);
        setRole(data.role);
      } catch (err) {
        localStorage.removeItem('authToken');
        navigate('/administrator');
      } finally {
        setLoading(false);
      }
    };

    fetchSecureInfo();
  }, [navigate]);

  if (loading) return <p className="aam_admin-dashboard__loading">Загрузка...</p>;

  const menuItems = [
    { label: 'Панель управления', to: '/adminDashboard' },
    { label: 'Администраторы', to: '/adminDashboard/users' },
    { label: 'Новости', to: '/adminDashboard/news' },
    { label: 'Page Views', to: '/adminDashboard/page-views' },
    { label: 'SQL Explorer', to: '/adminDashboard/sql-explorer' },
    { label: 'Настройки', to: '/adminDashboard/settings' },
  ];

  return (
    <section className="aam_admin-dashboard">
      {/* Верхняя панель */}
      <header className="aam_admin-dashboard__header">
        <p className="aam_admin-dashboard__welcome">{message}</p>
        <p className="aam_admin-dashboard__role">{role}</p>
        <button
          className="aam_admin-dashboard__logout"
          onClick={() => {
            localStorage.removeItem('authToken');
            navigate('/administrator');
          }}
        >
          Выход
        </button>
      </header>

      {/* Основной блок: меню + контент */}
      <div className="aam_admin-dashboard__wrapper">
        <aside className="aam_admin-dashboard__wrapper-tools">
          <AdminMenu items={menuItems} />
        </aside>

        <main className="aam_admin-dashboard__wrapper-outlet">
          <Outlet context={{ role }} />
        </main>
      </div>
    </section>
  );
}

export default AdminDashboard;
