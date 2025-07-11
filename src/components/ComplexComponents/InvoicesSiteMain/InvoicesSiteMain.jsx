import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LinkArrowIcon from '../../SVGIcons/LinkArrowIcon';
import LeftArrowIcon from '../../SVGIcons/LeftArrowIcon';
import UpArrowInCircleIcon from '../../SVGIcons/UpArrowInCircleIcon';
import InvoicesSiteImage from '/assets/images/Invoices-site.png';
import '../../../styles/components/ComplexComponents/InvoicesSiteMain.scss';

function InvoicesSiteMain() {
  const { t } = useTranslation();

  return (
    <main className="aam_invoices-site-main">
      {/* Breadcrumbs */}
      <div className="aam_invoices-site-main__breadcrumbs">
        <Link to="/">{t('breadCrumbs.home')}</Link>
        {' '}
        /
        {' '}
        <Link to="/equipment">{t('breadCrumbs.equipment')}</Link>
        {' '}
        /
        {' '}
        {t('breadCrumbs.invoicesSite')}
      </div>

      {/* Title */}
      <h1 className="aam_invoices-site-main__header">{t('invoicesSiteMain.name')}</h1>
      <Link to="https://xn--q1agiw.xn--90ais/" target="_blank" rel="noopener noreferrer">
        <div className="aam_invoices-site-main__site-link">
          <h2 className="aam_invoices-site-main__site-link--title">{t('invoicesSiteMain.siteLink')}</h2>
          <LinkArrowIcon />
        </div>
      </Link>

      {/* Description */}
      <div className="aam_invoices-site-main__image">
        <img src={InvoicesSiteImage} alt={t('invoicesSiteMain.altAndTitle')} title={t('invoicesSiteMain.altAndTitle')} />
      </div>

      <p className="aam_invoices-site-main__description">{t('invoicesSiteMain.description')}</p>

      <div className="aam_invoices-site-main__wrapper">
        <h3 className="aam_invoices-site-main__wrapper--title">{t('invoicesSiteMain.list1.title')}</h3>
        <ul className="aam_invoices-site-main__wrapper--list">
          <li>{t('invoicesSiteMain.list1.listItem1')}</li>
          <li>{t('invoicesSiteMain.list1.listItem2')}</li>
          <li>{t('invoicesSiteMain.list1.listItem3')}</li>
        </ul>
      </div>

      <div className="aam_invoices-site-main__wrapper">
        <h3 className="aam_invoices-site-main__wrapper--title">{t('invoicesSiteMain.list2.title')}</h3>
        <ul className="aam_invoices-site-main__wrapper--list">
          <li>{t('invoicesSiteMain.list2.listItem1')}</li>
          <li>{t('invoicesSiteMain.list2.listItem2')}</li>
          <li>{t('invoicesSiteMain.list2.listItem3')}</li>
          <li>{t('invoicesSiteMain.list2.listItem4')}</li>
          <li>{t('invoicesSiteMain.list2.listItem5')}</li>
          <li>{t('invoicesSiteMain.list2.listItem6')}</li>
        </ul>
      </div>

      <div className="aam_invoices-site-main__wrapper">
        <h3 className="aam_invoices-site-main__wrapper--title">{t('invoicesSiteMain.list3.title')}</h3>
        <ul className="aam_invoices-site-main__wrapper--list">
          <li>{t('invoicesSiteMain.list3.listItem1')}</li>
          <li>
            {t('invoicesSiteMain.list3.listItem2')}
            <ul className="aam_invoices-site-main__wrapper--sub-list">
              <li>{t('invoicesSiteMain.list3.listItem2Details.item1')}</li>
              <li>{t('invoicesSiteMain.list3.listItem2Details.item2')}</li>
              <li>{t('invoicesSiteMain.list3.listItem2Details.item3')}</li>
              <li>{t('invoicesSiteMain.list3.listItem2Details.item4')}</li>
            </ul>
          </li>
          <li>
            {t('invoicesSiteMain.list3.listItem3')}
            <ul className="aam_invoices-site-main__wrapper--sub-list">
              <li>{t('invoicesSiteMain.list3.listItem3Details.item1')}</li>
              <li>{t('invoicesSiteMain.list3.listItem3Details.item2')}</li>
              <li>{t('invoicesSiteMain.list3.listItem3Details.item3')}</li>
              <li>{t('invoicesSiteMain.list3.listItem3Details.item4')}</li>
              <li>{t('invoicesSiteMain.list3.listItem3Details.item5')}</li>
              <li>{t('invoicesSiteMain.list3.listItem3Details.item6')}</li>
              <li>{t('invoicesSiteMain.list3.listItem3Details.item7')}</li>
              <li>{t('invoicesSiteMain.list3.listItem3Details.item8')}</li>
              <li>{t('invoicesSiteMain.list3.listItem3Details.item9')}</li>
              <li>{t('invoicesSiteMain.list3.listItem3Details.item10')}</li>
              <li>{t('invoicesSiteMain.list3.listItem3Details.item11')}</li>
              <li>{t('invoicesSiteMain.list3.listItem3Details.item12')}</li>
              <li>{t('invoicesSiteMain.list3.listItem3Details.item13')}</li>
              <li>{t('invoicesSiteMain.list3.listItem3Details.item14')}</li>
              <li>{t('invoicesSiteMain.list3.listItem3Details.item15')}</li>
              <li>{t('invoicesSiteMain.list3.listItem3Details.item16')}</li>
              <li>{t('invoicesSiteMain.list3.listItem3Details.item17')}</li>
              <li>{t('invoicesSiteMain.list3.listItem3Details.item18')}</li>
              <li>{t('invoicesSiteMain.list3.listItem3Details.item19')}</li>
              <li>{t('invoicesSiteMain.list3.listItem3Details.item20')}</li>
              <li>{t('invoicesSiteMain.list3.listItem3Details.item21')}</li>
            </ul>
          </li>
        </ul>
      </div>

      <div className="aam_invoices-site-main__minus-margin">
        <ul>
          <li><h4>{t('invoicesSiteMain.list4.listItem1')}</h4></li>
          <li><h4>{t('invoicesSiteMain.list4.listItem2')}</h4></li>
          <li><h4>{t('invoicesSiteMain.list4.listItem3')}</h4></li>
          <li><h4>{t('invoicesSiteMain.list4.listItem4')}</h4></li>
          <li><h4>{t('invoicesSiteMain.list4.listItem5')}</h4></li>
          <li><h4>{t('invoicesSiteMain.list4.listItem6')}</h4></li>
          <li><h4>{t('invoicesSiteMain.list4.listItem7')}</h4></li>
        </ul>
      </div>

      <div className="aam_invoices-site-main__wrapper">
        <h3 className="aam_invoices-site-main__wrapper--title">{t('invoicesSiteMain.list5.title')}</h3>
        <p className="aam_invoices-site-main__wrapper--sub-title">{t('invoicesSiteMain.list5.subTitle')}</p>
        <ul className="aam_invoices-site-main__wrapper--list">
          <li>{t('invoicesSiteMain.list5.listItem1')}</li>
          <li>{t('invoicesSiteMain.list5.listItem2')}</li>
          <li>{t('invoicesSiteMain.list5.listItem3')}</li>
          <li>{t('invoicesSiteMain.list5.listItem4')}</li>
          <li>{t('invoicesSiteMain.list5.listItem5')}</li>
          <li>{t('invoicesSiteMain.list5.listItem6')}</li>
        </ul>
      </div>

      <div className="aam_invoices-site-main__wrapper">
        <h3 className="aam_invoices-site-main__wrapper--color-title">{t('invoicesSiteMain.list6.title')}</h3>
        <p className="aam_invoices-site-main__wrapper--sub-title">{t('invoicesSiteMain.list6.firstSubTitle')}</p>
        <p className="aam_invoices-site-main__wrapper--sub-title">{t('invoicesSiteMain.list6.secondSubTitle')}</p>
        <ul className="aam_invoices-site-main__wrapper--list">
          <li>{t('invoicesSiteMain.list6.listItem1')}</li>
          <li>{t('invoicesSiteMain.list6.listItem2')}</li>
        </ul>
      </div>

      <div className="aam_invoices-site-main__wrapper">
        <h3 className="aam_invoices-site-main__wrapper--color-title">{t('invoicesSiteMain.list7.title')}</h3>
        <p className="aam_invoices-site-main__wrapper--sub-title">
          {t('invoicesSiteMain.list7.subTitle')}
          {' '}
          <Link to="/equipment/invoicesSiteTariffs" className="aam_invoices-site-main__wrapper--color-link">{t('breadCrumbs.invoicesSiteTariffs')}</Link>
          {' '}
          <LinkArrowIcon />
        </p>
      </div>

      <div className="aam_invoices-site-main__wrapper">
        <h3 className="aam_invoices-site-main__wrapper--title">{t('invoicesSiteMain.list8.title')}</h3>
        <p className="aam_invoices-site-main__wrapper--sub-title">
          {t('invoicesSiteMain.list8.firstSubTitle')}
          {' '}
          <span className="aam_invoices-site-main__wrapper--color-span">{t('invoicesSiteMain.list8.colorSpan')}</span>
        </p>
        <p className="aam_invoices-site-main__wrapper--sub-title">{t('invoicesSiteMain.list8.secondSubTitle')}</p>
      </div>

      {/* Кнопки навигации по сайту */}
      <div className="aam_invoices-site-main__site-nav">
        <Link to="/" className="home-link">
          <LeftArrowIcon className="icon" />
          {t('invoicesSiteMain.homeLink')}
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
          {t('invoicesSiteMain.upLink')}
        </button>
      </div>
    </main>
  );
}

export default InvoicesSiteMain;
