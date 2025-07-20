import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import AdminLogin from '../../components/ComplexComponents/AdminLogin/AdminLogin';

function AdminLoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLogin = (token) => {
    localStorage.setItem('authToken', token);
    navigate('/adminDashboard');
  };

  return (
    <div className="aam_admin-login-page">
      <Helmet>
        <title>{t('adminLogin.pageTitle')}</title>
        <meta name="description" content={t('adminLogin.pageDescription')} />
      </Helmet>

      <h1 className="aam_admin-login-page__title">{t('adminLogin.pageTitle')}</h1>
      <AdminLogin onLogin={handleLogin} />
    </div>
  );
}

export default AdminLoginPage;
