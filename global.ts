import { ApolloClient, InMemoryCache, split, HttpLink } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

const HASURA_URL_HOMOLOG = process.env.NEXT_PUBLIC_HASURA_URL_HOMOLOG || "";
const HASURA_SECRET = process.env.NEXT_PUBLIC_HASURA_SECRET || "";
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

console.log("HASURA_URL_HOMOLOG", HASURA_URL_HOMOLOG);
console.log("HASURA_SECRET", HASURA_SECRET);
console.log("API_URL", API_URL);

const httpLink = new HttpLink({
  uri: "https://" + HASURA_URL_HOMOLOG,
  headers: {
    "x-hasura-admin-secret": HASURA_SECRET,
  },
});

const wsLink =
  typeof window !== "undefined"
    ? new GraphQLWsLink(
        createClient({
          url: "wss://" + HASURA_URL_HOMOLOG,
          connectionParams: {
            headers: {
              "x-hasura-admin-secret": HASURA_SECRET,
            },
          },
        }),
      )
    : null;

const link = wsLink
  ? split(
      ({ query }) => {
        const def = getMainDefinition(query);
        return (
          def.kind === "OperationDefinition" && def.operation === "subscription"
        );
      },
      wsLink,
      httpLink,
    )
  : httpLink;

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
