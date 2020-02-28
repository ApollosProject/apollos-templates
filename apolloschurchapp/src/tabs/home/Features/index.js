import React, { memo } from 'react';
import { Query } from 'react-apollo';
import { get } from 'lodash';
// import PropTypes from 'prop-types';

import { styled, ActionListCard, H3, H6 } from '@apollosproject/ui-kit';

import GET_FEED_FEATURES from './getFeedFeatures';

const StyledH6 = styled(({ theme }) => ({
  color: theme.colors.text.tertiary,
}))(H6);

// const handleOnPressActionItem = (id) =>
//   this.props.navigation.navigate('ContentSingle', {
//     itemId: id,
//     transitionKey: 2,
//   });

const Features = memo(({ navigation }) => (
  <Query query={GET_FEED_FEATURES} fetchPolicy="cache-and-network">
    {({ data: features, loading }) =>
      loading ? (
        <ActionListCard
          isLoading
          header={
            <>
              <StyledH6 isLoading />
              <H3 isLoading />
            </>
          }
          actions={[
            {
              id: 'fakeId1',
              title: '',
              subtitle: '',
              parentChannel: {
                id: '',
                name: '',
              },
              coverImage: {
                sources: {
                  uri: '',
                },
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
              coverImage: {
                sources: {
                  uri: '',
                },
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
              coverImage: {
                sources: {
                  uri: '',
                },
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
              coverImage: {
                sources: {
                  uri: '',
                },
              },
            },
          ]}
        />
      ) : (
        get(features, 'userFeedFeatures', []).map(
          ({ title, subtitle, actions, id }) =>
            actions.length ? (
              <ActionListCard
                isLoading={loading}
                key={id}
                header={
                  <>
                    <StyledH6 numberOfLines={1}>{title}</StyledH6>
                    <H3 numberOfLines={3}>{subtitle}</H3>
                  </>
                }
                actions={actions}
                onPressActionItem={({ action, relatedNode }) => {
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
                }}
                onPressCardActionButton={() =>
                  navigation.navigate('ContentFeed', {
                    itemId: id,
                    itemTitle: title,
                  })
                }
              />
            ) : null
        )
      )
    }
  </Query>
));

Features.displayName = 'Features';

export default Features;
