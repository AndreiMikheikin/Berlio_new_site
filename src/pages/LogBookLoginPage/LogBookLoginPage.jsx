import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import LogBookLogin from '../../components/ComplexComponents/LogBookLogin/LogBookLogin';

function LogBookLoginPage() {
  const navigate = useNavigate();

  const handleLogin = (token) => {
    localStorage.setItem('logBookToken', token);
    navigate('/log-book');
  };

  return (
    <div className="aam_logbook-login-page">
      <Helmet>
        <title>Журнал учёта — вход</title>
        <meta name="description" content="Авторизация для доступа к журналу учёта." />
      </Helmet>

      <h1 className="aam_logbook-login-page__title">Вход в журнал учёта</h1>
      <LogBookLogin onLogin={handleLogin} />
    </div>
  );
}

export default LogBookLoginPage;
