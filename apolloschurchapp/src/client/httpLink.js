import { createUploadLink } from 'apollo-upload-client';
import ApollosConfig from '@apollosproject/config';
import { split, createHttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';

const uri = ApollosConfig.APP_DATA_URL;

export default split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'mutation';
  },
  createUploadLink({ uri }),
  createHttpLink({
    uri,
    useGETForQueries: true,
    headers: {
      // We can safely send these headers.
      // Fastly does not currently respect no-store or no-cache directives. Including either or both of these in a Cache-Control header has no effect on Fastly's caching decision
      // https://docs.fastly.com/en/guides/configuring-caching#do-not-cache
      'Cache-Control': 'no-cache, no-store',
    },
  })
);
