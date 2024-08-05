import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import { Provider } from 'react-redux';
import store from '../src/components/store';
import { ThemeProvider } from '../src/components/context/themeContext';

export default function Root() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <html lang="en">
          <head>
            <Links />
            <Meta />
            <title>PokePedia</title>
            <link rel="icon" href="/favicon.png" />
          </head>
          <body>
            <Outlet />
            <ScrollRestoration />
            <Scripts />
          </body>
        </html>
      </ThemeProvider>
    </Provider>
  );
}
