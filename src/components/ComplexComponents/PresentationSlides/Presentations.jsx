import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Presentations() {
    const { t } = useTranslation();
  return (
    <main className="aam_about-block">
          {/* Breadcrumbs */}
          <div className="aam_about-block__breadcrumbs">
            <Link to="/">{t('breadCrumbs.home')}</Link>
            {' '}
            /
            {' '}
            Презентации
          </div>
    
          {/* Title */}
          <h1 className="aam_about-block__title">Презентации</h1>

          {/* Presentation links */}
          <Link to="/presentations/pppsa">Программное обеспечение ППП «Система автоматизации АЗС»</Link>
    </main>
  );
}

export default Presentations;
