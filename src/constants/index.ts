import { AbstractConnector } from '@web3-react/abstract-connector';

import { injected } from '../lib/connectors';

export const NetworkContextName = 'next-dai-test';
export const DAI_ADDRESS = '0xaD6D458402F60fD3Bd25163575031ACDce07538D';
export const COINBASE_API_URL = 'https://api.coingecko.com/api/v3/simple/price';
export interface WalletInfo {
  color: string;
  connector?: AbstractConnector;
  description: string;
  href: string | null;
  iconName: string;
  mobile?: true;
  mobileOnly?: true;
  name: string;
  primary?: true;
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  INJECTED: {
    color: '#010101',
    connector: injected,
    description: 'Injected web3 provider.',
    href: null,
    iconName: 'arrow-right.svg',
    name: 'Injected',
    primary: true,
  },
  METAMASK: {
    color: '#E8831D',
    connector: injected,
    description: 'Easy-to-use browser extension.',
    href: null,
    iconName: 'metamask.png',
    name: 'MetaMask',
  },
};
