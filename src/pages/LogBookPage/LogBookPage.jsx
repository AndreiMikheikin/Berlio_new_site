import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import LogBookList from '../../components/ComplexComponents/LogBookList/LogBookList';
import '../../styles/pages/LogBookPage.scss';

// Универсальная функция декодирования JWT с поддержкой кириллицы
function decodeJWT(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (err) {
    console.error('Ошибка декодирования токена:', err);
    return null;
  }
}

function LogBookPage() {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('logBookToken');
    if (!storedToken) {
      navigate('/log-book-login');
      return;
    }

    const payload = decodeJWT(storedToken);
    if (!payload) {
      localStorage.removeItem('logBookToken');
      navigate('/log-book-login');
      return;
    }

    setToken(storedToken);
    setUserRole(payload.role || null);
    setUserName(payload.username || payload.name || payload.user || '');
  }, [navigate]);

  if (!token) return <p>Загрузка...</p>;

  return (
    <div className="aam_logbook-page">
      <Helmet>
        <title>Журнал учёта доступа к коммерческой тайне</title>
        <meta
          name="description"
          content="Журнал регистрации лиц, получающих доступ к сведениям, составляющим коммерческую тайну."
        />
      </Helmet>

      <header className="aam_logbook-page__header">
        <div className="aam_logbook-page__header--row">
          <span className="aam_logbook-page__header--row-role">
            {userRole === 'superadmin' ? 'Суперадмин' : 'Пользователь'}
            {userName ? `: ${userName}` : ''}
          </span>
          <button
            className="aam_logbook-page__header--row-logout-btn"
            onClick={() => {
              localStorage.removeItem('logBookToken');
              navigate('/log-book-login');
            }}
          >
            Выйти
          </button>
        </div>
        <h1>Журнал доступа к коммерческой тайне</h1>
      </header>

      <main className="aam_logbook-page__content">
        <LogBookList token={token} userRole={userRole} userName={userName} />
      </main>
    </div>
  );
}

export default LogBookPage;
