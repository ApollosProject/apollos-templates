import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ContentSingle from './ContentSingle';

const { Screen, Navigator } = createStackNavigator();

const ContentSingleNavigator = (props) => (
  <Navigator headerMode="none" {...props}>
    <Screen name="ContentSingle" component={ContentSingle} />
  </Navigator>
);

export default ContentSingleNavigator;
