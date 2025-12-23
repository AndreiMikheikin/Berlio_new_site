import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PdfIcon from '../../SVGIcons/PdfIcon';
import GlobeIcon from '../../SVGIcons/GlobeIcon';
import LeftArrowIcon from '../../SVGIcons/LeftArrowIcon';
import UpArrowInCircleIcon from '../../SVGIcons/UpArrowInCircleIcon';
import '../../../styles/components/ComplexComponents/LegislationMain.scss';

const LegislationMain = () => {
    const { t } = useTranslation();

    const isProduction = process.env.NODE_ENV === 'production';
    const baseUrl = isProduction ? (process.env.PUBLIC_URL || '') : '';

    const handleLinkClick = (title, link) => {
        const linkElement = document.createElement('a');
        linkElement.href = link;
        linkElement.download = title.endsWith('.pdf') ? title : `${title}.pdf`;
        document.body.appendChild(linkElement);
        linkElement.click();
        document.body.removeChild(linkElement);
    };

    const docsSection1 = [
        {
            title: t('legislationMain.list.item1'),
            link: `${baseUrl}/assets/documents/Закон Республики Беларусь от 19.04.2022 № 164-З «О платежных системах и платежных услугах»`,
            noDownload: true,
        },
        {
            title: t('legislationMain.list.item2'),
            link: `https://www.nbrb.by/payment/register_of_payment_service_providers`,
            noDownload: true,
        },
        {
            title: t('legislationMain.list.item3'),
            link: `https://pravo.by/document/?guid=12551&p0=H11400165`,
            noDownload: true,
        },
        {
            title: t('legislationMain.list.item4'),
            link: `${baseUrl}/assets/documents/Постановление Правления Национального банка Республики Беларусь от 05.12.2022 № 453 «Об утверждении Инструкции о порядке оказания платежных услуг на территории Республики Беларусь»`,
            noDownload: true,
        },
        {
            title: t('legislationMain.list.item5'),
            link: `https://pravo.by/document/?guid=11031&p0=B22035074p`,
            noDownload: true,
        },
        {
            title: t('legislationMain.list.item6'),
            link: `https://pravo.by/document/?guid=12551&p0=B22239010&p1=1`,
            noDownload: true,
        },
        {
            title: t('legislationMain.list.item7'),
            link: `${baseUrl}/assets/documents/Постановление Правления Национального банка Республики Беларусь от 16.09.2022 N 350 «Об утверждении Правил осуществления операций с электронными деньгами»`,
            noDownload: true,
        },
        {
            title: t('legislationMain.list.item8'),
            link: `${baseUrl}/assets/documents/Стандарт проведения расчётов СПР 7.01-2020`,
            noDownload: true,
        },
        {
            title: t('legislationMain.list.item9'),
            link: `https://pravo.by/document/?guid=12551&p0=B22238859&p1=1&p5=0`,
            noDownload: true,
        },
    ];

    const renderDocItem = ({ title, link, noDownload }) => {
        const isExternal = link.startsWith("https");

        return (
            <li key={title}>
                <a
                    href={link}
                    onClick={(e) => {
                        if (!noDownload && !isExternal) {
                            e.preventDefault();
                            handleLinkClick(title, link);
                        }
                    }}
                    target={noDownload || isExternal ? "_blank" : "_self"}
                    rel="noreferrer"
                >
                    {isExternal ? (
                        <GlobeIcon className="aam_legislation-main__doc-icon" />
                    ) : (
                        <PdfIcon className="aam_legislation-main__doc-icon" />
                    )}
                    <span>{title}</span>
                </a>
            </li>
        );
    };

    return (
        <main className='aam_legislation-main'>
            {/* Breadcrumbs */}
            <div className="aam_legislation-main__breadcrumbs">
                <Link to="/">{t('breadCrumbs.home')}</Link> /{' '}
                <Link to="/clients">{t('breadCrumbs.forClients')}</Link> /{' '}
                {t('breadCrumbs.legislation')}
            </div>

            {/* Title */}
            <h1 className="aam_legislation-main__header">{t('legislationMain.name')}</h1>

            {/* List */}
            <h2 className="aam_legislation-main__list-title">{t('legislationMain.list.name')}</h2>

            <ul className="aam_legislation-main__doc-list">
                {docsSection1.map(renderDocItem)}
            </ul>

            {/* Navigation buttons */}
            <div className="aam_legislation-main__site-nav">
                <Link to="/" className="home-link">
                    <LeftArrowIcon className="icon" />
                    {t('legislationMain.homeLink')}
                </Link>
                <button
                    type="button"
                    onClick={() => {
                        document.getElementById('header')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className="secondary-link"
                >
                    <UpArrowInCircleIcon className="icon" />
                    {t('legislationMain.upLink')}
                </button>
            </div>
        </main>
    )
}

export default LegislationMain;