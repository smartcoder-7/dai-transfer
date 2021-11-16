const DAI_ADDRESS = '0xaD6D458402F60fD3Bd25163575031ACDce07538D';

class ERC20Wrapper {
  _address;
  constructor(address: string) {
    this._address = address;
  }

  balanceOf(address: string) {}

  transfer() {}
}

export default ERC20Wrapper;
