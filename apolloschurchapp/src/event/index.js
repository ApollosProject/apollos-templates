import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Event from './EventConnected';

const { Navigator, Screen } = createStackNavigator();

const EventNavigator = (props) => (
  <Navigator headerMode="none" {...props}>
    <Screen name="Event" component={Event} />
  </Navigator>
);

export default EventNavigator;
