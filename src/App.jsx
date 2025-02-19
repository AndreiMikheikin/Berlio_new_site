import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { SelectedItemProvider } from "./contexts/SelectedItemContext";
import { HelmetProvider } from "react-helmet-async";

// Импорты страниц
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Contacts from "./pages/Contacts/Contacts";
import DetailedNews from "./pages/DetailedNews/DetailedNews";
import Equipment from "./pages/Equipment/Equipment";
import ForClients from "./pages/ForClients/ForClients";
import SignAndResign from "./pages/SignAndResign/SignAndResign";
import GettingElectronicCard from "./pages/GettingElectronicCard/GettingElectronicCard";
import CardUsageRules from "./pages/CardUsageRules/CardUsageRules";
import DealResignation from "./pages/DealResignation/DealResignation";
import PriceListsAndTariffs from "./pages/PriceListsAndTariffs/PriceListsAndTariffs";
import WorkWithPrivateAccount from "./pages/WorkWithPrivateAccount/WorkWithPrivateAccount";
import DocumentsForDownload from "./pages/DocumentsForDownload/DocumentsForDownload";
import PlasticCardUsageRules from "./pages/PlasticCardUsageRules/PlasticCardUsageRules";
import TollRoads from "./pages/TollRoads/TollRoads";
import ForFuelPayments from "./pages/ForFuelPayments/ForFuelPayments";
import IssuerRules from "./pages/IssuerRules/IssuerRules";
import EMoneyRegulations from "./pages/EMoneyRegulations/EMoneyRegulations";
import BerlioInternetClientApp from "./pages/BerlioInternetClientApp/BerlioInternetClientApp";
import ForPartners from "./pages/ForPartners/ForPartners";
import ForBankInfo from "./pages/ForBankInformation/ForBankInformation";
import ForNotAResidentsServices from "./pages/ForNotAResidentsServices/ForNotAResidentsServices";
import News from "./pages/News/News";

const App = () => (
  <HelmetProvider>
    <SelectedItemProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<DetailedNews />} />
          <Route path="/equipment" element={<Equipment />} />
          <Route path="/clients" element={<ForClients />} />
          <Route path="/clients/signAndResign" element={<SignAndResign />} />
          <Route path="/clients/cardUsageRules" element={<CardUsageRules />} />
          <Route path="/clients/gettingElectronicCard" element={<GettingElectronicCard />} />
          <Route path="/clients/dealResignation" element={<DealResignation />} />
          <Route path="/clients/priceListsAndTariffs" element={<PriceListsAndTariffs />} />
          <Route path="/clients/workWithPrivateAccount" element={<WorkWithPrivateAccount />} />
          <Route path="/clients/documentsForDownload" element={<DocumentsForDownload />} />
          <Route path="/clients/plasticCardUsageRules" element={<PlasticCardUsageRules />} />
          <Route path="/clients/tollRoads" element={<TollRoads />} />
          <Route path="/clients/forFuelPayments" element={<ForFuelPayments />} />
          <Route path="/clients/issuerRules" element={<IssuerRules />} />
          <Route path="/clients/eMoneyRegulations" element={<EMoneyRegulations />} />
          <Route path="/clients/berlioInternetClientApp" element={<BerlioInternetClientApp />} />
          <Route path="/partners" element={<ForPartners />} />
          <Route path="/partners/forBankInformation" element={<ForBankInfo />} />
          <Route path="/partners/cardUsageRules" element={<CardUsageRules />} />
          <Route path="/partners/plasticCardUsageRules" element={<PlasticCardUsageRules />} />
          <Route path="/partners/forNotAResidentsServices" element={<ForNotAResidentsServices />} />

        </Routes>
      </Router>
    </SelectedItemProvider>
  </HelmetProvider>
);

export default App;
