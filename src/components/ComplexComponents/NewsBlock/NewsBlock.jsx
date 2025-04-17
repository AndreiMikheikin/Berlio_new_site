import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../../styles/components/ComplexComponents/NewsBlock.scss';
import SortDropdown from '../../SortDropdown/SortDropdown';
import slugify from 'slugify';
import newsData from '../../../data/newsData.json';
import { useTranslation } from 'react-i18next';

const NewsBlock = () => {
    const { t, i18n } = useTranslation();
    const currentLanguage = i18n.language;
    const navigate = useNavigate();

    const [sortOrder, setSortOrder] = useState('new');
    const [currentPage, setCurrentPage] = useState(1);
    const newsPerPage = 4;

    // Локализованные опции
    const sortOptions = useMemo(() => [
        { value: 'new', label: t('newsBlock.newFirst') },
        { value: 'old', label: t('newsBlock.oldFirst') }
    ], [t]);

    // Текущая выбранная опция (будет пересчитываться при смене языка)
    const selectedOption = useMemo(() => 
        sortOptions.find(option => option.value === sortOrder) || sortOptions[0]
    , [sortOrder, sortOptions]);

    // Текущая дата
    const currentDate = useMemo(() => new Date(), []);

    // Проверка актуальности новостей
    const isValidDate = (startDate, expireDate) => {
        const start = startDate ? new Date(startDate) : null;
        const expire = expireDate ? new Date(expireDate) : null;

        return (
            (start === null && (expire === null || currentDate <= expire)) ||
            (expire === null && start !== null && currentDate >= start) ||
            (start !== null && expire !== null && currentDate >= start && currentDate <= expire)
        );
    };

    // Обработанные данные новостей
    const processedNewsData = useMemo(() => 
        Object.keys(newsData).map((id) => {
            const newsItem = { id, ...newsData[id] };
            if (!newsItem.slug && newsItem.titles.en) {
                newsItem.slug = slugify(newsItem.titles.en, { lower: true, strict: true });
            }
            return newsItem;
        }),
        [newsData]
    );

    // Фильтрация и сортировка новостей
    const filteredAndSortedNews = useMemo(() => 
        processedNewsData
            .filter((newsItem) => isValidDate(newsItem.dates.startDate, newsItem.dates.expireDate))
            .sort((a, b) => (
                sortOrder === 'new'
                    ? new Date(b.dates.date) - new Date(a.dates.date)
                    : new Date(a.dates.date) - new Date(b.dates.date)
            )),
        [processedNewsData, sortOrder, currentDate]
    );

    // Пагинация
    const totalPages = Math.ceil(filteredAndSortedNews.length / newsPerPage);
    const paginatedNews = useMemo(
        () => filteredAndSortedNews.slice(
            (currentPage - 1) * newsPerPage,
            currentPage * newsPerPage
        ),
        [filteredAndSortedNews, currentPage]
    );

    // Обработчики
    const handleSortSelect = (option) => {
        setSortOrder(option.value);
        setCurrentPage(1);
    };

    const handlePageChange = (page) => setCurrentPage(page);

    const renderPagination = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||
                i === totalPages ||
                (i >= currentPage - 1 && i <= currentPage + 1)
            ) {
                pages.push(
                    <button
                        key={i}
                        className={`aam_news-block__pagination-button ${currentPage === i ? 'active' : ''}`}
                        onClick={() => handlePageChange(i)}
                    >
                        {i}
                    </button>
                );
            } else if (
                (i === currentPage - 2 || i === currentPage + 2) &&
                !pages.includes('...')
            ) {
                pages.push(<span key={`dots-${i}`} className="aam_news-block__pagination-dots">...</span>);
            }
        }
        return pages;
    };

    // Форматирование даты
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
            {/* Breadcrumbs */}
            <div className="aam_news-block__breadcrumbs">
                <Link to="/">{t('breadCrumbs.home')}</Link> / {t('breadCrumbs.news')}
            </div>

            {/* Title */}
            <h1 className="aam_news-block__title">{t('newsBlock.name')}</h1>

            {/* Sort Dropdown */}
            <SortDropdown
                options={sortOptions}
                selectedOption={selectedOption}
                defaultOption={sortOptions[0]}
                onSelect={handleSortSelect}
                openFillColor="#48AE5A"
                closedFillColor="#000"
            />

            {/* News List */}
            <div className="aam_news-block__list">
                {paginatedNews.map((newsItem) => (
                    <div
                        key={newsItem.id}
                        className="aam_news-block__item"
                        onClick={() => navigate(`/news/${newsItem.slug || newsItem.id}`)}
                    >
                        <p className="aam_news-block__item-date">{formatDate(newsItem.dates.date)}</p>
                        <h3 className="aam_news-block__item-title">
                            {newsItem.titles[currentLanguage] || newsItem.titles['ru']}
                        </h3>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="aam_news-block__pagination">
                    {renderPagination()}
                </div>
            )}

            {/* Back Link */}
            <div className="aam_news-block__back">
                <Link to="/">{t('newsBlock.backHome')}</Link>
            </div>
        </main>
    );
};

export default NewsBlock;