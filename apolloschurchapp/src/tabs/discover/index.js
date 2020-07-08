import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { withTheme } from '@apollosproject/ui-kit';

import ContentFeed from '../../content-feed';

import Discover from './Discover';

const { Navigator, Screen } = createStackNavigator();

const DiscoverNavigator = (props) => (
  <Navigator initialRouteName="Discover" {...props}>
    <Screen component={Discover} name="Discover" />
    <Screen component={ContentFeed} name="ContentFeed" />
  </Navigator>
);

// TODO
// navigationOptions: { tabBarIcon: tabBarIcon('sections') },

const EnhancedDiscover = withTheme(({ theme, ...props }) => ({
  ...props,
  screenOptions: {
    headerTintColor: theme.colors.action.secondary,
    headerTitleStyle: {
      color: theme.colors.text.primary,
    },
    headerBackgroundColor: theme.colors.background.paper,
  },
}))(DiscoverNavigator);

export default EnhancedDiscover;
