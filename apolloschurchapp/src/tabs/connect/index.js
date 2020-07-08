import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { withTheme } from '@apollosproject/ui-kit';
import { LikedContentFeedConnected } from '@apollosproject/ui-connected';

import UserSettings from '../../user-settings';
import TestingControlPanel from '../../testing-control-panel';

// import tabBarIcon from '../tabBarIcon';
import Connect from './Connect';

const { Screen, Navigator } = createStackNavigator();

const ConnectNavigator = (props) => (
  <Navigator headerMode="screen" {...props}>
    <Screen component={Connect} name="Connect" />
    <Screen component={TestingControlPanel} name="TestingControlPanel" />
    <Screen component={UserSettings} name="UserSettings" />
    <Screen
      component={LikedContentFeedConnected}
      name="LikedContentFeedConnected"
    />
  </Navigator>
);

// TODO: this needs to be moved to parent
// tabBarIcon: tabBarIcon('profile')

const EnhancedConnect = withTheme(({ theme, ...props }) => ({
  ...props,
  screenOptions: {
    headerTintColor: theme.colors.action.secondary,
    headerTitleStyle: {
      color: theme.colors.text.primary,
    },
    headerBackgroundColor: theme.colors.background.paper,
  },
}))(ConnectNavigator);

export default EnhancedConnect;
