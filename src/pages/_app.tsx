import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import 'src/styles/global.scss';
import Head from 'next/head';
import { wrapper } from 'src/Components/store';
import { ThemeProvider } from 'src/Components/context/themeContext';
import ErrorBoundary from 'src/Components/errorBoundary/errorBoundary';

function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <>
      <Head>
        <title>PokePedia</title>
      </Head>
      <Provider store={store}>
        <ThemeProvider>
          <ErrorBoundary>
            <Component {...props.pageProps} />
          </ErrorBoundary>
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default MyApp;
