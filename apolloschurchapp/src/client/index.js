import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ApolloProvider, ApolloClient, ApolloLink } from '@apollo/client';
import { getVersion, getApplicationName } from 'react-native-device-info';

import { authLink, buildErrorLink } from '@apollosproject/ui-auth';

import { NavigationService } from '@apollosproject/ui-kit';
import { resolvers, schema, defaults, GET_ALL_DATA } from '../store';

import httpLink from './httpLink';
import cache, { ensureCacheHydration } from './cache';
import MARK_CACHE_LOADED from './markCacheLoaded';

const goToAuth = () => NavigationService.resetToAuth();
const wipeData = () =>
  cache.writeQuery({ query: GET_ALL_DATA, data: defaults });

let storeIsResetting = false;
const onAuthError = async () => {
  if (!storeIsResetting) {
    storeIsResetting = true;
    await client.stop();
    await client.clearStore();
  }
  storeIsResetting = false;
  goToAuth();
};

const errorLink = buildErrorLink(onAuthError);

const link = ApolloLink.from([authLink, errorLink, httpLink]);

export const client = new ApolloClient({
  link,
  cache,
  queryDeduplication: false,
  shouldBatch: true,
  resolvers,
  typeDefs: schema,
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

class ClientProvider extends PureComponent {
  static propTypes = {
    client: PropTypes.shape({
      cache: PropTypes.shape({}),
    }),
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
      PropTypes.object, // covers Fragments
    ]).isRequired,
  };

  static defaultProps = {
    client,
  };

  async componentDidMount() {
    try {
      await ensureCacheHydration;
    } catch (e) {
      throw e;
    } finally {
      client.mutate({ mutation: MARK_CACHE_LOADED });
    }
  }

  render() {
    const { children, ...otherProps } = this.props;
    return (
      <ApolloProvider {...otherProps} client={client}>
        {children}
      </ApolloProvider>
    );
  }
}

export default ClientProvider;
