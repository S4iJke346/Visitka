import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

const montserratFont = document.createElement('link');
montserratFont.rel = "stylesheet"
montserratFont.href = "https://fonts.googleapis.com/css2?family=Montserrat:wght@600&display=swap"
document.head.appendChild(montserratFont);

const interFont = document.createElement('link');
interFont.rel = 'stylesheet';
interFont.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
document.head.appendChild(interFont);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);