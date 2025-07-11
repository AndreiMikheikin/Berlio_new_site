import React from 'react';
import PropTypes from 'prop-types';
import useLocalization from '../../hooks/useLocalization';

function LocaleSwitcher({ className = '' }) {
  const { locale, switchLocale } = useLocalization();

  const handleLocaleChange = (newLocale) => {
    if (locale !== newLocale) {
      switchLocale(newLocale);
    }
  };

  return (
    <div className={className}>
      {['ru', 'en'].map((lng) => (
        <button
          key={lng}
          type="button"
          className={locale === lng ? 'active' : ''}
          onClick={() => handleLocaleChange(lng)}
          aria-pressed={locale === lng}
          aria-label={`Switch language to ${lng.toUpperCase()}`}
        >
          {lng.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

LocaleSwitcher.propTypes = {
  className: PropTypes.string,
};

export default LocaleSwitcher;
