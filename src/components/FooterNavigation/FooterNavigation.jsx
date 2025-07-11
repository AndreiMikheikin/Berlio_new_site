import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/components/FooterNavigation.scss';

import { useTranslation } from 'react-i18next';

function FooterNavigation() {
  const { t } = useTranslation();

  return (
    <nav className="aam_footer-navigation">
      <ul className="aam_footer-navigation__list">
        <li>
          <Link to="/about">{t('aboutBerlio')}</Link>
        </li>
        <li>
          <Link to="/partners">{t('forPartners')}</Link>
        </li>
        <li>
          <Link to="/clients">{t('forClients')}</Link>
        </li>
        <li>
          <Link to="/news">{t('news')}</Link>
        </li>
        <li>
          <Link to="/equipment">{t('equipmentAndSoftware')}</Link>
        </li>
        <li>
          <Link to="/contacts">{t('contacts')}</Link>
        </li>
      </ul>
    </nav>
  );
}

export default FooterNavigation;
