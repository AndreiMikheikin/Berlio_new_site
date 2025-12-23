const routesMeta = [
  // --- Core ---
  {
    key: 'home',
    path: '/',
    sitemap: true,
    ssr: true,
  },
  {
    key: 'about',
    path: '/about',
    sitemap: true,
    ssr: true,
  },
  {
    key: 'contacts',
    path: '/contacts',
    sitemap: true,
    ssr: true,
  },

  // --- News ---
  {
    key: 'news',
    path: '/news',
    sitemap: true,
    ssr: true,
  },
  {
    key: 'newsDetail',
    path: '/news/:id',
    sitemap: true,
    ssr: true,
    dynamic: true,
    entity: 'news',
  },

  // --- Equipment ---
  { key: 'equipment', path: '/equipment', sitemap: true, ssr: true },
  { key: 'webCenterBerlio', path: '/equipment/webCenterBerlio', sitemap: true, ssr: true },
  { key: 'oilAndCapital', path: '/equipment/oilAndCapital', sitemap: true, ssr: true },
  { key: 'selfServiceCheckout', path: '/equipment/selfServiceCheckout', sitemap: true, ssr: true },
  { key: 'gsAutomationSystem', path: '/equipment/gsAutomationSystem', sitemap: true, ssr: true },
  { key: 'invoicesSite', path: '/equipment/invoicesSite', sitemap: true, ssr: true },
  { key: 'invoicesSiteTariffs', path: '/equipment/invoicesSiteTariffs', sitemap: true, ssr: true },
  { key: 'berlioInternetClientApp', path: '/equipment/berlioInternetClientApp', sitemap: true, ssr: true },
  { key: 'berlioCardPayApp', path: '/equipment/berlioCardPayApp', sitemap: true, ssr: true },
  { key: 'smartPayApp', path: '/equipment/smartPayApp', sitemap: true, ssr: true },
  { key: 'personalAccWebApp', path: '/equipment/personalAccWebApp', sitemap: true, ssr: true },

  // --- Clients ---
  { key: 'clients', path: '/clients', sitemap: true, ssr: true },
  { key: 'serviceInEPS', path: '/clients/serviceInEPS', sitemap: true, ssr: true },
  { key: 'forFuelPayments', path: '/clients/forFuelPayments', sitemap: true, ssr: true },
  { key: 'signAndResign', path: '/clients/signAndResign', sitemap: true, ssr: true },
  { key: 'gettingElectronicCard', path: '/clients/gettingElectronicCard', sitemap: true, ssr: true },
  { key: 'dealResignation', path: '/clients/dealResignation', sitemap: true, ssr: true },
  { key: 'priceListsAndTariffs', path: '/clients/priceListsAndTariffs', sitemap: true, ssr: true },
  { key: 'workWithPrivateAccount', path: '/clients/workWithPrivateAccount', sitemap: true, ssr: true },
  { key: 'documentsForDownload', path: '/clients/documentsForDownload', sitemap: true, ssr: true },
  { key: 'cardUsageRules', path: '/clients/cardUsageRules', sitemap: true, ssr: true },
  { key: 'plasticCardUsageRules', path: '/clients/plasticCardUsageRules', sitemap: true, ssr: true },
  { key: 'nonResidentsSupport', path: '/clients/nonResidentsSupport', sitemap: true, ssr: true },
  { key: 'tollRoads', path: '/clients/tollRoads', sitemap: true, ssr: true },
  { key: 'issuerRules', path: '/clients/issuerRules', sitemap: true, ssr: true },
  { key: 'eMoneyRegulations', path: '/clients/eMoneyRegulations', sitemap: true, ssr: true },
  { key: 'legislation', path: '/clients/legislation', sitemap: true, ssr: true },
  { key: 'reportIFR', path: '/clients/reportIFR', sitemap: true, ssr: true },
  { key: 'localActsInEPS', path: '/clients/localActsInEPS', sitemap: true, ssr: true },

  // --- Partners ---
  { key: 'partners', path: '/partners', sitemap: true, ssr: true },
  { key: 'voiceRefService', path: '/partners/voiceRefService', sitemap: true, ssr: true },
  { key: 'loyaltyProgram', path: '/partners/loyaltyProgram', sitemap: true, ssr: true },
  { key: 'partnersDocuments', path: '/partners/documentsForDownload', sitemap: true, ssr: true },
  { key: 'systemRules', path: '/partners/systemRules', sitemap: true, ssr: true },
  { key: 'forBankInformation', path: '/partners/forBankInformation', sitemap: true, ssr: true },
  { key: 'partnersCardUsageRules', path: '/partners/cardUsageRules', sitemap: true, ssr: true },
  { key: 'partnersPlasticCardUsageRules', path: '/partners/plasticCardUsageRules', sitemap: true, ssr: true },
  { key: 'forNotAResidentsServices', path: '/partners/forNotAResidentsServices', sitemap: true, ssr: true },

  // --- Privacy ---
  { key: 'cookieConsentPolicy', path: '/privacy/cookie-consent-policy', sitemap: true, ssr: true },
  { key: 'buyersPolicy', path: '/privacy/buyers-policy', sitemap: true, ssr: true },
  { key: 'b2bPolicy', path: '/privacy/b2b-policy', sitemap: true, ssr: true },
  { key: 'applicantsPolicy', path: '/privacy/applicants-policy', sitemap: true, ssr: true },

  // --- Presentations ---
  { key: 'pppsaPresentation', path: '/presentations/pppsa', sitemap: true, ssr: true },
];

export default routesMeta;
