import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Deps from '../../../data/departmentAdresses.json';
import PdfIcon from '../../SVGIcons/PdfIcon';
import LinkButton from '../../LinkButton/LinkButton';
import LeftArrowIcon from '../../SVGIcons/LeftArrowIcon';
import NavigationDropdown from '../../NavigationDropdown/NavigationDropdown';
import UpArrowInCircleIcon from '../../SVGIcons/UpArrowInCircleIcon';
import docSign from '/assets/images/docSign.jpg';
import '../../../styles/components/ComplexComponents/SignAndResignSection.scss';

function SignAndResignSection() {
  const { t } = useTranslation();

  const [openDropdown, setOpenDropdown] = useState(null);
  const [dropdownPositions, setDropdownPositions] = useState({});

  const dropdownRefs = useRef({});

  const handlePdfClick = (title, link) => {
    const linkElement = document.createElement('a');
    linkElement.href = link;
    linkElement.download = title.endsWith('.pdf') ? title : `${title}.pdf`; // Добавляем расширение, если его нет
    document.body.appendChild(linkElement);
    linkElement.click();
    document.body.removeChild(linkElement);
  };

  const handleLinkClick = (link) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  // Запоминаем позиции dropdown после рендера
  useEffect(() => {
    const positions = {};
    Object.keys(dropdownRefs.current).forEach((index) => {
      const el = dropdownRefs.current[index];
      if (el) positions[index] = el.getBoundingClientRect().top + window.scrollY;
    });
    setDropdownPositions(positions);
  }, []);

  // Открытие/закрытие dropdown
  const handleToggle = (index) => {
    setOpenDropdown((prev) => (prev === index ? null : index));
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
        offset = dropdownPositions[2] - dropdownPositions[1]
          + window.scrollY - secondDropdownHeight;
      }

      // Выполняем прокрутку
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  };

  const replacePlaceholders = (phone) =>
    phone
      .replace("{{fax}}", t("fax"))
      .replace("{{telFax}}", t("telFax"));

  const isProduction = process.env.NODE_ENV === 'production';
  const baseUrl = isProduction ? (process.env.PUBLIC_URL || '') : '';

  return (
    <main className="aam_sign-and-resign-section">

      {/* Breadcrumbs */}
      <div className="aam_sign-and-resign-section__breadcrumbs">
        <Link to="/">{t('breadCrumbs.home')}</Link>
        {' '}
        /
        {' '}
        <Link to="/clients">{t('breadCrumbs.forClients')}</Link>
        {' '}
        /
        {' '}
        {t('breadCrumbs.signAndResign')}
      </div>

      {/* Заголовок */}
      <h1 className="aam_sign-and-resign-section__title">
        {t('signAndResignSection.nameOLD')} {/* временно */}
        {/* {t('signAndResignSection.name')} */}
      </h1>

      {/* Описание */}
      {/* <p className="aam_sign-and-resign-section__description">
        {t('signAndResignSection.description')}
      </p> */}

      {/* Варианты оформления с выпадающими списками */}
      {/* <div
        className="aam_sign-and-resign-section__dropdown-section"
        ref={(el) => { dropdownRefs.current[1] = el; }}
      >
        <NavigationDropdown
          label={(
            <>
              {t('signAndResignSection.dropdown1')}
              {' '}
              <a href="https://lkb.by" target="_blank" rel="noopener noreferrer">
                {t('signAndResignSection.link')}
              </a>
              :
            </>
                      )}
          isOpen={openDropdown === 1}
          closedColor="black"
          openColor="black"
          hoverColor="black"
          onToggle={() => {
            handleDropdownClick(1);
            handleToggle(1);
          }}
          onClose={() => setOpenDropdown(null)}
        />
        <div
          className={`aam_sign-and-resign-section__self-sign-list ${openDropdown === 1 ? 'open' : ''}`}
        >
          <ul>
            <li>{t('signAndResignSection.selfSignList.item1')}</li>
            <li>{t('signAndResignSection.selfSignList.item2')}</li>
            <li>{t('signAndResignSection.selfSignList.item3')}</li>
            <li>{t('signAndResignSection.selfSignList.item4')}</li>
            <ol>
              <li>{t('signAndResignSection.selfSignList.orderedItem1')}</li>
              <li>{t('signAndResignSection.selfSignList.orderedItem2')}</li>
              <li>{t('signAndResignSection.selfSignList.orderedItem3')}</li>
              <li>{t('signAndResignSection.selfSignList.orderedItem4')}</li>
              <li>{t('signAndResignSection.selfSignList.orderedItem5')}</li>
              <li>{t('signAndResignSection.selfSignList.orderedItem6')}</li>
              <li>{t('signAndResignSection.selfSignList.orderedItem7')}</li>
              <li>{t('signAndResignSection.selfSignList.orderedItem8')}</li>
              <li>{t('signAndResignSection.selfSignList.orderedItem9')}</li>
              <li>{t('signAndResignSection.selfSignList.orderedItem10')}</li>
              <li>{t('signAndResignSection.selfSignList.orderedItem11')}</li>
              <li>{t('signAndResignSection.selfSignList.orderedItem12')}</li>
              <li>{t('signAndResignSection.selfSignList.orderedItem13')}</li>
              <li>{t('signAndResignSection.selfSignList.orderedItem14')}</li>
              <li>{t('signAndResignSection.selfSignList.orderedItem15')}</li>
              <li>{t('signAndResignSection.selfSignList.orderedItem16')}</li>
              <li>{t('signAndResignSection.selfSignList.orderedItem17')}</li>
            </ol>
          </ul>
          <p><strong className="aam_sign-and-resign-section__self-sign-footer">{t('signAndResignSection.selfSignList.footer')}</strong></p>
          <p><strong className="aam_sign-and-resign-section__self-sign-secondary-footer">{t('signAndResignSection.selfSignList.secondaryFooter')}</strong></p>
        </div>
      </div>
      <div
        className="aam_sign-and-resign-section__dropdown-section"
        ref={(el) => { dropdownRefs.current[2] = el; }}
      >
        <NavigationDropdown
          label={t('signAndResignSection.dropdown2')}
          isOpen={openDropdown === 2}
          closedColor="black"
          openColor="black"
          hoverColor="black"
          onToggle={() => {
            handleDropdownClick(2);
            handleToggle(2);
          }}
          onClose={() => setOpenDropdown(null)}
        />
        <div
          className={`aam_sign-and-resign-section__customer-service-sign-list ${openDropdown === 2 ? 'open' : ''}`}
        >
          <ul>
            <li>{t('signAndResignSection.customerServiceSignList.item1')}</li>
            <li>{t('signAndResignSection.customerServiceSignList.item2')}</li>
            <li>{t('signAndResignSection.customerServiceSignList.item3')}</li>
            <li>{t('signAndResignSection.customerServiceSignList.item4')}</li>
            <li>{t('signAndResignSection.customerServiceSignList.item5')}</li>
            <li>{t('signAndResignSection.customerServiceSignList.item6')}</li>
            <li>{t('signAndResignSection.customerServiceSignList.item7')}</li>
          </ul>
        </div>
      </div> */}

      {/* Описание временное */}
      <div className="aam_sign-and-resign-section__description">
        <p>{t('signAndResignSection.descriptionOLD.item1')}</p>

        <ol>
          <li>
            <strong>{t('signAndResignSection.descriptionOLD.item2')}</strong>
            {t('signAndResignSection.descriptionOLD.item3')}
          </li>
          <li>
            <strong>{t('signAndResignSection.descriptionOLD.item4')}</strong>
            {t('signAndResignSection.descriptionOLD.item5')}
          </li>
        </ol>

        <p>
          <strong>{t('signAndResignSection.descriptionOLD.item6')}</strong>
          {t('signAndResignSection.descriptionOLD.item7')}
          <strong>{t('signAndResignSection.descriptionOLD.item8')}</strong>
          {t('signAndResignSection.descriptionOLD.item9')}
          <a
            href="https://belgazprombank.by/about/bankomaty_i_ofisy/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://belgazprombank.by
          </a>
        </p>

        <img src={docSign} alt={t('signAndResignSection.descriptionOLD.item9-5')} title={t('signAndResignSection.descriptionOLD.item9-5')} className="aam_sign-and-resign-section__image" />
        <ul>
          <li>
            <strong>{t('signAndResignSection.descriptionOLD.item10')}</strong>
            <ul>
              <li>
                {t('signAndResignSection.descriptionOLD.item10-5')}
                {' '}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(
                      "/assets/documents/Договор присоединения Клиента к обслуживанию в электронной платежной системе «Берлио».pdf"
                    );
                  }}
                >
                  {t('signAndResignSection.descriptionOLD.item10-6')}
                </a>
                {' '}
                {t('signAndResignSection.descriptionOLD.item10-7')}
                {' '}
                <a
                  href="/clients/ServiceInEPS#LPADocs">
                  {t('signAndResignSection.descriptionOLD.item10-8')}
                </a>
                {' '}
                {t('signAndResignSection.descriptionOLD.item10-9')}
                {' , '}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(
                      "/assets/documents/Заявление о присоединении к договору присоединения (общая форма).pdf"
                    );
                  }}
                >
                  {t('signAndResignSection.descriptionOLD.item10-10')}
                </a>
                {' '}
                {t('signAndResignSection.descriptionOLD.item11')}
              </li>
              <li>{t('signAndResignSection.descriptionOLD.item12')}</li>
              <li>{t('signAndResignSection.descriptionOLD.item13')}</li>
              <li>
                {t('signAndResignSection.descriptionOLD.item14')}
                {' '}
                <a
                  href='#docs'
                >
                  {t('signAndResignSection.descriptionOLD.item14-1')}
                </a>
                {' '}
                {t('signAndResignSection.descriptionOLD.item14-2')}
              </li>
              <li>
                {t('signAndResignSection.descriptionOLD.item15')}
                {/* О договоре присоединения */}
                <p className="aam_sign-and-resign-section__deal-fact">
                  <strong>{t('signAndResignSection.dealFact')}</strong>
                </p>
                <ul>
                  <li>{t('signAndResignSection.dealFactList.item1')}</li>
                  <li>{t('signAndResignSection.dealFactList.item2')}</li>
                  <li>{t('signAndResignSection.dealFactList.item3')}</li>
                </ul>
              </li>

            </ul>
          </li>

          <li>
            <strong id='docs'>{t('signAndResignSection.descriptionOLD.item16')}</strong>

            <ul className="aam_sign-and-resign-section__doc-list">
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePdfClick(
                      t('documentsForDownloadMain.lsts.cardTitle1'),
                      `${baseUrl}/assets/documents/Список документов для заключения Договора присоединения.pdf`
                    );
                  }}
                  target="_blank"
                  rel="noreferrer"
                >
                  <PdfIcon className="aam_sign-and-resign-section__doc-icon" />
                  <span>{t('documentsForDownloadMain.lsts.cardTitle1')}</span>
                </a>
              </li>
            </ul>

            {/* <ul>
              <li>
                {t('signAndResignSection.descriptionOLD.item17')}
                {' '}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(
                      "/assets/documents/Договор присоединения Клиента к обслуживанию в электронной платежной системе «Берлио».pdf"
                    );
                  }}
                >
                  {t('signAndResignSection.descriptionOLD.item17-1')}
                </a>
              </li>
              <li>{t('signAndResignSection.descriptionOLD.item18')}</li>
              <li>{t('signAndResignSection.descriptionOLD.item19')}</li>
              <li>{t('signAndResignSection.descriptionOLD.item20')}</li>
              <li>{t('signAndResignSection.descriptionOLD.item21')}</li>
              <li>{t('signAndResignSection.descriptionOLD.item22')}</li>
              <li>{t('signAndResignSection.descriptionOLD.item23')}</li>
              <li>
                {t('signAndResignSection.descriptionOLD.item24')}
                {' '}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePdfClick(
                      "Согласие на получение документов в электронном виде с ЭЦП.pdf",
                      "/assets/documents/Согласие на получение документов в электронном виде с ЭЦП.pdf"
                    );
                  }}
                >
                  {t('signAndResignSection.descriptionOLD.item24-5')}
                </a>
              </li>
              <li>
                {t('signAndResignSection.descriptionOLD.item25')}
                {' '}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePdfClick(
                      "Заявление на внесение изменений в личном кабинете.pdf",
                      "/assets/documents/Заявление на внесение изменений в личном кабинете.pdf"
                    );
                  }}
                >
                  {t('signAndResignSection.descriptionOLD.item25-5')}
                </a>
              </li>
              <li>
                {t('signAndResignSection.descriptionOLD.item25-6')}
              </li>
            </ul> */}
          </li>

          <li>
            <strong>{t('signAndResignSection.descriptionOLD.item27')}</strong>
            <ul>
              <li>
                <a
                  href="https://belgazprombank.by/korporativnim_klientam/raschetno_kassovoe_obsluzhivani/berlio-ur/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://belgazprombank.by/korporativnim_klientam/raschetno_kassovoe_obsluzhivani/berlio-ur/
                </a>
              </li>
            </ul>
          </li>
          <li><strong>{t('signAndResignSection.descriptionOLD.item28')}</strong></li>
        </ul>

        <div className="aam_sign-and-resign-section__contacts">
          <table className="aam_sign-and-resign-section__contacts-table">
            <thead>
              <tr>
                <th>{t('signAndResignSection.table.thead1')}</th>
                <th>{t('signAndResignSection.table.thead2')}</th>
                <th>{t('signAndResignSection.table.thead3')}</th>
              </tr>
            </thead>
            <tbody>
              {Deps.map((dep) => (
                <tr key={dep.id}>
                  <td>
                    <strong>{t(dep.departmentsName)}</strong>
                    <br />
                    {t('pageTitles./')}
                    <br />
                    {t(dep.footerAddress)}
                  </td>
                  <td>
                    {dep.phoneNumber.map((phone, i) => (
                      <div key={i}>{replacePlaceholders(phone)}</div>
                    ))}
                  </td>
                  <td>{dep.email?.[1] || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <strong className="aam_sign-and-resign-section__asside">{t('signAndResignSection.descriptionOLD.item26')}</strong>

      </div>

      {/* О договоре присоединения */}
      {/* <div className="aam_sign-and-resign-section__deal-fact">
        <strong>{t('signAndResignSection.dealFact')}</strong>
        <ul>
          <li>{t('signAndResignSection.dealFactList.item1')}</li>
          <li>{t('signAndResignSection.dealFactList.item2')}</li>
          <li>{t('signAndResignSection.dealFactList.item3')}</li>
        </ul>
      </div> */}

      {/* footer секции */}
      {/* <p className="aam_sign-and-resign-section__footer">
        <strong>
          {t('signAndResignSection.footer.beforeTel')}
          {' '}
          <a href="tel:+375 29 623 08 88">{t('signAndResignSection.footer.tel1')}</a>
          {' '}
          {t('signAndResignSection.footer.betweenTels')}
          {' '}
          <a href="tel:+375 17 210 00 00">{t('signAndResignSection.footer.tel2')}</a>
          .
          {t('signAndResignSection.footer.afterTel')}
        </strong>
      </p> */}

      {/* Кнопка перехода на сайт */}
      {/* <LinkButton href={`${baseUrl}/contacts`} target="_self" className="green">
        {t('signAndResignSection.contactsLink')}
      </LinkButton> */}

      {/* Кнопки навигации по сайту */}
      <div className="aam_sign-and-resign-section__site-nav">
        <Link to="/" className="home-link">
          <LeftArrowIcon className="icon" />
          {t('signAndResignSection.homeLink')}
        </Link>
        <button
          type="button"
          onClick={() => {
            const element = document.getElementById('header');
            if (element) {
              element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              });
            }
          }}
          className="secondary-link"
        >
          <UpArrowInCircleIcon className="icon" />
          {t('signAndResignSection.upLink')}
        </button>
      </div>
    </main>
  );
}

export default SignAndResignSection;
