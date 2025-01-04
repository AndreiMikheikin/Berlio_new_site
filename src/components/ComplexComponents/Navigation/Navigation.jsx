// Navigation.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/components/ComplexComponents/Navigation.scss';
import NavigationDropdown from '../../NavigationDropdown/NavigationDropdown';
import NavigationDropdownMenu from '../../NavigationDropdownMenu/NavigationDropdownMenu';

const Navigation = () => {
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
            <Link to="/about">О Берлио</Link>
          </li>
          <li>
            <NavigationDropdown
              label="Для партнеров"
              closedColor="#FFFFFF"
              openColor="#176224"
              isOpen={openDropdown === 'partners'}
              onToggle={() => handleToggle('partners')}
              onClose={() => setOpenDropdown(null)} // Закрытие при клике на элементе
              portalClassName="aam_partners-portal"
              currentOpenMenu={openDropdown}
            />
          </li>
          <li>
            <NavigationDropdown
              label="Для клиентов"
              closedColor="#FFFFFF"
              openColor="#176224"
              isOpen={openDropdown === 'clients'}
              onToggle={() => handleToggle('clients')}
              onClose={() => setOpenDropdown(null)} // Закрытие при клике на элементе
              portalClassName="aam_clients-portal"
            />
          </li>
          <li>
            <Link to="/news">Новости</Link>
          </li>
          <li>
            <Link to="/equipment">Оборудование и ПО</Link> {/* Новый пункт */}
          </li>
          <li>
            <Link to="/contacts">Контакты</Link>
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
