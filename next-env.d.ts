/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.

interface Window {
  ethereum?: {
    autoRefreshOnNetworkChange?: boolean;
    isMetaMask?: true;
    on?: (...args: any[]) => void;
    removeListener?: (...args: any[]) => void;
  };
}
