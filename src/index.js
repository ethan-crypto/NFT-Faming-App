import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './frontend/components/App';
import { BrowserRouter } from 'react-router-dom';
import {
  wagmiClient,
  chains,
  WagmiConfig,
  RainbowKitProvider,
} from './frontend/utils/walletSetup';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <React.StrictMode>
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
  </BrowserRouter>
);
