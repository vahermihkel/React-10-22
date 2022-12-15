import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'leaflet/dist/leaflet.css';
import './index.css';
import './i18n';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { CartSumContextProvider } from './store/CartSumContext';
import { AuthContextProvider } from './store/AuthContext';

// 1. npm install react-router-dom <-- lisab navigeerimiseks vajalikud failid node_modules kausta
// 2. BrowserRouteri lisamine index.js faili <-- võimaldab meie projektis navigeerida
// 3. <Routes> <Route/>  </Routes>  <-- App.js faili lisama seosed URLi ja failide vahel

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CartSumContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </CartSumContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// reportWebVitals saatis Reacti infot
// setupTests + App.test   automaattestid, mis käivad meie rakendust üle

// Button variant="danger"  <---- punast nuppu
// index.css faili

// uuendaKeel("EST");
// uuendaKeel("ENG");
// let muutuja = 2;
// muutuja = 4;