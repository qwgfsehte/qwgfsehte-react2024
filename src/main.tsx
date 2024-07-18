import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.scss';
import ErrorBoundary from './components/errorBoundary/errorBoundary.tsx';
import { App } from './components/App.tsx';
import { Provider } from 'react-redux';
import store from './store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);
