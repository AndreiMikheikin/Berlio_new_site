import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SearchIcon from '../SVGIcons/SearchIcon';
import '../../styles/components/SearchInput.scss'

import { useTranslation } from 'react-i18next';

const SearchInput = ({ placeholder }) => {
    const { t } = useTranslation();

    const [query, setQuery] = useState('');
    const [noResults, setNoResults] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (query && query.length > 0) {
                // Здесь можно добавить логику поиска
                setNoResults(true); // Для демонстрации, можно заменить на логику поиска
            } else {
                setNoResults(false);
            }
        }, 500); // Таймаут на 500ms после изменения текста

        return () => clearTimeout(timer); // Очистить таймер, если компонент будет размонтирован
    }, [query]);

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    const handleBlur = () => {
        setQuery(''); // Очищаем поле при потере фокуса
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
                    onBlur={handleBlur} // Очищаем поле при потере фокуса
                    placeholder={placeholder}
                    className="aam_search-input"
                />
            </div>
            {noResults && query && (
                <div className="aam_no-results-message">
                    {t('noResult', { query })}
                </div>
            )}
        </div>
    );
};

SearchInput.propTypes = {
    placeholder: PropTypes.string.isRequired,
};

export default SearchInput;
