import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '../SVGIcons/CloseIcon'; // Импорт иконки закрытия
import '../../styles/components/NavigationDropdownMenu.scss';

import { useTranslation } from 'react-i18next';

const menuContent = {
  "partners": [
    {
      "title": "appliedProgramsAndSoftware",
      "links": [
        {
          "href": "https://berliosoft.by/webcenterberlio/#block744",
          "text": "webCenterBerlio",
          "target": "_blank"
        },
        {
          "href": "https://berliosoft.by/neftikapital/",
          "text": "oilAndCapital",
          "target": "_blank"
        },
        {
          "href": "https://berliosoft.by/kassasamoobsluzhivaniyadlyaazs/#b1316",
          "text": "selfServiceCashRegister",
          "target": "_blank"
        },
        {
          "href": "https://berliosoft.by/sistemaatomatizatsiiazs/#block840",
          "text": "gasStationAutomationSystem",
          "target": "_blank"
        },
        {
          "href": "https://berliosoft.by/ETF/",
          "text": "invoiceWebsite",
          "target": "_blank"
        }
      ]
    },
    {
      "title": "usefulInformation",
      "links": [
        {
          "href": "/NOLINK",
          "text": "voiceInfoService",
          "target": ""
        },
        {
          "href": "/NOLINK",
          "text": "loyaltyProgram",
          "target": ""
        },
        {
          "href": "/NOLINK",
          "text": "downloadableDocuments",
          "target": ""
        },
        {
          "href": "/NOLINK",
          "text": "berlioPaymentRules",
          "target": ""
        },
        {
          "href": "/NOLINK",
          "text": "bankInformation",
          "target": ""
        }
      ]
    }
  ],
  "clients": [
    {
      "title": "electronicPaymentSystem",
      "links": [
        {
          "href": "/clients/signAndResign",
          "text": "contractConclusion",
          "target": "_self"
        },
        {
          "href": "/clients/gettingElectronicCard",
          "text": "eCardReceipt",
          "target": "_self"
        },
        {
          "href": "/clients/cardUsageRules",
          "text": "eCardUsage",
          "target": "_self"
        },
        {
          "href": "/clients/dealResignation",
          "text": "contractTermination",
          "target": "_self"
        },
        {
          "href": "/clients/priceListsAndTariffs",
          "text": "ratesAndTariffs",
          "target": "_self"
        },
        {
          "href": "/clients/workWithPrivateAccount",
          "text": "personalAccountUsage",
          "target": ""
        },
        {
          "href": "/clients/documentsForDownload",
          "text": "downloadableDocuments",
          "target": ""
        }
      ]
    },
    {
      "title": "fuelCardsAndGasStations",
      "links": [
        {
          "href": "https://map.berlio.by",
          "text": "gasStationsAndRoutes",
          "target": "_blank"
        },
        {
          "href": "#link9",
          "text": "fuelCardUsage",
          "target": ""
        },
        {
          "href": "#link10",
          "text": "tollRoads",
          "target": ""
        },
        {
          "href": "#link11",
          "text": "fuelPayment",
          "target": ""
        }
      ]
    },
    {
      "title": "regulatoryDocuments",
      "links": [
        {
          "href": "#link12",
          "text": "berlioEWalletRules",
          "target": ""
        },
        {
          "href": "#link13",
          "text": "berlioUsageRegulations",
          "target": ""
        }
      ]
    },
    {
      "title": "servicesAndSoftware",
      "links": [
        {
          "href": "#link14",
          "text": "berlioInternetClient",
          "target": ""
        },
        {
          "href": "https://berliosoft.by/berliocardpay/",
          "text": "berlioCardPayApp",
          "target": "_blank"
        },
        {
          "href": "https://tatbelneft.by/news/?ELEMENT_ID=174",
          "text": "tatneftApp",
          "target": "_blank"
        },
        {
          "href": "https://berliosoft.by/kassasamoobsluzhivaniyadlyaazs/#b1316",
          "text": "selfServiceCashRegister",
          "target": "_blank"
        },
        {
          "href": "https://berliosoft.by/polichnyykabinetklienta/",
          "text": "clientCabinetSoftware",
          "target": "_blank"
        }
      ]
    }
  ]
};

const NavigationDropdownMenu = ({ isOpen, menuId, currentOpenMenu, onClose }) => {
  const { t } = useTranslation();

  const [isContentVisible, setContentVisible] = useState(false);

  const isVisible = isOpen && currentOpenMenu === menuId;

  useEffect(() => {
    if (isVisible) {
      // Показываем контент после раскрытия меню
      setTimeout(() => setContentVisible(true), 300); // Задержка для анимации
    } else {
      setContentVisible(false); // Скрываем контент при закрытии меню
    }
  }, [isVisible]);

  const content = menuContent[menuId]; // Получаем контент для текущего меню

  if (!content) {
    return null; // Если меню не найдено, ничего не отображаем
  }

  const isProduction = process.env.NODE_ENV === "production";
  const baseUrl = isProduction ? `${process.env.PUBLIC_URL}/#` : "/#";

  return (
    <div
      className={`aam_navigation-dropdown-menu ${isVisible ? '' : 'hidden'} aam_navigation-dropdown-menu__${menuId}`}
    >
      {/* Кнопка закрытия */}
      <button className="aam_navigation-dropdown-menu__close" aria-label={t('closeMenu')} onClick={onClose}>
        <CloseIcon />
      </button>

      {/* Контент меню с анимацией */}
      <div className={`aam_navigation-dropdown-menu__content ${isContentVisible ? 'is-visible' : ''}`}>
        {content.map((section, index) => (
          <div key={index} className="aam_navigation-dropdown-menu__block">
            <h2>{t(section.title)}</h2>
            <ul>
              {section.links.map((link, idx) => (
                <li key={idx}><a href={`${baseUrl}${link.href}`}>{t(link.text)}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

NavigationDropdownMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired, // Общее состояние, открыт ли какой-либо Dropdown
  menuId: PropTypes.string.isRequired, // Уникальный идентификатор этого меню
  currentOpenMenu: PropTypes.string, // Идентификатор текущего открытого меню
  onClose: PropTypes.func.isRequired, // Функция для закрытия меню
};

export default NavigationDropdownMenu;
