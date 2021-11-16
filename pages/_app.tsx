import '../src/styles/globals.css';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { Web3ReactProvider } from '@web3-react/core';
import type { AppProps } from 'next/app';

import Web3ReactManager from '../src/components/global/Web3ReactManager/Web3ReactManager';
import theme from '../src/styles/theme';
import getLibrary from '../src/utils/getLibrary';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ReactManager>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </Web3ReactManager>
    </Web3ReactProvider>
  );
}

export default MyApp;
