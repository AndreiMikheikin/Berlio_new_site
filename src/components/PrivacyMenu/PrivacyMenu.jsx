import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const PrivacyMenu = ({ items }) => {
    return (
        <nav className="aam_privacy-menu">
            <ul className="aam_privacy-menu__list">
                {items.map(({ label, to }) => (
                    <li key={to} className="aam_privacy-menu__item">
                        <NavLink
                            to={to}
                            end
                            className={({ isActive }) =>
                                `aam_privacy-menu__link${isActive ? ' aam_privacy-menu__link--active' : ''}`
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

PrivacyMenu.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            to: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default PrivacyMenu;