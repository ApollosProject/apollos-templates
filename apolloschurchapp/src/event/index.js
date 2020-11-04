import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import PropTypes from 'prop-types';
import NavigationHeader from '../ui/NavigationHeader';
import Event from './EventConnected';

const { Navigator, Screen } = createStackNavigator();

const EventNavigator = ({ route, ...props }) => (
  <Navigator
    {...props}
    screenOptions={{ header: NavigationHeader, headerTransparent: true }}
  >
    <Screen name="Event" initialParams={route.params} component={Event} />
  </Navigator>
);

EventNavigator.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({}),
  }),
};

export default EventNavigator;
