import { App as AppProvider } from 'antd';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, lightTheme } from '@/styles';
import { AppPropsWithLayout } from './types';

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
