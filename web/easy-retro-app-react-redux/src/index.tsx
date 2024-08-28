import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'typeface-roboto';
import './styles.scss';
import GlobalErrorPopup from './components/GlobalErrorPopup/GlobalErrorPopup';
import { Provider } from 'react-redux';
import store from './store/store';
import { ErrorProvider } from './utils/providers/ErrorProvider';

const rootElement = document.getElementById('root');

if(rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <Provider store={store}>
      <React.StrictMode>
      <ErrorProvider>
        <App />
        <GlobalErrorPopup />
      </ErrorProvider>
    </React.StrictMode>
    </Provider>
  );
} else {
  console.error("Root element not found.");
}
