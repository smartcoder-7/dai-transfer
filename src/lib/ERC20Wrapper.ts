import { Signer } from '@ethersproject/abstract-signer';
import { Contract } from '@ethersproject/contracts';
import { Provider, TransactionResponse } from '@ethersproject/providers';
import { formatEther, formatUnits, parseUnits } from '@ethersproject/units';

import DAI_ABI from '../constants/abis/dai.json';

class ERC20Wrapper {
  _address;
  _daiContract: Contract;
  _signerOrProvider;
  _recipientAddress;

  constructor(address: string, signerOrProvider: Signer | Provider) {
    this._address = address;
    this._daiContract = new Contract(address, DAI_ABI, signerOrProvider);
    this._signerOrProvider = signerOrProvider;
    this.listenToEvent();
  }

  async balanceOf(address: string): Promise<string> {
    const balance = await this._daiContract.balanceOf(address);
    return formatUnits(balance, 18);
  }

  async transfer(
    recipientAddress: string,
    amount: string,
  ): Promise<TransactionResponse> {
    const daiWithSigner = this._daiContract.connect(this._signerOrProvider);
    const daiAmount = parseUnits(amount, 18);
    const tx = await daiWithSigner.transfer(recipientAddress, daiAmount);
    this.setRecipient(recipientAddress);
    return tx;
  }

  listenToEvent() {
    const recipient = this._recipientAddress;
    const filter = this._daiContract.filters.Transfer(
      this._signerOrProvider._address || null,
      recipient,
    );

    this._daiContract.on(filter, (from, to, amount, _) => {
      console.info(`Sent ${formatEther(amount)} from ${from} to ${to}.`);
    });
  }

  stopToListen() {
    this._daiContract.removeAllListeners();
  }

  setRecipient(address: string) {
    this._recipientAddress = address;
  }
}

export default ERC20Wrapper;
