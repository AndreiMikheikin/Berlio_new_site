import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/components/ComplexComponents/Header.scss';
import { useTranslation } from 'react-i18next';
import Logo from '../../Logo/Logo';
import Dropdown from '../../Dropdown/Dropdown';
import ContactInfo from '../../ContactInfo/ContactInfo';
import LinkButton from '../../LinkButton/LinkButton';
import LocaleSwitcher from '../../LocaleSwitcher/LocaleSwitcher';
import { SelectedItemContext } from '../../../contexts/SelectedItemContext';
import CanvasBackground2 from '../../CanvasComponents/CanvasBackground2/CanvasBackground2';

function Header() {
  const { t } = useTranslation();
  const { selectedItem, setSelectedItem } = useContext(SelectedItemContext);

  const [hovered, setHovered] = useState(false);

  const handleSelect = (item) => {
    setSelectedItem(item);
  };

  return (
    <>
      <LocaleSwitcher className="aam_locale-switcher" />
      <header className="aam_header" id="header">
        <div className="aam_header__logo">

          {/* --- LOGO + ANIMATED BACKGROUND WRAPPER --- */}
          <Link
            to="/"
            aria-label={t('backToHome')}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              position: 'relative',
              display: 'inline-block',
              textDecoration: 'none' // Убираем подчеркивание ссылки
            }}
          >

            {/* LOGO */}
            <div
              style={{
                opacity: hovered ? 0 : 1,
                transition: 'opacity 0.3s ease-in-out', // Плавное исчезновение
                pointerEvents: 'none' // Чтобы не мешало hover на Canvas
              }}
            >
              <Logo />
            </div>

            {/* CANVAS BACKGROUND */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                opacity: hovered ? 1 : 0,
                transition: 'opacity 0.3s ease-in-out', // Плавное появление
                zIndex: 1, // Чтобы был под логотипом
                width: '100%',
                height: '100%',
                minWidth: '200px', // Минимальная ширина для Canvas
                minHeight: '60px' // Минимальная высота для Canvas
              }}
            >
              <CanvasBackground2
                scale={0.98}
                start={hovered}
                position="absolute"
                top="0"
                left="0"
                width="100%"
                height="100%"
                zIndex={1}
              />
            </div>

          </Link>

        </div>

        <div className="aam_header__dropdown">
          <Dropdown
            label={
              <>
                {t('departmentsPhone')} <br />
                {t('departments')}
              </>
            }
            onSelect={handleSelect}
            linkText={t('allContacts')}
            linkHref="/contacts"
          />
        </div>

        <div className="aam_header__contactinfo">
          {selectedItem && <ContactInfo item={selectedItem} />}
        </div>

        <div className="aam_header__button-container">
          <LinkButton
            href="https://map.berlio.by/"
            className="green"
            target="_blank"
          >
            {t('searchAzs')}
          </LinkButton>
          <LinkButton
            href="https://lkb.by/"
            className="gray"
            target="_blank"
          >
            {t('personalAccount')}
          </LinkButton>
        </div>
      </header>
    </>
  );
}

export default Header;