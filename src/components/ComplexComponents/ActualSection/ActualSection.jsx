import React from 'react';
import PropTypes from 'prop-types';
import '../../../styles/components/ComplexComponents/ActualSection.scss';
import { useTranslation } from 'react-i18next';
import LinkTo from '../../LinkTo/LinkTo';
import actual1 from '/assets/images/actual1.jpg';
import actual2 from '/assets/images/actual2.jpg';
import actual3 from '/assets/images/actual3.jpg';

function ActualBlock({
  title, description, imageUrl, href,
}) {
  return (
    <div className="aam_actual-block">
      <img src={imageUrl} alt={title} className="aam_actual-block__image" loading="lazy" />
      <div className="aam_actual-block__content">
        <h3 className="aam_actual-block__title">{title}</h3>
        <p className="aam_actual-block__description">{description}</p>
        <LinkTo
          href={href}
          text=""
        />
      </div>
    </div>
  );
}

ActualBlock.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};

function ActualSection() {
  const { t } = useTranslation();

  return (
    <section className="aam_actual-section">
      <h2 className="aam_actual-section__title">{t('actualSection.name')}</h2>
      <div className="aam_actual-section__blocks">
        <ActualBlock
          title={t('actualSection.actualBlockTitle1')}
          description={t('actualSection.actualBlockDescription1')}
          imageUrl={actual1}
          href="https://map.berlio.by/"
        />
        <ActualBlock
          title={t('actualSection.actualBlockTitle2')}
          description={t('actualSection.actualBlockDescription2')}
          imageUrl={actual2}
          href="/contacts"
        />
        <ActualBlock
          title={t('actualSection.actualBlockTitle3')}
          description={t('actualSection.actualBlockDescription3')}
          imageUrl={actual3}
          href="https://map.berlio.by/"
        />
      </div>
    </section>
  );
}

export default ActualSection;
