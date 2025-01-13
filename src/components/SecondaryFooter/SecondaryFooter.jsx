import React from 'react';
import '../../styles/components/SecondaryFooter.scss';
import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

const SecondaryFooter = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear(); // Получаем текущий год

  return (
    <footer className="aam_secondary-footer">
      <nav className="aam_footer-links">
        <ul>
          <li>
            <Link to="/rules">{t('rulesOfUse')}</Link>
          </li>
          <li>
            <Link to="/offer">{t('offerAgreement')}</Link>
          </li>
          <li>
            <Link to="/privacy">{t('privacy')}</Link>
          </li>
          <li>
            <Link to="/help">{t('help')}</Link>
          </li>
        </ul>
      </nav>
      <div className="aam_footer-copyright">
        {t('copyright', { year: currentYear })}
      </div>
    </footer>
  );
};

export default SecondaryFooter;
