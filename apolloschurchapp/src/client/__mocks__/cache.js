import { InMemoryCache } from '@apollo/client/cache';
import possibleTypes from '../possibleTypes.json';

const nodeCacheRedirect = (_, { id }, { getCacheKey }) =>
  id ? getCacheKey({ __typename: id.split(':')[0], id }) : null;

const cache = new InMemoryCache({
  possibleTypes,
  cacheRedirects: {
    Query: {
      node: nodeCacheRedirect,
    },
  },
});

export default cache;
