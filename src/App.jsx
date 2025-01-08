import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SelectedItemProvider } from './contexts/SelectedItemContext';

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
  <SelectedItemProvider>
    <Router>
      <Routes>
        {/* Определение маршрутов */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:id" element={<DetailedNews />} />
        <Route path="/equipment" element={<Equipment />} />
        <Route path="/clients" element={<ForClients />} />
        <Route path="/partners" element={<ForPartners />} />
      </Routes>
    </Router>
  </SelectedItemProvider>
);

export default App;
