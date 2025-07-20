import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Button from '../../Button/Button';
import DropdownIcon from '../../SVGIcons/DropdownIcon';
import useCookieConsent from '../../../hooks/useCookieConsent';
import '../../../styles/components/ComplexComponents/CookieConsentModal.scss';

const defaultConsent = {
  technical: true,
  functional: false,
  analytics: false,
  marketing: false,
};

const descriptions = {
  technical: 'Используются для обеспечения функционирования сайта, например, сохранение настроек пользователя, поддержка аутентификации, обеспечение безопасности и конфиденциальности данных, управление сессией пользователя и предоставление технической поддержки. Данный тип файлов является обязательным и не подлежит отключению.',
  functional: 'Используются для включения функционала, например, Яндекс.Карты.',
  analytics: 'Используются для оценки активности пользователя на сайте и анализа взаимодействия, что помогает улучшать производительность сайта. Данные обезличиваются.',
  marketing: 'Используются для маркетинга и улучшения качества рекламы, создавая профиль интересов пользователя.',
};

const sectionLabels = {
  technical: 'Технические файлы cookies',
  functional: 'Функциональные файлы cookies',
  analytics: 'Аналитические файлы cookies',
  marketing: 'Рекламные/маркетинговые файлы cookies',
};

function CookieConsentModal({ forceVisible = false, onConsentSaved = () => { } }) {
  const {
    getConsent,
    saveConsent,
    isConsentSet,
    needsRenewal,
    isReady,
  } = useCookieConsent();

  const [mounted, setMounted] = useState(false);
  const [hasMadeChoice, setHasMadeChoice] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [consent, setConsent] = useState(defaultConsent);
  const [expandedSections, setExpandedSections] = useState({
    technical: false,
    functional: false,
    analytics: false,
    marketing: false,
  });

  // Определяем, что компонент монтирован (только на клиенте)
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isReady || !mounted || hasMadeChoice) return;

    const current = getConsent();
    setConsent(current);

    if (forceVisible) {
      setVisible(true);
      setShowSettings(true);
      return;
    }

    if (needsRenewal()) {
      setVisible(true);
    }
  }, [forceVisible, isReady, mounted, getConsent, needsRenewal, hasMadeChoice]);

  const handleSave = (newConsent) => {
    saveConsent(newConsent);
    onConsentSaved(newConsent);
    setHasMadeChoice(true);
    setVisible(false);
  };

  const acceptAll = () => handleSave({ ...defaultConsent, functional: true, analytics: true, marketing: true });
  const rejectAll = () => handleSave(defaultConsent);
  const acceptSelected = () => handleSave(consent);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleConsent = (section) => {
    if (section === 'technical') return;
    setConsent(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Не рендерить на сервере или если не видно
  if (!visible || !mounted) return null;

  return ReactDOM.createPortal(
    <div className="aam_cookie-modal">
      <div className="aam_cookie-modal__content">
        <h2 className="aam_cookie-modal__title">Этот сайт использует cookies</h2>
        <p className="aam_cookie-modal__description">
          Файлы cookies делают Вашу работу с сайтом удобнее. Тем не менее,
          Вы можете отказаться от них или настроить по своему усмотрению.
          <span className="aam_cookie-modal__description--warning">
            Отказ от использования файлов cookies может привести
            к нестабильной работе некоторых функций сайта!
          </span>
        </p>

        <a
          href="/Berlio_new_site/cookie-policy"
          target="_blank"
          rel="noopener noreferrer"
          className="aam_cookie-modal__link"
        >
          Подробнее о политике обработки cookies
        </a>

        {!showSettings && (
          <div className="aam_cookie-modal__buttons">
            <Button label="Принять все" onClick={acceptAll} variant="green" />
            <Button label="Отказаться" onClick={rejectAll} />
            <Button label="Настройки файлов cookies" onClick={() => setShowSettings(true)} />
          </div>
        )}

        {showSettings && (
          <div className="aam_cookie-modal__settings">
            {Object.keys(sectionLabels).map((section) => (
              <div key={section} className="aam_cookie-modal__section">
                <div className="aam_cookie-modal__section-header-wrapper">
                  <button
                    type="button"
                    className="aam_cookie-modal__section-header"
                    onClick={() => toggleSection(section)}
                    aria-expanded={expandedSections[section]}
                    aria-controls={`section-content-${section}`}
                  >
                    <span>{sectionLabels[section]}</span>
                    <DropdownIcon
                      className={`aam_cookie-modal__dropdown-icon ${expandedSections[section] ? 'expanded' : ''}`}
                    />
                  </button>

                  <div className="aam_cookie-modal__section-control">
                    {section !== 'technical' ? (
                      <label
                        aria-label={`Разрешить ${sectionLabels[section]}`}
                        className="aam_cookie-modal__toggle-switch"
                        htmlFor={`cookie-toggle-${section}`}
                      >
                        <input
                          id={`cookie-toggle-${section}`}
                          type="checkbox"
                          checked={consent[section]}
                          onChange={() => toggleConsent(section)}
                        />
                        <span className="slider" />
                      </label>
                    ) : (
                      <span
                        className="aam_cookie-modal__always-on"
                        role="note"
                        aria-label="Всегда активны"
                      >
                        Всегда активны
                      </span>
                    )}
                  </div>
                </div>

                {expandedSections[section] && (
                  <div
                    id={`section-content-${section}`}
                    className="aam_cookie-modal__section-content"
                  >
                    <p>{descriptions[section]}</p>
                  </div>
                )}
              </div>
            ))}

            <div className="aam_cookie-modal__buttons aam_cookie-modal__buttons--settings">
              <Button label="Принять все" onClick={acceptAll} variant="green" />
              <Button label="Отказаться" onClick={rejectAll} />
              <Button label="Принять выбранные" onClick={acceptSelected} variant="green" />
            </div>

            <button
              type="button"
              className="aam_cookie-modal__close-settings"
              onClick={() => setShowSettings(false)}
            >
              Закрыть настройки
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}

CookieConsentModal.propTypes = {
  forceVisible: PropTypes.bool,
  onConsentSaved: PropTypes.func,
};

export default CookieConsentModal;
