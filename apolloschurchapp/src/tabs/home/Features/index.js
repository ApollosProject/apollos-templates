import React, { memo } from 'react';
import { Query } from 'react-apollo';
import { get } from 'lodash';
// import PropTypes from 'prop-types';

import {
  ActionListFeature,
  CampaignItemListFeature,
  HorizontalCardListFeature,
  VerticalCardListFeature,
} from '@apollosproject/ui-connected';

import GET_FEED_FEATURES from './getFeedFeatures';

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

// const handleOnPressCardActionButton = ({ id, navigation, title }) =>
//   navigation.navigate('ContentFeed', {
//     itemId: id,
//     itemTitle: title,
//   });

const actionListLoadingStateData = [
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
        ({
          actions,
          cards,
          id,
          isFeatured,
          subtitle,
          title,
          __typename,
          ...props
        }) => {
          switch (__typename) {
            case 'ActionListFeature':
              return (
                <ActionListFeature
                  // TODO: How can we better handle generating a loading state.
                  actions={loading ? actionListLoadingStateData : actions}
                  isLoading={loading}
                  onPressActionItem={({ action, relatedNode }) =>
                    handleOnPressActionItem({
                      action,
                      navigation,
                      relatedNode,
                    })
                  }
                  // onPressActionListButton={() =>
                  //   handleOnPressCardActionButton({
                  //     id,
                  //     navigation,
                  //     title,
                  //   })
                  // }
                  subtitle={subtitle}
                  title={title}
                  {...props}
                />
              );
            case 'HorizontalCardListFeature':
              return (
                <HorizontalCardListFeature
                  cards={cards.map(({ actionIcon, ...card }) => ({
                    ...card,
                    ...(actionIcon != null
                      ? { actionIcon: card.actionIcon }
                      : {}),
                    coverImage: get(card, 'coverImage.sources', undefined),
                    __typename: card.relatedNode.__typename,
                    id: card.relatedNode.id,
                  }))}
                  isLoading={loading}
                  listKey={id}
                  onPressItem={({ action, relatedNode }) =>
                    handleOnPressActionItem({ action, relatedNode, navigation })
                  }
                  subtitle={subtitle}
                />
              );
            case 'VerticalCardListFeature': // eslint-disable-line no-case-declarations
              const Component = isFeatured
                ? CampaignItemListFeature
                : VerticalCardListFeature;
              return (
                <Component
                  cards={cards.map(({ actionIcon, ...card }) => ({
                    ...card,
                    ...(actionIcon != null
                      ? { actionIcon: card.actionIcon }
                      : {}),
                    coverImage: get(card, 'coverImage.sources', undefined),
                    __typename: card.relatedNode.__typename,
                    id: card.relatedNode.id,
                  }))}
                  isLoading={loading}
                  listKey={id}
                  onPressItem={({ action, relatedNode }) =>
                    handleOnPressActionItem({ action, relatedNode, navigation })
                  }
                  subtitle={subtitle}
                  title={title}
                />
              );
            default:
              return null;
          }
        }
      )
    }
  </Query>
));

Features.displayName = 'Features';

export default Features;
