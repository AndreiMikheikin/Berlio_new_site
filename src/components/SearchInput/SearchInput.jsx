import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SearchIcon from '../SVGIcons/SearchIcon';
import '../../styles/components/SearchInput.scss';
import { useTranslation } from 'react-i18next';
import routes from '../../contexts/routes'; // Импорт маршрутов

import ruContent from '../../locales/ru.json';
import enContent from '../../locales/en.json';

const SearchInput = ({ placeholder }) => {
    const { t, i18n } = useTranslation();
    const [query, setQuery] = useState('');
    const [noResults, setNoResults] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    const content = i18n.language === 'ru' ? ruContent : enContent;

    const isProduction = process.env.NODE_ENV === "production";
    const baseUrl = isProduction ? `${process.env.PUBLIC_URL || ''}/#` : "/#";

    useEffect(() => {
        const timer = setTimeout(() => {
            if (query && query.length > 0) {
                const results = performSearch(query, content);
                setSearchResults(results);
                setNoResults(results.length === 0);
            } else {
                setSearchResults([]);
                setNoResults(false);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [query, content]);

    // Функция для выделения совпадений
    const highlightText = (text, query) => {
        if (!query) return text;
    
        const parts = text.split(new RegExp(`(${query})`, 'gi'));
    
        return parts.map((part, i) =>
            part.toLowerCase() === query.toLowerCase() ? (
                <span key={i} className="highlight">{part}</span>
            ) : (
                part
            )
        );
    };
    

    // Функция для поиска по значениям JSON
    const performSearch = (query, content) => {
        const results = [];
        const allowedKeys = Object.keys(routes); // Ключи из routes

        const searchRecursive = (obj, path = '') => {
            for (const key in obj) {
                const currentPath = path ? `${path}.${key}` : key;

                if (typeof obj[key] === 'string') {
                    // Ищем по значению (тексту)
                    if (obj[key].toLowerCase().includes(query.toLowerCase())) {
                        // Извлекаем родительский ключ (первую часть пути)
                        const parentKey = currentPath.split('.')[0];
                        // Проверяем, есть ли родительский ключ в allowedKeys
                        if (allowedKeys.includes(parentKey)) {
                            results.push({
                                text: obj[key],
                                parentKey, // Используем родительский ключ
                                url: `${baseUrl}${routes[parentKey]}`, // Формируем полный URL с baseUrl
                            });
                        }
                    }
                } else if (typeof obj[key] === 'object') {
                    searchRecursive(obj[key], currentPath);
                }
            }
        };

        searchRecursive(content);
        return results;
    };

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    const handleBlur = () => {
        setQuery('');
    };

    return (
        <div className='aam_search-container'>
            <div className='aam_search-block'>
                <SearchIcon />
                <input
                    name='SearchInput'
                    type="text"
                    value={query}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={placeholder}
                    className="aam_search-input"
                />
            </div>
            {noResults && query && (
                <div className="aam_no-results-message">
                    {t('noResult', { query })}
                </div>
            )}
            {searchResults.length > 0 && (
                <div className="aam_search-results">
                    {searchResults.map((result, index) => {
                        return (
                            <div key={index} className="aam_search-result">
                                <a href={result.url}>
                                    {highlightText(result.text, query)}
                                </a>
                            </div>
                        );                        
                    })}
                </div>
            )}
        </div>
    );
};

SearchInput.propTypes = {
    placeholder: PropTypes.string.isRequired,
};

export default SearchInput;