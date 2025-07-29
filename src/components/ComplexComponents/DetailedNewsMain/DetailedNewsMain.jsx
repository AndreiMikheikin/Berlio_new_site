import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import slugify from 'slugify';
import { useTranslation } from 'react-i18next';

import LeftArrowIcon from '../../SVGIcons/LeftArrowIcon';
import '../../../styles/components/ComplexComponents/DetailedNewsMain.scss';

import newsDataFallback from '../../../data/newsData.json';

function DetailedNewsMain() {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const currentLanguage = i18n.language;

  const [newsData, setNewsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchNews() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/admin/news');
        if (!res.ok) throw new Error(`API error ${res.status}`);

        const data = await res.json();

        // Преобразуем объект в массив с добавлением slug
        const processed = Object.entries(data).map(([newsId, item]) => {
          const baseTitle = item.titles?.en || item.titles?.ru || `news-${newsId}`;
          return {
            id: newsId,
            ...item,
            slug: item.slug || slugify(baseTitle, { lower: true, strict: true }),
          };
        });

        setNewsData(processed);
      } catch (err) {
        console.warn('Ошибка загрузки API, используем fallback:', err.message);

        // fallback — тоже массив с slug
        const fallbackProcessed = Object.entries(newsDataFallback).map(([newsId, item]) => {
          const baseTitle = item.titles?.en || item.titles?.ru || `news-${newsId}`;
          return {
            id: newsId,
            ...item,
            slug: item.slug || slugify(baseTitle, { lower: true, strict: true }),
          };
        });

        setNewsData(fallbackProcessed);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  if (loading) return <div>{t('loading')}</div>;
  if (error) return <div>{t('error')}: {error}</div>;
  if (!newsData) return <div>{t('detailedNewsMain.notFound')}</div>;

  const newsItem = newsData.find(item => item.id === id || item.slug === id);

  if (!newsItem) {
    return (
      <div className="aam_detailed-news__block">
        <h2>{t('detailedNewsMain.notFound')}</h2>
        <Link to="/news">{t('detailedNewsMain.backToNews')}</Link>
      </div>
    );
  }

  const formatDate = (date) => {
    if (!date) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(currentLanguage, options);
  };

  return (
    <main className="aam_detailed-news">
      <div className="aam_detailed-news__breadcrumbs">
        <Link to="/">{t('breadCrumbs.home')}</Link> / <Link to="/news">{t('breadCrumbs.news')}</Link> / {t('breadCrumbs.detailedNews')}
      </div>

      <h1 className="aam_detailed-news__header">{t('detailedNewsMain.name')}</h1>

      <div className="aam_detailed-news__block">
        <h2 className="aam_detailed-news__title">
          {newsItem.titles[currentLanguage] || newsItem.titles.ru}
        </h2>
        <p
          className="aam_detailed-news__description"
          dangerouslySetInnerHTML={{ __html: newsItem.descriptions[currentLanguage] || newsItem.descriptions.ru || '' }}
        />
        <p className="aam_detailed-news__footer">
          <strong>{t('detailedNewsMain.date')}:</strong> {formatDate(newsItem.dates.date)}
        </p>
      </div>

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
