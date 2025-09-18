import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LeftArrowIcon from '../../SVGIcons/LeftArrowIcon';
import UpArrowInCircleIcon from '../../SVGIcons/UpArrowInCircleIcon';
import ServiceCard from '../../ServiceCard/ServiceCard';
import DocxIcon from '../../SVGIcons/DocxIcon';
import PdfIcon from '../../SVGIcons/PdfIcon';
import '../../../styles/components/ComplexComponents/DocumentsForDownloadMain.scss';

function DocumentsForDownloadMain() {
  const { t } = useTranslation();

  const handlePdfClick = (title, link) => {
    const linkElement = document.createElement('a');
    linkElement.href = link;
    linkElement.download = title.endsWith('.pdf') ? title : `${title}.pdf`; // Добавляем расширение, если его нет
    document.body.appendChild(linkElement);
    linkElement.click();
    document.body.removeChild(linkElement);
  };

  const handleDocClick = (title, link) => {
    const linkElement = document.createElement('a');
    linkElement.href = link;
    linkElement.download = title.endsWith('.doc') ? title : `${title}.doc`; // Добавляем расширение, если его нет
    document.body.appendChild(linkElement);
    linkElement.click();
    document.body.removeChild(linkElement);
  };

  const isProduction = process.env.NODE_ENV === 'production';
  const baseUrl = isProduction ? (process.env.PUBLIC_URL || '') : '';

  return (
    <main className="aam_documents-for-download-main">
      {/* Breadcrumbs */}
      <div className="aam_documents-for-download-main__breadcrumbs">
        <Link to="/">{t('breadCrumbs.home')}</Link>
        {' '}
        /
        {' '}
        <Link to="/clients">{t('breadCrumbs.forClients')}</Link>
        {' '}
        /
        {' '}
        {t('breadCrumbs.documentsForDownload')}
      </div>

      {/* Title */}
      <h1 className="aam_documents-for-download-main__header">{t('documentsForDownloadMain.name')}</h1>

      {/* Lists */}
      <h2 className="aam_documents-for-download-main__boxes-header">{t('documentsForDownloadMain.boxesHeaders.lists')}</h2>
      <div className="aam_documents-for-download-main__card-boxes">
        <ServiceCard
          className="aam_documents-for-download-main__service-card"
          Icon={PdfIcon}
          title={t('documentsForDownloadMain.lsts.cardTitle1')}
          description=""
          link={`${baseUrl}/assets/documents/Список документов для заключения Договора присоединения.pdf`}
          onClick={() => handlePdfClick(
            t('documentsForDownloadMain.lsts.cardTitle1'),
            `${baseUrl}/assets/documents/Список документов для заключения Договора присоединения.pdf`,
          )}
        />
        <ServiceCard
          className="aam_documents-for-download-main__service-card"
          Icon={PdfIcon}
          title={t('documentsForDownloadMain.lsts.cardTitle2')}
          description=""
          link={`${baseUrl}/assets/documents/Список документов для заключения Договора пользования с ГУ  «Белавтострада» (BelToll).pdf`}
          onClick={() => handlePdfClick(
            t('documentsForDownloadMain.lsts.cardTitle2'),
            `${baseUrl}/assets/documents/Список документов для заключения Договора пользования с ГУ  «Белавтострада» (BelToll).pdf`,
          )}
        />
      </div>

      {/* Agreements */}
      <h2 className="aam_documents-for-download-main__boxes-header">{t('documentsForDownloadMain.boxesHeaders.agreements')}</h2>
      <div className="aam_documents-for-download-main__card-boxes">
        <ServiceCard
          className="aam_documents-for-download-main__service-card"
          Icon={PdfIcon}
          title={t('documentsForDownloadMain.agr.cardTitle1')}
          description=""
          link={`${baseUrl}/assets/documents/Соглашение о расторжении договора на обслуживание (организация).pdf`}
          onClick={() => handlePdfClick(
            t('documentsForDownloadMain.agr.cardTitle1'),
            `${baseUrl}/assets/documents/Соглашение о расторжении договора на обслуживание (организация).pdf`,
          )}
        />
        <ServiceCard
          className="aam_documents-for-download-main__service-card"
          Icon={PdfIcon}
          title={t('documentsForDownloadMain.agr.cardTitle2')}
          description=""
          link={`${baseUrl}/assets/documents/Соглашение о расторжении договора на обслуживание (ИП, уполномоченное лицо - родственник).pdf`}
          onClick={() => handlePdfClick(
            t('documentsForDownloadMain.agr.cardTitle2'),
            `${baseUrl}/assets/documents/Соглашение о расторжении договора на обслуживание (ИП, уполномоченное лицо - родственник).pdf`,
          )}
        />
        <ServiceCard
          className="aam_documents-for-download-main__service-card"
          Icon={PdfIcon}
          title={t('documentsForDownloadMain.agr.cardTitle3')}
          description=""
          link={`${baseUrl}/assets/documents/Соглашение о расторжении договора на обслуживание (ИП, уполномоченное лицо - работник).pdf`}
          onClick={() => handlePdfClick(
            t('documentsForDownloadMain.agr.cardTitle3'),
            `${baseUrl}/assets/documents/Соглашение о расторжении договора на обслуживание (ИП, уполномоченное лицо - работник).pdf`,
          )}
        />
        <ServiceCard
          className="aam_documents-for-download-main__service-card"
          Icon={PdfIcon}
          title={t('documentsForDownloadMain.agr.cardTitle4')}
          description=""
          link={`${baseUrl}/assets/documents/Соглашение о расторжении договора на обслуживание (ИП).pdf`}
          onClick={() => handlePdfClick(
            t('documentsForDownloadMain.agr.cardTitle4'),
            `${baseUrl}/assets/documents/Соглашение о расторжении договора на обслуживание (ИП).pdf`,
          )}
        />
      </div>

      {/* Registration Card */}
      <h2 className="aam_documents-for-download-main__boxes-header">{t('documentsForDownloadMain.boxesHeaders.regCard')}</h2>
      <div className="aam_documents-for-download-main__card-boxes">
        <ServiceCard
          className="aam_documents-for-download-main__service-card"
          Icon={PdfIcon}
          title={t('documentsForDownloadMain.rCard.cardTitle1')}
          description=""
          link={`${baseUrl}/assets/documents/Регистрационная карточка клиента_общая (для ознакомления).pdf`}
          onClick={() => handlePdfClick(
            t('documentsForDownloadMain.rCard.cardTitle1'),
            `${baseUrl}/assets/documents/Регистрационная карточка клиента_общая (для ознакомления).pdf`,
          )}
        />
      </div>

      {/* Applications */}
      <h2 className="aam_documents-for-download-main__boxes-header">{t('documentsForDownloadMain.boxesHeaders.applications')}</h2>
      <div className="aam_documents-for-download-main__card-boxes">
        <ServiceCard
          className="aam_documents-for-download-main__service-card"
          Icon={PdfIcon}
          title={t('documentsForDownloadMain.app.cardTitle1')}
          description=""
          link={`${baseUrl}/assets/documents/Заявление на получение «Справки-акта о реализации» подписанной ЭЦП.pdf`}
          onClick={() => handlePdfClick(
            t('documentsForDownloadMain.app.cardTitle1'),
            `${baseUrl}/assets/documents/Заявление на получение «Справки-акта о реализации» подписанной ЭЦП.pdf`,
          )}
        />
        <ServiceCard
          className="aam_documents-for-download-main__service-card"
          Icon={PdfIcon}
          title={t('documentsForDownloadMain.app.cardTitle2')}
          description=""
          link={`${baseUrl}/assets/documents/Заявление о блокировке, разблокировке лицевого счёта.pdf`}
          onClick={() => handlePdfClick(
            t('documentsForDownloadMain.app.cardTitle2'),
            `${baseUrl}/assets/documents/Заявление о блокировке, разблокировке лицевого счёта.pdf`,
          )}
        />
        <ServiceCard
          className="aam_documents-for-download-main__service-card"
          Icon={PdfIcon}
          title={t('documentsForDownloadMain.app.cardTitle3')}
          description=""
          link={`${baseUrl}/assets/documents/Заявление о блокировке, разблокировке средств доступа электронной платежной системы «Берлио».pdf`}
          onClick={() => handlePdfClick(
            t('documentsForDownloadMain.app.cardTitle3'),
            `${baseUrl}/assets/documents/Заявление о блокировке, разблокировке средств доступа электронной платежной системы «Берлио».pdf`,
          )}
        />
        <ServiceCard
          className="aam_documents-for-download-main__service-card"
          Icon={PdfIcon}
          title={t('documentsForDownloadMain.app.cardTitle4')}
          description=""
          link={`${baseUrl}/assets/documents/Заявление о возврате ошибочно перечисленной суммы денежных средств.pdf`}
          onClick={() => handlePdfClick(
            t('documentsForDownloadMain.app.cardTitle4'),
            `${baseUrl}/assets/documents/Заявление о возврате ошибочно перечисленной суммы денежных средств.pdf`,
          )}
        />
        <ServiceCard
          className="aam_documents-for-download-main__service-card"
          Icon={PdfIcon}
          title={t('documentsForDownloadMain.app.cardTitle5')}
          description=""
          link={`${baseUrl}/assets/documents/Заявление о закрытии лицевого счёта.pdf`}
          onClick={() => handlePdfClick(
            t('documentsForDownloadMain.app.cardTitle5'),
            `${baseUrl}/assets/documents/Заявление о закрытии лицевого счёта.pdf`,
          )}
        />
        <ServiceCard
          className="aam_documents-for-download-main__service-card"
          Icon={PdfIcon}
          title={t('documentsForDownloadMain.app.cardTitle6')}
          description=""
          link={`${baseUrl}/assets/documents/Заявление о запросе информации о ПИН-коде.pdf`}
          onClick={() => handlePdfClick(
            t('documentsForDownloadMain.app.cardTitle6'),
            `${baseUrl}/assets/documents/Заявление о запросе информации о ПИН-коде.pdf`,
          )}
        />
        <ServiceCard
          className="aam_documents-for-download-main__service-card"
          Icon={PdfIcon}
          title={t('documentsForDownloadMain.app.cardTitle7')}
          description=""
          link={`${baseUrl}/assets/documents/Заявление о переносе электронной карты с одного лицевого счёта на другой лицевой счёт.pdf`}
          onClick={() => handlePdfClick(
            t('documentsForDownloadMain.app.cardTitle7'),
            `${baseUrl}/assets/documents/Заявление о переносе электронной карты с одного лицевого счёта на другой лицевой счёт.pdf`,
          )}
        />
        <ServiceCard
          className="aam_documents-for-download-main__service-card"
          Icon={PdfIcon}
          title={t('documentsForDownloadMain.app.cardTitle8')}
          description=""
          link={`${baseUrl}/assets/documents/Заявление о перераспределении сумм между лицевыми счетами Клиента (перенос).pdf`}
          onClick={() => handlePdfClick(
            t('documentsForDownloadMain.app.cardTitle8'),
            `${baseUrl}/assets/documents/Заявление о перераспределении сумм между лицевыми счетами Клиента (перенос).pdf`,
          )}
        />
        <ServiceCard
          className="aam_documents-for-download-main__service-card"
          Icon={PdfIcon}
          title={t('documentsForDownloadMain.app.cardTitle9')}
          description=""
          link={`${baseUrl}/assets/documents/Заявление о перераспределении сумм между лицевыми счетами Клиента (распределение).pdf`}
          onClick={() => handlePdfClick(
            t('documentsForDownloadMain.app.cardTitle9'),
            `${baseUrl}/assets/documents/Заявление о перераспределении сумм между лицевыми счетами Клиента (распределение).pdf`,
          )}
        />
        <ServiceCard
          className="aam_documents-for-download-main__service-card"
          Icon={PdfIcon}
          title={t('documentsForDownloadMain.app.cardTitle10')}
          description=""
          link={`${baseUrl}/assets/documents/Заявление о присоединении к договору присоединения (ИП).pdf`}
          onClick={() => handlePdfClick(
            t('documentsForDownloadMain.app.cardTitle10'),
            `${baseUrl}/assets/documents/Заявление о присоединении к договору присоединения (ИП).pdf`,
          )}
        />
        <ServiceCard
          className="aam_documents-for-download-main__service-card"
          Icon={PdfIcon}
          title={t('documentsForDownloadMain.app.cardTitle11')}
          description=""
          link={`${baseUrl}/assets/documents/Заявление о присоединении к договору присоединения (ИП, уполномоченное лицо - работник).pdf`}
          onClick={() => handlePdfClick(
            t('documentsForDownloadMain.app.cardTitle11'),
            `${baseUrl}/assets/documents/Заявление о присоединении к договору присоединения (ИП, уполномоченное лицо - работник).pdf`,
          )}
        />
        <ServiceCard
          className="aam_documents-for-download-main__service-card"
          Icon={PdfIcon}
          title={t('documentsForDownloadMain.app.cardTitle12')}
          description=""
          link={`${baseUrl}/assets/documents/Заявление о присоединении к договору присоединения (ИП, уполномоченное лицо - родственник).pdf`}
          onClick={() => handlePdfClick(
            t('documentsForDownloadMain.app.cardTitle12'),
            `${baseUrl}/assets/documents/Заявление о присоединении к договору присоединения (ИП, уполномоченное лицо - родственник).pdf`,
          )}
        />
        <ServiceCard
          className="aam_documents-for-download-main__service-card"
          Icon={PdfIcon}
          title={t('documentsForDownloadMain.app.cardTitle13')}
          description=""
          link={`${baseUrl}/assets/documents/Заявление о присоединении к договору присоединения (организация).pdf`}
          onClick={() => handlePdfClick(
            t('documentsForDownloadMain.app.cardTitle13'),
            `${baseUrl}/assets/documents/Заявление о присоединении к договору присоединения (организация).pdf`,
          )}
        />
        <ServiceCard
          className="aam_documents-for-download-main__service-card"
          Icon={PdfIcon}
          title={t('documentsForDownloadMain.app.cardTitle14')}
          description=""
          link={`${baseUrl}/assets/documents/Заявление о расторжении договора.pdf`}
          onClick={() => handlePdfClick(
            t('documentsForDownloadMain.app.cardTitle14'),
            `${baseUrl}/assets/documents/Заявление о расторжении договора.pdf`,
          )}
        />
        <ServiceCard
          className="aam_documents-for-download-main__service-card"
          Icon={PdfIcon}
          title={t('documentsForDownloadMain.app.cardTitle15')}
          description=""
          link={`${baseUrl}/assets/documents/Заявление о регистрации транспортных средств в системе BelToll (2-3 оси).pdf`}
          onClick={() => handlePdfClick(
            t('documentsForDownloadMain.app.cardTitle15'),
            `${baseUrl}/assets/documents/Заявление о регистрации транспортных средств в системе BelToll (2-3 оси).pdf`,
          )}
        />
        <ServiceCard
          className="aam_documents-for-download-main__service-card"
          Icon={PdfIcon}
          title={t('documentsForDownloadMain.app.cardTitle16')}
          description=""
          link={`${baseUrl}/assets/documents/Заявление о регистрации транспортных средств в системе BelToll (4+ оси).pdf`}
          onClick={() => handlePdfClick(
            t('documentsForDownloadMain.app.cardTitle16'),
            `${baseUrl}/assets/documents/Заявление о регистрации транспортных средств в системе BelToll (4+ оси).pdf`,
          )}
        />
        <ServiceCard
          className="aam_documents-for-download-main__service-card"
          Icon={PdfIcon}
          title={t('documentsForDownloadMain.app.cardTitle17')}
          description=""
          link={`${baseUrl}/assets/documents/Заявление об открытии и обслуживании лицевого счёта.pdf`}
          onClick={() => handlePdfClick(
            t('documentsForDownloadMain.app.cardTitle17'),
            `${baseUrl}/assets/documents/Заявление об открытии и обслуживании лицевого счёта.pdf`,
          )}
        />
      </div>

      {/* Other */}
      <h2 className="aam_documents-for-download-main__boxes-header">{t('documentsForDownloadMain.boxesHeaders.other')}</h2>
      <div className="aam_documents-for-download-main__card-boxes">
        <ServiceCard
          className="aam_documents-for-download-main__service-card"
          Icon={PdfIcon}
          title={t('documentsForDownloadMain.oth.cardTitle1')}
          description=""
          link={`${baseUrl}/assets/documents/Платежное поручение на покупку электронных денег.pdf`}
          onClick={() => handlePdfClick(
            t('documentsForDownloadMain.oth.cardTitle1'),
            `${baseUrl}/assets/documents/Платежное поручение на покупку электронных денег.pdf`,
          )}
        />
        <ServiceCard
          className="aam_documents-for-download-main__service-card"
          Icon={PdfIcon}
          title={t('documentsForDownloadMain.oth.cardTitle2')}
          description=""
          link={`${baseUrl}/assets/documents/Доверенность.pdf`}
          onClick={() => handlePdfClick(
            t('documentsForDownloadMain.oth.cardTitle2'),
            `${baseUrl}/assets/documents/Доверенность.pdf`,
          )}
        />
      </div>

      {/* Кнопки навигации по сайту */}
      <div className="aam_documents-for-download-main__site-nav">
        <Link to="/" className="home-link">
          <LeftArrowIcon className="icon" />
          {t('documentsForDownloadMain.homeLink')}
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
          {t('documentsForDownloadMain.upLink')}
        </button>
      </div>
    </main>
  );
}

export default DocumentsForDownloadMain;
