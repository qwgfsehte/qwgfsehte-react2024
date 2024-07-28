import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.scss';
import { App } from '../Components/App.tsx';
import { ThemeProvider } from './context/themeContext.tsx';
import ErrorBoundary from 'next/dist/client/components/error-boundary';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
