import React from 'react';
import useLocalization from '../../hooks/useLocalization.js';

const LocaleSwitcher = ({ className }) => {
    const { locale, switchLocale } = useLocalization();

    const handleLocaleChange = (newLocale) => {
        if (locale !== newLocale) switchLocale(newLocale);
    };

    return (
        <div className={className}>
            <button
                className={locale === 'ru' ? 'active' : ''}
                onClick={() => handleLocaleChange('ru')}
            >
                RU
            </button>
            <button
                className={locale === 'en' ? 'active' : ''}
                onClick={() => handleLocaleChange('en')}
            >
                EN
            </button>
        </div>
    );
};

export default LocaleSwitcher;
