import React__default, { useRef, useEffect, useState } from "react";
import { B as Button, H as Helmet } from "./entry-server.js";
import { useTranslation } from "react-i18next";
import { L as LinkTo, H as Header, N as Navigation, S as SearchInput, F as Footer, a as SecondaryFooter } from "./SecondaryFooter.js";
import { S as ServiceCard } from "./ServiceCard.js";
import { O as OilIcon } from "./OilIcon.js";
import { P as PaymentCardIcon } from "./PaymentCardIcon.js";
import { M as MapIcon } from "./MapIcon.js";
import { useNavigate } from "react-router";
import { P as PdfIcon } from "./PdfIcon.js";
import PropTypes from "prop-types";
import { n as newsDataFallback } from "./newsData.js";
import { L as LeftArrowIcon } from "./LeftArrowIcon.js";
import { R as RightArrowIcon, L as LogoSection, p as partnersLogos } from "./partnersLogoData.js";
import "react-dom/server";
import "@remix-run/router";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "stream";
import "i18next";
import "react-dom";
import "uuid";
import "./index.js";
import "./UpArrowInCircleIcon.js";
const mainBlockJPG = "/assets/images/mainBlock.jpg";
function SparklingLights() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const lightSources = [
      {
        x: 250,
        y: 10,
        radius: 9,
        opacity: Math.random(),
        speed: Math.random() * 0.02 + 0.01
      },
      {
        x: 270,
        y: 13,
        radius: 12,
        opacity: Math.random(),
        speed: Math.random() * 0.02 + 0.01
      },
      {
        x: 615,
        y: 129,
        radius: 25,
        opacity: Math.random(),
        speed: Math.random() * 0.02 + 0.01
      }
    ];
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = 1180;
    const width = 1180;
    canvas.height = 464;
    const height = 464;
    const backgroundImage = new Image();
    backgroundImage.src = mainBlockJPG;
    backgroundImage.loading = "eager";
    let lights = [...lightSources];
    const drawLights = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(backgroundImage, 0, 0, width, height);
      lights = lights.map((light) => {
        let newOpacity = light.opacity + light.speed;
        let newSpeed = light.speed;
        if (newOpacity > 1 || newOpacity < 0) {
          newSpeed = -newSpeed;
          newOpacity = light.opacity + newSpeed;
        }
        const updatedLight = { ...light, opacity: newOpacity, speed: newSpeed };
        const gradient = ctx.createRadialGradient(
          updatedLight.x,
          updatedLight.y,
          0,
          updatedLight.x,
          updatedLight.y,
          updatedLight.radius
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${updatedLight.opacity * 0.8})`);
        gradient.addColorStop(0.5, `rgba(255, 255, 255, ${updatedLight.opacity * 0.4})`);
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.beginPath();
        ctx.arc(updatedLight.x, updatedLight.y, updatedLight.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        return updatedLight;
      });
      requestAnimationFrame(drawLights);
    };
    backgroundImage.onload = () => {
      drawLights();
    };
    const resizeHandler = () => {
      canvas.width = 1180;
      canvas.height = 464;
      if (backgroundImage.complete) {
        ctx.drawImage(backgroundImage, 0, 0, width, height);
      }
    };
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);
  return /* @__PURE__ */ React__default.createElement("div", { className: "aam_sparkling-container" }, /* @__PURE__ */ React__default.createElement("canvas", { ref: canvasRef, className: "aam_canvas" }));
}
function MainBlock() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement("main", { className: "aam_main-block" }, /* @__PURE__ */ React__default.createElement("header", { className: "aam_main-block__header" }, /* @__PURE__ */ React__default.createElement("h1", null, t("mainBlock.companyName")), /* @__PURE__ */ React__default.createElement(SparklingLights, null)), /* @__PURE__ */ React__default.createElement("section", { className: "aam_main-block__services" }, /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      Icon: OilIcon,
      title: t("mainBlock.headline"),
      description: t("mainBlock.tagline"),
      link: "/clients/signAndResign"
    }
  ), /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      Icon: PaymentCardIcon,
      title: t("mainBlock.fuelCardUsage"),
      description: t("mainBlock.belTollServices"),
      link: "/clients/plasticCardUsageRules"
    }
  ), /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      Icon: MapIcon,
      title: t("mainBlock.nonResidentServices"),
      description: t("mainBlock.nonResidentSupport"),
      link: "/clients/nonResidentsSupport"
    }
  )), /* @__PURE__ */ React__default.createElement("footer", { className: "aam_main-block__footer" }, /* @__PURE__ */ React__default.createElement(LinkTo, { href: "/about", text: t("mainBlock.readMore") })));
}
const GasStationPNG = "/assets/images/gas-station.png";
function PaymentSystem() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/clients/signAndResign");
  };
  return /* @__PURE__ */ React__default.createElement("section", { className: "aam_payment-system" }, /* @__PURE__ */ React__default.createElement("h2", { className: "aam_payment-system__title" }, t("paymentSystem.name")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_payment-system__description" }, t("paymentSystem.coverage"), /* @__PURE__ */ React__default.createElement("br", null), t("paymentSystem.cardDescription")), /* @__PURE__ */ React__default.createElement(
    Button,
    {
      label: t("paymentSystem.actionSignContract"),
      onClick: handleButtonClick,
      variant: "green"
    }
  ), /* @__PURE__ */ React__default.createElement("div", { className: "aam_payment-system__image" }, /* @__PURE__ */ React__default.createElement("img", { src: GasStationPNG, alt: t("paymentSystem.gasStations"), loading: "lazy" })));
}
const RoadJPG = "/assets/images/road.jpg";
function FuelCards() {
  const { t } = useTranslation();
  const handleLinkClick = (title, link) => {
    const linkElement = document.createElement("a");
    linkElement.href = link;
    linkElement.download = title;
    linkElement.click();
  };
  return /* @__PURE__ */ React__default.createElement("section", { className: "aam_fuel-cards" }, /* @__PURE__ */ React__default.createElement("h2", { className: "aam_fuel-cards__title" }, t("fuelCards.name")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_fuel-cards__content" }, /* @__PURE__ */ React__default.createElement("div", { className: "aam_fuel-cards__description" }, t("fuelCards.fuelCardsDescription1")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_fuel-cards__description" }, t("fuelCards.fuelCardsDescription2"))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_fuel-cards__image" }, /* @__PURE__ */ React__default.createElement("img", { src: RoadJPG, alt: t("fuelCards.road"), loading: "lazy" })), /* @__PURE__ */ React__default.createElement(
    ServiceCard,
    {
      Icon: PdfIcon,
      title: t("fuelCards.cardTitle"),
      link: "/assets/documents/1.pdf",
      onClick: () => handleLinkClick(
        t("fuelCards.cardTitle"),
        "/assets/documents/1.pdf"
      )
    }
  ));
}
const actual1 = "/assets/images/actual1.jpg";
const actual2 = "/assets/images/actual2.jpg";
const actual3 = "/assets/images/actual3.jpg";
function ActualBlock({
  title,
  description,
  imageUrl,
  href
}) {
  return /* @__PURE__ */ React__default.createElement("div", { className: "aam_actual-block" }, /* @__PURE__ */ React__default.createElement("img", { src: imageUrl, alt: title, className: "aam_actual-block__image", loading: "lazy" }), /* @__PURE__ */ React__default.createElement("div", { className: "aam_actual-block__content" }, /* @__PURE__ */ React__default.createElement("h3", { className: "aam_actual-block__title" }, title), /* @__PURE__ */ React__default.createElement("p", { className: "aam_actual-block__description" }, description), /* @__PURE__ */ React__default.createElement(
    LinkTo,
    {
      href,
      text: ""
    }
  )));
}
ActualBlock.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired
};
function ActualSection() {
  const { t } = useTranslation();
  return /* @__PURE__ */ React__default.createElement("section", { className: "aam_actual-section" }, /* @__PURE__ */ React__default.createElement("h2", { className: "aam_actual-section__title" }, t("actualSection.name")), /* @__PURE__ */ React__default.createElement("div", { className: "aam_actual-section__blocks" }, /* @__PURE__ */ React__default.createElement(
    ActualBlock,
    {
      title: t("actualSection.actualBlockTitle1"),
      description: t("actualSection.actualBlockDescription1"),
      imageUrl: actual1,
      href: "https://map.berlio.by/"
    }
  ), /* @__PURE__ */ React__default.createElement(
    ActualBlock,
    {
      title: t("actualSection.actualBlockTitle2"),
      description: t("actualSection.actualBlockDescription2"),
      imageUrl: actual2,
      href: "/contacts"
    }
  ), /* @__PURE__ */ React__default.createElement(
    ActualBlock,
    {
      title: t("actualSection.actualBlockTitle3"),
      description: t("actualSection.actualBlockDescription3"),
      imageUrl: actual3,
      href: "https://map.berlio.by/"
    }
  )));
}
function NewsSection() {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const currentDate = /* @__PURE__ */ new Date();
  const isValidDate = (startDate, expireDate) => {
    const start = startDate ? new Date(startDate) : null;
    const expire = expireDate ? new Date(expireDate) : null;
    return start === null && (expire === null || currentDate <= expire) || expire === null && start !== null && currentDate >= start || start !== null && expire !== null && currentDate >= start && currentDate <= expire;
  };
  const newsArray = Object.keys(newsDataFallback).map((id) => ({
    id: parseInt(id, 10),
    // Преобразуем ID в число для сортировки
    ...newsDataFallback[id]
  }));
  const sortedNews = newsArray.filter((newsItem) => isValidDate(
    newsItem.dates.startDate,
    newsItem.dates.expireDate
  )).sort((a, b) => {
    if (a.priority !== b.priority) {
      return a.priority === "A" ? -1 : 1;
    }
    const dateDiff = new Date(b.dates.date) - new Date(a.dates.date);
    if (dateDiff !== 0) {
      return dateDiff;
    }
    return a.id - b.id;
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredNews = sortedNews[currentIndex] || null;
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + sortedNews.length) % sortedNews.length);
  };
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % sortedNews.length);
  };
  return /* @__PURE__ */ React__default.createElement("section", { className: "aam_news-section" }, /* @__PURE__ */ React__default.createElement("h2", { className: "aam_news-section__title" }, t("newsSection.name")), featuredNews && /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement("div", { className: "aam_news-section__news-block" }, /* @__PURE__ */ React__default.createElement("h3", { className: "aam_news-section__news-title" }, featuredNews.titles[currentLanguage] || featuredNews.titles.ru), /* @__PURE__ */ React__default.createElement("p", { className: "aam_news-section__news-date" }, new Date(featuredNews.dates.date).toLocaleDateString(currentLanguage, {
    year: "numeric",
    month: "long",
    day: "numeric"
  }))), /* @__PURE__ */ React__default.createElement("div", { className: "aam_news-section__navigation" }, /* @__PURE__ */ React__default.createElement(
    "button",
    {
      type: "button",
      className: "aam_news-section__nav-button",
      onClick: handlePrev
    },
    /* @__PURE__ */ React__default.createElement(LeftArrowIcon, null)
  ), /* @__PURE__ */ React__default.createElement(
    "button",
    {
      type: "button",
      className: "aam_news-section__nav-button",
      onClick: handleNext
    },
    /* @__PURE__ */ React__default.createElement(RightArrowIcon, null)
  ), /* @__PURE__ */ React__default.createElement(
    LinkTo,
    {
      className: "aam_news-section__link-to",
      href: `/news/${featuredNews.slug || featuredNews.id}`,
      text: t("newsSection.linkToNews")
    }
  ))));
}
function Home() {
  const { t } = useTranslation();
  process.env.NODE_ENV === "production";
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(Helmet, null, /* @__PURE__ */ React__default.createElement("title", null, t("pageTitles.home")), /* @__PURE__ */ React__default.createElement("meta", { name: "description", content: "Описание компании Берлио" }), /* @__PURE__ */ React__default.createElement("meta", { name: "keywords", content: "Берлио, Главная" }), /* @__PURE__ */ React__default.createElement("meta", { name: "author", content: "AndreiMikheikin" })), /* @__PURE__ */ React__default.createElement(Header, null), /* @__PURE__ */ React__default.createElement(Navigation, null), /* @__PURE__ */ React__default.createElement(SearchInput, { placeholder: t("search") }), /* @__PURE__ */ React__default.createElement(NewsSection, null), /* @__PURE__ */ React__default.createElement(MainBlock, null), /* @__PURE__ */ React__default.createElement(PaymentSystem, null), /* @__PURE__ */ React__default.createElement(FuelCards, null), /* @__PURE__ */ React__default.createElement(ActualSection, null), /* @__PURE__ */ React__default.createElement(
    LogoSection,
    {
      title: t("ourPartnersLogoSection.name"),
      logos: partnersLogos.logos,
      logoBasePath: "/assets/images/",
      customClass: "aam_home-logo-section"
    }
  ), /* @__PURE__ */ React__default.createElement(Footer, null), /* @__PURE__ */ React__default.createElement(SecondaryFooter, null));
}
export {
  Home as default
};
