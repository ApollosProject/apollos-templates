import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import Home from './Home';
import Search from './Search';

const { Navigator, Screen } = createNativeStackNavigator();

const HomeNavigator = () => (
  <Navigator initialRouteName="Home">
    <Screen component={Home} name="Home" options={{ headerShown: false }} />
    <Screen component={Search} name="Search" options={{ headerShown: false }} />
  </Navigator>
);

export default HomeNavigator;
