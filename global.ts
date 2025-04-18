import { ApolloClient, InMemoryCache, split, HttpLink } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

export const API_URL = "http://localhost:1337/v2/";
const HASURA_URL_HOMOLOG = "whole-buck-36.hasura.app/v1/graphql";
const HASURA_SECRET =
  "e4NUc6FuJBXFrkGmaG3sB310qpY13ds1nbas9gLh1BHsncx6sGzswOFvgny0pe5a";

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
