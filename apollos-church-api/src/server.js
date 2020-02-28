import { ApolloServer } from 'apollo-server-express';
import ApollosConfig from '@apollosproject/config';
import express from 'express';
import { RockLoggingExtension } from '@apollosproject/rock-apollo-data-source';
import { get } from 'lodash';

import {
  resolvers,
  schema,
  testSchema,
  context,
  dataSources,
  applyServerMiddleware,
  setupJobs,
} from './data';

export { resolvers, schema, testSchema };

const isDev =
  process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test';

const extensions = isDev ? [() => new RockLoggingExtension()] : [];

const cacheOptions = isDev
  ? {}
  : {
      cacheControl: {
        stripFormattedExtensions: false,
        calculateHttpHeaders: true,
        defaultMaxAge: 3600,
      },
    };

const { ENGINE } = ApollosConfig;

const apolloServer = new ApolloServer({
  typeDefs: schema,
  resolvers,
  dataSources,
  context,
  introspection: true,
  extensions,
  formatError: (error) => {
    console.error(get(error, 'extensions.exception.stacktrace').join('\n'));
    return error;
  },
  playground: {
    settings: {
      'editor.cursorShape': 'line',
    },
  },
  ...cacheOptions,
  engine: {
    apiKey: ENGINE.API_KEY,
    schemaTag: ENGINE.SCHEMA_TAG,
  },
});

const app = express();

applyServerMiddleware({ app, dataSources, context });
setupJobs({ app, dataSources, context });

apolloServer.applyMiddleware({ app });
apolloServer.applyMiddleware({ app, path: '/' });

export default app;
