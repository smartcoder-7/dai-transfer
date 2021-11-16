import Box from '@mui/material/Box';
import makeStyles from '@mui/styles/makeStyles';
import { ReactNode } from 'react';

import Header from '../Header/Header';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  const useStyles = makeStyles(() => ({
    container: {
      width: '100%',
    },
    main: {
      alignItems: 'center',
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'center',
      minHeight: '100vh',
    },
  }));

  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Header />
      <main id="main" role="main" className={classes.main}>
        {children}
      </main>
    </Box>
  );
}

export default Layout;
