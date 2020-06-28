import React from 'react';
import Loading from '../views/Loading'
import NotFound from '../views/NotFound'
import { Redirect } from 'react-router-dom'
import { deleteTokens } from '../helpers/manageTokens'
import { DEFAULT_ERROR_MESSAGE } from '../constants/messages'
import { useAppContext } from '../components/AppContextProvider';

export const getApolloErrorMessage = (error: Object = {}) => {
  const errorObjects = error.graphQLErrors;

  if (errorObjects && errorObjects.length) {
    const errorMessages = errorObjects.map(error => error.message);
    const [ firstErrorMessage ] = errorMessages;
    return firstErrorMessage || DEFAULT_ERROR_MESSAGE;
  } else {
    return error.message || DEFAULT_ERROR_MESSAGE;
  }

}

const isAuthError = (error) => {
  if (error.message.includes("Must authenticate")) {
      return true;
  }
  return false;
}

const noop = () => null;

export const QueryCallbackWrapper = ( { Component = noop, onError = noop, onLoading = noop } ) => {
  const { setIsAuthenticated } = useAppContext();
  return ({ loading, error, data }) => {
    if (loading) {
      onLoading();
      return <Loading />;
    }

    if (error) {
      if (isAuthError(error)) {
        deleteTokens();
        setIsAuthenticated(false);
        return <Redirect to="/login" />;
      }

      onError();

      return <NotFound />;
    }

    return <Component data={data} />
  };
};

export default QueryCallbackWrapper;
