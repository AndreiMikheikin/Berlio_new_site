import React, { useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { SelectedItemProvider } from './contexts/SelectedItemContext';
import ScrollToTop from './hooks/scrollToTop';
import CookieConsentModal from './components/ComplexComponents/CookieConsentModal/CookieConsentModal';

// Ленивые импорты страниц
const Home = lazy(() => import('./pages/Home/Home'));
const About = lazy(() => import('./pages/About/About'));
const Contacts = lazy(() => import('./pages/Contacts/Contacts'));
const News = lazy(() => import('./pages/News/News'));
const DetailedNews = lazy(() => import('./pages/DetailedNews/DetailedNews'));
const Equipment = lazy(() => import('./pages/Equipment/Equipment'));
const WebCenterBerlio = lazy(() => import('./pages/WebCenterBerlio/WebCenterBerlio'));
const OilAndCapital = lazy(() => import('./pages/OilAndCapital/OilAndCapital'));
const SelfServiceCheckout = lazy(() => import('./pages/SelfServiceCheckout/SelfServiceCheckout'));
const GSAutomationSystem = lazy(() => import('./pages/GSAutomationSystem/GSAutomationSystem'));
const InvoicesSite = lazy(() => import('./pages/InvoicesSite/InvoicesSite'));
const InvoicesSiteTariffs = lazy(() => import('./pages/InvoicesSiteTariffs/InvoicesSiteTariffs'));
const ForClients = lazy(() => import('./pages/ForClients/ForClients'));
const ServiceInEPSPage = lazy(() => import('./pages/ServiceInEPSPage/ServiceInEPSPage'));
const SignAndResign = lazy(() => import('./pages/SignAndResign/SignAndResign'));
const GettingElectronicCard = lazy(() => import('./pages/GettingElectronicCard/GettingElectronicCard'));
const CardUsageRules = lazy(() => import('./pages/CardUsageRules/CardUsageRules'));
const DealResignation = lazy(() => import('./pages/DealResignation/DealResignation'));
const PriceListsAndTariffs = lazy(() => import('./pages/PriceListsAndTariffs/PriceListsAndTariffs'));
const WorkWithPrivateAccount = lazy(() => import('./pages/WorkWithPrivateAccount/WorkWithPrivateAccount'));
const DocumentsForDownload = lazy(() => import('./pages/DocumentsForDownload/DocumentsForDownload'));
const SystemRules = lazy(() => import('./pages/SystemRules/SystemRules'));
const PlasticCardUsageRules = lazy(() => import('./pages/PlasticCardUsageRules/PlasticCardUsageRules'));
const NonResidentsSupport = lazy(() => import('./pages/NonResidentsSupport/NonResidentsSupport'));
const TollRoads = lazy(() => import('./pages/TollRoads/TollRoads'));
const ForFuelPayments = lazy(() => import('./pages/ForFuelPayments/ForFuelPayments'));
const IssuerRules = lazy(() => import('./pages/IssuerRules/IssuerRules'));
const EMoneyRegulations = lazy(() => import('./pages/EMoneyRegulations/EMoneyRegulations'));
const BerlioInternetClientApp = lazy(() => import('./pages/BerlioInternetClientApp/BerlioInternetClientApp'));
const BerlioCardPayApp = lazy(() => import('./pages/BerlioCardPayApp/BerlioCardPayApp'));
const SmartPayApp = lazy(() => import('./pages/SmartPayApp/SmartPayApp'));
const PersonalAccWebApp = lazy(() => import('./pages/PersonalAccWebApp/PersonalAccWebApp'));
const ForPartners = lazy(() => import('./pages/ForPartners/ForPartners'));
const VoiceReferenceService = lazy(() => import('./pages/VoiceReferenceService/VoiceReferenceService'));
const LoyaltyProgram = lazy(() => import('./pages/LoyaltyProgram/LoyaltyProgram'));
const ForBankInfo = lazy(() => import('./pages/ForBankInformation/ForBankInformation'));
const ForNotAResidentsServices = lazy(() => import('./pages/ForNotAResidentsServices/ForNotAResidentsServices'));
const Privacy = lazy(() => import('./pages/Privacy/Privacy'));
const CookieConsentPolicy = lazy(() => import('./components/ComplexComponents/CookieConsentPolicy/CookieConsentPolicy'));
const BuyersPolicy = lazy(() => import('./components/ComplexComponents/BuyersPolicy/BuyersPolicy'));
const B2BPolicy = lazy(() => import('./components/ComplexComponents/B2BPolicy/B2BPolicy'));
const ApplicantsPolicy = lazy(() => import('./components/ComplexComponents/ApplicantsPolicy/ApplicantsPolicy'));
const Legislation = lazy(() => import('./pages/Legislation/Legislation'));
const ReportIFR = lazy(() => import('./pages/ReportIFR/ReportIFR'));
const LocalActsInEPS = lazy(() => import('./pages/LocalActsInEPS/LocalActsInEPS'));

// Админка
const AdminLoginPage = lazy(() => import('./pages/AdminLoginPage/AdminLoginPage'));
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage/AdminDashboardPage'));
const UserManager = lazy(() => import('./components/ComplexComponents/AdminDashboard/UserManager/UserManager'));
const NewsManager = lazy(() => import('./components/ComplexComponents/AdminDashboard/NewsManager/NewsManager'));
const SQLExplorer = lazy(() => import('./components/ComplexComponents/AdminDashboard/SQLExplorer/SQLExplorer'));

// Журнал учета ком. тайны
const LogBookLoginPage = lazy(() => import('./pages/LogBookLoginPage/LogBookLoginPage'));
const LogBookPage = lazy(() => import('./pages/LogBookPage/LogBookPage'));

const PrivacyIndexRedirect = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('cookie-consent-policy', { replace: true });
  }, [navigate]);
  return null;
};

