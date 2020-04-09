import React, { memo } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import {
  FeaturedCard,
  FeedView,
  H2,
  H5,
  PaddedView,
  styled,
  withIsLoading,
} from '@apollosproject/ui-kit';

const Title = styled(
  ({ theme }) => ({
    color: theme.colors.text.tertiary,
  }),
  'CampaignItemListFeature.Title'
)(H5);

const Subtitle = styled({}, 'CampaignItemListFeature.Subtitle')(H2);

const Header = styled(({ theme }) => ({
  paddingTop: theme.sizing.baseUnit * 3,
  paddingBottom: theme.sizing.baseUnit * 0.5,
}))(PaddedView);

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

const CampaignItemListFeature = memo(
  ({ cards, isLoading, listKey, onPressItem, subtitle, title }) => (
    <View>
      {isLoading || title || subtitle ? ( // only display the Header if we are loading or have a title/subtitle
        <Header vertical={false}>
          {isLoading || title ? ( // we check for isloading here so that they are included in the loading state
            <Title numberOfLines={1}>{title}</Title>
          ) : null}
          {isLoading || subtitle ? <Subtitle>{subtitle}</Subtitle> : null}
        </Header>
      ) : null}
      <FeedView
        onPressItem={onPressItem}
        ListItemComponent={FeaturedCard}
        content={cards} // {getContent({ cards, isLoading })}
        isLoading={isLoading}
        listKey={listKey}
      />
    </View>
  )
);

CampaignItemListFeature.displayName = 'Features';

CampaignItemListFeature.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  isLoading: PropTypes.bool,
  listKey: PropTypes.string,
  onPressItem: PropTypes.func,
  subtitle: PropTypes.string,
  title: PropTypes.string,
};

export default withIsLoading(CampaignItemListFeature);
