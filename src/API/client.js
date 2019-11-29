import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { SchemaLink } from "apollo-link-schema";

import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
  MockList
} from "graphql-tools";

import faker from "faker";
import chance from "chance";

const schemaString = `
schema {
    query: Query
}
type Query {
    visitors(date: Int, offset: Int, limit: Int): [Visitor!]!
}
type Visitor {
    datetime: String!
    ip_address: String!
    device: String!
}
`

const mocks = {
  Query: () => ({
    visitors: (root, args, context, info) => {
      // console.log(root, args, context, info);
      const date = (args && args.date) || new Date();
      const offset = (args && args.offset) || 0;
      const limit = (args && args.limit) || [10, 20];
      return new MockList(limit-offset);
    }
  }),

  Visitor: () => ({
    datetime: faker.date.recent(),
    ip_address: faker.internet.ip(),
    device: faker.commerce.productName()
  })
};

function getSchema() {
  // Make a GraphQL schema with no resolvers
  const schema = makeExecutableSchema({ typeDefs: schemaString });

  // Add mocks, modifies schema in place
  addMockFunctionsToSchema({ schema, mocks });

  return schema;
}

export default function getClient() {
  const schema = getSchema();
  const apolloCache = new InMemoryCache();
  const graphqlClient = new ApolloClient({
    cache: apolloCache,
    link: new SchemaLink({ schema })
  });

  return graphqlClient;
}
