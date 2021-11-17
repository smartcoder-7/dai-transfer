import '../src/styles/globals.css';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { Web3ReactProvider } from '@web3-react/core';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';

import Web3ReactManager from '../src/components/global/Web3ReactManager/Web3ReactManager';
import App from '../src/components/modules/App/App';
import theme from '../src/styles/theme';
import getLibrary from '../src/utils/getLibrary';

const Web3ReactProviderDefault = dynamic(
  () => import('../src/components/global/DefaultProvider/DefaultProvider'),
  { ssr: false },
);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ReactProviderDefault getLibrary={getLibrary}>
        <Web3ReactManager>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App>
              <Component {...pageProps} />
            </App>
          </ThemeProvider>
        </Web3ReactManager>
      </Web3ReactProviderDefault>
    </Web3ReactProvider>
  );
}

export default MyApp;
