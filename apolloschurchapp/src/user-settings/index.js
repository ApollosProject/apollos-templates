import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import { MapViewConnected as Location } from '@apollosproject/ui-mapview';
import { ModalCloseButton, ModalBackButton } from '@apollosproject/ui-kit';
import { LikedContentFeedConnected } from '@apollosproject/ui-connected';
import { NotificationSettingsConnected } from '@apollosproject/ui-notifications';

import PersonalDetails from './PersonalDetails';
import ChangePassword from './ChangePassword';
import UserSettings from './UserSettings';

const { Screen, Navigator } = createNativeStackNavigator();

const UserSettingsNavigator = () => (
  <Navigator
    screenOptions={{
      // headerStyle: { backgroundColor: 'transparent' },
      headerHideShadow: true,
      headerRight: ModalCloseButton,
      headerLeft: ModalBackButton,
      // headerTitle: '',
      // headerTopInsetEnabled: false,
    }}
  >
    <Screen
      component={UserSettings}
      name="UserSettings"
      options={{ title: 'User Settings' }}
    />

    <Screen
      name="Location"
      component={Location}
      options={{ title: 'Campuses' }}
    />
    <Screen
      component={NotificationSettingsConnected}
      name="Notifications"
      options={{ title: 'Notification Settings' }}
    />
    <Screen
      name="PersonalDetails"
      component={PersonalDetails}
      options={{ title: 'Personal Details' }}
    />
    <Screen
      name="ChangePassword"
      component={ChangePassword}
      options={{ title: 'Change Password' }}
    />
    <Screen
      component={LikedContentFeedConnected}
      name="LikedContentFeedConnected"
      options={{ title: 'Liked Content' }}
    />
  </Navigator>
);

export default UserSettingsNavigator;
