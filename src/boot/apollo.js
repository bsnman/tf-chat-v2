import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { onError } from "apollo-link-error";
import { ApolloLink, split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";
import fetch from "node-fetch";

const httpLink = createHttpLink({ uri: `${process.env.GRAPHQL_API}`, fetch });

const wsLink = new WebSocketLink({
  uri: `${process.env.GARPHQL_WEBSOCKET}`,
  options: {
    reconnect: true
  }
});

const httpWsLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const link = ApolloLink.from([
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    if (networkError) console.log(`[Network error]: ${networkError}`);
  }),
  httpWsLink
]);

// Create the apollo client
export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  connectToDevTools: true
});

export default ({ app, Vue }) => {
  app.apolloClient = apolloClient;
};
