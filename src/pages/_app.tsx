import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import 'src/styles/global.scss';
import Head from 'next/head';
import store from 'src/Components/store';
import { ThemeProvider } from 'src/Components/context/themeContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>PokePedia</title>
      </Head>
      <Provider store={store}>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default MyApp;
