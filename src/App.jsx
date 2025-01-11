import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';  // заменили BrowserRouter на HashRouter
import { SelectedItemProvider } from './contexts/SelectedItemContext';
import { HelmetProvider } from 'react-helmet-async';

// Импорты страниц
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contacts from './pages/Contacts/Contacts';
import DetailedNews from './pages/DetailedNews/DetailedNews';
import Equipment from './pages/Equipment/Equipment';
import ForClients from './pages/ForClients/ForClients';
import ForPartners from './pages/ForPartners/ForPartners';
import News from './pages/News/News';

const App = () => (
  <HelmetProvider>
    <SelectedItemProvider>

      <Router basename='/Berlio_new_site'>
        <Routes>
          {/* Определение маршрутов */}
          <Route path="/Berlio_new_site/" element={<Home />} />
          <Route path="/Berlio_new_site/about" element={<About />} />
          <Route path="/Berlio_new_site/contacts" element={<Contacts />} />
          <Route path="/Berlio_new_site/news" element={<News />} />
          <Route path="/Berlio_new_site/news/:id" element={<DetailedNews />} />
          <Route path="/Berlio_new_site/equipment" element={<Equipment />} />
          <Route path="/Berlio_new_site/clients" element={<ForClients />} />
          <Route path="/Berlio_new_site/partners" element={<ForPartners />} />
        </Routes>
      </Router>

    </SelectedItemProvider>
  </HelmetProvider>
);

export default App;
