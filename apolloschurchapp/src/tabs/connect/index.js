import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { withTheme } from '@apollosproject/ui-kit';
import { LikedContentFeedConnected } from '@apollosproject/ui-connected';

import UserSettings from '../../user-settings';
import PersonalDetails from '../../user-settings/PersonalDetails';
import ChangePassword from '../../user-settings/ChangePassword';
import TestingControlPanel from '../../testing-control-panel';

import Connect from './Connect';

const { Screen, Navigator } = createStackNavigator();

const ConnectNavigator = (props) => (
  <Navigator {...props}>
    <Screen
      component={Connect}
      name="Connect"
      options={{ headerShown: false }}
    />
    <Screen
      component={TestingControlPanel}
      name="TestingControlPanel"
      options={{ headerTitle: 'Testing' }}
    />
    <Screen
      component={UserSettings}
      name="UserSettings"
      options={{ headerTitle: 'Settings' }}
    />

    <Screen
      name="PersonalDetails"
      component={PersonalDetails}
      options={{ headerTitle: 'Personal Details' }}
    />
    <Screen
      name="ChangePassword"
      component={ChangePassword}
      options={{
        title: 'Change Password',
      }}
    />
    <Screen
      component={LikedContentFeedConnected}
      name="LikedContentFeedConnected"
      options={{ headerTitle: 'Your Likes' }}
    />
  </Navigator>
);

const EnhancedConnect = withTheme(({ theme, ...props }) => ({
  ...props,
  screenOptions: {
    headerTintColor: theme.colors.action.secondary,
    headerTitleStyle: {
      color: theme.colors.text.primary,
    },
    headerStyle: {
      backgroundColor: theme.colors.background.paper,
      ...Platform.select(theme.shadows.default),
    },
  },
}))(ConnectNavigator);

export default EnhancedConnect;
