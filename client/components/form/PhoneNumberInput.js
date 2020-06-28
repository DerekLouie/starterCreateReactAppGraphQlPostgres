import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MuiPhoneNumber from 'material-ui-phone-number';

const useStyles = makeStyles((theme) => ({
  margin: {
    marginBottom: '1rem',
  },
}));

const PhoneNumberInput = ({ value, onChange }) => {
  const classes = useStyles();
  return (
    <MuiPhoneNumber
      className={classes.margin}
      disableDropdown={true}
      defaultCountry={'us'}
      value={value}
      onChange={onChange}
    />
  );
};

export default PhoneNumberInput;
