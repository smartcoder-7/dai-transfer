import { Box } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';

import Meta from '../src/components/global/Meta/Meta';
import TransferForm, {
  FormValues as TransferFormValues,
} from '../src/components/pages/Home/TransferForm/TransferForm';
import ERC20Wrapper from '../src/lib/ERC20Wrapper';
import { getProviderOrSigner } from '../src/utils/contract';

const DAI_ADDRESS = '0xaD6D458402F60fD3Bd25163575031ACDce07538D';

function Home() {
  const { library, active, account } = useWeb3React();
  const [isPending, setIsPending] = useState<boolean>(false);
  const [daiBalance, setDaiBalance] = useState<string>('');
  const [txHash, setTxHash] = useState<string>('');
  const providerOrSigner = getProviderOrSigner(library, account);
  const daiWrapper = new ERC20Wrapper(DAI_ADDRESS, providerOrSigner);

  const onSubmit = async (values: TransferFormValues) => {
    setIsPending(true);
    try {
      const tx = await daiWrapper.transfer(
        values.recipientAddress,
        values.daiAmount,
      );
      tx.wait()
        .then((value) => {
          if (value.status) {
            setTxHash(value.transactionHash);
          }
        })
        .catch((error) => {
          console.error('Something went wrong!', error);
          setTxHash('');
        });
    } catch (error) {
      if (error.code === 4001) {
        console.error('User rejected to sign!');
      }
      setTxHash('');
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    if (!active) {
      daiWrapper.stopToListen();
      return;
    }

    const fetchData = async () => {
      const daiBalance = await daiWrapper.balanceOf(account);
      setDaiBalance(daiBalance);
    };
    fetchData();

    return () => {
      daiWrapper.stopToListen();
    };
  }, [active, account]);

  return (
    <Box>
      <Meta
        icon="/favicon.ico"
        title="Defi Dapp"
        metaDescription="dai transfer"
      />
      <TransferForm
        onSubmit={onSubmit}
        daiBalance={daiBalance}
        txHash={txHash}
        isPending={isPending}
      />
    </Box>
  );
}

export default Home;
