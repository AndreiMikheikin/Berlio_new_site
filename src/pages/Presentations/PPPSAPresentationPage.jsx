import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../../components/Logo/Logo';
import CanvasBackground1 from '../../components/CanvasComponents/CanvasBackground1/CanvasBackground1';
import '../../styles/pages/Presentations/PPPSAPresentationPage.scss';
import PPPSASlide1 from '../../components/ComplexComponents/PresentationSlides/PPPSAPresentation/Slide1';
import PPPSASlide2 from '../../components/ComplexComponents/PresentationSlides/PPPSAPresentation/Slide2';
import PPPSASlide3 from '../../components/ComplexComponents/PresentationSlides/PPPSAPresentation/Slide3';
import PPPSASlide4 from '../../components/ComplexComponents/PresentationSlides/PPPSAPresentation/Slide4';
import PPPSASlide5 from '../../components/ComplexComponents/PresentationSlides/PPPSAPresentation/Slide5';
import PPPSASlide6 from '../../components/ComplexComponents/PresentationSlides/PPPSAPresentation/Slide6';
import PPPSASlide7 from '../../components/ComplexComponents/PresentationSlides/PPPSAPresentation/Slide7';
import PPPSASlide8 from '../../components/ComplexComponents/PresentationSlides/PPPSAPresentation/Slide8';
import PPPSASlide9 from '../../components/ComplexComponents/PresentationSlides/PPPSAPresentation/Slide9';
import PPPSASlide10 from '../../components/ComplexComponents/PresentationSlides/PPPSAPresentation/Slide10';
import PPPSASlide11 from '../../components/ComplexComponents/PresentationSlides/PPPSAPresentation/Slide11';
import PPPSASlide12 from '../../components/ComplexComponents/PresentationSlides/PPPSAPresentation/Slide12';
import PPPSASlide13 from '../../components/ComplexComponents/PresentationSlides/PPPSAPresentation/Slide13';

const slides = [
  {
    id: 1,
    component: <PPPSASlide1 />,
    duration: 8000,
    header: {
      key: 'company',
      text: 'НП ООО «БЕРЛИО»',
      isActive: true,
    },
  },
  {
    id: 2,
    component: <PPPSASlide2 />,
    duration: 10000,
    header: {
      key: 'product-1',
      text: 'ППП «Система автоматизации АЗС»',
      isActive: false,
    },
  },
  {
    id: 3,
    component: <PPPSASlide3 />,
    duration: 8000,
    header: {
      key: 'product-1',
      text: 'ППП «Система автоматизации АЗС»',
      isActive: false,
    },
  },
  {
    id: 4,
    component: <PPPSASlide4 />,
    duration: 8000,
    header: {
      key: 'product-1',
      text: 'ППП «Система автоматизации АЗС»',
      isActive: false,
    },
  },
  {
    id: 5,
    component: <PPPSASlide5 />,
    duration: 11000,
    header: {
      key: 'product-1',
      text: 'ППП «Система автоматизации АЗС»',
      isActive: false,
    },
  },
  {
    id: 6,
    component: <PPPSASlide6 />,
    duration: 7000,
    header: {
      key: 'product-1',
      text: 'ППП «Система автоматизации АЗС»',
      isActive: false,
    },
  },
  {
    id: 7,
    component: <PPPSASlide7 />,
    duration: 9000,
    header: {
      key: 'product-2',
      text: 'ПО «ОФИС»',
      isActive: false,
    },
  },
  {
    id: 8,
    component: <PPPSASlide8 />,
    duration: 9000,
    header: {
      key: 'product-2',
      text: 'ПО «ОФИС»',
      isActive: false,
    },
  },
  {
    id: 9,
    component: <PPPSASlide9 />,
    duration: 12000,
    header: {
      key: 'product-3',
      text: 'ПО «Уличный платежный терминал самообслуживания»',
      isActive: false,
    },
  },
  {
    id: 10,
    component: <PPPSASlide10 />,
    duration: 12000,
    header: {
      key: 'product-4',
      text: 'ПО «Касса самообслуживания»',
      isActive: false,
    },
  },
  {
    id: 11,
    component: <PPPSASlide11 />,
    duration: 12000,
    header: {
      key: 'product-5',
      text: 'Мобильное приложение для физических лиц',
      isActive: false,
    },
  },
  {
    id: 12,
    component: <PPPSASlide12 />,
    duration: 12000,
    header: {
      key: 'product-5',
      text: 'Мобильное приложение для физических лиц',
      isActive: false,
    },
  },
  {
    id: 13,
    component: <PPPSASlide13 />,
    duration: 12000,
    header: {
      key: 'product-6',
      text: 'ПО «API Berlio Info»',
      isActive: false,
    },
  },
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

  const headerConfig = currentSlide?.header ?? {
    key: 'default',
    text: 'ППП «Система автоматизации АЗС»',
    isActive: false,
  };

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
                key={headerConfig.key}
                className={`aam_ppp-sa-presentation-page--header_company-name ${headerConfig.isActive ? 'active' : ''
                  }`}
                initial={{ opacity: 0, x: slideDirection * 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -slideDirection * 50 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              >
                {headerConfig.text}
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
