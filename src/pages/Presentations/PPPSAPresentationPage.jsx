import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../../components/Logo/Logo';
import CanvasBackground1 from '../../components/CanvasComponents/CanvasBackground1/CanvasBackground1';
import '../../styles/pages/Presentations/PPPSAPresentationPage.scss';
import PPPSASlide1 from '../../components/ComplexComponents/PresentationSlides/PPPSAPresentation/Slide1';
import PPPSASlide2 from '../../components/ComplexComponents/PresentationSlides/PPPSAPresentation/Slide2';

const slides = [
  { id: 1, component: <PPPSASlide1 />, duration: 2000 }, // 10 секунд
  { id: 2, component: <PPPSASlide2 />, duration: 15000 }, // 15 секунд
  // новые слайды сюда
];

function PPPSAPresentationPage() {
  const [mounted, setMounted] = useState(false); // для SSR
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1);

  // Включаем анимации только на клиенте
  useEffect(() => {
    setMounted(true);
  }, []);

  // Индивидуальное время показа каждого слайда
  useEffect(() => {
    if (!mounted || slides.length === 0) return;

    const duration = slides[currentIndex]?.duration || 12000;

    const timeout = setTimeout(() => {
      setSlideDirection(1);
      setCurrentIndex(prev => (prev + 1) % slides.length);
    }, duration);

    return () => clearTimeout(timeout);
  }, [mounted, currentIndex]);

  const currentSlide = slides[currentIndex];

  return (
    <>
      <Helmet>
        <title>ППП СА Презентация</title>
        <meta name="description" content="Описание продукта ППП СА" />
        <meta name="keywords" content="Берлио, Программы" />
        <meta name="author" content="AndreiMikheikin" />
      </Helmet>

      <main className='aam_ppp-sa-presentation-page'>
        <CanvasBackground1 />

        <header className='aam_ppp-sa-presentation-page--header'>
          <Logo />

          {mounted ? (
            <AnimatePresence mode='wait'>
              <motion.span
                key={currentIndex === 0 ? 'company' : 'product'}
                className={`aam_ppp-sa-presentation-page--header_company-name ${
                  currentIndex === 0 ? 'active' : ''
                }`}
                initial={{ opacity: 0, x: slideDirection * 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -slideDirection * 50 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              >
                {currentIndex === 0
                  ? 'НП ООО «БЕРЛИО»'
                  : 'ППП «Система автоматизации АЗС»'}
              </motion.span>
            </AnimatePresence>
          ) : (
            <span className='aam_ppp-sa-presentation-page--header_company-name active'>
              НП ООО «БЕРЛИО»
            </span>
          )}
        </header>

        <div className='aam_ppp-sa-presentation-page--slides-container'>
          {mounted ? (
            <AnimatePresence mode='wait'>
              <motion.div
                key={currentSlide.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
                style={{ width: '100%', height: '100%' }}
              >
                {currentSlide.component}
              </motion.div>
            </AnimatePresence>
          ) : (
            slides[0].component
          )}
        </div>
      </main>
    </>
  );
}

export default PPPSAPresentationPage;
