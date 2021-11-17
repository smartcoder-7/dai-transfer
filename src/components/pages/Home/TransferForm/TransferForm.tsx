import { Box, Button, Link, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ChangeEvent, useState } from 'react';

import { isAddress } from '../../../../utils/address';

interface ExchangeFormProps {
  daiBalance: string;
  isPending: boolean;
  onSubmit: (values: FormValues) => void;
  txHash: string;
}

enum TransferFormField {
  DAI_AMOUNT = 'daiAmount',
  RECIPIEINT_ADDRESS = 'recipientAddress',
}

export interface FormValues {
  [TransferFormField.DAI_AMOUNT]: string;
  [TransferFormField.RECIPIEINT_ADDRESS]: string;
}

const initValues: FormValues = {
  [TransferFormField.DAI_AMOUNT]: '',
  [TransferFormField.RECIPIEINT_ADDRESS]: '',
};

/**
 *
 * @TODO input validation
 *
 */

function TransferForm({
  onSubmit,
  daiBalance,
  txHash,
  isPending,
}: ExchangeFormProps) {
  const useStyles = makeStyles(() => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
    button: {
      marginTop: 15,
    },
  }));

  const classes = useStyles();
  const [formValues, setFormValues] = useState<FormValues>(initValues);
  const [errors, setErrors] = useState<FormValues>(initValues);

  const handleSubmit = () => {
    const isAmountValid =
      (formValues[TransferFormField.DAI_AMOUNT] || '0') > '0' &&
      formValues[TransferFormField.DAI_AMOUNT] < daiBalance;
    const isAddressValid = isAddress(
      formValues[TransferFormField.RECIPIEINT_ADDRESS],
    );

    setErrors({
      [TransferFormField.DAI_AMOUNT]: isAmountValid
        ? ''
        : 'Please enter valid address',
      [TransferFormField.RECIPIEINT_ADDRESS]: isAddressValid
        ? ''
        : 'Please enter valid address',
    });

    if (isAmountValid && isAddressValid) {
      onSubmit(formValues);
    }
  };

  const handleChangeFormField =
    (fieldName) => (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value + '';
      setFormValues((prev) => ({
        ...prev,
        [fieldName]: value,
      }));
    };

  return (
    <Box className={classes.root}>
      <TextField
        label="Enter DAI amount"
        onChange={handleChangeFormField(TransferFormField.DAI_AMOUNT)}
        name={TransferFormField.DAI_AMOUNT}
        value={formValues[TransferFormField.DAI_AMOUNT]}
        margin="normal"
        type="number"
        helperText={
          !errors[TransferFormField.DAI_AMOUNT]
            ? `Balance: ${daiBalance} DAI`
            : errors[TransferFormField.DAI_AMOUNT]
        }
        error={!!errors[TransferFormField.DAI_AMOUNT]}
      />
      <TextField
        label="Enter recipient address"
        onChange={handleChangeFormField(TransferFormField.RECIPIEINT_ADDRESS)}
        name={TransferFormField.RECIPIEINT_ADDRESS}
        value={formValues[TransferFormField.RECIPIEINT_ADDRESS]}
        margin="normal"
        type="text"
        helperText={
          errors[TransferFormField.RECIPIEINT_ADDRESS]
            ? errors[TransferFormField.RECIPIEINT_ADDRESS]
            : ''
        }
        error={!!errors[TransferFormField.RECIPIEINT_ADDRESS]}
      />
      <Button
        onClick={handleSubmit}
        variant="contained"
        className={classes.button}
        disabled={isPending}
      >
        Send
      </Button>
      {txHash && (
        <Button
          variant="contained"
          className={classes.button}
          component={Link}
          href={`https://ropsten.etherscan.io/tx/${txHash}`}
          target="_blank"
        >
          View on Etherscan
        </Button>
      )}
    </Box>
  );
}

export default TransferForm;
