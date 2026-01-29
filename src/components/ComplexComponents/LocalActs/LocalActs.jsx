import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useScrollToHash from '../../../hooks/scrollToHash';
import PdfIcon from '../../SVGIcons/PdfIcon';
import LeftArrowIcon from '../../SVGIcons/LeftArrowIcon';
import UpArrowInCircleIcon from '../../SVGIcons/UpArrowInCircleIcon';
import GlobeIcon from '../../SVGIcons/GlobeIcon';
import '../../../styles/components/ComplexComponents/SignAndResignMain.scss';

function LocalActs() {
    useScrollToHash();
    const { t } = useTranslation();

    const handleLinkClick = (title, link) => {
        const linkElement = document.createElement('a');
        linkElement.href = link;
        linkElement.download = title.endsWith('.pdf') ? title : `${title}.pdf`;
        document.body.appendChild(linkElement);
        linkElement.click();
        document.body.removeChild(linkElement);
    };

    const isProduction = process.env.NODE_ENV === 'production';
    const baseUrl = isProduction ? (process.env.PUBLIC_URL || '') : '';

    // Конфиг документов
    const operatorDocs = [
        {
            title: t('signAndResignMain.cardTitle1'),
            link: `${baseUrl}/assets/documents/Правила оператора электронной платежной системы «Берлио».pdf`
        },
        {
            title: t('signAndResignMain.cardTitle2'),
            link: `${baseUrl}/assets/documents/Правила обслуживания клиентов в ЭПС «Берлио».pdf`
        },
        {
            title: t('signAndResignMain.cardTitle3'),
            link: `${baseUrl}/assets/documents/Договор присоединения Клиента к обслуживанию в электронной платежной системе «Берлио».pdf`,
        },
        {
            title: t('signAndResignMain.cardTitle6'),
            link: `${baseUrl}/assets/documents/Перечень цен и тарифов за оказываемые услуги в электронной платёжной системе «Берлио».pdf`,
        },
        {
            title: t('signAndResignMain.cardTitle7'),
            link: `${baseUrl}/assets/documents/Заявление о присоединении к договору присоединения (общая форма).pdf`,
        },
    ];

    const emissionerDocs = [
        {
            title: t('signAndResignMain.cardTitle4'),
            link: `${baseUrl}/assets/documents/Правила эмитента электронных денег «Берлио».pdf`,
        },
        {
            title: t('signAndResignMain.cardTitle5'),
            link: `https://belgazprombank.by/korporativnim_klientam/raschetno_kassovoe_obsluzhivani/berlio-ur/`,
            noDownload: true,
        },
    ];

    const renderDocList = (docs) => (
        <ul className="aam_sign-and-resign__doc-list">
            {docs.map(({ title, link, noDownload }) => {
                const isExternal = link.startsWith("https");
                return (
                    <li key={title}>
                        <a
                            href={link}
                            onClick={(e) => {
                                if (!noDownload) {
                                    e.preventDefault();
                                    handleLinkClick(title, link);
                                }
                            }}
                            target={noDownload ? "_blank" : "_self"}
                            rel="noreferrer"
                        >
                            {isExternal ? (
                                <GlobeIcon className="aam_sign-and-resign__doc-icon" />
                            ) : (
                                <PdfIcon className="aam_sign-and-resign__doc-icon" />
                            )}
                            <span>{title}</span>
                        </a>
                    </li>
                );
            })}
        </ul>
    );

    return (
        <main className="aam_sign-and-resign">
            {/* Breadcrumbs */}
            <div className="aam_sign-and-resign__breadcrumbs">
                <Link to="/">{t('breadCrumbs.home')}</Link> /{' '}
                <Link to="/clients">{t('breadCrumbs.forClients')}</Link> /{' '}
                {t('breadCrumbs.localActs')}
            </div>

            {/* Title */}
            <h1 className="aam_sign-and-resign__header">{t('signAndResignMain.documentsTitle')}</h1>

            {/* Documents */}
            <div id="LPADocs" className="aam_sign-and-resign__documents">
                <div className="aam_sign-and-resign__operator-documents">
                    <h3 className="aam_sign-and-resign__operator-documents-title">
                        {t('signAndResignMain.operatorDocumentsTitle')}
                    </h3>
                    <div className="aam_sign-and-resign__card-boxes">{renderDocList(operatorDocs)}</div>
                </div>

                <div className="aam_sign-and-resign__emissioner-documents">
                    <h3 className="aam_sign-and-resign__emissioner-documents-title">
                        {t('signAndResignMain.emissionerDocumentsTitle')}
                    </h3>
                    <div className="aam_sign-and-resign__card-boxes">{renderDocList(emissionerDocs)}</div>
                </div>
            </div>

            {/* Navigation buttons */}
            <div className="aam_sign-and-resign-section__site-nav">
                <Link to="/" className="home-link">
                    <LeftArrowIcon className="icon" />
                    {t('signAndResignSection.homeLink')}
                </Link>
                <button
                    type="button"
                    onClick={() => {
                        document.getElementById('header')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className="secondary-link"
                >
                    <UpArrowInCircleIcon className="icon" />
                    {t('signAndResignSection.upLink')}
                </button>
            </div>
        </main>
    );
}

export default LocalActs;
