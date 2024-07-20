import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.scss';
import ErrorBoundary from './components/errorBoundary/errorBoundary.tsx';
import { App } from './components/App.tsx';
import { ThemeProvider } from './components/context/themeContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
