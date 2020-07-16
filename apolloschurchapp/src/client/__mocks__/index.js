import React from 'react';
import { ApolloClient } from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing';
import { SchemaLink } from '@apollo/client/link/schema';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { importSchema } from 'graphql-import';

import { resolvers, schema } from '../../store';
import GET_CACHE_LOADED from '../getCacheLoaded';
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
  typeDefs: importSchema(
    `${process.cwd()}/../apollos-church-api/local.graphql`
  ),
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
});
addMockFunctionsToSchema({ schema: serverSchema });

const link = new SchemaLink({ schema: serverSchema });
cache.writeQuery({
  query: GET_CACHE_LOADED,
  data: {
    cacheLoaded: false,
  },
});

export const client = new ApolloClient({
  link,
  cache,
  resolvers,
  typeDefs: schema,
});
