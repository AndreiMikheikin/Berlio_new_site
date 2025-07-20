import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';
import AdminDashboard from '../../components/ComplexComponents/AdminDashboard/AdminDashboard';

function AdminDashboardPage() {
  const { t } = useTranslation();

  return (
    <div className="aam_admin-dashboard-page">
      <Helmet>
        <title>{t('adminDashboard.pageTitle')}</title>
        <meta name="description" content={t('adminDashboard.pageDescription')} />
      </Helmet>

      <AdminDashboard />
      <div className="aam_admin-dashboard__outlet">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminDashboardPage;
