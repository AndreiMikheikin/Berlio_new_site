import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../../styles/components/ComplexComponents/NewsBlock.scss';
import SortDropdown from '../../SortDropdown/SortDropdown';

import newsData from '../../../data/newsData.json';
import { useTranslation } from 'react-i18next';

const NewsBlock = () => {
    const { t, i18n } = useTranslation();
    const currentLanguage = i18n.language;

    const [sortOrder, setSortOrder] = useState('new'); // 'new' для новых сначала, 'old' для старых сначала
    const [currentPage, setCurrentPage] = useState(1);
    const newsPerPage = 4;

    // Получаем текущую дату
    const currentDate = new Date();

    // Функция для проверки, актуальна ли новость
    const isValidDate = (startDate, expireDate) => {
        const start = startDate ? new Date(startDate) : null;
        const expire = expireDate ? new Date(expireDate) : null;

        // Проверка, что новость можно показывать по датам
        return (
            (start === null && (expire === null || currentDate <= expire)) ||
            (expire === null && start !== null && currentDate >= start) ||
            (start !== null && expire !== null && currentDate >= start && currentDate <= expire)
        );
    };

    // Преобразуем данные из JSON и фильтруем по актуальности
    const news = Object.keys(newsData)
        .map((id) => ({
            id,
            ...newsData[id],
        }))
        .filter((newsItem) => isValidDate(newsItem.dates.startDate, newsItem.dates.expireDate));

    // Сортируем новости
    const sortedNews = [...news].sort((a, b) => {
        return sortOrder === 'new'
            ? new Date(b.dates.date) - new Date(a.dates.date)
            : new Date(a.dates.date) - new Date(b.dates.date);
    });

    // Пагинация
    const totalPages = Math.ceil(sortedNews.length / newsPerPage);
    const paginatedNews = sortedNews.slice(
        (currentPage - 1) * newsPerPage,
        currentPage * newsPerPage
    );

    // Обработчики
    const handleSortSelect = (option) => {
        setSortOrder(option.value);
        setCurrentPage(1); // Сброс на первую страницу при смене сортировки
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

    const navigate = useNavigate();

    // Функция для форматирования даты
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
                options={[
                    { value: 'new', label: t('newsBlock.newFirst') },
                    { value: 'old', label: t('newsBlock.oldFirst') },
                ]}
                defaultOption={{ value: 'new', label: t('newsBlock.newFirst') }}
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
                        onClick={() => navigate(`/news/${newsItem.id}`)}
                    >
                        <p className="aam_news-block__item-date">{formatDate(newsItem.dates.date)}</p>
                        <h3 className="aam_news-block__item-title">
                            {newsItem.titles[currentLanguage] || newsItem.titles['ru']}
                        </h3>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="aam_news-block__pagination">{renderPagination()}</div>

            {/* Back Link */}
            <div className="aam_news-block__back">
                <Link to="/">{t('newsBlock.backHome')}</Link>
            </div>
        </main>
    );
};

export default NewsBlock;
