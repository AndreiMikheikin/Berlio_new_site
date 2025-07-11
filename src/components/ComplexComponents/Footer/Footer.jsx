import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import FooterNavigation from '../../FooterNavigation/FooterNavigation';
import LinkTo from '../../LinkTo/LinkTo';
import ContactAddress from '../../ContactAddress/ContactAddress';
import ContactPhones from '../../ContactPhones/ContactPhones';
import '../../../styles/components/ComplexComponents/Footer.scss';
import DepartmentAdresses from '../../../data/departmentAdresses.json';

import { SelectedItemContext } from '../../../contexts/SelectedItemContext';

function Footer() {
  const { t } = useTranslation();
  const { selectedItem } = useContext(SelectedItemContext);

  const defaultItem = DepartmentAdresses.find((entry) => entry.id === 1);
  const displayedItem = selectedItem || defaultItem;

  if (!displayedItem) {
    return null;
  }

  return (
    <footer className="aam_footer">
      <div className="aam_footer__navigation">
        <FooterNavigation />
      </div>
      <div className="aam_footer__contacts">
        <div className="aam_footer__address">
          <ContactAddress item={displayedItem} />
        </div>
        <div className="aam_footer__contactslink">
          <LinkTo href="/contacts" text={t('ourBranchesAndContacts')} iconColor="white" />
        </div>
        <div className="aam_footer__phones">
          <ContactPhones item={displayedItem} />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
