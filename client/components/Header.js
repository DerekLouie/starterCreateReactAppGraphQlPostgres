import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useAppContext } from "./AppContextProvider";
import { deleteTokens } from '../helpers/manageTokens'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: 42,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar({ crumbText = ''}) {
  const { isAuthenticated, setIsAuthenticated } = useAppContext();
  const classes = useStyles();

  const logout = () => {
      deleteTokens();
      setIsAuthenticated(false);
  }

  const crumb = crumbText ? ` - ${crumbText}` : '';

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Derek's App {crumb}
          </Typography>
          { isAuthenticated && <Button color="inherit" onClick={logout}>Logout</Button> }
        </Toolbar>
      </AppBar>
    </div>
  );
}
