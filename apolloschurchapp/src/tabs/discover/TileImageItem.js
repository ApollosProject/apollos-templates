import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import { TileImage, styled } from '@apollosproject/ui-kit';

const Container = styled(({ theme }) => ({
  flex: 1,
  padding: theme.sizing.baseUnit / 2,
  paddingLeft: theme.sizing.baseUnit,
  paddingRight: 0,
}))(View);

const TileImageItem = ({
  item: { id, title, coverImage = {} } = {},
  isLoading,
  navigation,
}) => (
  <Container>
    <TileImage
      onPressItem={() =>
        navigation.navigate('ContentSingle', {
          itemId: id,
        })
      }
      isLoading={isLoading}
      key={id}
      text={title}
      image={coverImage && coverImage.sources}
    />
  </Container>
);

TileImageItem.propTypes = {
  item: PropTypes.shape({}),
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
  isLoading: PropTypes.bool,
};

export default TileImageItem;
