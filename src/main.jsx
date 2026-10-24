import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// Bootstrap (CSS + JS para el menú colapsable y los dropdowns)
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
// Estilos propios: se cargan DESPUÉS de Bootstrap para poder sobrescribirlo
import './styles/estilo.css';

import App from './App';
import { CarritoProvider } from './context/CarritoContext';
import { SesionProvider } from './context/SesionContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <SesionProvider>
        <CarritoProvider>
          <App />
        </CarritoProvider>
      </SesionProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
