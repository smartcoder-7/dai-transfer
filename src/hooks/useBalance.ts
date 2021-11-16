import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';

function useBalance() {
  const { account, library, chainId } = useWeb3React();

  const [balance, setBalance] = useState<string | null>('');
  useEffect(() => {
    if (!!account && !!library) {
      let stale = false;

      library
        .getBalance(account)
        .then((balance) => {
          if (!stale) {
            setBalance(balance);
          }
        })
        .catch(() => {
          if (!stale) {
            setBalance(null);
          }
        });

      return () => {
        stale = true;
        setBalance('');
      };
    }
  }, [account, library, chainId]);

  return [balance];
}

export default useBalance;
