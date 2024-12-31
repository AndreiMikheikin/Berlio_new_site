import React, { useState } from 'react';
import '../../../styles/components/ComplexComponents/Header.scss';
import Logo from '../../Logo/Logo';
import Dropdown from '../../Dropdown/Dropdown';

const Header = () => {
    const [selectedItem, setSelectedItem] = useState(null);

    const handleSelect = (item) => {
        setSelectedItem(item);
        console.log(item);
    };

    return (
        <header className="aam_header">
            <div className="aam_header__logo">
                <Logo />
            </div>
            <div className="aam_header__dropdown">
                <Dropdown
                    label="Телефоны филиалов"
                    items={['Элемент 1', 'Элемент 2', 'Элемент 3']}
                    onSelect={handleSelect}
                    linkText="Все контакты"
                    linkHref="/#"
                />
            </div>
        </header>
    );
};

export default Header;
