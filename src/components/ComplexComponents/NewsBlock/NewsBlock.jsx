import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../../styles/components/ComplexComponents/NewsBlock.scss';
import slugify from 'slugify';
import { useTranslation } from 'react-i18next';
import SortDropdown from '../../SortDropdown/SortDropdown';
import newsData from '../../../data/newsData.json';

const isValidDate = (startDate, expireDate, currentDate) => {
  const start = startDate ? new Date(startDate) : null;
  const expire = expireDate ? new Date(expireDate) : null;

  return (
    (start === null
      && (expire === null
        || currentDate <= expire))
    || (expire === null
      && start !== null
      && currentDate >= start)
    || (start !== null
      && expire !== null
      && currentDate >= start
      && currentDate <= expire)
  );
};

function NewsBlock() {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const navigate = useNavigate();

  const [sortOrder, setSortOrder] = useState('new');
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 4;

  const sortOptions = useMemo(() => [
    { value: 'new', label: t('newsBlock.newFirst') },
    { value: 'old', label: t('newsBlock.oldFirst') },
  ], [t]);

  const selectedOption = useMemo(() => (
    sortOptions.find((option) => option.value === sortOrder) || sortOptions[0]
  ), [sortOrder, sortOptions]);

  const currentDate = useMemo(() => new Date(), []);

  const processedNewsData = useMemo(() => (
    Object.keys(newsData).map((id) => {
      const newsItem = { id, ...newsData[id] };
      if (!newsItem.slug && newsItem.titles.en) {
        newsItem.slug = slugify(newsItem.titles.en, { lower: true, strict: true });
      }
      return newsItem;
    })
  ), []);

  const filteredAndSortedNews = useMemo(() => {
    const filtered = processedNewsData.filter((newsItem) => (
      isValidDate(newsItem.dates.startDate, newsItem.dates.expireDate, currentDate)
    ));

    const sorted = [...filtered].sort((a, b) => {
      const dateA = new Date(a.dates.date);
      const dateB = new Date(b.dates.date);
      return sortOrder === 'new' ? dateB - dateA : dateA - dateB;
    });

    return sorted;
  }, [processedNewsData, sortOrder, currentDate]);

  const totalPages = Math.ceil(filteredAndSortedNews.length / newsPerPage);

  const paginatedNews = useMemo(() => (
    filteredAndSortedNews.slice(
      (currentPage - 1) * newsPerPage,
      currentPage * newsPerPage,
    )
  ), [filteredAndSortedNews, currentPage]);

  const handleSortSelect = (option) => {
    setSortOrder(option.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i += 1) {
      if (
        i === 1
        || i === totalPages
        || (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(
          <button
            key={i}
            type="button"
            className={`aam_news-block__pagination-button ${currentPage === i ? 'active' : ''}`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>,
        );
      } else if (
        (i === currentPage - 2 || i === currentPage + 2)
        && !pages.find((el) => el.key === `dots-${i}`)
      ) {
        pages.push(
          <span
            key={`dots-${i}`}
            className="aam_news-block__pagination-dots"
          >
            ...
          </span>,
        );
      }
    }

    return pages;
  };

  const formatDate = (date) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(date).toLocaleDateString(currentLanguage, options);
  };

  return (
    <main className="aam_news-block">
      <div className="aam_news-block__breadcrumbs">
        <Link to="/">
          {t('breadCrumbs.home')}
        </Link>
        {' '}
        /
        {' '}
        {t('breadCrumbs.news')}
      </div>

      <h1 className="aam_news-block__title">
        {t('newsBlock.name')}
      </h1>

      <SortDropdown
        options={sortOptions}
        selectedOption={selectedOption}
        defaultOption={sortOptions[0]}
        onSelect={handleSortSelect}
        openFillColor="#48AE5A"
        closedFillColor="#000"
      />

      <div className="aam_news-block__list">
        {paginatedNews.map((newsItem) => (
          <div
            key={newsItem.id}
            className="aam_news-block__item"
            role="button"
            tabIndex={0}
            onClick={() => navigate(`/news/${newsItem.slug || newsItem.id}`)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigate(`/news/${newsItem.slug || newsItem.id}`);
              }
            }}
          >
            <p className="aam_news-block__item-date">
              {formatDate(newsItem.dates.date)}
            </p>
            <h3 className="aam_news-block__item-title">
              {newsItem.titles[currentLanguage] || newsItem.titles.ru}
            </h3>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="aam_news-block__pagination">
          {renderPagination()}
        </div>
      )}

      <div className="aam_news-block__back">
        <Link to="/">
          {t('newsBlock.backHome')}
        </Link>
      </div>
    </main>
  );
}

export default NewsBlock;
