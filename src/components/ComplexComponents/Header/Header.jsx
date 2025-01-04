import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/components/ComplexComponents/Header.scss';
import Logo from '../../Logo/Logo';
import Dropdown from '../../Dropdown/Dropdown';
import ContactInfo from '../../ContactInfo/ContactInfo';
import LinkButton from '../../LinkButton/LinkButton';

const Header = () => {
    const [selectedItem, setSelectedItem] = useState(null);

    const handleSelect = (item) => {
        setSelectedItem(item);
        console.log(item);
    };

    return (
        <header className="aam_header">
            <div className="aam_header__logo">
                <Link to="/">
                    <Logo />
                </Link>
            </div>
            <div className="aam_header__dropdown">
                    <Dropdown
                        label="Телефоны филиалов"
                        onSelect={handleSelect}
                        linkText="Все контакты"
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
                    Поиск АЗС
                </LinkButton>
                <LinkButton
                    href="https://lkb.by/"
                    className="gray"
                    target="_blank" // Открыть в новой вкладке
                >
                    Личный кабинет
                </LinkButton>
            </div>
        </header>
    );
};

export default Header;
