import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './utilits/translatefunction/i18n.js';
import './index.css';
import React, { lazy, StrictMode, Suspense, useEffect } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BarLoader, BeatLoader } from 'react-spinners';
import App from 'App.jsx';

// const App = lazy(() => import('App.jsx'));

const querryclient = new QueryClient();
const appRoot = document.getElementById('dayro');


createRoot(appRoot).render(
  <BrowserRouter>
    <QueryClientProvider client={querryclient}>
      <App />
    </QueryClientProvider>
    {/* <ReactQueryDevtools client={querryclient} initialIsOpen={true} position='bottom' /> */}
  </BrowserRouter>
);