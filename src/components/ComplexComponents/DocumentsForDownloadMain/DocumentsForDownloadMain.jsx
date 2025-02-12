import React from "react";
import { Link } from "react-router-dom";
import LeftArrowIcon from "../../SVGIcons/LeftArrowIcon";
import UpArrowInCircleIcon from "../../SVGIcons/UpArrowInCircleIcon";
import ServiceCard from "../../ServiceCard/ServiceCard";
import DocxIcon from "../../SVGIcons/DocxIcon";
import PdfIcon from "../../SVGIcons/PdfIcon";
import "../../../styles/components/ComplexComponents/DocumentsForDownloadMain.scss";

import { useTranslation } from "react-i18next";

const DocumentsForDownloadMain = () => {
    const { t } = useTranslation();

    const handlePdfClick = (title, link) => {
        const linkElement = document.createElement('a');
        linkElement.href = link;
        linkElement.download = title.endsWith('.pdf') ? title : `${title}.pdf`; // Добавляем расширение, если его нет
        document.body.appendChild(linkElement);
        linkElement.click();
        document.body.removeChild(linkElement);
    };

    const handleDocClick = (title, link) => {
        const linkElement = document.createElement('a');
        linkElement.href = link;
        linkElement.download = title.endsWith('.doc') ? title : `${title}.doc`; // Добавляем расширение, если его нет
        document.body.appendChild(linkElement);
        linkElement.click();
        document.body.removeChild(linkElement);
    };

    const isProduction = process.env.NODE_ENV === "production";
    const baseUrl = isProduction ? `${process.env.PUBLIC_URL}/#` : "";

    return (
        <main className="aam_documents-for-download-main">
            {/* Breadcrumbs */}
            <div className="aam_documents-for-download-main__breadcrumbs">
                <Link to="/">{t('breadCrumbs.home')}</Link> /{' '}
                <Link to="/clients">{t('breadCrumbs.forClients')}</Link> /{' '}
                {t('breadCrumbs.documentsForDownload')}
            </div>

            {/* Title */}
            <h1 className="aam_documents-for-download-main__header">{t('documentsForDownloadMain.name')}</h1>

            {/* Application Docs */}
            <h2 className="aam_documents-for-download-main__boxes-header">{t('documentsForDownloadMain.boxesHeaders.applications')}</h2>
            <div className="aam_documents-for-download-main__card-boxes">
                <ServiceCard
                    className="aam_documents-for-download-main__service-card"
                    Icon={PdfIcon}
                    title={t('documentsForDownloadMain.app.cardTitle1')}
                    description=''
                    link={`${baseUrl}/assets/documents/1.pdf`}
                    onClick={() =>
                        handlePdfClick(
                            t('documentsForDownloadMain.app.cardTitle1'),
                            `${baseUrl}/assets/documents/1.pdf`
                        )
                    }
                />
                <ServiceCard
                    className="aam_documents-for-download-main__service-card"
                    Icon={DocxIcon}
                    title={t('documentsForDownloadMain.app.cardTitle2')}
                    description=''
                    link={`${baseUrl}/assets/documents/1.doc`}
                    onClick={() =>
                        handleDocClick(
                            t('documentsForDownloadMain.app.cardTitle2'),
                            `${baseUrl}/assets/documents/1.doc`
                        )
                    }
                />
                <ServiceCard
                    className="aam_documents-for-download-main__service-card"
                    Icon={DocxIcon}
                    title={t('documentsForDownloadMain.app.cardTitle3')}
                    description=''
                    link={`${baseUrl}/assets/documents/1.doc`}
                    onClick={() =>
                        handleDocClick(
                            t('documentsForDownloadMain.app.cardTitle3'),
                            `${baseUrl}/assets/documents/1.doc`
                        )
                    }
                />
            </div>

            {/* Sample Letters */}
            <h2 className="aam_documents-for-download-main__boxes-header">{t('documentsForDownloadMain.boxesHeaders.sampleLetters')}</h2>
            <div className="aam_documents-for-download-main__card-boxes">
                <ServiceCard
                    className="aam_documents-for-download-main__service-card"
                    Icon={DocxIcon}
                    title={t('documentsForDownloadMain.letters.cardTitle1')}
                    description=''
                    link={`${baseUrl}/assets/documents/1.doc`}
                    onClick={() =>
                        handleDocClick(
                            t('documentsForDownloadMain.letters.cardTitle1'),
                            `${baseUrl}/assets/documents/1.doc`
                        )
                    }
                />
                <ServiceCard
                    className="aam_documents-for-download-main__service-card"
                    Icon={PdfIcon}
                    title={t('documentsForDownloadMain.letters.cardTitle2')}
                    description=''
                    link={`${baseUrl}/assets/documents/1.pdf`}
                    onClick={() =>
                        handlePdfClick(
                            t('documentsForDownloadMain.letters.cardTitle2'),
                            `${baseUrl}/assets/documents/1.pdf`
                        )
                    }
                />
                <ServiceCard
                    className="aam_documents-for-download-main__service-card"
                    Icon={DocxIcon}
                    title={t('documentsForDownloadMain.letters.cardTitle3')}
                    description=''
                    link={`${baseUrl}/assets/documents/1.doc`}
                    onClick={() =>
                        handleDocClick(
                            t('documentsForDownloadMain.letters.cardTitle3'),
                            `${baseUrl}/assets/documents/1.doc`
                        )
                    }
                />
                <ServiceCard
                    className="aam_documents-for-download-main__service-card"
                    Icon={DocxIcon}
                    title={t('documentsForDownloadMain.letters.cardTitle4')}
                    description=''
                    link={`${baseUrl}/assets/documents/1.doc`}
                    onClick={() =>
                        handleDocClick(
                            t('documentsForDownloadMain.letters.cardTitle4'),
                            `${baseUrl}/assets/documents/1.doc`
                        )
                    }
                />
                <ServiceCard
                    className="aam_documents-for-download-main__service-card"
                    Icon={DocxIcon}
                    title={t('documentsForDownloadMain.letters.cardTitle5')}
                    description=''
                    link={`${baseUrl}/assets/documents/1.doc`}
                    onClick={() =>
                        handleDocClick(
                            t('documentsForDownloadMain.letters.cardTitle5'),
                            `${baseUrl}/assets/documents/1.doc`
                        )
                    }
                />
                <ServiceCard
                    className="aam_documents-for-download-main__service-card"
                    Icon={DocxIcon}
                    title={t('documentsForDownloadMain.letters.cardTitle6')}
                    description=''
                    link={`${baseUrl}/assets/documents/1.doc`}
                    onClick={() =>
                        handleDocClick(
                            t('documentsForDownloadMain.letters.cardTitle6'),
                            `${baseUrl}/assets/documents/1.doc`
                        )
                    }
                />
                <ServiceCard
                    className="aam_documents-for-download-main__service-card"
                    Icon={DocxIcon}
                    title={t('documentsForDownloadMain.letters.cardTitle7')}
                    description=''
                    link={`${baseUrl}/assets/documents/1.doc`}
                    onClick={() =>
                        handleDocClick(
                            t('documentsForDownloadMain.letters.cardTitle7'),
                            `${baseUrl}/assets/documents/1.doc`
                        )
                    }
                />
                <ServiceCard
                    className="aam_documents-for-download-main__service-card"
                    Icon={DocxIcon}
                    title={t('documentsForDownloadMain.letters.cardTitle8')}
                    description=''
                    link={`${baseUrl}/assets/documents/1.doc`}
                    onClick={() =>
                        handleDocClick(
                            t('documentsForDownloadMain.letters.cardTitle8'),
                            `${baseUrl}/assets/documents/1.doc`
                        )
                    }
                />
                <ServiceCard
                    className="aam_documents-for-download-main__service-card"
                    Icon={DocxIcon}
                    title={t('documentsForDownloadMain.letters.cardTitle9')}
                    description=''
                    link={`${baseUrl}/assets/documents/1.doc`}
                    onClick={() =>
                        handleDocClick(
                            t('documentsForDownloadMain.letters.cardTitle9'),
                            `${baseUrl}/assets/documents/1.doc`
                        )
                    }
                />
                <ServiceCard
                    className="aam_documents-for-download-main__service-card"
                    Icon={DocxIcon}
                    title={t('documentsForDownloadMain.letters.cardTitle10')}
                    description=''
                    link={`${baseUrl}/assets/documents/1.doc`}
                    onClick={() =>
                        handleDocClick(
                            t('documentsForDownloadMain.letters.cardTitle10'),
                            `${baseUrl}/assets/documents/1.doc`
                        )
                    }
                />
            </div>

            {/* Payment Orders */}
            <h2 className="aam_documents-for-download-main__boxes-header">{t('documentsForDownloadMain.boxesHeaders.paymentOrders')}</h2>
            <div className="aam_documents-for-download-main__card-boxes">
                <ServiceCard
                    className="aam_documents-for-download-main__service-card"
                    Icon={PdfIcon}
                    title={t('documentsForDownloadMain.orders.cardTitle1')}
                    description=''
                    link={`${baseUrl}/assets/documents/1.pdf`}
                    onClick={() =>
                        handlePdfClick(
                            t('documentsForDownloadMain.orders.cardTitle1'),
                            `${baseUrl}/assets/documents/1.pdf`
                        )
                    }
                />
                <ServiceCard
                    className="aam_documents-for-download-main__service-card"
                    Icon={PdfIcon}
                    title={t('documentsForDownloadMain.orders.cardTitle2')}
                    description=''
                    link={`${baseUrl}/assets/documents/1.pdf`}
                    onClick={() =>
                        handlePdfClick(
                            t('documentsForDownloadMain.orders.cardTitle2'),
                            `${baseUrl}/assets/documents/1.pdf`
                        )
                    }
                />
            </div>

            {/* Notifications */}
            <h2 className="aam_documents-for-download-main__boxes-header">{t('documentsForDownloadMain.boxesHeaders.notifications')}</h2>
            <div className="aam_documents-for-download-main__card-boxes">
                <ServiceCard
                    className="aam_documents-for-download-main__service-card"
                    Icon={DocxIcon}
                    title={t('documentsForDownloadMain.notify.cardTitle1')}
                    description=''
                    link={`${baseUrl}/assets/documents/1.doc`}
                    onClick={() =>
                        handleDocClick(
                            t('documentsForDownloadMain.notify.cardTitle1'),
                            `${baseUrl}/assets/documents/1.doc`
                        )
                    }
                />
            </div>

            {/* Кнопки навигации по сайту */}
            <div className="aam_documents-for-download-main__site-nav">
                <Link to="/" className="home-link">
                    <LeftArrowIcon className="icon" />
                    {t("documentsForDownloadMain.homeLink")}
                </Link>
                <button
                    onClick={() => {
                        const element = document.getElementById("header");
                        if (element) {
                            element.scrollIntoView({
                                behavior: "smooth",
                                block: "start",
                            });
                        }
                    }}
                    className="secondary-link"
                >
                    <UpArrowInCircleIcon className="icon" />
                    {t("documentsForDownloadMain.upLink")}
                </button>
            </div>
        </main>
    );
};

export default DocumentsForDownloadMain;