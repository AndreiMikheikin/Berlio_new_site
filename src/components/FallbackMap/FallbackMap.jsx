import React, { useState } from 'react';
import Button from '../Button/Button';
import CookieConsentModal from '../ComplexComponents/CookieConsentModal/CookieConsentModal';
import useLocalization from '../../hooks/useLocalization';
import useCookieConsent from '../../hooks/useCookieConsent';
import '../../styles/components/FallbackMap.scss';

function FallbackMap() {
  const { t } = useLocalization();
  const [modalKey, setModalKey] = useState(0);
  const { isConsentSet } = useCookieConsent();

  return (
    <div className="aam_map-fallback">
      <p>
        {t('Для отображения карты необходимо согласие на обработку функциональных и аналитических cookies.')}
      </p>
      <Button
        label={t('Настроить cookies')}
        onClick={() => setModalKey((prev) => prev + 1)}
        variant="green"
        disabled={!isConsentSet()} // Заблокировано, если нет ключа в localStorage
      />
      {modalKey > 0 && <CookieConsentModal key={`modal-${modalKey}`} forceVisible />}
    </div>
  );
}

export default FallbackMap;
