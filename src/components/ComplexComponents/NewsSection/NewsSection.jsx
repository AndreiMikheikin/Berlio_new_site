import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import newsData from '../../../data/newsData.json';
import '../../../styles/components/ComplexComponents/NewsSection.scss';
import LeftArrowIcon from '../../SVGIcons/LeftArrowIcon';
import RightArrowIcon from '../../SVGIcons/RightArrowIcon';
import LinkTo from '../../LinkTo/LinkTo'; // Убедитесь, что компонент LinkTo существует

function NewsSection() {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  // Получаем текущую дату
  const currentDate = new Date();

  // Функция для проверки, актуальна ли новость
  const isValidDate = (startDate, expireDate) => {
    const start = startDate ? new Date(startDate) : null;
    const expire = expireDate ? new Date(expireDate) : null;

    // Проверка, что новость можно показывать по датам
    return (
      (start === null && (expire === null || currentDate <= expire))
            || (expire === null && start !== null && currentDate >= start)
            || (start !== null && expire !== null && currentDate >= start && currentDate <= expire)
    );
  };

  // Преобразуем данные из JSON в массив и фильтруем по дате
  const newsArray = Object.keys(newsData).map((id) => ({
    id: parseInt(id, 10), // Преобразуем ID в число для сортировки
    ...newsData[id],
  }));

  // Сортировка новостей по приоритету, дате и ID
  const sortedNews = newsArray
    .filter((newsItem) => isValidDate(
      newsItem.dates.startDate,
      newsItem.dates.expireDate,
    )) // Учитываем дату
    .sort((a, b) => {
      // Сначала сортируем по приоритету
      if (a.priority !== b.priority) {
        return a.priority === 'A' ? -1 : 1; // A выше, чем B
      }
      // Затем сортируем по дате
      const dateDiff = new Date(b.dates.date) - new Date(a.dates.date);
      if (dateDiff !== 0) {
        return dateDiff;
      }
      // Если приоритет и дата равны, сортируем по ID
      return a.id - b.id;
    });

  // Получаем текущую новость
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredNews = sortedNews[currentIndex] || null;

  // Навигация
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + sortedNews.length) % sortedNews.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % sortedNews.length);
  };

  return (
    <section className="aam_news-section">
      {/* Заголовок секции */}
      <h2 className="aam_news-section__title">{t('newsSection.name')}</h2>

      {featuredNews && (
        <>
          {/* Блок с новостью */}
          <div className="aam_news-section__news-block">
            <h3 className="aam_news-section__news-title">
              {featuredNews.titles[currentLanguage] || featuredNews.titles.ru}
            </h3>
            <p className="aam_news-section__news-date">
              {new Date(featuredNews.dates.date).toLocaleDateString(currentLanguage, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>

          {/* Навигация */}
          <div className="aam_news-section__navigation">
            <button
              type="button"
              className="aam_news-section__nav-button"
              onClick={handlePrev}
            >
              <LeftArrowIcon />
            </button>
            <button
              type="button"
              className="aam_news-section__nav-button"
              onClick={handleNext}
            >
              <RightArrowIcon />
            </button>

            {/* Ссылка на страницу новости */}
            <LinkTo
              className="aam_news-section__link-to"
              href={`/news/${featuredNews.slug || featuredNews.id}`}
              text={t('newsSection.linkToNews')}
            />
          </div>
        </>
      )}
    </section>
  );
}

export default NewsSection;
