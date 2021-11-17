import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

import typography from './typography';

const baseConfig = {
  typography,
  overrides: {
    MuiInput: {
      root: {
        '& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button':
          {
            display: 'none',
            margin: 80,
          },
      },
    },
  },
};

const theme = createTheme({
  ...baseConfig,
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
