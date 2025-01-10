import React from 'react';
import '../../styles/components/SecondaryFooter.scss';

import { useTranslation } from 'react-i18next';

const SecondaryFooter = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear(); // Получаем текущий год

  return (
    <footer className="aam_secondary-footer">
      <nav className="aam_footer-links">
        <ul>
          <li>
            <a href="/rules">{t('rulesOfUse')}</a>
          </li>
          <li>
            <a href="/offer">{t('offerAgreement')}</a>
          </li>
          <li>
            <a href="/privacy">{t('privacy')}</a>
          </li>
          <li>
            <a href="/help">{t('help')}</a>
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
