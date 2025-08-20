import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CSSTransition } from 'react-transition-group';
import { useTranslation } from 'react-i18next';
import PlusIcon from '../../SVGIcons/PlusIcon';
import MinusIcon from '../../SVGIcons/MinusIcon';
import '../../../styles/components/ComplexComponents/ParagraphListSection.scss';

function fillTemplate(template, values, t) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    return values[key] ? t(values[key]) : '';
  });
}

// Преобразует блок текста в Markdown с учётом ul/ol
function processMarkdown(content, t) {
  const lines = content.split('\n');
  const result = [];

  lines.forEach((line) => {
    const match = line.match(/^(\s*)(-|\d+\.)\s+(.*)$/);
    if (match) {
      const [_, spaces, type, text] = match;
      const level = Math.floor(spaces.length / 2);
      
      // Переводим весь текст, сохраняя форматирование Markdown
      const translatedText = text.replace(/\*\*([^*]+)\*\*/g, (_, key) => {
        // Если ключ содержит точки (возможно это ключ перевода), переводим его
        const translated = key.includes('.') ? t(key) : key;
        return `**${translated}**`;
      }).replace(/([^\*\s][^*]*[^\*\s])/g, (key) => {
        // Переводим только если это похоже на ключ перевода (содержит точки)
        return key.includes('.') ? t(key) : key;
      });

      result.push(`${'  '.repeat(level)}${type} ${translatedText}`);
    } else {
      // Аналогичная обработка для обычных строк
      const translated = line.replace(/\*\*([^*]+)\*\*/g, (_, key) => {
        const translated = key.includes('.') ? t(key) : key;
        return `**${translated}**`;
      }).replace(/([^\*\s][^*]*[^\*\s])/g, (key) => {
        return key.includes('.') ? t(key) : key;
      });
      result.push(translated);
    }
  });

  return result.join('\n');
}

function ParagraphListSection({ data, allowMultiple = false }) {
  const [openIndexes, setOpenIndexes] = useState([]);
  const { t } = useTranslation();

  const toggleBlock = (index) => {
    if (allowMultiple) {
      setOpenIndexes((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      setOpenIndexes((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  return (
    <div className="aam_paragraph-section">
      {data.map((item, index) => {
        const isOpen = openIndexes.includes(index);

        return (
          <div key={index} className="aam_paragraph-section__item">
            <div
              className="aam_paragraph-section__title"
              role="button"
              tabIndex={0}
              aria-expanded={isOpen}
              aria-controls={`paragraph-content-${index}`}
              onClick={() => toggleBlock(index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleBlock(index);
                }
              }}
            >
              {t(item.paragraphTitle)}
              <span className="aam_paragraph-section__icon">{isOpen ? <MinusIcon /> : <PlusIcon />}</span>
            </div>

            <CSSTransition
              in={isOpen}
              timeout={300}
              classNames="aam_paragraph-section__content"
              unmountOnExit={false}
            >
              <div
                id={`paragraph-content-${index}`}
                className={`aam_paragraph-section__content ${isOpen ? 'open' : 'closed'}`}
              >
                {item.content.map((contentItem, pIndex) => {
                  if (typeof contentItem === 'object' && contentItem.table) {
                    const markdown = fillTemplate(contentItem.table, contentItem, t);

                    return (
                      <ReactMarkdown
                        key={pIndex}
                        remarkPlugins={[remarkGfm]}
                        components={{
                          table: (props) => <table className="aam_markdown-table" {...props} />,
                          thead: (props) => <thead {...props} />,
                          tbody: (props) => <tbody {...props} />,
                          tr: (props) => <tr {...props} />,
                          th: (props) => <th {...props} />,
                          td: (props) => <td {...props} />,
                          p: (props) => <p {...props} />,
                          ul: (props) => <ul {...props} />,
                          ol: (props) => <ol {...props} />,
                          li: (props) => <li {...props} />,
                        }}
                      >
                        {markdown}
                      </ReactMarkdown>
                    );
                  }

                  if (typeof contentItem === 'string') {
                    const markdown = processMarkdown(contentItem, t);

                    return (
                      <ReactMarkdown key={pIndex} remarkPlugins={[remarkGfm]}>
                        {markdown}
                      </ReactMarkdown>
                    );
                  }

                  return null;
                })}
              </div>
            </CSSTransition>
          </div>
        );
      })}
    </div>
  );
}

ParagraphListSection.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      paragraphTitle: PropTypes.string.isRequired,
      content: PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.shape({
            table: PropTypes.string.isRequired,
          }),
        ])
      ).isRequired,
    })
  ).isRequired,
  allowMultiple: PropTypes.bool,
};

export default ParagraphListSection;
