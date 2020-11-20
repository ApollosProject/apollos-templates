import { InMemoryCache } from '@apollo/client/cache';
import introspectionQueryResultData from '../fragmentTypes.json';

const finalPossibleTypes = {};
introspectionQueryResultData.__schema.types.forEach((supertype) => {
  if (supertype.possibleTypes) {
    finalPossibleTypes[supertype.name] = [
      ...supertype.possibleTypes.map((subtype) => subtype.name),
    ];
  }
});

const nodeCacheRedirect = (_, { id }, { getCacheKey }) =>
  id ? getCacheKey({ __typename: id.split(':')[0], id }) : null;

const cache = new InMemoryCache({
  cacheRedirects: {
    Query: {
      node: nodeCacheRedirect,
    },
  },
  possibleTypes: finalPossibleTypes,
});

export default cache;
