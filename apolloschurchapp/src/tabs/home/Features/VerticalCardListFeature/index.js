import React, { memo } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import {
  FeedView,
  H2,
  H5,
  PaddedView,
  styled,
  withIsLoading,
} from '@apollosproject/ui-kit';
import {
  contentCardComponentMapper,
  LiveConsumer,
} from '@apollosproject/ui-connected';

const Title = styled(
  ({ theme }) => ({
    color: theme.colors.text.tertiary,
  }),
  'VerticalCardListFeature.Title'
)(H5);

const Subtitle = styled({}, 'VerticalCardListFeature.Subtitle')(H2);

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

const ListItemComponent = ({ contentId, ...item }) => (
  <LiveConsumer contentId={contentId}>
    {(liveStream) => {
      const isLive = !!(liveStream && liveStream.isLive);
      const labelText = isLive ? 'Live' : item.labelText;
      return contentCardComponentMapper({ isLive, ...item, labelText });
    }}
  </LiveConsumer>
);

ListItemComponent.propTypes = {
  contentId: PropTypes.string,
};

const VerticalCardListFeature = memo(
  ({ cards, isLoading, listKey, onPressItem, subtitle, title }) => (
    <View>
      <Header vertical={false}>
        {isLoading || title ? ( // we check for isloading here so that they are included in the loading state
          <Title numberOfLines={1}>{title}</Title>
        ) : null}
        {isLoading || subtitle ? <Subtitle>{subtitle}</Subtitle> : null}
      </Header>
      <FeedView
        onPressItem={onPressItem}
        ListItemComponent={ListItemComponent}
        content={cards} // {getContent({ cards, isLoading })}
        isLoading={isLoading}
        listKey={listKey}
      />
    </View>
  )
);

VerticalCardListFeature.displayName = 'Features';

VerticalCardListFeature.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  isLoading: PropTypes.bool,
  listKey: PropTypes.string,
  onPressItem: PropTypes.func,
  subtitle: PropTypes.string,
  title: PropTypes.string,
};

export default withIsLoading(VerticalCardListFeature);
