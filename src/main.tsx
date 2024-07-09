import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.scss';
import ErrorBoundary from './components/errorBoundary/errorBoundary.tsx';
import { App } from './components/app/App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
