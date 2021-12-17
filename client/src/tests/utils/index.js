import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from '../../context/AuthContext';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  from
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';

import { GRAPHQL_ENDPOINT } from '../../const';

import '@testing-library/jest-dom';

const httpLink = createHttpLink({
  uri: `${process.env.REACT_APP_DEV_EVENT_BOOKER_API_URL}${GRAPHQL_ENDPOINT}`
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});
const cache = new InMemoryCache();
const client = new ApolloClient({
  cache,
  link: from([errorLink, httpLink]),
});

// todo: remove apollo provider and use MockedProvider
const Providers = ({ children }) => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <AuthContextProvider>
        {children}
      </AuthContextProvider>
    </BrowserRouter>
  </ApolloProvider>
);

const customRender = (ui, options) => {
  if (options && options.route) {
    window.history.pushState({}, '', options.route);
  }
  
  return render(ui, { wrapper: Providers, ...options })
}

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }

export const generateRandomString = () => Math.random().toString(36).substr(2, 5);