import React, { Link, useState, useEffect } from 'react';
import Button from '../../Button/Button';
import LinkTo from '../../LinkTo/LinkTo';
import DropdownIcon from '../../SVGIcons/DropdownIcon';
import '../../../styles/components/ComplexComponents/CookieConsentModal.scss';

const COOKIE_STORAGE_KEY = 'aam_cookie_consent';

const defaultConsent = {
    technical: true,
    functional: false,
    analytics: false,
    marketing: false,
};

const descriptions = {
    technical: `Используются для обеспечения функционирования сайта, например, сохранение настроек пользователя, поддержка аутентификации, обеспечение безопасности и конфиденциальности данных, управление сессией пользователя и предоставление технической поддержки. Данный тип файлов является обязательным и не подлежит отключению.`,
    functional: `Используются для включения функционала, например, Яндекс.Карты.`,
    analytics: `Используются для оценки активности пользователя на сайте и анализа взаимодействия, что помогает улучшать производительность сайта. Данные обезличиваются.`,
    marketing: `Используются для маркетинга и улучшения качества рекламы, создавая профиль интересов пользователя.`,
};

const CookieConsentModal = () => {
    const [visible, setVisible] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [expandedSections, setExpandedSections] = useState({
        technical: false,
        functional: false,
        analytics: false,
        marketing: false,
    });
    const [consent, setConsent] = useState(defaultConsent);

    useEffect(() => {
        const saved = localStorage.getItem(COOKIE_STORAGE_KEY);
        if (!saved) {
            setVisible(true);
        } else {
            setConsent(JSON.parse(saved));
        }
    }, []);

    const saveConsent = (newConsent) => {
        localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(newConsent));
        setConsent(newConsent);
        setVisible(false);
    };

    const acceptAll = () => {
        saveConsent({
            technical: true,
            functional: true,
            analytics: true,
            marketing: true,
        });
    };

    const rejectAll = () => {
        saveConsent({
            ...defaultConsent,
            functional: false,
            analytics: false,
            marketing: false,
        });
    };

    const toggleSection = (section) => {
        setExpandedSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const toggleConsent = (section) => {
        if (section === 'technical') return;
        setConsent((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const acceptSelected = () => {
        saveConsent(consent);
    };

    if (!visible) return null;

    return (
        <div className="aam_cookie-modal">
            <div className="aam_cookie-modal__content">
                <h2 className="aam_cookie-modal__title">Этот сайт использует cookies</h2>
                <p className="aam_cookie-modal__description">
                    Файлы cookies делают Вашу работу с сайтом удобнее. Тем не менее, Вы можете отказаться от них или настроить по своему усмотрению. Отказ от использования файлов cookies может привести к нестабильной работе некоторых функций сайта.
                </p>
                <LinkTo
                    href='/cookie-policy'
                    text='Подробнее о политике обработки cookies'
                    variant='default'
                    className='aam_cookie-modal__link'
                    iconColor={$text - primary}
                />

                {!showSettings && (
                    <div className="aam_cookie-modal__buttons">
                        <Button
                            label="Принять все"
                            onClick={acceptAll}
                            variant="green"
                        />
                        <Button
                            label="Отказаться"
                            onClick={rejectAll}
                        />
                        <Button
                            label="Настройки файлов cookies"
                            onClick={() => setShowSettings(true)}
                        />
                    </div>
                )}

                {showSettings && (
                    <div className="aam_cookie-modal__settings">
                        {['technical', 'functional', 'analytics', 'marketing'].map((section) => (
                            <div key={section} className="aam_cookie-modal__section">
                                <button
                                    className="aam_cookie-modal__section-header"
                                    onClick={() => toggleSection(section)}
                                    aria-expanded={expandedSections[section]}
                                    aria-controls={`section-content-${section}`}
                                >
                                    <span>{(() => {
                                        switch (section) {
                                            case 'technical': return 'Технические файлы cookies - Всегда активны';
                                            case 'functional': return 'Функциональные файлы cookies';
                                            case 'analytics': return 'Аналитические файлы cookies';
                                            case 'marketing': return 'Рекламные/маркетинговые файлы cookies';
                                            default: return section;
                                        }
                                    })()}</span>
                                    <DropdownIcon
                                        className={`aam_cookie-modal__dropdown-icon ${expandedSections[section] ? 'expanded' : ''}`}
                                    />
                                </button>
                                {expandedSections[section] && (
                                    <div id={`section-content-${section}`} className="aam_cookie-modal__section-content">
                                        <p>{descriptions[section]}</p>
                                        {section !== 'technical' && (
                                            <label className="aam_cookie-modal__toggle-label">
                                                <input
                                                    type="checkbox"
                                                    checked={consent[section]}
                                                    onChange={() => toggleConsent(section)}
                                                />
                                                <span>Включить</span>
                                            </label>
                                        )}
                                        {section === 'technical' && (
                                            <p className="aam_cookie-modal__mandatory-note">Этот тип cookies обязателен и не может быть отключен.</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}

                        <div className="aam_cookie-modal__buttons aam_cookie-modal__buttons--settings">
                            <Button label="Принять все" onClick={acceptAll} variant="green" />
                            <Button label="Отказаться" onClick={rejectAll} />
                            <Button label="Принять выбранные" onClick={acceptSelected} variant="green" />
                        </div>
                        <button className="aam_cookie-modal__close-settings" onClick={() => setShowSettings(false)}>
                            Закрыть настройки
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CookieConsentModal;