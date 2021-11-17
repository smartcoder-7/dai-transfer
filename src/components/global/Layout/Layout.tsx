import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import makeStyles from '@mui/styles/makeStyles';
import { useWeb3React } from '@web3-react/core';
import { ReactNode } from 'react';

import Header from '../Header/Header';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  const { active } = useWeb3React();

  const useStyles = makeStyles(() => ({
    container: {
      width: '100%',
      height: '100%',
    },
    main: {
      alignItems: 'center',
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      height: 'calc(100% - 80px)',
      justifyContent: 'center',
    },
  }));

  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Header />
      <main id="main" role="main" className={classes.main}>
        {active && children}
        {!active && (
          <Typography variant="h3">Please connect wallet!</Typography>
        )}
      </main>
    </Box>
  );
}

export default Layout;