function App() {
  return (
    <SelectedItemProvider>
      <ScrollToTop />
      <Suspense fallback={<div className="aam_loader">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<DetailedNews />} />
          <Route path="/equipment" element={<Equipment />} />
          <Route path="/equipment/webCenterBerlio" element={<WebCenterBerlio />} />
          <Route path="/equipment/oilAndCapital" element={<OilAndCapital />} />
          <Route path="/equipment/selfServiceCheckout" element={<SelfServiceCheckout />} />
          <Route path="/equipment/gsAutomationSystem" element={<GSAutomationSystem />} />
          <Route path="/equipment/invoicesSite" element={<InvoicesSite />} />
          <Route path="/equipment/invoicesSiteTariffs" element={<InvoicesSiteTariffs />} />
          <Route path="/equipment/berlioInternetClientApp" element={<BerlioInternetClientApp />} />
          <Route path="/equipment/berlioCardPayApp" element={<BerlioCardPayApp />} />
          <Route path="/equipment/smartPayApp" element={<SmartPayApp />} />
          <Route path="/equipment/personalAccWebApp" element={<PersonalAccWebApp />} />

          {/* Клиенты */}
          <Route path="/clients" element={<ForClients />} />
          <Route path="/clients/serviceInEPS" element={<ServiceInEPSPage />} />
          <Route path="/clients/forFuelPayments" element={<ForFuelPayments />} />
          <Route path="/clients/signAndResign" element={<SignAndResign />} />
          <Route path="/clients/cardUsageRules" element={<CardUsageRules />} />
          <Route path="/clients/gettingElectronicCard" element={<GettingElectronicCard />} />
          <Route path="/clients/dealResignation" element={<DealResignation />} />
          <Route path="/clients/priceListsAndTariffs" element={<PriceListsAndTariffs />} />
          <Route path="/clients/workWithPrivateAccount" element={<WorkWithPrivateAccount />} />
          <Route path="/clients/documentsForDownload" element={<DocumentsForDownload />} />
          <Route path="/clients/plasticCardUsageRules" element={<PlasticCardUsageRules />} />
          <Route path="/clients/nonResidentsSupport" element={<NonResidentsSupport />} />
          <Route path="/clients/tollRoads" element={<TollRoads />} />
          <Route path="/clients/issuerRules" element={<IssuerRules />} />
          <Route path="/clients/eMoneyRegulations" element={<EMoneyRegulations />} />
          <Route path="/clients/legislation" element={<Legislation />} />
          <Route path="/clients/reportIFR" element={<ReportIFR />} />
          <Route path="/clients/localActsInEPS" element={<LocalActsInEPS />} />

          {/* Партнёры */}
          <Route path="/partners" element={<ForPartners />} />
          <Route path="/partners/voiceRefService" element={<VoiceReferenceService />} />
          <Route path="/partners/loyaltyProgram" element={<LoyaltyProgram />} />
          <Route path="/partners/documentsForDownload" element={<DocumentsForDownload />} />
          <Route path="/partners/systemRules" element={<SystemRules />} />
          <Route path="/partners/forBankInformation" element={<ForBankInfo />} />
          <Route path="/partners/cardUsageRules" element={<CardUsageRules />} />
          <Route path="/partners/plasticCardUsageRules" element={<PlasticCardUsageRules />} />
          <Route path="/partners/forNotAResidentsServices" element={<ForNotAResidentsServices />} />

          {/* Политики */}
          <Route path="/privacy" element={<Privacy />}>
            <Route index element={<PrivacyIndexRedirect />} />
            <Route path="cookie-consent-policy" element={<CookieConsentPolicy />} />
            <Route path="buyers-policy" element={<BuyersPolicy />} />
            <Route path="b2b-policy" element={<B2BPolicy />} />
            <Route path="applicants-policy" element={<ApplicantsPolicy />} />
          </Route>

          {/* Админка */}
          <Route path="/administrator" element={<AdminLoginPage />} />
          <Route path="/adminDashboard" element={<AdminDashboardPage />}>
            <Route path="users" element={<UserManager />} />
            <Route path="news" element={<NewsManager />} />
            <Route path="sql-explorer" element={<SQLExplorer />} />
          </Route>

          {/* Журнал учета комю тайны */}
          <Route path="/log-book-login" element={<LogBookLoginPage />} />
          <Route path="/log-book" element={<LogBookPage />} />
        </Routes>
      </Suspense>
      <CookieConsentModal />
    </SelectedItemProvider>
  );
}

export default App;
