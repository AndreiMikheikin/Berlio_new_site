import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';
import AdminDashboard from '../../components/ComplexComponents/AdminDashboard/AdminDashboard';
import '../../styles/pages/AdminDashboardPage.scss';

function AdminDashboardPage() {
  const { t } = useTranslation();

  return (
    <div className="aam_admin-dashboard-page">
      <Helmet>
        <title>{t('pageTitles.adminDashboard')}</title>
        <meta name="description" content={t('adminDashboard.pageDescription')} />
      </Helmet>

      <AdminDashboard />
    </div>
  );
}

export default AdminDashboardPage;
