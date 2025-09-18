import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import CloseIcon from '../SVGIcons/CloseIcon';
import '../../styles/components/NavigationDropdownMenu.scss';

const menuContent = {
  partners: [
    {
      title: 'appliedProgramsAndSoftware',
      links: [
        {
          href: '/equipment/webCenterBerlio',
          text: 'webCenterBerlio',
          target: '_self',
        },
        {
          href: '/equipment/oilAndCapital',
          text: 'oilAndCapital',
          target: '_self',
        },
        {
          href: '/equipment/selfServiceCheckout',
          text: 'selfServiceCashRegister',
          target: '_self',
        },
        {
          href: '/equipment/gsAutomationSystem',
          text: 'gasStationAutomationSystem',
          target: '_self',
        },
        {
          href: '/equipment/invoicesSite',
          text: 'invoiceWebsite',
          target: '_self',
        },
      ],
    },
    {
      title: 'usefulInformation',
      links: [
        {
          href: '/partners/voiceRefService',
          text: 'voiceInfoService',
          target: '_self',
        },
        {
          href: '/partners/loyaltyProgram',
          text: 'loyaltyProgram',
          target: '_self',
        },
        {
          href: '/partners/documentsForDownload',
          text: 'downloadableDocuments',
          target: '_self',
        },
        {
          href: '/partners/systemRules',
          text: 'berlioPaymentRules',
          target: '_self',
        },
        {
          href: '/partners/forBankInformation',
          text: 'bankInformation',
          target: '_self',
        },
      ],
    },
  ],
  clients: [
    {
      title: 'electronicBerlioCards',
      links: [
        {
          href: '/clients/serviceInEPS',
          text: 'serviceInEPS',
          target: '_self',
        },
        {
          href: '/clients/forFuelPayments',
          text: 'goodsAndServicePayment',
          target: '_self',
        },
        {
          href: '/clients/signAndResign',
          text: 'contractConclusion',
          target: '_self',
        },
        {
          href: '/clients/documentsForDownload',
          text: 'documentsForDownload',
          target: '_self',
        },
        {
          href: '/clients/gettingElectronicCard',
          text: 'gettingElectronicCard',
          target: '_self',
        },
        {
          href: '/clients/workWithPrivateAccount',
          text: 'personalAccountUsage',
          target: '_self',
        },
      ],
    },
    {
      title: 'fuelBerlioCards',
      links: [
        {
          href: '/clients/tollRoadsService',
          text: 'tollRoadsService',
          target: '_blank',
        },
        {
          href: '/clients/tollRoadsPayment',
          text: 'tollRoadsPayment',
          target: '_self',
        },
        {
          href: '/clients/tollRoads',
          text: 'tollRoads',
          target: '_self',
        },
        {
          href: '/clients/forFuelPayments',
          text: 'fuelPayment',
          target: '_self',
        },
        {
          href: '/clients/fuelCardsUsage',
          text: 'fuelCardUsage',
          target: '_self',
        },
      ],
    },
    {
      title: 'regulatoryDocuments',
      links: [
        {
          href: '/clients/lowAndRegulatory',
          text: 'lowAndRegulatory',
          target: '_self',
        },
        {
          href: '/clients/IFRReport',
          text: 'IFRReport',
          target: '_self',
        },
        {
          href: '/clients/localActsInEPS',
          text: 'localActsInEPS',
          target: '_self',
        },
      ],
    },
    {
      title: 'servicesAndSoftware',
      links: [
        /* {
          href: '/equipment/berlioInternetClientApp',
          text: 'berlioInternetClient',
          target: '_self',
        }, */
        {
          href: '/equipment/berlioCardPayApp',
          text: 'berlioCardPayApp',
          target: '_self',
        },
        {
          href: '/equipment/smartPayApp',
          text: 'smartPayApp',
          target: '_self',
        },
        {
          href: '/equipment/selfServiceCheckout',
          text: 'selfServiceCashRegister',
          target: '_self',
        },
        {
          href: '/equipment/personalAccWebApp',
          text: 'clientCabinetSoftware',
          target: '_self',
        },
      ],
    },
  ],

  // ВЕРСИЯ МЕНЮ КЛИЕНТОВ 1.0.0
  /* clients: [
    {
      title: 'electronicPaymentSystem',
      links: [
        {
          href: '/clients/signAndResign',
          text: 'contractConclusion',
          target: '_self',
        },
        {
          href: '/clients/gettingElectronicCard',
          text: 'eCardReceipt',
          target: '_self',
        },
        {
          href: '/clients/cardUsageRules',
          text: 'eCardUsage',
          target: '_self',
        },
        {
          href: '/clients/dealResignation',
          text: 'contractTermination',
          target: '_self',
        },
        {
          href: '/clients/priceListsAndTariffs',
          text: 'ratesAndTariffs',
          target: '_self',
        },
        {
          href: '/clients/workWithPrivateAccount',
          text: 'personalAccountUsage',
          target: '_self',
        },
        {
          href: '/clients/documentsForDownload',
          text: 'downloadableDocuments',
          target: '_self',
        },
      ],
    },
    {
      title: 'fuelCardsAndGasStations',
      links: [
        {
          href: 'https://map.berlio.by',
          text: 'gasStationsAndRoutes',
          target: '_blank',
        },
        {
          href: '/clients/plasticCardUsageRules',
          text: 'fuelCardUsage',
          target: '_self',
        },
        {
          href: '/clients/tollRoads',
          text: 'tollRoads',
          target: '_self',
        },
        {
          href: '/clients/forFuelPayments',
          text: 'fuelPayment',
          target: '_self',
        },
      ],
    },
    {
      title: 'regulatoryDocuments',
      links: [
        {
          href: '/clients/issuerRules',
          text: 'berlioEWalletRules',
          target: '_self',
        },
        {
          href: '/clients/eMoneyRegulations',
          text: 'berlioUsageRegulations',
          target: '_self',
        },
      ],
    },
    {
      title: 'servicesAndSoftware',
      links: [
        {
          href: '/equipment/berlioInternetClientApp',
          text: 'berlioInternetClient',
          target: '_self',
        },
        {
          href: '/equipment/berlioCardPayApp',
          text: 'berlioCardPayApp',
          target: '_self',
        },
        {
          href: '/equipment/smartPayApp',
          text: 'smartPayApp',
          target: '_self',
        },
        {
          href: '/equipment/selfServiceCheckout',
          text: 'selfServiceCashRegister',
          target: '_self',
        },
        {
          href: '/equipment/personalAccWebApp',
          text: 'clientCabinetSoftware',
          target: '_self',
        },
      ],
    },
  ], */
};

