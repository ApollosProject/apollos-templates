import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { Touchable, Icon, useTheme } from '@apollosproject/ui-kit';

const HomeSearchButton = ({ onPress }) => {
  const theme = useTheme();
  return (
    <Animated.View style={styles.container(theme)}>
      <Touchable onPress={onPress}>
        <Icon
          name={'search'}
          size={theme.sizing.baseUnit * 2}
          fill={theme.colors.primary}
        />
      </Touchable>
    </Animated.View>
  );
};

HomeSearchButton.propTypes = {
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  container: (theme) => ({
    position: 'absolute',
    right: theme.sizing.baseUnit,
    top: theme.sizing.baseUnit / 2,
  }),
});

export default HomeSearchButton;
