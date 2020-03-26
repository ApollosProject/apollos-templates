import React, { memo } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import {
  FeedView,
  H3,
  H6,
  PaddedView,
  styled,
  withIsLoading,
} from '@apollosproject/ui-kit';
import { contentCardComponentMapper } from '@apollosproject/ui-connected';

const StyledH6 = styled(({ theme }) => ({
  color: theme.colors.text.tertiary,
}))(H6);

// const getContent = ({ cards, isLoading }) => {
//   let content = [];
//   if (isLoading && !cards.length) {
//     content = [
//       {
//         id: 'fakeId0',
//         isLoading: true,
//         title: 'Test',
//         summary: 'Boom',
//         channelType: '',
//         coverImage: [],
//         parentChannel: {
//           id: '',
//           name: '',
//         },
//       },
//     ];
//   } else {
//     content = cards.map((card) => ({
//       ...card,
//       coverImage: get(card, 'coverImage.sources', undefined),
//       __typename: card.relatedNode.__typename,
//     }));
//   }
//
//   return content;
// };

const VerticalCardListFeature = memo(
  ({ cards, isLoading, onPressItem, subtitle, title }) => (
    <View>
      <PaddedView>
        {isLoading || title ? ( // we check for isloading here so that they are included in the loading state
          <StyledH6 numberOfLines={1}>{title}</StyledH6>
        ) : null}
        {isLoading || subtitle ? <H3>{subtitle}</H3> : null}
      </PaddedView>
      <FeedView
        onPressItem={onPressItem}
        ListItemComponent={contentCardComponentMapper}
        content={cards} // {getContent({ cards, isLoading })}
        isLoading={isLoading}
      />
    </View>
  )
);

VerticalCardListFeature.displayName = 'Features';

VerticalCardListFeature.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  isLoading: PropTypes.bool,
  onPressItem: PropTypes.func,
  subtitle: PropTypes.string,
  title: PropTypes.string,
};

export default withIsLoading(VerticalCardListFeature);
