// Header.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/components/ComplexComponents/Header.scss';
import Logo from '../../Logo/Logo';
import Dropdown from '../../Dropdown/Dropdown';
import ContactInfo from '../../ContactInfo/ContactInfo';
import LinkButton from '../../LinkButton/LinkButton';
import LocaleSwitcher from '../../LocaleSwitcher/LocaleSwitcher';

import { useTranslation } from 'react-i18next';

const Header = () => {
    const { t } = useTranslation();

    const [selectedItem, setSelectedItem] = useState(null);

    const handleSelect = (item) => {
        setSelectedItem(item);
    };

    return (
        <>
        <LocaleSwitcher className="aam_locale-switcher" />
        <header className="aam_header">
            <div className="aam_header__logo">
                <Link to="/">
                    <Logo />
                </Link>
            </div>
            <div className="aam_header__dropdown">
                    <Dropdown
                        label={t('departmentsPhone')}
                        onSelect={handleSelect}
                        linkText={t('allContacts')}
                        linkHref="/Contacts"
                    />
            </div>
            <div className="aam_header__contactinfo">
                {/* Если выбранный элемент есть, передаем его в ContactInfo */}
                {selectedItem && <ContactInfo item={selectedItem} />}
            </div>
            <div className="aam_header__button-container">
                <LinkButton
                    href="https://map.berlio.by/"
                    className="green"
                    target="_blank" // Открыть в новой вкладке
                >
                    {t('searchAzs')}
                </LinkButton>
                <LinkButton
                    href="https://lkb.by/"
                    className="gray"
                    target="_blank" // Открыть в новой вкладке
                >
                    {t('personalAccount')}
                </LinkButton>
            </div>
        </header>
        </>
    );
};

export default Header;
