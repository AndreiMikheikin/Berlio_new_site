import React from 'react';
import YandexMap from '../../YandexMap/YandexMap';
import FallbackMap from '../../FallbackMap/FallbackMap';
import useCookieConsent from '../../../hooks/useCookieConsent';

const MapWithConsent = ({ coordinates }) => {
  const { consent } = useCookieConsent();

  const hasConsent = Boolean(consent?.functional && consent?.analytics);

  return hasConsent
    ? <YandexMap coordinates={coordinates} />
    : <FallbackMap />;
};

export default MapWithConsent;