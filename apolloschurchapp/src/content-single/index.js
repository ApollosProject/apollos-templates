import React from 'react';
import PropTypes from 'prop-types';
import { createStackNavigator } from '@react-navigation/stack';

import ContentSingle from './ContentSingle';
import NavigationHeader from './NavigationHeader';

const { Screen, Navigator } = createStackNavigator();

const ContentSingleNavigator = ({ route, navigation, ...props }) => (
  <Navigator
    {...props}
    screenOptions={{ header: NavigationHeader, headerTransparent: true }}
  >
    <Screen
      name="ContentSingle"
      component={ContentSingle}
      initialParams={route.params}
    />
  </Navigator>
);

ContentSingleNavigator.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({}),
  }),
};

export default ContentSingleNavigator;
