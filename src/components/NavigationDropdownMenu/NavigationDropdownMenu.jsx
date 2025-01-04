import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '../SVGIcons/CloseIcon'; // Импорт иконки закрытия
import '../../styles/components/NavigationDropdownMenu.scss';

const menuContent = {
    partners: [
      {
        title: "Прикладные программы и ПО",
        links: [
          { href: "https://berliosoft.by/webcenterberlio/#block744", text: "ПО “Веб Центр БЕРЛИО”", target: "_blank" },
          { href: "https://berliosoft.by/neftikapital/", text: "ППП “НЕФТЬ И КАПИТАЛ”", target: "_blank" },
          { href: "https://berliosoft.by/kassasamoobsluzhivaniyadlyaazs/#b1316", text: "Касса самообслуживания для сетей АЗС", target: "_blank" },
          { href: "https://berliosoft.by/sistemaatomatizatsiiazs/#block840", text: "ППП “Система автоматизации АЗС”", target: "_blank" },
          { href: "https://berliosoft.by/ETF/", text: "Сайт для выставления счетов-фактур", target: "_blank" }
        ]
      },
      {
        title: "Полезная информация",
        links: [
          { href: "/NOLINK", text: "Голосовая справочно-информационная служба", target: "" },
          { href: "/NOLINK", text: "Программа лояльности", target: "" },
          { href: "/NOLINK", text: "Документы для скачивания", target: "" },
          { href: "/NOLINK", text: "Правила платежной системы электронных денег «БЕРЛИО»", target: "" },
          { href: "/NOLINK", text: "Информация для банка", target: "" }
        ]
      }
    ],
    clients: [
      {
        title: "Электронная платежная система",
        links: [
          { href: "#link1", text: "Заключение и перезаключение договора", target: "" },
          { href: "#link2", text: "Получение эл.карточки", target: "" },
          { href: "#link3", text: "Использование эл.карточки", target: "" },
          { href: "#link4", text: "Расторжение договора", target: "" },
          { href: "#link5", text: "Прейскурант и тарифы", target: "" },
          { href: "#link6", text: "Работа с личным кабинетом", target: "" },
          { href: "#link7", text: "Документы для скачивания", target: "" }
        ]
      },
      {
        title: "Топливные карты и АЗС",
        links: [
          { href: "https://map.berlio.by", text: "АЗС и маршруты", target: "_blank" },
          { href: "#link9", text: "Использование топливных карт", target: "" },
          { href: "#link10", text: "Платные дороги (BelToll)", target: "" },
          { href: "#link11", text: "Оплата за топливо", target: "" }
        ]
      },
      {
        title: "Нормативные документы",
        links: [
          { href: "#link12", text: "Электронные деньги “БЕРЛИО” ОАО “Белгазпромбанк”. Правила", target: "" },
          { href: "#link13", text: "Регламент использования электронных денег “БЕРЛИО” 2", target: "" }
        ]
      },
      {
        title: "Сервисы и ПО",
        links: [
          { href: "#link14", text: "Приложение “Berlio Internet client”", target: "" },
          { href: "https://berliosoft.by/berliocardpay/", text: "Приложение “BERLIOCARDPAY”", target: "_blank" },
          { href: "https://tatbelneft.by/news/?ELEMENT_ID=174", text: "Приложение “АЗС ТАТНЕФТЬ BY”", target: "_blank" },
          { href: "https://berliosoft.by/kassasamoobsluzhivaniyadlyaazs/#b1316", text: "Касса самообслуживания для сетей АЗС", target: "_blank" },
          { href: "https://berliosoft.by/polichnyykabinetklienta/", text: "ПО “Личный кабинет клиента”", target: "_blank" }
        ]
      }
    ]
  };

const NavigationDropdownMenu = ({ isOpen, menuId, currentOpenMenu, onClose }) => {
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

  return (
    <div
      className={`aam_navigation-dropdown-menu ${isVisible ? '' : 'hidden'} aam_navigation-dropdown-menu__${menuId}`}
    >
      {/* Кнопка закрытия */}
      <button className="aam_navigation-dropdown-menu__close" onClick={onClose}>
        <CloseIcon />
      </button>

      {/* Контент меню с анимацией */}
      <div className={`aam_navigation-dropdown-menu__content ${isContentVisible ? 'is-visible' : ''}`}>
        {content.map((section, index) => (
          <div key={index} className="aam_navigation-dropdown-menu__block">
            <h2>{section.title}</h2>
            <ul>
              {section.links.map((link, idx) => (
                <li key={idx}><a href={link.href}>{link.text}</a></li>
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
