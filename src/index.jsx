import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './i18n';
import './styles/_base.scss';

// Создаём root элемент
const root = ReactDOM.createRoot(document.getElementById('root'));

console.warn = () => {};

root.render(
    <App />
);