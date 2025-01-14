import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/components/ComplexComponents/Navigation.scss';
import NavigationDropdown from '../../NavigationDropdown/NavigationDropdown';
import NavigationDropdownMenu from '../../NavigationDropdownMenu/NavigationDropdownMenu';

import { useTranslation } from 'react-i18next';

const Navigation = () => {
  const { t } = useTranslation();

  const [openDropdown, setOpenDropdown] = useState(null); // Хранение состояния открытого меню

  // Открытие/закрытие меню
  const handleToggle = (menuId) => {
    setOpenDropdown(menuId === openDropdown ? null : menuId);
  };

  return (
    <>
      <nav className="aam_navigation">
        <ul className="aam_navigation__list">
          <li>
            <Link to="/about">{t('aboutBerlio')}</Link>
          </li>
          <li>
            <NavigationDropdown
              label={t('forPartners')}
              closedColor="#FFFFFF"
              openColor="#176224"
              hoverColor='#176224'
              isOpen={openDropdown === 'partners'}
              onToggle={() => handleToggle('partners')}
              onClose={() => setOpenDropdown(null)} // Закрытие при клике на элементе
              portalClassName="aam_partners-portal"
              currentOpenMenu={openDropdown}
            />
          </li>
          <li>
            <NavigationDropdown
              label={t('forClients')}
              closedColor="#FFFFFF"
              openColor="#176224"
              hoverColor='#176224'
              isOpen={openDropdown === 'clients'}
              onToggle={() => handleToggle('clients')}
              onClose={() => setOpenDropdown(null)}
            />
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

      {/* Меню для партнеров */}
      <NavigationDropdownMenu
        isOpen={openDropdown === 'partners'}
        menuId="partners"
        currentOpenMenu={openDropdown}
        onClose={() => setOpenDropdown(null)} // Управление закрытием через родительский компонент
      />

      {/* Меню для клиентов */}
      <NavigationDropdownMenu
        isOpen={openDropdown === 'clients'}
        menuId="clients"
        currentOpenMenu={openDropdown}
        onClose={() => setOpenDropdown(null)} // Управление закрытием через родительский компонент
      />
    </>
  );
};

export default Navigation;
