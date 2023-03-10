import { GlobalStyle } from '@/styles/global.styles';
import { lightTheme } from '@/styles/themes/light';
import { App as AppProvider } from 'antd';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />
      <AppProvider>{getLayout(<Component {...pageProps} />)}</AppProvider>
    </ThemeProvider>
  );
};

export default App;
