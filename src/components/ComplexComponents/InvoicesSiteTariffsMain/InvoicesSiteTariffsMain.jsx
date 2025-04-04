import React from "react";
import { Link } from "react-router-dom";
import LeftArrowIcon from "../../SVGIcons/LeftArrowIcon";
import UpArrowInCircleIcon from "../../SVGIcons/UpArrowInCircleIcon";
import InvoicesSiteTariffsPNG from "../../../assets/images/invoicesSiteTariffs.jpg";
import PdfIcon from "../../SVGIcons/PdfIcon";
import ServiceCard from "../../ServiceCard/ServiceCard";
import "../../../styles/components/ComplexComponents/InvoicesSiteTariffsMain.scss";

import { useTranslation } from "react-i18next";

const InvoicesSiteTariffsMain = () => {
    const { t } = useTranslation();

    const handlePdfClick = (title, link) => {
        const linkElement = document.createElement('a');
        linkElement.href = link;
        linkElement.download = title.endsWith('.pdf') ? title : `${title}.pdf`; // Добавляем расширение, если его нет
        document.body.appendChild(linkElement);
        linkElement.click();
        document.body.removeChild(linkElement);
    };

    const isProduction = process.env.NODE_ENV === "production";
    const baseUrl = isProduction ? `${process.env.PUBLIC_URL}/#` : "";

    return (
        <main className="aam_invoices-site-tariffs-main">
            {/* Breadcrumbs */}
            <div className="aam_invoices-site-tariffs-main__breadcrumbs">
                <Link to="/equipment">{t('breadCrumbs.equipment')}</Link> /{' '}
                <Link to="/invoicesSite">{t('breadCrumbs.invoicesSite')}</Link> /{' '}
                {t('breadCrumbs.invoicesSiteTariffs')}
            </div>

            {/* Title */}
            <h1 className="aam_invoices-site-tariffs-main__header">{t('invoicesSiteTariffsMain.name')}</h1>

            {/* Description */}
            <img src={InvoicesSiteTariffsPNG} alt="invoicesSiteTariffs" />
            <div className="aam_invoices-site-tariffs-main__description">
                <p>{t('invoicesSiteTariffsMain.description')}</p>
                <p><strong>{t('invoicesSiteTariffsMain.strongDescription')}</strong></p>
            </div>

            <div className="aam_invoices-site-tariffs-main__wrapper">
                <h3 className="aam_invoices-site-tariffs-main__wrapper--title">{t('invoicesSiteTariffsMain.list.title')}</h3>
                <ul className="aam_invoices-site-tariffs-main__wrapper--list">
                    <li>{t('invoicesSiteTariffsMain.list.listItem1')}</li>
                    <li>{t('invoicesSiteTariffsMain.list.listItem2')}</li>
                    <li>{t('invoicesSiteTariffsMain.list.listItem3')}</li>
                    <li>{t('invoicesSiteTariffsMain.list.listItem4')}</li>
                    <li>{t('invoicesSiteTariffsMain.list.listItem5')}</li>
                    <li>{t('invoicesSiteTariffsMain.list.listItem6')}</li>
                </ul>
                <p className="aam_invoices-site-tariffs-main__wrapper--ps">
                    <strong>{t('invoicesSiteTariffsMain.list.ps')}</strong>
                    {' '}
                    <Link to="https://api.cardcenter.by" >{t('invoicesSiteTariffsMain.list.linkAPI')}</Link>
                </p>
            </div>

            <div className="aam_invoices-site-tariffs-main__wrapper">
                <h3 className="aam_invoices-site-tariffs-main__wrapper--title">{t('invoicesSiteTariffsMain.wrapper1.title')}</h3>
                <p className="aam_invoices-site-tariffs-main__wrapper--sub-title">{t('invoicesSiteTariffsMain.wrapper1.subTitle')}</p>
            </div>

            {/* API Tariffs PDF */}
            <div className="aam_invoices-site-tariffs-main__wrapper">
                <h2 className="aam_invoices-site-tariffs-main__wrapper--service-card-header">{t('invoicesSiteTariffsMain.serviceCardHeader')}</h2>
                <ServiceCard
                    className="aam_invoices-site-tariffs-main__wrapper--service-card"
                    Icon={PdfIcon}
                    title={t('invoicesSiteTariffsMain.cardTitle1')}
                    description=''
                    link={`${baseUrl}/assets/documents/1.pdf`}
                    onClick={() =>
                        handlePdfClick(
                            t('invoicesSiteTariffsMain.cardTitle1'),
                            `${baseUrl}/assets/documents/1.pdf`
                        )
                    }
                />
            </div>

            <div className="aam_invoices-site-tariffs-main__wrapper">
                <h3 className="aam_invoices-site-tariffs-main__wrapper--title">{t('invoicesSiteTariffsMain.wrapper2.title')}</h3>
                <div className="aam_invoices-site-tariffs-main__wrapper--container">
                    <div className="aam_invoices-site-tariffs-main__wrapper--container-block">
                        <h3 className="aam_invoices-site-tariffs-main__wrapper--container-block-color-title">{t('invoicesSiteTariffsMain.cont1.title')}</h3>
                        <h4 className="aam_invoices-site-tariffs-main__wrapper--container-block-sub-title">{t('invoicesSiteTariffsMain.cont1.subTitle')}</h4>
                        <ul className="aam_invoices-site-tariffs-main__wrapper--container-block-list">
                            <li>{t('invoicesSiteTariffsMain.cont1.listItem1')}</li>
                            <li>{t('invoicesSiteTariffsMain.cont1.listItem2')}</li>
                            <li>{t('invoicesSiteTariffsMain.cont1.listItem3')}</li>
                        </ul>
                    </div>
                    <div className="aam_invoices-site-tariffs-main__wrapper--container-block">
                        <h3 className="aam_invoices-site-tariffs-main__wrapper--container-block-color-title">{t('invoicesSiteTariffsMain.cont2.title')}</h3>
                        <h4 className="aam_invoices-site-tariffs-main__wrapper--container-block-sub-title">{t('invoicesSiteTariffsMain.cont2.subTitle')}</h4>
                        <ul className="aam_invoices-site-tariffs-main__wrapper--container-block-list">
                            <li>{t('invoicesSiteTariffsMain.cont2.listItem1')}</li>
                            <li>{t('invoicesSiteTariffsMain.cont2.listItem2')}</li>
                            <li>{t('invoicesSiteTariffsMain.cont2.listItem3')}</li>
                        </ul>
                    </div>
                    <div className="aam_invoices-site-tariffs-main__wrapper--container-block">
                        <h3 className="aam_invoices-site-tariffs-main__wrapper--container-block-color-title">{t('invoicesSiteTariffsMain.cont3.title')}</h3>
                        <h4 className="aam_invoices-site-tariffs-main__wrapper--container-block-sub-title">{t('invoicesSiteTariffsMain.cont3.subTitle')}</h4>
                        <ul className="aam_invoices-site-tariffs-main__wrapper--container-block-list">
                            <li>{t('invoicesSiteTariffsMain.cont3.listItem1')}</li>
                            <li>{t('invoicesSiteTariffsMain.cont3.listItem2')}</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Кнопки навигации по сайту */}
            <div className="aam_invoices-site-tariffs-main__site-nav">
                <Link to="/" className="home-link">
                    <LeftArrowIcon className="icon" />
                    {t("invoicesSiteTariffsMain.homeLink")}
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
                    {t("invoicesSiteTariffsMain.upLink")}
                </button>
            </div>
        </main>
    );
};

export default InvoicesSiteTariffsMain;
