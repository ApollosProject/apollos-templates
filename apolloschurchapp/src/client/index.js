import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ApolloProvider, ApolloClient, ApolloLink, gql } from '@apollo/client';
import { createPersistedQueryLink } from '@apollo/client/link/persisted-queries';
import { sha256 } from 'react-native-sha256';
import { getVersion, getApplicationName } from 'react-native-device-info';
import { Platform } from 'react-native';
import { createUploadLink } from 'apollo-upload-client';
import ApollosConfig from '@apollosproject/config';

import { authLink, buildErrorLink } from '@apollosproject/ui-auth';
import { updatePushId } from '@apollosproject/ui-notifications';

import { NavigationService } from '@apollosproject/ui-kit';

import cache, { ensureCacheHydration } from './cache';

const wipeData = () =>
  cache.writeQuery({
    query: gql`
      query {
        isLoggedIn @client
        cacheLoaded @client
      }
    `,
    data: {
      __typename: 'Query',
      cacheLoaded: false,
      isLoggedIn: false,
    },
  });

let storeIsResetting = false;
const onAuthError = async () => {
  if (!storeIsResetting) {
    storeIsResetting = true;
    await client.stop();
    await client.clearStore();
  }
  storeIsResetting = false;
  NavigationService.resetToAuth();
};

let uri = ApollosConfig.APP_DATA_URL;
const androidUri = ApollosConfig.ANDROID_URL || '10.0.2.2';

// Android's emulator requires localhost network traffic to go through 10.0.2.2
if (Platform.OS === 'android') uri = uri.replace('localhost', androidUri);

const errorLink = buildErrorLink(onAuthError);
const apqLink = createPersistedQueryLink({
  sha256,
  useGETForHashedQueries: true,
});

const link = ApolloLink.from([
  authLink,
  errorLink,
  apqLink,
  createUploadLink({
    uri,
    headers: {
      ...(ApollosConfig.CHURCH_HEADER
        ? { 'x-church': ApollosConfig.CHURCH_HEADER }
        : {}),
    },
  }),
]);

export const client = new ApolloClient({
  link,
  cache,
  queryDeduplication: false,
  shouldBatch: true,
  name: getApplicationName(),
  version: getVersion(),
  // NOTE: this is because we have some very taxing queries that we want to avoid running twice
  // see if it's still an issue after we're operating mostly on Postgres and have less loading states
  defaultOptions: {
    watchQuery: {
      nextFetchPolicy(lastFetchPolicy) {
        if (
          lastFetchPolicy === 'cache-and-network' ||
          lastFetchPolicy === 'network-only'
        ) {
          return 'cache-first';
        }
        return lastFetchPolicy;
      },
    },
  },
});

wipeData();
// Ensure that media player still works after logout.
client.onClearStore(() => wipeData());

const ClientProvider = ({ children }) => {
  useEffect(() => {
    const initialize = async () => {
      await ensureCacheHydration;
      client.writeQuery({
        query: gql`
          query {
            cacheLoaded @client
          }
        `,
        data: {
          cacheLoaded: true,
        },
      });
      const { isLoggedIn } = client.readQuery({
        query: gql`
          query {
            isLoggedIn @client
          }
        `,
      });
      const { pushId } = client.readQuery({
        query: gql`
          query {
            pushId @client
          }
        `,
      });
      if (isLoggedIn && pushId) {
        updatePushId({ pushId, client });
      }
    };
    initialize();
  }, []);
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

ClientProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.object, // covers Fragments
  ]).isRequired,
};

export default ClientProvider;
