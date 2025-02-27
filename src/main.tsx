import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

// Accede a la variable de entorno directamente
const basename =  import.meta.env.REACT_APP_BASENAME || '';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter basename={basename}>
      <App />
    </HashRouter>
  </StrictMode>
);
