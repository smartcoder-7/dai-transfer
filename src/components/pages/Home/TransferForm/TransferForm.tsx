import { Box, Button, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
interface ExchangeFormProps {
  onSubmit: (values: FormValues) => void;
}

enum ExchangeFormField {
  DAI_AMOUNT = 'daiAmount',
  RECIPIEINT_ADDRESS = 'recipientAddress',
}

interface FormValues {
  [ExchangeFormField.DAI_AMOUNT]: number;
  [ExchangeFormField.RECIPIEINT_ADDRESS]: string;
}

const initValues: FormValues = {
  [ExchangeFormField.DAI_AMOUNT]: 0,
  [ExchangeFormField.RECIPIEINT_ADDRESS]: '',
};

function ExchangeForm({ onSubmit }: ExchangeFormProps) {
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

  const handleSubmit = () => {
    onSubmit(formValues);
  };

  const handleChangeFormField = (fieldName) => (value) => {
    setFormValues((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  return (
    <Box className={classes.root}>
      <TextField
        label="Enter DAI amount"
        onChange={handleChangeFormField(ExchangeFormField.DAI_AMOUNT)}
        name={ExchangeFormField.DAI_AMOUNT}
        value={formValues[ExchangeFormField.DAI_AMOUNT]}
        margin="normal"
      />
      <TextField
        label="Enter recipient address"
        onChange={handleChangeFormField(ExchangeFormField.RECIPIEINT_ADDRESS)}
        name={ExchangeFormField.RECIPIEINT_ADDRESS}
        value={formValues[ExchangeFormField.RECIPIEINT_ADDRESS]}
        margin="normal"
      />
      <Button
        onClick={handleSubmit}
        variant="contained"
        className={classes.button}
      >
        Send
      </Button>
    </Box>
  );
}

export default ExchangeForm;
