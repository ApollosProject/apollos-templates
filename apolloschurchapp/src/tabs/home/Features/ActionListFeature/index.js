import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { styled, ActionListCard, H3, H6 } from '@apollosproject/ui-kit';

const StyledH6 = styled(({ theme }) => ({
  color: theme.colors.text.tertiary,
}))(H6);

// const handleOnPressActionItem = (id) =>
//   this.props.navigation.navigate('ContentSingle', {
//     itemId: id,
//     transitionKey: 2,
//   });

const loadingStateData = [
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
];

const ActionListFeature = memo(
  ({
    actions,
    id,
    isLoading,
    navigation,
    onPressCardActionButton,
    onPressActionItem,
    subtitle,
    title,
  }) => (
    <ActionListCard
      isLoading={isLoading}
      key={id}
      header={
        <>
          {title ? <StyledH6 numberOfLines={1}>{title}</StyledH6> : null}
          {subtitle ? <H3 numberOfLines={3}>{subtitle}</H3> : null}
        </>
      }
      actions={loadingStateData}
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
  )
);

ActionListFeature.displayName = 'Features';

ActionListFeature.PropTypes = {
  action: PropTypes.shape({}),
  id: PropTypes.number,
  isLoading: PropTypes.bool,
  subtitle: PropTypes.string,
  title: PropTypes.string,
};

export default ActionListFeature;
