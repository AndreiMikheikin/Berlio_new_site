import React, { useState, useEffect, useCallback } from "react";
import CanvasBackground2 from "../../CanvasComponents/CanvasBackground2/CanvasBackground2";
import Button from "../../Button/Button";
import '../../../styles/components/ComplexComponents/Preloaders/NewYearPreloader.scss';

const FONT_LINKS = [
  "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap",
  "https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap",
  "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;600&display=swap",
  "https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap",
  "https://fonts.googleapis.com/css2?family=Cinzel:wght@400&display=swap"
];

const AUTO_SKIP_MS = 45000;
const PROGRESS_INTERVAL_MS = 100;
const FADE_DURATION_MS = 500;

export default function NewYearPreloader({ skipLoading }) {
  const [progress, setProgress] = useState(0);
  const [isContentVisible, setIsContentVisible] = useState(false); // Управляет видимостью всего контента
  const [controlsVisible, setControlsVisible] = useState(false);
  const [visible, setVisible] = useState(true);
  const [stylesLoaded, setStylesLoaded] = useState(false);

  const now = new Date();
  const year = now.getMonth() === 11 ? now.getFullYear() + 1 : now.getFullYear();


  // Динамический текст
  const dynamicText = [
    `Пусть ${year} год принесёт Вам тепло, вдохновение и радость!`,
    'И улыбка, без сомненья, пусть коснётся ваших глаз,',
    'И хорошее настроение не покинет больше вас!',
    'Сказочного Рождества и счастливого Нового года!'
  ];

  const [textIndex, setTextIndex] = useState(0);
  const [fade, setFade] = useState(true);

  // ————————————————————————————————————————————————
  // Загружаем шрифты
  // ————————————————————————————————————————————————
  useEffect(() => {
    if (!window.__NY_FONTS_ADDED__) {
      FONT_LINKS.forEach(href => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        document.head.appendChild(link);
      });
      window.__NY_FONTS_ADDED__ = true;
    }

    // Даем время на загрузку стилей
    const timer = setTimeout(() => {
      setStylesLoaded(true);
      // После загрузки стилей показываем контент
      setTimeout(() => {
        setIsContentVisible(true);
      }, 100);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // ————————————————————————————————————————————————
  // Прогресс + автоскрытие
  // ————————————————————————————————————————————————
  useEffect(() => {
    if (!isContentVisible) return;

    const start = performance.now();

    const progressTimer = setInterval(() => {
      const elapsed = performance.now() - start;
      const percent = Math.min((elapsed / AUTO_SKIP_MS) * 100, 100);
      setProgress(percent);
    }, PROGRESS_INTERVAL_MS);

    const autoSkipTimer = setTimeout(() => handleSkip(), AUTO_SKIP_MS);

    const controlsTimer = setTimeout(() => setControlsVisible(true), 800);

    return () => {
      clearInterval(progressTimer);
      clearTimeout(autoSkipTimer);
      clearTimeout(controlsTimer);
    };
  }, [isContentVisible]);

  // ————————————————————————————————————————————————
  // Анимация динамического текста
  // ————————————————————————————————————————————————
  useEffect(() => {
    if (!isContentVisible) return;

    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setTextIndex(prev => (prev + 1) % dynamicText.length);
        setFade(true);
      }, 400);
    }, 4000);

    return () => clearInterval(interval);
  }, [isContentVisible, dynamicText.length]);

  // ————————————————————————————————————————————————
  // Кнопка "Пропустить"
  // ————————————————————————————————————————————————
  const handleSkip = useCallback(() => {
    setVisible(false);
    setTimeout(() => skipLoading?.(), FADE_DURATION_MS);
  }, [skipLoading]);

  // ————————————————————————————————————————————————
  // JSX
  // ————————————————————————————————————————————————
  return (
    <div
      className={`aam_preloader-wrapper ${stylesLoaded ? "styles-loaded" : "styles-loading"}`}
      style={{
        opacity: visible ? 1 : 0,
        transition: `opacity ${FADE_DURATION_MS}ms ease`
      }}
    >
      <div className="aam_preloader-bg-overlay"></div>

      <CanvasBackground2
        top="0"
        totalPoints={1500}
        edgeRadius={100}
        vertexRadius={2}
        globalSpeed={92}
        minEdgeRadius={80}
        maxEdgeRadius={110}
        initialDelay={2000}
      />

      <div className={`aam_preloader-content ${isContentVisible ? "content-visible" : "content-hidden"}`}>
        <div className="aam_preloader-center">

          <div className="aam_preloader-icon">
            <div className="aam_snowflake-icon">❄</div>
          </div>

          {/* ТЕКСТ */}
          <div className="aam_text-content">
            <h2 className="aam_holiday-title">
              Поздравляем с наступающим Рождеством и Новым годом!
            </h2>
            <p className={`aam_holiday-subtitle ${fade ? 'fade-in' : 'fade-out'}`}>
              {dynamicText[textIndex]}
            </p>
          </div>

          {/* ПРОГРЕСС + КНОПКА */}
          <div className={`aam_preloader-progress-container ${controlsVisible ? "visible" : ""}`}>
            <div className="aam_preloader-progress">
              <div className="aam_progress-bar">
                <div
                  className="aam_progress-fill"
                  style={{ width: `${progress}%` }}
                >
                  <div className="aam_progress-sparkle"></div>
                </div>
              </div>

              <div className="aam_progress-text">
                {Math.round(progress)}%
              </div>
            </div>

            <Button
              onClick={handleSkip}
              label="Пропустить"
              className="aam_skip-button"
            />
          </div>

        </div>
      </div>
    </div>
  );
}