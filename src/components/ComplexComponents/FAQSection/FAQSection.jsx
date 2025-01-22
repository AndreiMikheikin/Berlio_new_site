import React, { useState } from 'react';
import FAQData from '../../../data/FAQData.json'; // Импортируем данные FAQ

// Компонент FAQSection, принимает пропс category для определения, какие вопросы показывать
const FAQSection = ({ category }) => {
  const [activeQuestion, setActiveQuestion] = useState(null);

  // Функция для переключения видимости ответа
  const toggleAnswer = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index); // Переключаем активный вопрос
  };

  // Проверка на корректность категории FAQ
  if (!FAQData[category]) {
    return <div>Неверная категория FAQ.</div>;
  }

  // Функция для рендеринга вопросов и ответов по выбранной категории
  const renderFAQ = () => {
    return FAQData[category].map((faq, index) => (
      <div key={index} className="aam_faq-item">
        <div 
          className="aam_faq-question" 
          onClick={() => toggleAnswer(index)} // Обработчик клика
        >
          {faq.question}
        </div>
        {activeQuestion === index && (
          <div className="aam_faq-answer">
            {faq.answer}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="aam_faq-section">
      <h2>{category === 'partnersFAQ' ? 'FAQ для партнеров' : 'FAQ для клиентов'}</h2>
      <div className="aam_faq-list">
        {renderFAQ()}
      </div>
    </div>
  );
};

export default FAQSection;
