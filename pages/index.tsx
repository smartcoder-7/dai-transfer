import { formatEther } from '@ethersproject/units';
import { Box } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';

import { backendGetTokenPrices } from '../src/backend/getTokenPrices';
import Meta from '../src/components/global/Meta/Meta';
import PriceStack, {
  TokenPrice,
} from '../src/components/pages/Home/PriceStack/PriceStack';
import TransferForm, {
  FormValues as TransferFormValues,
} from '../src/components/pages/Home/TransferForm/TransferForm';
import { DAI_ADDRESS } from '../src/constants';
import { useAppDispatch, useAppSelector } from '../src/hooks/redux-hook';
import useBalance from '../src/hooks/useBalance';
import ERC20Wrapper from '../src/lib/ERC20Wrapper';
import {
  fetchDaiBalance,
  updateEthBalance,
} from '../src/state/transfer/actions';
import { getProviderOrSigner } from '../src/utils/contract';

type Props = Record<string, Record<string, number>>;

function Home(props: Props) {
  const { library, account } = useWeb3React();
  const dispatch = useAppDispatch();
  const { daiBalance } = useAppSelector((state) => state.transfer);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [txHash, setTxHash] = useState<string>('');
  const [ethBalance] = useBalance();

  const providerOrSigner = getProviderOrSigner(library, account);
  const daiWrapper = new ERC20Wrapper(DAI_ADDRESS, providerOrSigner);

  const tokenPriceList = Object.entries(props).map(([key, value]) => {
    return {
      name: key,
      price: value.usd + '',
    } as TokenPrice;
  });

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
            dispatch(fetchDaiBalance({ daiWrapper, account }));
          }
        })
        .catch((error) => {
          console.error('Something went wrong!', error);
          setTxHash('');
        })
        .finally(() => {
          setIsPending(false);
        });
    } catch (error) {
      if (error.code === 4001) {
        console.error('User rejected to sign!');
      }
      setIsPending(false);
      setTxHash('');
    }
  };

  useEffect(() => {
    dispatch(fetchDaiBalance({ daiWrapper, account }));

    return () => {
      daiWrapper.stopToListen();
    };
  }, [dispatch]);

  useEffect(() => {
    const balance =
      ethBalance === null ? '' : ethBalance ? formatEther(ethBalance) : '';
    dispatch(updateEthBalance({ balance }));
  }, [ethBalance, dispatch]);

  return (
    <Box>
      <Meta
        icon="/favicon.ico"
        title="Defi Dapp"
        metaDescription="dai transfer"
      />
      <PriceStack tokenPriceList={tokenPriceList} />
      <TransferForm
        onSubmit={onSubmit}
        daiBalance={daiBalance}
        txHash={txHash}
        isPending={isPending}
      />
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const repsonse = await backendGetTokenPrices({
    baseUrl: 'https://api.coingecko.com/api/v3/simple/price',
    query: {
      ids: 'dai,ethereum',
      vs_currencies: 'usd',
    },
  });

  return {
    props: {
      ...repsonse,
    },
  };
};

export default Home;
