import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { withTheme } from '@apollosproject/ui-kit';
import { LikedContentFeedConnected } from '@apollosproject/ui-connected';
import { NotificationSettingsConnected } from '@apollosproject/ui-notifications';

import UserSettings from '../../user-settings';
import PersonalDetails from '../../user-settings/PersonalDetails';
import ChangePassword from '../../user-settings/ChangePassword';

import Connect from './Connect';

const { Screen, Navigator } = createNativeStackNavigator();

const ConnectNavigator = (props) => (
  <Navigator {...props}>
    <Screen
      component={Connect}
      name="Connect"
      options={{ headerShown: false }}
    />
    <Screen
      component={NotificationSettingsConnected}
      name="Notifications"
      options={{ headerTitle: 'Notifications' }}
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
    },
    headerLargeTitle: true,
  },
}))(ConnectNavigator);

export default EnhancedConnect;
