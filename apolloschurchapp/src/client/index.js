import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ApolloProvider, ApolloClient, ApolloLink, gql } from '@apollo/client';
import { getVersion, getApplicationName } from 'react-native-device-info';

import { authLink, buildErrorLink } from '@apollosproject/ui-auth';
import { updatePushId } from '@apollosproject/ui-notifications';

import { NavigationService } from '@apollosproject/ui-kit';

import httpLink from './httpLink';
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

const errorLink = buildErrorLink(onAuthError);

const link = ApolloLink.from([authLink, errorLink, httpLink]);

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
