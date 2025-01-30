import React, { useState, useRef, useEffect } from "react";
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
    const [dropdownPositions, setDropdownPositions] = useState({});
    const [isFixed, setIsFixed] = useState(false);

    const dropdownRefs = useRef({});

    // Запоминаем позиции dropdown после рендера
    useEffect(() => {
        const positions = {};
        Object.keys(dropdownRefs.current).forEach(index => {
            const el = dropdownRefs.current[index];
            if (el) positions[index] = el.getBoundingClientRect().top + window.scrollY;
        });
        setDropdownPositions(positions);
    }, []);

    // Открытие/закрытие dropdown
    const handleToggle = (index) => {
        setOpenDropdown(prev => (prev === index ? null : index));
    };

    const handleDropdownClick = (index) => {
        if (index === 2) {
            const firstDropdown = dropdownRefs.current[1];
            const secondDropdown = dropdownRefs.current[2];
    
            const firstDropdownHeight = firstDropdown?.offsetHeight || 0;
            const secondDropdownHeight = secondDropdown?.offsetHeight || 0;
    
            let offset = window.scrollY;
    
            if (openDropdown === 1) {
                // Первый открыт → он схлопнется → scrollY уменьшится
                offset -= firstDropdownHeight;
            } else {
                // Первый закрыт → корректируем, но вычитаем высоту второго
                offset = dropdownPositions[2] - dropdownPositions[1] + window.scrollY - secondDropdownHeight;
            }
    
            // Выполняем прокрутку
            window.scrollTo({ top: offset, behavior: "smooth" });
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
                    onToggle={() => {
                        handleDropdownClick(1);
                        handleToggle(1);
                    }}
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
                    onToggle={() => {
                        handleDropdownClick(2);
                        handleToggle(2);
                    }}
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
