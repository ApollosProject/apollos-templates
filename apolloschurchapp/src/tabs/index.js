import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TabBar from './tabBar';

import Connect from './connect';
import Home from './home';
import Discover from './discover';

const { Navigator, Screen } = createBottomTabNavigator();

const TabNavigator = (props) => (
  <Navigator {...props} tabBar={TabBar} lazy>
    <Screen name="Home" component={Home} />
    <Screen name="Discover" component={Discover} />
    <Screen name="Connect" component={Connect} />
  </Navigator>
);

export default TabNavigator;
