import MenuIcon from '@mui/icons-material/Menu';
import { Box, Button, Menu, MenuItem } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import { useWeb3React } from '@web3-react/core';
import React, { useEffect, useState } from 'react';

import { SUPPORTED_WALLETS } from '../../../constants';

interface ConnectedMenuProps {
  account?: string | null;
  anchorEl: Element | null | undefined;
  handleClose: () => void;
  handleDisconnect: () => void;
  id?: string;
}

function ConnectedMenu({
  id,
  anchorEl,
  handleClose,
  account,
  handleDisconnect,
}: ConnectedMenuProps) {
  return (
    <Menu
      id={id}
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      {account && <MenuItem onClick={handleClose}>{account}</MenuItem>}
      <MenuItem onClick={handleDisconnect}>Disconnect</MenuItem>
    </Menu>
  );
}

export default function Header() {
  const useStyles = makeStyles(() => ({
    menuButton: {
      marginRight: 20,
    },
    title: {
      flexGrow: 1,
    },
  }));

  const classes = useStyles();
  const { active, account, deactivate, activate } = useWeb3React();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDisconnect = async () => {
    setAnchorEl(null);
    await deactivate();
  };

  const handleLogin = async () => {
    SUPPORTED_WALLETS['METAMASK'].connector &&
      (await activate(SUPPORTED_WALLETS['METAMASK'].connector));
  };

  useEffect(() => {
    if (active) {
      console.info('Wallet has been connected.');
    } else {
      console.info('Wallet has been disconnected.');
    }
  }, [active]);

  const rightElement = active ? (
    <>
      <Button color="inherit" onClick={handleClick}>
        Connected
      </Button>
      <ConnectedMenu
        handleClose={handleClose}
        id="connected-menu"
        anchorEl={anchorEl}
        handleDisconnect={handleDisconnect}
        account={account}
      />
    </>
  ) : (
    <Button color="inherit" onClick={handleLogin}>
      Connect
    </Button>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.title}>
            Test
          </Typography>
          {rightElement}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
