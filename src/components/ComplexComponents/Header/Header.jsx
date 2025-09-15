import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/components/ComplexComponents/Header.scss';
import { useTranslation } from 'react-i18next';
import Logo from '../../Logo/Logo';
import Dropdown from '../../Dropdown/Dropdown';
import ContactInfo from '../../ContactInfo/ContactInfo';
import LinkButton from '../../LinkButton/LinkButton';
import LocaleSwitcher from '../../LocaleSwitcher/LocaleSwitcher';
import { SelectedItemContext } from '../../../contexts/SelectedItemContext';

function Header() {
  const { t } = useTranslation();
  const { selectedItem, setSelectedItem } = useContext(SelectedItemContext);

  const handleSelect = (item) => {
    setSelectedItem(item); // Обновляем состояние через контекст
  };

  return (
    <>
      <LocaleSwitcher className="aam_locale-switcher" />
      <header className="aam_header" id="header">
        <div className="aam_header__logo">
          <Link to="/" aria-label={t('backToHome')}>
            <Logo />
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
