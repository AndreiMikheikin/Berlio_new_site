import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import '../../../../styles/components/ComplexComponents/Admin/AdminMenu.scss';

function AdminMenu({ items }) {
  return (
    <nav className="aam_admin-menu">
      <ul className="aam_admin-menu__list">
        {items.map(({ label, to }) => (
          <li key={to} className="aam_admin-menu__item">
            <NavLink
              to={to}
              end
              className={({ isActive }) =>
                `aam_admin-menu__link${isActive ? ' aam_admin-menu__link--active' : ''}`
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

AdminMenu.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      to: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default AdminMenu;
