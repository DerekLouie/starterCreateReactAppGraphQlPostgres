import React from 'react';
import { Redirect } from 'react-router-dom';
import { deleteTokens } from '../helpers/manageTokens';
import { useAppContext } from '../components/AppContextProvider';

const Logout = () => {
  const { setIsAuthenticated } = useAppContext();
  deleteTokens();
  setIsAuthenticated(false);
  return <Redirect to={{ pathname: '/login' }} />;
};

export default Logout;
