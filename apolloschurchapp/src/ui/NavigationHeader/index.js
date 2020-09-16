import React from 'react';
import PropTypes from 'prop-types';
import { ModalViewHeader } from '@apollosproject/ui-kit';

const NavigationHeader = ({ scene, navigation }) => {
  let onBack = null;
  if (scene.index > 0) onBack = () => navigation.pop();
  const onClose = () => {
    navigation.goBack();
  };

  return <ModalViewHeader onClose={onClose} onBack={onBack} navigationHeader />;
};

NavigationHeader.propTypes = {
  scene: PropTypes.shape({
    index: PropTypes.number,
  }),
  navigation: PropTypes.shape({
    pop: PropTypes.func,
    popToTop: PropTypes.func,
  }),
};

export default NavigationHeader;
