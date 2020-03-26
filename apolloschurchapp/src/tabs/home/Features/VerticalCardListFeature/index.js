import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import { FeedView, H3, H6, styled } from '@apollosproject/ui-kit';
import { contentCardComponentMapper } from '@apollosproject/ui-connected';

const StyledH6 = styled(({ theme }) => ({
  color: theme.colors.text.tertiary,
}))(H6);

const VerticalCardListFeature = ({ cards, isLoading, onPressItem }) => (
  <FeedView
    onPressItem={onPressItem}
    ListItemComponent={contentCardComponentMapper}
    content={cards.map((card) => ({
      ...card,
      coverImage: get(card, 'coverImage.sources', undefined),
      __typename: card.relatedNode.__typename,
    }))}
    isLoading={isLoading}
  />
);

VerticalCardListFeature.displayName = 'Features';

VerticalCardListFeature.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  isLoading: PropTypes.bool,
  onPressItem: PropTypes.func,
  subtitle: PropTypes.string,
  title: PropTypes.string,
};

export default VerticalCardListFeature;
