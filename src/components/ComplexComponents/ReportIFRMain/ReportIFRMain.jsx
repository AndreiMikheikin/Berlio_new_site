import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PdfIcon from '../../SVGIcons/PdfIcon';
import LeftArrowIcon from '../../SVGIcons/LeftArrowIcon';
import UpArrowInCircleIcon from '../../SVGIcons/UpArrowInCircleIcon';
import '../../../styles/components/ComplexComponents/ReportIFRMain.scss';

const ReportIFRMain = () => {
    const { t } = useTranslation();

    const isProduction = process.env.NODE_ENV === 'production';
    const baseUrl = isProduction ? (process.env.PUBLIC_URL || '') : '';

    const handlePdfClick = (title, link) => {
        const linkElement = document.createElement('a');
        linkElement.href = link;
        linkElement.download = title.endsWith('.pdf') ? title : `${title}.pdf`; // Добавляем расширение, если его нет
        document.body.appendChild(linkElement);
        linkElement.click();
        document.body.removeChild(linkElement);
    };

    const docsSection = [
        {
            title: t('reportIFRMain.list'),
            docs: [
                {
                    title: t('reportIFRMain.cardTitle1'),
                    link: `${baseUrl}/assets/documents/Краткий отчет об оценке ИФР.pdf`,
                },
            ],
        },
    ]

    return (
        <main className="aam_report-IFR-main">
            {/* Breadcrumbs */}
            <div className="aam_report-IFR-main__breadcrumbs">
                <Link to="/">{t('breadCrumbs.home')}</Link>
                {' '}
                /
                {' '}
                <Link to="/clients">{t('breadCrumbs.forClients')}</Link>
                {' '}
                /
                {' '}
                {t('breadCrumbs.reportIFR')}
            </div>

            {/* Title */}
            <h1 className="aam_report-IFR-main__header">{t('reportIFRMain.name')}</h1>

            {/* Documents Sections */}
            {docsSection.map(({ title, docs }) => (
                <section key={title} className="aam_report-IFR-main__section">
                    <h2 className="aam_report-IFR-main__documents-title">{title}</h2>
                    <ul className="aam_report-IFR-main__doc-list">
                        {docs.map(({ title, link }) => (
                            <li key={title}>
                                <a
                                    href={link}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handlePdfClick(title, link);
                                    }}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <PdfIcon className="aam_report-IFR-main__doc-icon" />
                                    <span>{title}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </section>
            ))}

            {/* Кнопки навигации по сайту */}
            <div className="aam_report-IFR-main__site-nav">
                <Link to="/" className="home-link">
                    <LeftArrowIcon className="icon" />
                    {t('reportIFRMain.homeLink')}
                </Link>
                <button
                    type="button"
                    onClick={() => {
                        const element = document.getElementById('header');
                        if (element) {
                            element.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start',
                            });
                        }
                    }}
                    className="secondary-link"
                >
                    <UpArrowInCircleIcon className="icon" />
                    {t('reportIFRMain.upLink')}
                </button>
            </div>
        </main>
    );
};

export default ReportIFRMain;