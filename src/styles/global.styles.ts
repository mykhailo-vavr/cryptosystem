import { createGlobalStyle } from 'styled-components';
import { Inter } from '@next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const GlobalStyle = createGlobalStyle`
  html {
    font-size: 16px;
  }

  body {
    font-family: ${inter.style.fontFamily}
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;
