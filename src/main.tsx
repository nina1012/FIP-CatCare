import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './app/index';
import './index.css';
import { supabase } from './lib/supabase';
import { enableMocking } from './testing/mocks';

const root = document.getElementById('root');
if (!root) throw new Error('No root element found');
console.log('Auth token:', supabase.auth.getSession());

enableMocking().then(() => {
  createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
});
