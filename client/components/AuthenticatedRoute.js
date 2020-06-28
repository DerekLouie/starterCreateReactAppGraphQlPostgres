import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAppContext } from "./AppContextProvider";
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { getApolloErrorMessage } from '../helpers/react-apollo';

const ME = gql`
  query me {
    me {
     id
     name
     email
     phone_number
    }
  }
`;

function AuthenticatedRoute({ component: Component, ...rest }) {
  const { isAuthenticated, user, setUser } = useAppContext();

  const { data, error } = useQuery(ME, { skip: Boolean(user) });

  if (error) {
      console.log(getApolloErrorMessage(error));
  }

  if (!user && data) {
      setUser(data.me);
  }

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props && props.location || '/'},
              }}
            />
        )
      }
    />
  );
}

export default AuthenticatedRoute;
