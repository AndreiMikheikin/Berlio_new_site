import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { SelectedItemProvider } from "./contexts/SelectedItemContext";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "./hooks/scrollToTop";

// Импорты страниц
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Contacts from "./pages/Contacts/Contacts";
import DetailedNews from "./pages/DetailedNews/DetailedNews";
import Equipment from "./pages/Equipment/Equipment";
import WebCenterBerlio from "./pages/WebCenterBerlio/WebCenterBerlio";
import OilAndCapital from "./pages/OilAndCapital/OilAndCapital";
import SelfServiceCheckout from "./pages/SelfServiceCheckout/SelfServiceCheckout";
import GSAutomationSystem from "./pages/GSAutomationSystem/GSAutomationSysten";
import InvoicesSite from "./pages/InvoicesSite/InvoicesSite";
import InvoicesSiteTariffs from "./pages/InvoicesSiteTariffs/InvoicesSiteTariffs";
import ForClients from "./pages/ForClients/ForClients";
import SignAndResign from "./pages/SignAndResign/SignAndResign";
import GettingElectronicCard from "./pages/GettingElectronicCard/GettingElectronicCard";
import CardUsageRules from "./pages/CardUsageRules/CardUsageRules";
import DealResignation from "./pages/DealResignation/DealResignation";
import PriceListsAndTariffs from "./pages/PriceListsAndTariffs/PriceListsAndTariffs";
import WorkWithPrivateAccount from "./pages/WorkWithPrivateAccount/WorkWithPrivateAccount";
import DocumentsForDownload from "./pages/DocumentsForDownload/DocumentsForDownload";
import SystemRules from "./pages/SystemRules/SystemRules";
import PlasticCardUsageRules from "./pages/PlasticCardUsageRules/PlasticCardUsageRules";
import NonResidentsSupport from "./pages/NonResidentsSupport/NonResidentsSupport";
import TollRoads from "./pages/TollRoads/TollRoads";
import ForFuelPayments from "./pages/ForFuelPayments/ForFuelPayments";
import IssuerRules from "./pages/IssuerRules/IssuerRules";
import EMoneyRegulations from "./pages/EMoneyRegulations/EMoneyRegulations";
import BerlioInternetClientApp from "./pages/BerlioInternetClientApp/BerlioInternetClientApp";
import BerlioCardPayApp from "./pages/BerlioCardPayApp/BerlioCardPayApp";
import SmartPayApp from "./pages/SmartPayApp/SmartPayApp";
import PersonalAccWebApp from "./pages/PersonalAccWebApp/PersonalAccWebApp";
import ForPartners from "./pages/ForPartners/ForPartners";
import VoiceReferenceService from "./pages/VoiceReferenceService/VoiceReferenceService";
import LoyaltyProgram from "./pages/LoyaltyProgram/LoyaltyProgram";
import ForBankInfo from "./pages/ForBankInformation/ForBankInformation";
import ForNotAResidentsServices from "./pages/ForNotAResidentsServices/ForNotAResidentsServices";
import News from "./pages/News/News";
import CookieConsentModal from "./components/ComplexComponents/CookieConsentModal/CookieConsentModal";

const App = () => (
  <HelmetProvider>
    <SelectedItemProvider>
      <Router>
        <ScrollToTop />
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
          <Route path="/clients" element={<ForClients />} />
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
          <Route path="/clients/forFuelPayments" element={<ForFuelPayments />} />
          <Route path="/clients/issuerRules" element={<IssuerRules />} />
          <Route path="/clients/eMoneyRegulations" element={<EMoneyRegulations />} />
          <Route path="/partners" element={<ForPartners />} />
          <Route path="/partners/voiceRefService" element={<VoiceReferenceService />} />
          <Route path="/partners/loyaltyProgram" element={<LoyaltyProgram />} />
          <Route path="/partners/documentsForDownload" element={<DocumentsForDownload />} />
          <Route path="/partners/systemRules" element={<SystemRules />} />
          <Route path="/partners/forBankInformation" element={<ForBankInfo />} />
          <Route path="/partners/cardUsageRules" element={<CardUsageRules />} />
          <Route path="/partners/plasticCardUsageRules" element={<PlasticCardUsageRules />} />
          <Route path="/partners/forNotAResidentsServices" element={<ForNotAResidentsServices />} />

        </Routes>
      </Router>
      <CookieConsentModal />
    </SelectedItemProvider>
  </HelmetProvider>
);

export default App;
