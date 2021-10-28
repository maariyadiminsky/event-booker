import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
    from
  } from "@apollo/client";
  import { onError } from "@apollo/client/link/error";

  import { AuthContextProvider } from "./context/AuthContext";

import App from "./pages/App";

import { GRAPHQL_ENDPOINT } from "./const";

import "./index.css";

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

ReactDOM.render(
    <ApolloProvider client={client}>
      <BrowserRouter>
        <AuthContextProvider>
            <App />
        </AuthContextProvider>
      </BrowserRouter>
    </ApolloProvider>,
    document.getElementById("root")
);