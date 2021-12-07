import { Platform } from 'react-native';
import { createUploadLink } from 'apollo-upload-client';
import ApollosConfig from '@apollosproject/config';
import { split, createHttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';

let uri = ApollosConfig.APP_DATA_URL;
const androidUri = ApollosConfig.ANDROID_URL || '10.0.2.2';

// Android's emulator requires localhost network traffic to go through 10.0.2.2
if (Platform.OS === 'android') {
  uri = uri.replace('localhost', androidUri);
}

export default split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'mutation';
  },
  createUploadLink({
    uri,
    headers: {
      ...(ApollosConfig.CHURCH_HEADER
        ? { 'x-church': ApollosConfig.CHURCH_HEADER }
        : {}),
    },
  }),
  createHttpLink({
    uri,
    useGETForQueries: true,
    headers: {
      // We can safely send these headers.
      // Fastly does not currently respect no-store or no-cache directives. Including either or both of these in a Cache-Control header has no effect on Fastly's caching decision
      // https://docs.fastly.com/en/guides/configuring-caching#do-not-cache
      'Cache-Control': 'no-cache, no-store',
      ...(ApollosConfig.CHURCH_HEADER
        ? { 'x-church': ApollosConfig.CHURCH_HEADER }
        : {}),
    },
  })
);
