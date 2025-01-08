import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SelectedItemProvider } from './contexts/SelectedItemContext';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contacts from './pages/Contacts/Contacts';

const App = () => (
  <SelectedItemProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
      </Routes>
    </Router>
  </SelectedItemProvider>
);

export default App;
