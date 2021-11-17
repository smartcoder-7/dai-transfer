import { getAddress } from '@ethersproject/address';

export function isAddress(value: string): boolean {
  try {
    getAddress(value);
    return true;
  } catch {
    return false;
  }
}
