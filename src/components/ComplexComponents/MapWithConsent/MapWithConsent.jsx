import React from 'react';
import PropTypes from 'prop-types';
import YandexMap from '../../YandexMap/YandexMap';
import FallbackMap from '../../FallbackMap/FallbackMap';
import useCookieConsent from '../../../hooks/useCookieConsent';

function MapWithConsent({ coordinates }) {
  const { consent } = useCookieConsent();

  const hasConsent = Boolean(consent?.functional && consent?.analytics);

  return hasConsent
    ? <YandexMap coordinates={coordinates} />
    : <FallbackMap />;
}

MapWithConsent.propTypes = {
  coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default MapWithConsent;
