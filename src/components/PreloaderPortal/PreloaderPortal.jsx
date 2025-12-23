import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

export default function PreloaderPortal({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // блокируем скролл
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  if (!mounted) return null;

  const portalRoot = document.getElementById('preloader-ssr-mask');
  if (!portalRoot) return null;

  return ReactDOM.createPortal(
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        pointerEvents: 'all',        // перехватываем клики
        background: 'rgba(255,255,255,1)', // непрозрачный фон, можно градиент
      }}
    >
      {children}
    </div>,
    portalRoot
  );
}
