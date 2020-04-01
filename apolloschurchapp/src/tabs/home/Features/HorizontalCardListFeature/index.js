import React, { memo } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import {
  H2,
  H5,
  HorizontalTileFeed,
  PaddedView,
  styled,
  TouchableScale,
  withIsLoading,
} from '@apollosproject/ui-kit';
import { horizontalContentCardComponentMapper } from '@apollosproject/ui-connected';

const Title = styled(
  ({ theme }) => ({
    color: theme.colors.text.tertiary,
  }),
  'HorizontalCardListFeature.Title'
)(H5);

const Subtitle = styled({}, 'HorizontalCardListFeature.Subtitle')(H2);

const Header = styled(({ theme }) => ({
  paddingTop: theme.sizing.baseUnit * 3,
  paddingBottom: theme.sizing.baseUnit * 0.5,
}))(PaddedView);

const handleOnPressItem = (item) => {
  this.props.navigation.push('ContentSingle', {
    itemId: item.id,
  });
};

const keyExtractor = (item) => item && item.id;

const loadingStateObject = {
  id: 'fakeId0',
  isLoading: true,
  title: '',
  summary: '',
  channelType: '',
  coverImage: [],
};

const renderItem = ({ item }) => (
  <TouchableScale onPress={() => handleOnPressItem(item)}>
    {horizontalContentCardComponentMapper({ ...item })}
  </TouchableScale>
);

const HorizontalCardListFeature = memo(
  ({ cards, isLoading, onPressItem, subtitle, title }) => (
    <View>
      <Header vertical={false}>
        {isLoading || title ? ( // we check for isloading here so that they are included in the loading state
          <Title numberOfLines={1}>{title}</Title>
        ) : null}
        {isLoading || subtitle ? <Subtitle>{subtitle}</Subtitle> : null}
      </Header>
      <HorizontalTileFeed
        content={cards}
        isLoading={isLoading}
        keyExtractor={keyExtractor}
        loadingStateObject={loadingStateObject}
        onPressItem={onPressItem}
        renderItem={renderItem}
      />
    </View>
  )
);

HorizontalCardListFeature.displayName = 'Features';

HorizontalCardListFeature.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  isLoading: PropTypes.bool,
  onPressItem: PropTypes.func,
  subtitle: PropTypes.string,
  title: PropTypes.string,
};

export default withIsLoading(HorizontalCardListFeature);
