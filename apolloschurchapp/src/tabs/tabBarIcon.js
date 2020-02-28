import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from '@apollosproject/ui-kit';

const tabBarIcon = (name) => {
  function TabBarIcon({ tintColor }) {
    return <Icon name={name} fill={tintColor} size={24} />;
  }
  TabBarIcon.propTypes = {
    tintColor: PropTypes.string,
  };
  return TabBarIcon;
};

export default tabBarIcon;
