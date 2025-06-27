import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'aam_cookie_consent';
const ONE_YEAR = 365 * 24 * 60 * 60 * 1000;

const defaultConsent = {
  technical: true,
  functional: false,
  analytics: false,
  marketing: false,
  timestamp: null,
};

const getStoredConsent = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultConsent;
    const parsed = JSON.parse(stored);
    return { ...defaultConsent, ...parsed };
  } catch {
    return defaultConsent;
  }
}
const useCookieConsent = () => {
  const [consent, setConsent] = useState(getStoredConsent);

  const getConsent = useCallback(() => consent, [consent]);

  const saveConsent = useCallback((newConsent) => {
    const dataWithTimestamp = {
      ...newConsent,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataWithTimestamp));
    setConsent(dataWithTimestamp);
    window.dispatchEvent(new Event('cookie-consent-changed'));
  }, []);

  const needsRenewal = useCallback(() => {
    const { timestamp } = getConsent();
    if (!timestamp) return true;
    try {
      const then = new Date(timestamp).getTime();
      return Date.now() - then > ONE_YEAR;
    } catch {
      return true;
    }
  }, [getConsent]);

  const hasConsentFor = useCallback((...types) => {
    const current = getConsent();
    return types.every((t) => current[t]);
  }, [getConsent]);

  const isConsentSet = useCallback(() => {
    return localStorage.getItem(STORAGE_KEY) !== null;
  }, []);

  useEffect(() => {
    const onChange = () => setConsent(getStoredConsent());
    window.addEventListener('cookie-consent-changed', onChange);
    window.addEventListener('storage', onChange);
    return () => {
      window.removeEventListener('cookie-consent-changed', onChange);
      window.removeEventListener('storage', onChange);
    };
  }, []);

  return {
    getConsent,
    saveConsent,
    needsRenewal,
    hasConsentFor,
    consent,
    isConsentSet,
  };
}

export default useCookieConsent;