function NavigationDropdownMenu({
  isOpen, menuId, currentOpenMenu, onClose,
}) {
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

  const isProduction = process.env.NODE_ENV === 'production';
  const baseUrl = isProduction ? (process.env.PUBLIC_URL || '') : '';

  return (
    <div
      className={`aam_navigation-dropdown-menu ${isVisible ? '' : 'hidden'} aam_navigation-dropdown-menu__${menuId}`}
    >
      {/* Кнопка закрытия */}
      <button type="button" className="aam_navigation-dropdown-menu__close" aria-label={t('closeMenu')} onClick={onClose}>
        <CloseIcon />
      </button>

      {/* Контент меню с анимацией */}
      <div className={`aam_navigation-dropdown-menu__content ${isContentVisible ? 'is-visible' : ''}`}>
        {content.map((section) => (
          <div key={section.title} className="aam_navigation-dropdown-menu__block">
            <h2>{t(section.title)}</h2>
            <ul>
              {section.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href.startsWith('http') ? link.href : `${baseUrl}${link.href}`}
                    target={link.target || (link.href.startsWith('http') ? '_blank' : '_self')}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {t(link.text)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

NavigationDropdownMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired, // Общее состояние, открыт ли какой-либо Dropdown
  menuId: PropTypes.string.isRequired, // Уникальный идентификатор этого меню
  currentOpenMenu: PropTypes.string, // Идентификатор текущего открытого меню
  onClose: PropTypes.func.isRequired, // Функция для закрытия меню
};

export default NavigationDropdownMenu;
