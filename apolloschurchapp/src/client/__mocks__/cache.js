import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import introspectionQueryResultData from '../fragmentTypes.json';

const nodeCacheRedirect = (_, { id }, { getCacheKey }) =>
  id ? getCacheKey({ __typename: id.split(':')[0], id }) : null;

const cache = new InMemoryCache({
  fragmentMatcher: new IntrospectionFragmentMatcher({
    introspectionQueryResultData,
  }),
  cacheRedirects: {
    Query: {
      node: nodeCacheRedirect,
    },
  },
});

export default cache;
