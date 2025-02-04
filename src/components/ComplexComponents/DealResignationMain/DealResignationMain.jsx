import React from "react";
import { Link } from "react-router-dom";
import LeftArrowIcon from "../../SVGIcons/LeftArrowIcon";
import UpArrowInCircleIcon from "../../SVGIcons/UpArrowInCircleIcon";
import ServiceCard from "../../ServiceCard/ServiceCard";
import DocxIcon from "../../SVGIcons/DocxIcon";
import "../../../styles/components/ComplexComponents/DealResignationMain.scss";

import { useTranslation } from "react-i18next";

const DealResignationMain = () => {
    const { t } = useTranslation();

    const handleLinkClick = (title, link) => {
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
        <main className="aam_deal-resignation-main">
            {/* Breadcrumbs */}
            <div className="aam_deal-resignation-main__breadcrumbs">
                <Link to="/">{t('breadCrumbs.home')}</Link> /{' '}
                <Link to="/clients">{t('breadCrumbs.forClients')}</Link> /{' '}
                {t('breadCrumbs.dealResignation')}
            </div>

            {/* Title */}
            <h1 className="aam_deal-resignation-main__header">{t('dealResignationMain.name')}</h1>

            {/* Resignation Docs */}
            <div className="aam_deal-resignation-main__card-boxes">
                <ServiceCard
                    className="aam_deal-resignation-main__service-card"
                    Icon={DocxIcon}
                    title={t('dealResignationMain.cardTitle1')}
                    description=''
                    link={`${baseUrl}/assets/documents/1.doc`}
                    onClick={() =>
                        handleLinkClick(
                            t('dealResignationMain.cardTitle1'),
                            `${baseUrl}/assets/documents/1.doc`
                        )
                    }
                />
                <ServiceCard
                    className="aam_deal-resignation-main__service-card"
                    Icon={DocxIcon}
                    title={t('dealResignationMain.cardTitle2')}
                    description=''
                    link={`${baseUrl}/assets/documents/1.doc`}
                    onClick={() =>
                        handleLinkClick(
                            t('dealResignationMain.cardTitle2'),
                            `${baseUrl}/assets/documents/1.doc`
                        )
                    }
                />
            </div>

            {/* Кнопки навигации по сайту */}
            <div className="aam_deal-resignation-main__site-nav">
                <Link to="/" className="home-link">
                    <LeftArrowIcon className="icon" />
                    {t("dealResignationMain.homeLink")}
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
                    {t("dealResignationMain.upLink")}
                </button>
            </div>
        </main>
    );
};

export default DealResignationMain;