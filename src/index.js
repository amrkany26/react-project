import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { FavoritesProvider } from './FavoritesContext';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { render } from 'react-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<React.StrictMode>
    <FavoritesProvider>
      <App />
    </FavoritesProvider>
  </React.StrictMode>,
  );

reportWebVitals();
render(
  <React.StrictMode>
    <FavoritesProvider>
      <App />
    </FavoritesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
