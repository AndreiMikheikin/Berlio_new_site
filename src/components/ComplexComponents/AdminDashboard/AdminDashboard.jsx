import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminMenu from './AdminMenu/AdminMenu';

function AdminDashboard() {
  const [message, setMessage] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/administrator');
      return;
    }

    fetch('/api/admin/secure', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (res.status === 401) {
          localStorage.removeItem('authToken');
          navigate('/administrator');
          return;
        }
        if (!res.ok) throw new Error('Ошибка сервера');
        const data = await res.json();
        setMessage(data.message);
        setRole(data.role);
      })
      .catch(() => {
        localStorage.removeItem('authToken');
        navigate('/administrator');
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading) return <p className="aam_admin-dashboard__loading">Загрузка...</p>;

  const menuItems = [
    { label: 'Панель управления', to: '/adminDashboard' },
    { label: 'Администраторы', to: '/adminDashboard/users' },
    { label: 'Новости', to: '/adminDashboard/news' },
    { label: 'Настройки', to: '/adminDashboard/settings' },
  ];

  return (
    <div className="aam_admin-dashboard">
      <div className="aam_admin-dashboard__header">
        <p className="aam_admin-dashboard__welcome">{message}</p>
        <p className="aam_admin-dashboard__role">Роль: {role}</p>
      </div>

      <div className="aam_admin-dashboard__tools">
        {/* Место для инструментов админки */}
        <AdminMenu items={menuItems} />
      </div>
    </div>
  );
}

export default AdminDashboard;