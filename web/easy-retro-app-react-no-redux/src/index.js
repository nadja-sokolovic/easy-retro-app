import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'typeface-roboto';
import './styles.scss';
import { ErrorProvider } from './utils/providers/ErrorProvider';
import GlobalErrorPopup from './components/GlobalErrorPopup/GlobalErrorPopup';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorProvider>
      <App />
      <GlobalErrorPopup />
    </ErrorProvider>
  </React.StrictMode>
);
