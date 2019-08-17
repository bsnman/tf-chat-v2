import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { onError } from "apollo-link-error";
import { ApolloLink, split, concat } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";
import VueCookie from "vue-cookie";
import fetch from "node-fetch";
import { Notify } from "quasar";
import cons from "../utils/constants";

const httpLink = createHttpLink({ uri: `${process.env.GRAPHQL_API}`, fetch });

const wsLink = new WebSocketLink({
  uri: `${process.env.GRAPHQL_WEBSOCKET}`,
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

const authLink = new ApolloLink((operation, forward) => {
  const token = VueCookie.get(cons.COOKIE.USER_TOKEN);

  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : ""
    }
  });

  return forward(operation);
});

const link = ApolloLink.from([
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      // eslint-disable-next-line array-callback-return
      graphQLErrors.map(({ message, locations, path }) => {
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        );

        Notify.create({
          message
        });
      });
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);

      Notify.create({
        message: `Network Error: ${networkError}`
      });
    }
  }),
  authLink,
  httpWsLink
]);

// Create cache with unique IDs
const cache = new InMemoryCache({
  dataIdFromObject: o => o.id
});

// Create the apollo client
export const apolloClient = new ApolloClient({
  link,
  cache,
  connectToDevTools: true
});

export default ({ app, Vue }) => {
  app.apolloClient = apolloClient;
  Vue.prototype.$apolloClient = apolloClient;
};
