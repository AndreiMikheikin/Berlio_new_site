import React from 'react';
import { useParams, Link } from 'react-router-dom';
import slugify from 'slugify';
import { useTranslation } from 'react-i18next';

import LeftArrowIcon from '../../SVGIcons/LeftArrowIcon';
import '../../../styles/components/ComplexComponents/DetailedNewsMain.scss';

import newsData from '../../../data/newsData.json';

function DetailedNewsMain() {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const currentLanguage = i18n.language;

  const processedNews = Object.keys(newsData).map((newsId) => {
    const newsItem = { id: newsId, ...newsData[newsId] };
    if (!newsItem.slug && newsItem.titles.en) {
      newsItem.slug = slugify(newsItem.titles.en, { lower: true, strict: true });
    }
    return newsItem;
  });

  const newsItem = processedNews.find((item) => item.id === id || item.slug === id);

  // Если новость не найдена, отображаем сообщение и кнопку возврата
  if (!newsItem) {
    return (
      <div className="aam_detailed-news__block">
        <h2>{t('detailedNewsMain.notFound')}</h2>
        <Link to="/news">{t('detailedNewsMain.backToNews')}</Link>
      </div>
    );
  }

  // Форматирование даты
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(currentLanguage, options);
  };

  return (
    <main className="aam_detailed-news">
      {/* Breadcrumbs */}
      <div className="aam_detailed-news__breadcrumbs">
        <Link to="/">{t('breadCrumbs.home')}</Link>
        {' '}
        /
        {' '}
        <Link to="/news">{t('breadCrumbs.news')}</Link>
        {' '}
        /
        {' '}
        {t('breadCrumbs.detailedNews')}
      </div>

      {/* Title */}
      <h1 className="aam_detailed-news__header">{t('detailedNewsMain.name')}</h1>

      <div className="aam_detailed-news__block">
        <h2 className="aam_detailed-news__title">
          {newsItem.titles[currentLanguage] || newsItem.titles.ru}
        </h2>
        <p className="aam_detailed-news__description">
          {newsItem.descriptions[currentLanguage] || newsItem.descriptions.ru}
        </p>
        <p className="aam_detailed-news__footer">
          <strong>
            {t('detailedNewsMain.date')}
            :
          </strong>
          {' '}
          {formatDate(newsItem.dates.date)}
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="aam_detailed-news__site-nav">
        <Link to="/news" className="aam_detailed-news__back-to-news">
          <LeftArrowIcon className="icon" />
          {t('detailedNewsMain.backToNews')}
        </Link>
        <div className="aam_detailed-news__back">
          <Link to="/">{t('newsBlock.backHome')}</Link>
        </div>
      </div>
    </main>
  );
}

export default DetailedNewsMain;
