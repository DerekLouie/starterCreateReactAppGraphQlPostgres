import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { getTokens } from './helpers/manageTokens';

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, path }) =>
          console.log(`[GraphQL error]: Message: ${message}, Path: ${path}`)
        );
      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
      }
    }),
    new HttpLink({
      uri: process.env.REACT_APP_API_URI,
      credentials: 'same-origin',
      fetch: async (uri, options) => {
        const tokens = getTokens();

        if (tokens && tokens.accessToken) {
          options.headers['x-access-token'] = tokens.accessToken;
        }

        const initialRequest = await fetch(uri, options);
        return initialRequest;
      },
    }),
  ]),
  cache: new InMemoryCache(),
});
