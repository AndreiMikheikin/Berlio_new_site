import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import LinkButton from "../../LinkButton/LinkButton";
import LeftArrowIcon from "../../SVGIcons/LeftArrowIcon";
import NavigationDropdown from "../../NavigationDropdown/NavigationDropdown";
import UpArrowInCircleIcon from "../../SVGIcons/UpArrowInCircleIcon";
import "../../../styles/components/ComplexComponents/SignAndResignSection.scss";
import { useTranslation } from "react-i18next";

const SignAndResignSection = () => {
    const { t } = useTranslation();

    const [openDropdown, setOpenDropdown] = useState(null);

    const dropdownRefs = useRef({});

    const handleToggle = (index) => {
        const dropdown = dropdownRefs.current[index];
        
        if (!dropdown) return;
    
        // Получаем текущую позицию для первого dropdown
        if (openDropdown === index) {
            setOpenDropdown(null);
        } else {
            // Если открываем первый dropdown
            const { top } = dropdown.getBoundingClientRect();
            let offset;
            
            // Для первого dropdown (без учета позиции на экране)
            if (index === 1) {
                offset = window.scrollY; // просто scrollY для первого dropdown
            } else {
                // Для второго dropdown добавляем top
                offset = window.scrollY + top; 
            }
    
            setOpenDropdown(index);
    
            // Прокручиваем до нужной позиции
            setTimeout(() => {
                window.scrollTo({ top: offset });
            }, 0);
        }
    };

    return (
        <section className="aam_sign-and-resign-section">
            {/* Заголовок */}
            <h2 className="aam_sign-and-resign-section__title">
                {t("signAndResignSection.name")}
            </h2>

            {/* Описание */}
            <p className="aam_sign-and-resign-section__description">
                {t("signAndResignSection.description")}
            </p>

            {/* Варианты оформления с выпадающими списками */}
            <div className="aam_sign-and-resign-section__dropdown-section"
                ref={el => dropdownRefs.current[1] = el}
            >
                <NavigationDropdown
                    label={
                        <>
                            {t("signAndResignSection.dropdown1")}{" "}
                            <a href="https://lkb.by" target="_blank" rel="noopener noreferrer">
                                {t("signAndResignSection.link")}
                            </a>{":"}
                        </>
                    }
                    isOpen={openDropdown === 1}
                    closedColor='black'
                    openColor='black'
                    hoverColor='black'
                    onToggle={() => handleToggle(1)}
                    onClose={() => setOpenDropdown(null)}
                />
                <div
                    className={`aam_sign-and-resign-section__self-sign-list ${openDropdown === 1 ? "open" : ""}`}
                >
                    <ul>
                        <li>{t("signAndResignSection.selfSignList.item1")}</li>
                        <li>{t("signAndResignSection.selfSignList.item2")}</li>
                        <li>{t("signAndResignSection.selfSignList.item3")}</li>
                        <li>{t("signAndResignSection.selfSignList.item4")}</li>
                        <ol>
                            <li>{t("signAndResignSection.selfSignList.orderedItem1")}</li>
                            <li>{t("signAndResignSection.selfSignList.orderedItem2")}</li>
                            <li>{t("signAndResignSection.selfSignList.orderedItem3")}</li>
                            <li>{t("signAndResignSection.selfSignList.orderedItem4")}</li>
                            <li>{t("signAndResignSection.selfSignList.orderedItem5")}</li>
                            <li>{t("signAndResignSection.selfSignList.orderedItem6")}</li>
                            <li>{t("signAndResignSection.selfSignList.orderedItem7")}</li>
                            <li>{t("signAndResignSection.selfSignList.orderedItem8")}</li>
                            <li>{t("signAndResignSection.selfSignList.orderedItem9")}</li>
                            <li>{t("signAndResignSection.selfSignList.orderedItem10")}</li>
                            <li>{t("signAndResignSection.selfSignList.orderedItem11")}</li>
                            <li>{t("signAndResignSection.selfSignList.orderedItem12")}</li>
                            <li>{t("signAndResignSection.selfSignList.orderedItem13")}</li>
                            <li>{t("signAndResignSection.selfSignList.orderedItem14")}</li>
                            <li>{t("signAndResignSection.selfSignList.orderedItem15")}</li>
                            <li>{t("signAndResignSection.selfSignList.orderedItem16")}</li>
                            <li>{t("signAndResignSection.selfSignList.orderedItem17")}</li>
                        </ol>
                    </ul>
                    <p><strong className="aam_sign-and-resign-section__self-sign-footer">{t("signAndResignSection.selfSignList.footer")}</strong></p>
                    <p><strong className="aam_sign-and-resign-section__self-sign-secondary-footer">{t("signAndResignSection.selfSignList.secondaryFooter")}</strong></p>
                </div>
            </div>
            <div className="aam_sign-and-resign-section__dropdown-section"
                ref={el => dropdownRefs.current[2] = el}
            >
                <NavigationDropdown
                    label={t("signAndResignSection.dropdown2")}
                    isOpen={openDropdown === 2}
                    closedColor='black'
                    openColor='black'
                    hoverColor='black'
                    onToggle={() => handleToggle(2)}
                    onClose={() => setOpenDropdown(null)}
                />
                <div
                    className={`aam_sign-and-resign-section__customer-service-sign-list ${openDropdown === 2 ? "open" : ""}`}
                >
                    <ul>
                        <li>{t("signAndResignSection.customerServiceSignList.item1")}</li>
                        <li>{t("signAndResignSection.customerServiceSignList.item2")}</li>
                        <li>{t("signAndResignSection.customerServiceSignList.item3")}</li>
                        <li>{t("signAndResignSection.customerServiceSignList.item4")}</li>
                        <li>{t("signAndResignSection.customerServiceSignList.item5")}</li>
                        <li>{t("signAndResignSection.customerServiceSignList.item6")}</li>
                        <li>{t("signAndResignSection.customerServiceSignList.item7")}</li>
                    </ul>
                </div>
            </div>

            {/* О договоре присоединения */}
            <div className="aam_sign-and-resign-section__deal-fact">
                <strong>{t('signAndResignSection.dealFact')}</strong>
                <ul>
                    <li>{t('signAndResignSection.dealFactList.item1')}</li>
                    <li>{t('signAndResignSection.dealFactList.item2')}</li>
                    <li>{t('signAndResignSection.dealFactList.item3')}</li>
                </ul>
            </div>

            {/* footer секции */}
            <p className="aam_sign-and-resign-section__footer">
                <strong>
                    {t('signAndResignSection.footer.beforeTel')}{" "}
                    <a href={`tel:+375 29 623 08 88`}>{t('signAndResignSection.footer.tel1')}</a>{" "}
                    {t('signAndResignSection.footer.betweenTels')}{" "}
                    <a href={`tel:+375 17 210 00 00`}>{t('signAndResignSection.footer.tel2')}</a>{"."}
                    {t('signAndResignSection.footer.afterTel')}
                </strong>
            </p>

            {/* Кнопка перехода на сайт */}
            <LinkButton href="/#/contacts" target="_self" className="green">
                {t("signAndResignSection.contactsLink")}
            </LinkButton>

            {/* Кнопки навигации по сайту */}
            <div className="aam_sign-and-resign-section__site-nav">
                <Link to="/" className="home-link">
                    <LeftArrowIcon className="icon" />
                    {t("signAndResignSection.homeLink")}
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
                    {t("signAndResignSection.upLink")}
                </button>
            </div>
        </section>
    );
};

export default SignAndResignSection;
