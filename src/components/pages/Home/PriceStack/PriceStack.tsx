import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { makeStyles } from '@mui/styles';

export interface TokenPrice {
  name: string;
  price: string;
}

function PriceStack({ tokenPriceList }: { tokenPriceList: Array<TokenPrice> }) {
  const useStyles = makeStyles(() => ({
    root: {
      position: 'absolute',
      bottom: 0,
      marginRight: 20,
      right: 0,
    },
  }));

  const classes = useStyles();
  if (!tokenPriceList.length) {
    return null;
  }

  return (
    <Stack spacing={2} className={classes.root}>
      {tokenPriceList.map(({ name, price }, index) => (
        <Alert
          key={index}
          severity="info"
        >{`The price of ${name} is $${price}.`}</Alert>
      ))}
    </Stack>
  );
}

export default PriceStack;
