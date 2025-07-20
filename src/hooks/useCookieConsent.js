import { useCallback, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const USER_ID_COOKIE_NAME = 'berlio_user_id';
const STORAGE_KEY = 'aam_cookie_consent';
const ONE_YEAR = 365 * 24 * 60 * 60 * 1000;

const getOrSetUserUUID = () => {
  const existing = document.cookie
    .split('; ')
    .find(row => row.startsWith(`${USER_ID_COOKIE_NAME}=`));

  if (existing) {
    return existing.split('=')[1];
  }

  const newUUID = uuidv4();
  document.cookie = `${USER_ID_COOKIE_NAME}=${newUUID}; path=/; max-age=31536000; samesite=lax`;
  return newUUID;
};

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

  const timestamp = new Date().toISOString();
  const dataWithTimestamp = {
    ...newConsent,
    timestamp,
  };

  // Сохраняем в localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dataWithTimestamp));
  setConsent(dataWithTimestamp);
  window.dispatchEvent(new Event('cookie-consent-changed'));

  // Отправляем на сервер
  const user_uuid = getOrSetUserUUID();

  fetch('/api/cookie-consent', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_uuid, ...dataWithTimestamp }),
  }).catch((err) => {
    console.warn('Не удалось отправить согласие на сервер:', err);
  });
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

  return {
    getConsent,
    saveConsent,
    needsRenewal,
    hasConsentFor,
    consent,
    isReady,
  };
};

export default useCookieConsent;
