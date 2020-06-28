import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles((theme) => ({
  margin: {
    marginBottom: '1rem',
  },
}));

const EmailInput = ({ value, onChange }) => {
  const classes = useStyles();
  return <Input type="email" value={value} onChange={onChange} className={classes.margin} placeholder="Email" />;
};

export default EmailInput;
