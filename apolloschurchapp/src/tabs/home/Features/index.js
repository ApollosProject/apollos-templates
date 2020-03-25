import React, { memo } from 'react';
import { Query } from 'react-apollo';
import { get } from 'lodash';
// import PropTypes from 'prop-types';

import {
  styled,
  ActionListCard,
  H3,
  H6,
  FeedView,
} from '@apollosproject/ui-kit';

import { contentCardComponentMapper } from '@apollosproject/ui-connected';

import ActionListCardFeature from './ActionListCardFeature';

import GET_FEED_FEATURES from './getFeedFeatures';

const StyledH6 = styled(({ theme }) => ({
  color: theme.colors.text.tertiary,
}))(H6);

const handleOnPressActionItem = ({ action, navigation, relatedNode }) => {
  if (action === 'READ_CONTENT') {
    navigation.navigate('ContentSingle', {
      itemId: relatedNode.id,
      transitionKey: 2,
    });
  }
  if (action === 'READ_EVENT') {
    navigation.navigate('Event', {
      eventId: relatedNode.id,
      transitionKey: 2,
    });
  }
};

const handleOnPressCardActionButton = ({ id, navigation, title }) =>
  navigation.navigate('ContentFeed', {
    itemId: id,
    itemTitle: title,
  });

const VerticalCardListFeature = ({ cards, loading, navigation }) => (
  <FeedView
    onPressItem={handleOnPressActionItem({ navigation })}
    ListItemComponent={contentCardComponentMapper}
    content={cards.map((card) => ({
      ...card,
      coverImage: get(card, 'coverImage.sources', undefined),
      __typename: card.relatedNode.__typename,
    }))}
    isLoading={loading}
  />
);

const loadingStateData = [
  {
    id: 'fakeId1',
    title: '',
    subtitle: '',
    parentChannel: {
      id: '',
      name: '',
    },
    image: {
      sources: [
        {
          uri: '',
        },
      ],
    },
  },
  {
    id: 'fakeId2',
    title: '',
    subtitle: '',
    parentChannel: {
      id: '',
      name: '',
    },
    image: {
      sources: [
        {
          uri: '',
        },
      ],
    },
  },
  {
    id: 'fakeId3',
    title: '',
    subtitle: '',
    parentChannel: {
      id: '',
      name: '',
    },
    image: {
      sources: [
        {
          uri: '',
        },
      ],
    },
  },
  {
    id: 'fakeId4',
    title: '',
    subtitle: '',
    parentChannel: {
      id: '',
      name: '',
    },
    image: {
      sources: [
        {
          uri: '',
        },
      ],
    },
  },
];

const Features = memo(({ navigation }) => (
  <Query query={GET_FEED_FEATURES} fetchPolicy="cache-and-network">
    {({ data: features, loading }) =>
      get(features, 'userFeedFeatures', []).map(
        ({ actions, __typename, ...props }) => {
          if (__typename === 'ActionListFeature') {
            return (
              <ActionListCardFeature
                // TODO: How can we handle generating a loading state better.
                actions={loading ? loadingStateData : actions}
                onPressActionItem={({ action, relatedNode }) =>
                  handleOnPressActionItem({
                    action,
                    navigation,
                    relatedNode,
                  })
                }
                onPressActionListButton={() =>
                  handleOnPressCardActionButton({ navigation })
                }
                isLoading={loading}
                navigation={navigation}
                {...props}
              />
            );
          }
          if (__typename === 'VerticalCardListFeature') {
            return (
              <VerticalCardListFeature
                actions={actions}
                loading={loading}
                navigation={navigation}
                {...props}
              />
            );
          }
        }
      )
    }
  </Query>
));

Features.displayName = 'Features';

export default Features;
