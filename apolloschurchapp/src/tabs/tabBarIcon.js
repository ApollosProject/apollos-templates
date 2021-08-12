import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from '@apollosproject/ui-kit';

const tabBarIcon = (name) => {
  function TabBarIcon({ color }) {
    return <Icon name={name} fill={color} size={24} />;
  }
  TabBarIcon.propTypes = {
    color: PropTypes.string,
  };
  return TabBarIcon;
};

export default tabBarIcon;
