import React from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';
import { ModalViewHeader } from '@apollosproject/ui-kit';

const NavigationHeader = ({ previous, scene, navigation }) => {
  let onBack = null;
  if (previous?.route?.name === 'ContentSingle')
    onBack = () => navigation.pop();
  const onClose = () => {
    navigation.goBack();
  };

  const progress = Animated.add(
    scene.progress.current,
    scene.progress.next || 0
  );

  const opacity = progress.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0],
  });

  return (
    <Animated.View style={{ opacity }}>
      <ModalViewHeader onClose={onClose} onBack={onBack} navigationHeader />
    </Animated.View>
  );
};

NavigationHeader.propTypes = {
  previous: PropTypes.shape({
    route: PropTypes.shape({
      name: PropTypes.string,
    }),
  }),
  navigation: PropTypes.shape({
    pop: PropTypes.func,
    popToTop: PropTypes.func,
  }),
  scene: PropTypes.shape({
    progress: PropTypes.shape({
      current: PropTypes.shape({}),
      next: PropTypes.shape({}),
    }),
  }),
};

export default NavigationHeader;
