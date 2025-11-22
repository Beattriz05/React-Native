import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Importação global do CSS (se estiver usando Tailwind)
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);