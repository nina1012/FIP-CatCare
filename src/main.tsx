import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './app/index';
import './index.css';
import { enableMocking } from './mocks';

const root = document.getElementById('root');
if (!root) throw new Error('No root element found');

enableMocking().then(() => {
  createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
});
