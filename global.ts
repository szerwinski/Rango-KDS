import { ApolloClient, InMemoryCache, split, HttpLink } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

export const API_URL = "http://localhost:1337/v2/";
const HASURA_URL_HOMOLOG = "whole-buck-36.hasura.app/v1/graphql";

const httpLink = new HttpLink({ uri: "http://" + HASURA_URL_HOMOLOG });

const wsLink =
  typeof window !== "undefined"
    ? new GraphQLWsLink(createClient({ url: "ws://" + HASURA_URL_HOMOLOG }))
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
