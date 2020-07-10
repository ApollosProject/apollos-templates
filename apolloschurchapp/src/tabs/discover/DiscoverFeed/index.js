import React, { memo } from 'react';
import { Query } from 'react-apollo';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import { FeedView, PaddedView } from '@apollosproject/ui-kit';

import TileContentFeed from './TileContentFeed';
import GET_CONTENT_CHANNELS from './getContentChannels';

const childContentItemLoadingState = {
  title: '',
  isLoading: true,
};

const feedItemLoadingState = {
  name: '',
  isLoading: true,
};

const renderItem = (
  { item } // eslint-disable-line react/prop-types
) => (
  <TileContentFeed
    id={item.id}
    name={item.name}
    content={get(item, 'childContentItemsConnection.edges', []).map(
      (edge) => edge.node
    )}
    isLoading={item.isLoading}
    loadingStateObject={childContentItemLoadingState}
  />
);

renderItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    isLoading: PropTypes.bool,
  }),
};

const DiscoverFeed = memo(() => (
  <Query query={GET_CONTENT_CHANNELS} fetchPolicy="cache-and-network">
    {({ error, loading, data: { contentChannels = [] } = {}, refetch }) => (
      <FeedView
        error={error}
        content={contentChannels}
        isLoading={loading}
        refetch={refetch}
        renderItem={renderItem}
        loadingStateObject={feedItemLoadingState}
        numColumns={1}
      />
    )}
  </Query>
));

DiscoverFeed.displayName = 'DiscoverFeed';

export default DiscoverFeed;
