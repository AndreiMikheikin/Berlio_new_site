import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import SearchIcon from '../SVGIcons/SearchIcon';
import '../../styles/components/SearchInput.scss';
import routes from '../../contexts/routes';

import ruContent from '../../locales/ru.json';
import enContent from '../../locales/en.json';

function SearchInput({ placeholder }) {
  const { t, i18n } = useTranslation();
  const [query, setQuery] = useState('');
  const [noResults, setNoResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const content = i18n.language === 'ru' ? ruContent : enContent;

  const isProduction = process.env.NODE_ENV === 'production';
  const baseUrl = isProduction ? (process.env.PUBLIC_URL || '') : '';

  const performSearch = useCallback((searchQuery, contentData) => {
    const results = [];
    const allowedKeys = Object.keys(routes);

    const searchRecursive = (obj, path = '') => {
      Object.keys(obj).forEach((key) => {
        const currentPath = path ? `${path}.${key}` : key;

        if (typeof obj[key] === 'string') {
          if (obj[key].toLowerCase().includes(searchQuery.toLowerCase())) {
            const parentKey = currentPath.split('.')[0];
            if (allowedKeys.includes(parentKey)) {
              results.push({
                text: obj[key],
                parentKey,
                url: `${baseUrl}${routes[parentKey]}`,
              });
            }
          }
        } else if (typeof obj[key] === 'object') {
          searchRecursive(obj[key], currentPath);
        }
      });
    };

    searchRecursive(contentData);
    return results;
  }, [baseUrl]);

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
  }, [query, content, performSearch]);

  const highlightText = (text, searchQuery) => {
    if (!searchQuery) return text;

    const parts = text.split(new RegExp(`(${searchQuery})`, 'gi'));

    return parts.map((part) => {
      if (part.toLowerCase() === query.toLowerCase()) {
        return (
          <span key={`highlight-${part}`} className="highlight">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleBlur = () => {
    setQuery('');
  };

  return (
    <div className="aam_search-container">
      <div className="aam_search-block">
        <SearchIcon />
        <input
          name="SearchInput"
          type="text"
          value={query}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          className="aam_search-input"
          autoComplete="off"
        />
      </div>
      {noResults && query && (
        <div className="aam_no-results-message">{t('noResult', { query })}</div>
      )}
      {searchResults.length > 0 && (
        <div className="aam_search-results">
          {searchResults.map((result) => (
            <div
              key={`${result.text}-${result.url}`}
              className="aam_search-result"
            >
              <a href={result.url}>{highlightText(result.text, query)}</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

SearchInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
};

export default SearchInput;
