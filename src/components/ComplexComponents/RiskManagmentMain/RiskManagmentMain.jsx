import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import DocxIcon from '../../SVGIcons/DocxIcon';
import LeftArrowIcon from '../../SVGIcons/LeftArrowIcon';
import UpArrowInCircleIcon from '../../SVGIcons/UpArrowInCircleIcon';
import '../../../styles/components/ComplexComponents/ReportIFRMain.scss';

const RiskManagmentMain = () => {
    const { t } = useTranslation();

    const isProduction = process.env.NODE_ENV === 'production';
    const baseUrl = isProduction ? (process.env.PUBLIC_URL || '') : '';

    const handleDocClick = (title, link) => {
    const linkElement = document.createElement('a');
    linkElement.href = link;
    linkElement.download = title.endsWith('.doc') ? title : `${title}.doc`; // Добавляем расширение, если его нет
    document.body.appendChild(linkElement);
    linkElement.click();
    document.body.removeChild(linkElement);
  };

    const docsSection = [
        {
            title: t('riskManagmentMain.list'),
            docs: [
                {
                    title: t('riskManagmentMain.cardTitle1'),
                    link: `${baseUrl}/assets/documents/Информация о системе управления рисками.docx`,
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
                {t('breadCrumbs.riskManagment')}
            </div>

            {/* Title */}
            <h1 className="aam_report-IFR-main__header">{t('riskManagmentMain.name')}</h1>

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
                                        handleDocClick(title, link);
                                    }}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <DocxIcon className="aam_report-IFR-main__doc-icon" />
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
                    {t('riskManagmentMain.homeLink')}
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
                    {t('riskManagmentMain.upLink')}
                </button>
            </div>
        </main>
    );
};

export default RiskManagmentMain;