import React from 'react';
import PropTypes from 'prop-types';

import { withTheme, Touchable, Icon } from '@apollosproject/ui-kit';

const SearchIcon = withTheme(({ theme: { colors, sizing: { baseUnit } } }) => ({
  name: 'search',
  size: baseUnit * 2,
  fill: colors.primary,
}))(Icon);

const HomeSearchButton = ({ onPress }) => (
  <Touchable onPress={onPress}>
    <SearchIcon />
  </Touchable>
);

HomeSearchButton.propTypes = {
  onPress: PropTypes.func,
};

export default HomeSearchButton;
