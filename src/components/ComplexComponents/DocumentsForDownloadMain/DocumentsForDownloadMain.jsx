import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LeftArrowIcon from '../../SVGIcons/LeftArrowIcon';
import UpArrowInCircleIcon from '../../SVGIcons/UpArrowInCircleIcon';
import PdfIcon from '../../SVGIcons/PdfIcon';
import '../../../styles/components/ComplexComponents/DocumentsForDownloadMain.scss';

function DocumentsForDownloadMain() {
  const { t } = useTranslation();

  const isProduction = process.env.NODE_ENV === 'production';
  const baseUrl = isProduction ? (process.env.PUBLIC_URL || '') : '';

  const docsSections = [
    {
      title: t('documentsForDownloadMain.boxesHeaders.lists'),
      docs: [
        {
          title: t('documentsForDownloadMain.lsts.cardTitle1'),
          link: `${baseUrl}/assets/documents/Список документов для заключения Договора присоединения.pdf`,
        },
        {
          title: t('documentsForDownloadMain.lsts.cardTitle2'),
          link: `${baseUrl}/assets/documents/Список документов для заключения Договора пользования с ГУ  «Белавтострада» (BelToll).pdf`,
        },
      ],
    },
    {
      title: t('documentsForDownloadMain.boxesHeaders.agreements'),
      docs: [
        {
          title: t('documentsForDownloadMain.agr.cardTitle1'),
          link: `${baseUrl}/assets/documents/Соглашение о расторжении договора на обслуживание (организация).pdf`,
        },
        {
          title: t('documentsForDownloadMain.agr.cardTitle2'),
          link: `${baseUrl}/assets/documents/Соглашение о расторжении договора на обслуживание (ИП, уполномоченное лицо - родственник).pdf`,
        },
        {
          title: t('documentsForDownloadMain.agr.cardTitle3'),
          link: `${baseUrl}/assets/documents/Соглашение о расторжении договора на обслуживание (ИП, уполномоченное лицо - работник).pdf`,
        },
        {
          title: t('documentsForDownloadMain.agr.cardTitle4'),
          link: `${baseUrl}/assets/documents/Соглашение о расторжении договора на обслуживание (ИП).pdf`,
        }
      ],
    },
    {
      title: t('documentsForDownloadMain.boxesHeaders.regCard'),
      docs: [
        {
          title: t('documentsForDownloadMain.rCard.cardTitle1'),
          link: `${baseUrl}/assets/documents/Регистрационная карточка клиента_общая (для ознакомления).pdf`,
        },
      ],
    },
    {
      title: t('documentsForDownloadMain.boxesHeaders.applications'),
      docs: [
        {
          title: t('documentsForDownloadMain.app.cardTitle1'),
          link: `${baseUrl}/assets/documents/Заявление на получение «Справки-акта о реализации» подписанной ЭЦП.pdf`,
        },
        {
          title: t('documentsForDownloadMain.app.cardTitle2'),
          link: `${baseUrl}/assets/documents/Заявление о блокировке, разблокировке лицевого счёта.pdf`,
        },
        {
          title: t('documentsForDownloadMain.app.cardTitle3'),
          link: `${baseUrl}/assets/documents/Заявление о блокировке, разблокировке средств доступа электронной платежной системы «Берлио».pdf`,
        },
        {
          title: t('documentsForDownloadMain.app.cardTitle4'),
          link: `${baseUrl}/assets/documents/Заявление о возврате ошибочно перечисленной суммы денежных средств.pdf`,
        },
        {
          title: t('documentsForDownloadMain.app.cardTitle5'),
          link: `${baseUrl}/assets/documents/Заявление о закрытии лицевого счёта.pdf`,
        },
        {
          title: t('documentsForDownloadMain.app.cardTitle6'),
          link: `${baseUrl}/assets/documents/Заявление о запросе информации о ПИН-коде.pdf`,
        },
        {
          title: t('documentsForDownloadMain.app.cardTitle7'),
          link: `${baseUrl}/assets/documents/Заявление о переносе электронной карты с одного лицевого счёта на другой лицевой счёт.pdf`,
        },
        {
          title: t('documentsForDownloadMain.app.cardTitle8'),
          link: `${baseUrl}/assets/documents/Заявление о перераспределении сумм между лицевыми счетами Клиента (перенос).pdf`,
        },
        {
          title: t('documentsForDownloadMain.app.cardTitle9'),
          link: `${baseUrl}/assets/documents/Заявление о перераспределении сумм между лицевыми счетами Клиента (распределение).pdf`,
        },
        {
          title: t('documentsForDownloadMain.app.cardTitle10'),
          link: `${baseUrl}/assets/documents/Заявление о присоединении к договору присоединения (ИП).pdf`,
        },
        {
          title: t('documentsForDownloadMain.app.cardTitle11'),
          link: `${baseUrl}/assets/documents/Заявление о присоединении к договору присоединения (ИП, уполномоченное лицо - работник).pdf`,
        },
        {
          title: t('documentsForDownloadMain.app.cardTitle12'),
          link: `${baseUrl}/assets/documents/Заявление о присоединении к договору присоединения (ИП, уполномоченное лицо - родственник).pdf`,
        },
        {
          title: t('documentsForDownloadMain.app.cardTitle13'),
          link: `${baseUrl}/assets/documents/Заявление о присоединении к договору присоединения (организация).pdf`,
        },
        {
          title: t('documentsForDownloadMain.app.cardTitle14'),
          link: `${baseUrl}/assets/documents/Заявление о расторжении договора.pdf`,
        },
        {
          title: t('documentsForDownloadMain.app.cardTitle15'),
          link: `${baseUrl}/assets/documents/Заявление о регистрации транспортных средств в системе BelToll (2-3 оси).pdf`,
        },
        {
          title: t('documentsForDownloadMain.app.cardTitle16'),
          link: `${baseUrl}/assets/documents/Заявление о регистрации транспортных средств в системе BelToll (4+ оси).pdf`,
        },
        {
          title: t('documentsForDownloadMain.app.cardTitle17'),
          link: `${baseUrl}/assets/documents/Заявление об открытии и обслуживании лицевого счёта.pdf`,
        },
      ],
    },
    {
      title: t('documentsForDownloadMain.boxesHeaders.other'),
      docs: [
        {
          title: t('documentsForDownloadMain.oth.cardTitle1'),
          link: `${baseUrl}/assets/documents/Платежное поручение на покупку электронных денег.pdf`,
        },
        {
          title: t('documentsForDownloadMain.oth.cardTitle2'),
          link: `${baseUrl}/assets/documents/Доверенность.pdf`,
        },
      ],
    },
  ];

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

      {/* Documents Sections */}
      {docsSections.map(({ title, docs }) => (
        <section key={title} className="aam_documents-for-download-main__section">
          <h2 className="aam_documents-for-download-main__documents-title">{title}</h2>
          <ul className="aam_documents-for-download-main__doc-list">
            {docs.map(({ title, link }) => (
              <li key={title}>
                <a
                  href={link}
                  onClick={(e) => {
                    e.preventDefault();
                    handlePdfClick(title, link);
                  }}
                  target="_blank"
                  rel="noreferrer"
                >
                  <PdfIcon className="aam_documents-for-download-main__doc-icon" />
                  <span>{title}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}

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
