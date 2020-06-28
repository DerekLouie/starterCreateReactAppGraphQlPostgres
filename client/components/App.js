import React, { Fragment, useState } from 'react';
import { ApolloProvider } from '@apollo/react-components';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AppContextProvider, { mutableContext } from './AppContextProvider';
import CssBaseline from '@material-ui/core/CssBaseline';
import AuthenticatedRoute from './AuthenticatedRoute';
import Home from '../views/Home';
import Login from '../views/Login';
import Logout from '../views/Logout';
import Signup from '../views/Signup';
import NotFound from '../views/NotFound';
import { apolloClient } from '../apolloClient';

const App = ({ initialState }) => {
  const contextValue = mutableContext(useState, initialState);

  return (
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <AppContextProvider value={contextValue}>
          <CssBaseline />
          <Fragment>
            <Switch>
              <AuthenticatedRoute exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/logout" component={Logout} />
              <Route exact path="/signup" component={Signup} />
              <Route component={NotFound} />
            </Switch>
          </Fragment>
        </AppContextProvider>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
