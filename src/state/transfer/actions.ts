import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import ERC20Wrapper from '../../lib/ERC20Wrapper';

interface FetchBalanceProps {
  account: string;
  daiWrapper: ERC20Wrapper;
}

export const updateDaiBalance = createAction<{ balance: string }>(
  'transfer/updateDaiBalance',
);
export const updateEthBalance = createAction<{ balance: string }>(
  'transfer/updateEth/Balance',
);

export const fetchDaiBalance = createAsyncThunk(
  'transfer/fetchDaiBalance',
  async (payload: FetchBalanceProps) => {
    const { account, daiWrapper } = payload;
    const response = await daiWrapper.balanceOf(account);
    // console.log('respsonse', reponse);
    // thunkAPI.dispatch(updateDaiBalance({ balance: response }));
    return response;
  },
);
