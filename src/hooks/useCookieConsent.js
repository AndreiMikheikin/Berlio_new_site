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
  // Проверка на серверный рендеринг
  if (typeof window === 'undefined') return defaultConsent;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? { ...defaultConsent, ...JSON.parse(stored) } : defaultConsent;
  } catch {
    return defaultConsent;
  }
};

export const useCookieConsent = () => {
  const [consent, setConsent] = useState(defaultConsent);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Работаем только на клиенте
    if (typeof window === 'undefined') return;

    setConsent(getStoredConsent());
    setIsReady(true);

    const handleConsentChange = () => setConsent(getStoredConsent());

    window.addEventListener('cookie-consent-changed', handleConsentChange);
    window.addEventListener('storage', handleConsentChange);

    return () => {
      window.removeEventListener('cookie-consent-changed', handleConsentChange);
      window.removeEventListener('storage', handleConsentChange);
    };
  }, []);

  const getConsent = useCallback(() => consent, [consent]);

  const saveConsent = useCallback((newConsent) => {
    if (typeof window === 'undefined') return;

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
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(STORAGE_KEY) !== null;
  }, []);

  return {
    getConsent,
    saveConsent,
    needsRenewal,
    hasConsentFor,
    consent,
    isConsentSet,
    isReady,
  };
};

export default useCookieConsent;
