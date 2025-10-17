import React from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/components/ComplexComponents/MainAbout.scss';
import { useTranslation } from 'react-i18next';
import PdfIcon from '../../SVGIcons/PdfIcon';
import GlobeIcon from '../../SVGIcons/GlobeIcon'
import mainAboutJPG from '/assets/images/mainAbout.jpg';
import lider from '/assets/images/lider.png';
import awarding from '/assets/images/awarding.jpg';

function MainAbout() {
  const { t } = useTranslation();

  const isProduction = process.env.NODE_ENV === 'production';
  const baseUrl = isProduction ? (process.env.PUBLIC_URL || '') : '';

  const handleLinkClick = (link) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  const docsSection = [
    {
      title: t('aboutBlock.documents.list.item1'),
      link: `${baseUrl}/assets/documents/Свидетельство о государственной регистрации.pdf`,
      noDownload: true
    },
    {
      title: t('aboutBlock.documents.list.item2'),
      link: `${baseUrl}/assets/documents/Устав.pdf`,
      noDownload: true
    },
    {
      title: t('aboutBlock.documents.list.item3'),
      link: `https://www.nbrb.by/payment/register_of_payment_service_providers`,
      noDownload: true
    },
  ];

  return (
    <main className="aam_about-block">
      {/* Breadcrumbs */}
      <div className="aam_about-block__breadcrumbs">
        <Link to="/">{t('breadCrumbs.home')}</Link>
        {' '}
        /
        {t('breadCrumbs.about')}
      </div>

      {/* Title */}
      <h1 className="aam_about-block__title">{t('aboutBlock.name')}</h1>

      {/* Section Lider */}
      <section className="aam_about-block__lider-section">
        <div className="aam_about-block__lider-section--title">
          <img src={lider} alt={t('aboutBlock.lider.alt')} title={t('aboutBlock.liderAlt')} />
          <h2>{t('aboutBlock.lider.title')}</h2>
        </div>
        <div className="aam_about-block__lider-section--description">
          <div className="aam_about-block__lider-section--description-block">
            <h3>{t('aboutBlock.lider.blockTitle1')}</h3>
            <p>{t('aboutBlock.lider.blockText1')}</p>
          </div>
          <div className="aam_about-block__lider-section--description-block">
            <h3>{t('aboutBlock.lider.blockTitle2')}</h3>
            <p>{t('aboutBlock.lider.blockText2')}</p>
          </div>
          <div className="aam_about-block__lider-section--description-block">
            <h3>{t('aboutBlock.lider.blockTitle3')}</h3>
            <p>{t('aboutBlock.lider.blockText3')}</p>
          </div>
        </div>
      </section>

      {/* Image */}
      <img src={mainAboutJPG} alt={t('aboutBlock.alt')} className="aam_about-block__image" loading="lazy" />

      {/* Description */}
      <div className="aam_about-block__description">
        <p>{t('aboutBlock.description1')}</p>
        <p>
          <a href="https://digitalleaders.by/berlio" target='_blank' rel='noopener noreferrer'>
            {t('aboutBlock.description2-1')}
          </a>
          {' '}
          {t('aboutBlock.description2-2')}
        </p>
        <p>
          <a href="https://www.sb.by/articles/kakie-it-produkty-belorusskikh-predpriyatiy-pokazali-naivysshuyu-effektivnost-vybrali-samye-aktualny.html?action=preview" target='_blank' rel='noopener noreferrer'>
            {t('aboutBlock.description3-1')}
          </a>
          {' '}
          {t('aboutBlock.description3-2')}
        </p>
        <div className="aam_about-block__description-image">
          <img src={awarding} alt={t('aboutBlock.awardingSubTitle')} title={t('aboutBlock.awardingSubTitle')} />
          <p>{t('aboutBlock.description4')}</p>
        </div>
        <p>{t('aboutBlock.description5')}</p>
        <p>{t('aboutBlock.description6')}</p>
        <p>{t('aboutBlock.description7')}</p>
      </div>

      {/* Documents */}
      <section className="aam_about-block__documents">
        <h2 className="aam_about-block__documents--title">{t('aboutBlock.documents.title')}</h2>
        <div>
          <ul className="aam_about-block__documents--list">
            {docsSection.map(({ title, link, noDownload }) => {
              const isExternal = link.startsWith('http');
              const Icon = isExternal ? GlobeIcon : PdfIcon;

              return (
                <li key={title}>
                  <a
                    href={link}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link);
                    }}
                    target={noDownload ? "_blank" : "_self"}
                    rel="noreferrer"
                  >
                    <Icon className="aam_about-block__documents--list-icon" />
                    <span>{title}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="aam_about-block__documents--info">
          <div className="aam_about-block__documents--info-block">
            <h3 className="aam_about-block__documents--info-block-title">{t('aboutBlock.documents.info.title1')}</h3>
            <p className="aam_about-block__documents--info-block-description">{t('aboutBlock.documents.info.description1')}</p>
          </div>
          <div className="aam_about-block__documents--info-block">
            <h3 className="aam_about-block__documents--info-block-title">{t('aboutBlock.documents.info.title2')}</h3>
            <p className="aam_about-block__documents--info-block-description">{t('aboutBlock.documents.info.description2')}</p>
          </div>
          <div className="aam_about-block__documents--info-block">
            <h3 className="aam_about-block__documents--info-block-title">{t('aboutBlock.documents.info.title3')}</h3>
            <p className="aam_about-block__documents--info-block-description">{t('aboutBlock.documents.info.description3')}</p>
          </div>

        </div>

      </section>
    </main>
  );
}

export default MainAbout;
