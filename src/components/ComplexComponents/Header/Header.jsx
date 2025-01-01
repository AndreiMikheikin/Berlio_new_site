import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/components/ComplexComponents/Header.scss';
import Logo from '../../Logo/Logo';
import Dropdown from '../../Dropdown/Dropdown';
import ContactInfo from '../../ContactInfo/ContactInfo';

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
                    onSelect={handleSelect} // Убираем items, передаем только onSelect
                    linkText="Все контакты"
                    linkHref="/Contacts"
                />
            </div>
            <div className="aam_header__contactinfo">
                {/* Если выбранный элемент есть, передаем его в ContactInfo */}
                {selectedItem && <ContactInfo item={selectedItem} />}
            </div>
        </header>
    );
};

export default Header;
