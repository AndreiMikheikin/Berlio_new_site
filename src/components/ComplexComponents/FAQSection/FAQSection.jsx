import React, { useState } from 'react';
import FAQData from '../../../data/FAQData.json';
import PlusIcon from '../../SVGIcons/PlusIcon';
import MinusIcon from '../../SVGIcons/MinusIcon';
import '../../../styles/components/ComplexComponents/FAQSection.scss';

import { useTranslation } from 'react-i18next';

const FAQSection = ({ category }) => {
  const [activeQuestion, setActiveQuestion] = useState(null);
  const { t } = useTranslation();

  if (!FAQData[category]) {
    return <div>{t('invalid_category')}</div>;
  }

  const { questions, answers, faq_title } = FAQData[category];

  const toggleAnswer = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };
  
  const renderFAQ = () => {
    const questionKeys = Object.keys(questions);
    const answerKeys = Object.keys(answers);
  
    return questionKeys.map((questionKey, index) => {
      const questionValue = questions[questionKey];
      const answerValue = answers[answerKeys[index]];
      const isActive = activeQuestion === index;
  
      return (
        <div key={index} className="aam_faq-section__item">
          <div
            className="aam_faq-section__question"
            onClick={() => toggleAnswer(index)}
          >
            {t(questionValue)}
            <span className="aam_faq-section__icon">
              {isActive ? <MinusIcon /> : <PlusIcon />}
            </span>
          </div>
          <div
            className={`aam_faq-section__answer ${isActive ? '' : 'hidden'}`}
          >
            {t(answerValue)}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="aam_faq-section">
      <h2 className="aam_faq-section__title">
        {t(faq_title)}
      </h2>
      <div className="aam_faq-section__list">{renderFAQ()}</div>
    </div>
  );
};

export default FAQSection;
