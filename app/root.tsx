import {
  Links,
  Meta,
  Outlet,
  redirect,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import { ThemeProvider } from '../src/components/context/themeContext';
import '../app/styles/global.scss';
import { LoaderFunction } from 'react-router-dom';
import AppErrorBoundary from '../src/components/errorBoundary/errorBoundary';
import ErrorPage404 from '../src/components/errorPage/pageError404';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  if (url.pathname === '/') {
    return redirect('/search/page/1');
  }
  return null;
};

export default function Root() {
  return (
    <AppErrorBoundary>
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
    </AppErrorBoundary>
  );
}

export function ErrorBoundary() {
  return <ErrorPage404 />;
}
