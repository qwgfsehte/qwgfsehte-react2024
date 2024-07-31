import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import 'src/styles/global.scss';
import Head from 'next/head';
import { wrapper } from 'src/Components/store';
import { ThemeProvider } from 'src/Components/context/themeContext';

function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <>
      <Head>
        <title>PokePedia</title>
      </Head>
      <Provider store={store}>
        <ThemeProvider>
          <Component {...props.pageProps} />
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default MyApp;
