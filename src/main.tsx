import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.scss';
import ErrorBoundary from './components/errorBoundary/errorBoundary.tsx';
import { App } from './components/App.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage404 from './components/errorPage/pageError404.tsx';
import { Provider } from 'react-redux';
import store from './store.ts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage404 />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);
