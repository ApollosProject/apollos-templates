import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { ApolloClient } from '@apollo/client';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { SchemaLink } from '@apollo/client/link/schema';
import { importSchema } from 'graphql-import';

import { resolvers, schema, defaults } from '../../store';
import cache from './cache';

// eslint-disable-next-line
export default (props) => {
  let finalProps = props;
  // eslint-disable-next-line
  if (!props.mocks) {
    // eslint-disable-next-line
    finalProps = { ...props, resolvers };
  }
  return <MockedProvider cache={cache} {...finalProps} />;
};

const serverSchema = makeExecutableSchema({
  typeDefs: importSchema(`${process.cwd()}/schema.graphql`),
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
});
addMockFunctionsToSchema({ schema: serverSchema });

const link = new SchemaLink({ schema: serverSchema });
cache.writeData({ data: defaults });

export const client = new ApolloClient({
  link,
  cache,
  resolvers,
  typeDefs: schema,
});
