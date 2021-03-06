import { InjectedConnector } from '@web3-react/injected-connector';
import { NetworkConnector } from '@web3-react/network-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

const RPC_URLS: { [chainId: number]: string } = {
  1: process.env.RPC_URL_1 as string,
  3: process.env.RPC_URL_3 as string,
  4: process.env.RPC_URL_4 as string,
};

export const network = new NetworkConnector({
  urls: { 1: RPC_URLS[1], 3: RPC_URLS[3], 4: RPC_URLS[4] },
  defaultChainId: 1,
});

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42],
});

export const walletconnect = new WalletConnectConnector({
  rpc: { 1: RPC_URLS[1], 3: RPC_URLS[3] },
  qrcode: true,
});

export enum ConnectorNames {
  Injected = 'Injected',
  Network = 'Network',
  WalletConnect = 'WalletConnect',
}

type ConnectorType =
  | InjectedConnector
  | WalletConnectConnector
  | NetworkConnector;

export const connectorsByName: {
  [connectorName in ConnectorNames]: ConnectorType;
} = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.WalletConnect]: walletconnect,
  [ConnectorNames.Network]: network,
};
