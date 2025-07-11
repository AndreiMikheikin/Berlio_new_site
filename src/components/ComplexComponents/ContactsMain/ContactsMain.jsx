import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import MapWithConsent from '../MapWithConsent/MapWithConsent';
import departmentAdresses from '../../../data/departmentAdresses.json';
import PlusIcon from '../../SVGIcons/PlusIcon';
import MinusIcon from '../../SVGIcons/MinusIcon';
import LocationIcon from '../../SVGIcons/LocationIcon';
import '../../../styles/components/ComplexComponents/ContactsMain.scss';

function ContactsMain() {
  const { t } = useTranslation();

  const [isBelarusOpen, setIsBelarusOpen] = useState(false);
  const [isRussiaOpen, setIsRussiaOpen] = useState(false);
  const [activeCoordinates, setActiveCoordinates] = useState(() => {
    const [lat, lng] = departmentAdresses[0].coordinates;
    return { lat, lng };
  });

  const russiaData = [
    {
      id: 1,
      departmentsName: t('smolenskName'),
      address: t('smolenskAddress'),
      phoneNumber: ['+7 4812 56 74 43', '+7 910 788 60 66'],
      email: ['info@rosberlio.ru'],
      coordinates: [54.771325, 32.053075],
    },
  ];

  const handleLocationClick = useCallback((coordinates) => {
    if (Array.isArray(coordinates) && coordinates.length === 2) {
      const [lat, lng] = coordinates;
      setActiveCoordinates({ lat, lng });
    } else {
      console.warn('Invalid coordinates:', coordinates);
    }
  }, []);

  const replacePlaceholders = (phoneNumber) => phoneNumber
    .replace('{{fax}}', t('fax'))
    .replace('{{telFax}}', t('telFax'));

  const handleKeyDown = (event, coordinates) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleLocationClick(coordinates);
    }
  };

  return (
    <div className="aam_contacts-main">
      {/* Беларусь */}
      <div className="aam_contacts-main__list">
        <div
          className="aam_contacts-main__header"
          onClick={() => setIsBelarusOpen(!isBelarusOpen)}
          onKeyDown={(e) => e.key === 'Enter' && setIsBelarusOpen(!isBelarusOpen)}
          tabIndex="0"
          role="button"
        >
          <h2>{t('belarusName')}</h2>
          {isBelarusOpen ? <MinusIcon /> : <PlusIcon />}
        </div>
        {isBelarusOpen && departmentAdresses.map((branch) => (
          <div
            key={branch.id}
            className={`aam_contacts-main__branch-item ${isBelarusOpen ? 'aam_contacts-main__branch-item--open' : ''}`}
          >
            <h3>{t(branch.departmentsName)}</h3>
            <div className="aam_contacts-main__branch-details">
              <p>{t(branch.address)}</p>
              <p>{branch.phoneNumber.map(replacePlaceholders).join(', ')}</p>
              <p>{branch.email.join(', ')}</p>
              <div
                className="aam_contacts-main__location-icon"
                onClick={() => handleLocationClick(branch.coordinates)}
                onKeyDown={(e) => handleKeyDown(e, branch.coordinates)}
                tabIndex="0"
                role="button"
              >
                <LocationIcon />
              </div>
            </div>
          </div>
        ))}

        {/* Россия */}
        <div
          className="aam_contacts-main__header"
          onClick={() => setIsRussiaOpen(!isRussiaOpen)}
          onKeyDown={(e) => e.key === 'Enter' && setIsRussiaOpen(!isRussiaOpen)}
          tabIndex="0"
          role="button"
        >
          <h2>{t('russiaName')}</h2>
          {isRussiaOpen ? <MinusIcon /> : <PlusIcon />}
        </div>
        {isRussiaOpen && russiaData.map((branch) => (
          <div
            key={branch.id}
            className={`aam_contacts-main__branch-item ${isRussiaOpen ? 'aam_contacts-main__branch-item--open' : ''}`}
          >
            <h3>{branch.departmentsName}</h3>
            <div className="aam_contacts-main__branch-details">
              <p>{branch.address}</p>
              <p>{branch.phoneNumber.join(', ')}</p>
              <p>{branch.email.join(', ')}</p>
              <div
                className="aam_contacts-main__location-icon"
                onClick={() => handleLocationClick(branch.coordinates)}
                onKeyDown={(e) => handleKeyDown(e, branch.coordinates)}
                tabIndex="0"
                role="button"
              >
                <LocationIcon />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Карта */}
      <div className="aam_contacts-main__map">
        <MapWithConsent coordinates={activeCoordinates} />
      </div>
    </div>
  );
}

export default ContactsMain;
