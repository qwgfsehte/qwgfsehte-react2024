import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import { ThemeProvider } from '../src/components/context/themeContext';
import '../app/styles/global.scss';

export default function Root() {
  return (
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
  );
}
