import React from "react";
import { Link } from "react-router-dom";
import CardBox from "../../CardBox/CardBox";
import ServiceCard from '../../ServiceCard/ServiceCard';
import ClientIcon from "../../SVGIcons/ClientIcon";
import PdfIcon from "../../SVGIcons/PdfIcon";
import '../../../styles/components/ComplexComponents/SignAndResignMain.scss';

import { useTranslation } from 'react-i18next';

const SignAndResignMain = () => {
    const { t } = useTranslation();

    const handleLinkClick = (title, link) => {
        const linkElement = document.createElement('a');
        linkElement.href = link;
        linkElement.download = title;
        linkElement.click();
    };

    return (
        <main className="aam_sign-and-resign">
            {/* Breadcrumbs */}
            <div className="aam_sign-and-resign__breadcrumbs">
                <Link to="/">{t('breadCrumbs.home')}</Link> /{' '}
                <Link to="/clients">{t('breadCrumbs.forClients')}</Link> /{' '}
                {t('breadCrumbs.signAndResign')}
            </div>

            {/* Title */}
            <h1 className="aam_sign-and-resign__header">{t('signAndResignMain.name')}</h1>

            {/* Description */}
            <div className="aam_sign-and-resign__description">
                <p>{t('signAndResignMain.description')}</p>
                <strong>{t('signAndResignMain.purposeBeforeLink')}<a href="https://map.berlio.by" target="_blank">{t('signAndResignMain.purposeLink')}</a>{t('signAndResignMain.purposeAfterLink')} </strong>
                <ul>
                    <li>{t('signAndResignMain.list1.item1')}</li>
                    <li>{t('signAndResignMain.list1.item2')}</li>
                    <li>{t('signAndResignMain.list1.item3')}</li>
                    <li>{t('signAndResignMain.list1.item4')}</li>
                </ul>
            </div>

            {/* Participants */}
            <h2 className="aam_sign-and-resign__participants">{t('signAndResignMain.participants')}</h2>
            <div className="aam_sign-and-resign__card-boxes">
                <CardBox
                    CSSSelectorPrefix="aam_sign-and-resign"
                    Icon={ClientIcon}
                    title={t("signAndResignMain.operator")}
                    description={t("signAndResignMain.operatorTagline")}
                />
                <CardBox
                    CSSSelectorPrefix="aam_sign-and-resign"
                    Icon={ClientIcon}
                    title={t("signAndResignMain.agents")}
                    description={t("signAndResignMain.agentsTagline")}
                />
                <CardBox
                    CSSSelectorPrefix="aam_sign-and-resign"
                    Icon={ClientIcon}
                    title={t("signAndResignMain.emissioner")}
                    description={t("signAndResignMain.emissionerTagline")}
                />
                <CardBox
                    CSSSelectorPrefix="aam_sign-and-resign"
                    Icon={ClientIcon}
                    title={t("signAndResignMain.tradeAndServiceObject")}
                    description={t("signAndResignMain.tradeAndServiceObjectTagline")}
                />
                <CardBox
                    CSSSelectorPrefix="aam_sign-and-resign"
                    Icon={ClientIcon}
                    title={t("signAndResignMain.serviseCenter")}
                    description={t("signAndResignMain.serviseCenterTagline")}
                />
            </div>

            {/* Customer Service & System Usage Reasons */}
            <div className="aam_sign-and-resign__customer-service">
                <strong>{t('signAndResignMain.customerService')}</strong>
                <ul>
                    <li>{t('signAndResignMain.list2.item1')}</li>
                    <li>{t('signAndResignMain.list2.item2')}</li>
                </ul>
            </div>

            {/* System Usage*/}
            <div className="aam_sign-and-resign__system-usage">
                <strong>{t('signAndResignMain.systemUsage')}</strong>
                <ul>
                    <li>{t('signAndResignMain.list3.item1')}</li>
                    <li>{t('signAndResignMain.list3.item2')}</li>
                    <li>{t('signAndResignMain.list3.item3')}</li>
                </ul>
            </div>

            <div className="aam_sign-and-resign__documents">
                <h2 className="aam_sign-and-resign__documents-title">{t('signAndResignMain.documentsTitle')}</h2>
                <div className="aam_sign-and-resign__operator-documents">
                    <h3 className="aam_sign-and-resign__operator-documents-title">{t('signAndResignMain.operatorDocumentsTitle')}</h3>
                    <div className="aam_sign-and-resign__card-boxes">
                        <ServiceCard
                            className="aam_sign-and-resign__service-card"
                            Icon={PdfIcon}
                            title={t('signAndResignMain.cardTitle1')}
                            description=''
                            link="/assets/documents/1.pdf"
                            onClick={() =>
                                handleLinkClick(
                                    t('signAndResignMain.cardTitle1'),
                                    '/assets/documents/1.pdf'
                                )
                            }
                        />
                        <ServiceCard
                            className="aam_sign-and-resign__service-card"
                            Icon={PdfIcon}
                            title={t('signAndResignMain.cardTitle2')}
                            description=''
                            link="/assets/documents/1.pdf"
                            onClick={() =>
                                handleLinkClick(
                                    t('signAndResignMain.cardTitle2'),
                                    '/assets/documents/1.pdf'
                                )
                            }
                        />
                        <ServiceCard
                            className="aam_sign-and-resign__service-card"
                            Icon={PdfIcon}
                            title={t('signAndResignMain.cardTitle3')}
                            description=''
                            link="/assets/documents/1.pdf"
                            onClick={() =>
                                handleLinkClick(
                                    t('signAndResignMain.cardTitle3'),
                                    '/assets/documents/1.pdf'
                                )
                            }
                        />
                    </div>
                    <div className="aam_sign-and-resign__emissioner-documents">
                        <h3 className="aam_sign-and-resign__emissioner-documents-title">{t('signAndResignMain.emissionerDocumentsTitle')}</h3>
                        <div className="aam_sign-and-resign__card-boxes">
                            <ServiceCard
                                className="aam_sign-and-resign__service-card"
                                Icon={PdfIcon}
                                title={t('signAndResignMain.cardTitle4')}
                                description=''
                                link="/assets/documents/1.pdf"
                            onClick={() =>
                                handleLinkClick(
                                    t('signAndResignMain.cardTitle4'),
                                    '/assets/documents/1.pdf'
                                )
                            }
                            />
                            <ServiceCard
                                className="aam_sign-and-resign__service-card"
                                Icon={PdfIcon}
                                title={t('signAndResignMain.cardTitle5')}
                                description=''
                                link="/assets/documents/1.pdf"
                            onClick={() =>
                                handleLinkClick(
                                    t('signAndResignMain.cardTitle5'),
                                    '/assets/documents/1.pdf'
                                )
                            }
                            />
                        </div>
                    </div>
                </div>
            </div>
            <p className="aam_sign-and-resign__footer">{t('signAndResignMain.footer')}</p>
        </main>
    );
};

export default SignAndResignMain;