import React, { memo } from 'react';
import { Query } from 'react-apollo';
import { get } from 'lodash';
// import PropTypes from 'prop-types';

import VerticalCardListFeature from './VerticalCardListFeature';
import ActionListFeature from './ActionListFeature';

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
        ({ actions, cards, id, title, __typename, ...props }) => {
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
                  title={title}
                  {...props}
                />
              );
            case 'VerticalCardListFeature':
              return (
                <VerticalCardListFeature
                  cards={cards.map((card) => ({
                    ...card,
                    coverImage: get(card, 'coverImage.sources', undefined),
                    __typename: card.relatedNode.__typename,
                  }))}
                  isLoading={loading}
                  onPressItem={({ action, relatedNode }) =>
                    handleOnPressActionItem({ action, relatedNode, navigation })
                  }
                  title={'RECOMMENDED'}
                  subtitle={'For Him'}
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
