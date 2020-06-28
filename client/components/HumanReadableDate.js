import React from 'react';
import Typography from '@material-ui/core/Typography';

const options = {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
};

const HumanReadableDate = ({ timeInMs }) => {
  return (
        <Typography color="textSecondary" gutterBottom>
          { new Date(parseInt(timeInMs)).toLocaleDateString('en-US', options) }
        </Typography>
  );
};

export default HumanReadableDate;
