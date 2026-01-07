import { useState, useEffect } from 'react';
import NewYearPreloader from '../components/ComplexComponents/Preloaders/NewYearPreloader';

const preloaders = [
  {
    id: 'new-year',
    component: NewYearPreloader,
    start: '12-11',
    end: '01-15'
  }
];

const parseMMDD = (mmdd, year) => {
  const [mm, dd] = mmdd.split('-').map(Number);
  return new Date(year, mm - 1, dd);
};

const isInRange = (startMMDD, endMMDD, now = new Date()) => {
  const year = now.getFullYear();
  let start = parseMMDD(startMMDD, year);
  let end = parseMMDD(endMMDD, year);

  if (end < start) { // диапазон переходит через год
    if (now.getMonth() + 1 < start.getMonth() + 1) { // если сейчас январь
      start.setFullYear(year - 1); // start = прошлый декабрь
    } else { // сейчас декабрь
      end.setFullYear(year + 1);
    }
  }

  return now >= start && now <= end;
};


function usePreloader() {
  const [activePreloader, setActivePreloader] = useState(null);
  const [preloaderDone, setPreloaderDone] = useState(false);

  // Проверяем, показывался ли прелоудер
  const alreadyShown = () => {
    if (typeof window === 'undefined') return false;
    try {
      return !!sessionStorage.getItem('preloader_shown');
    } catch {
      return false;
    }
  };

  useEffect(() => {
    if (alreadyShown()) {
      setPreloaderDone(true);
      return;
    }

    for (const p of preloaders) {
      if (isInRange(p.start, p.end)) {
        setActivePreloader(p);

        // Отправляем событие на сервер, чтобы посчитать показ
        fetch('/api/page-views', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ route: `/preloader/${p.id}`, entity: 'preloader', entityId: p.id })
        }).catch(console.error);

        return;
      }
    }

    setPreloaderDone(true);
  }, []);

  const handlePreloaderEnd = () => {
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem('preloader_shown', 'true');
      } catch {}
    }
    setPreloaderDone(true);
  };

  return { activePreloader, preloaderDone, handlePreloaderEnd };
}

export default usePreloader;
