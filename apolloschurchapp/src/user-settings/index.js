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
    headerMode="float"
    screenOptions={{
      headerTranslucent: true,
      headerStyle: { backgroundColor: 'transparent' },
      headerHideShadow: true,
      headerRight: ModalCloseButton,
      headerLeft: ModalBackButton,
      headerTitle: '',
      headerTopInsetEnabled: false,
    }}
  >
    <Screen component={UserSettings} name="UserSettings" />
    <Screen name="Location" component={Location} />
    <Screen component={NotificationSettingsConnected} name="Notifications" />
    <Screen name="PersonalDetails" component={PersonalDetails} />
    <Screen name="ChangePassword" component={ChangePassword} />
    <Screen
      component={LikedContentFeedConnected}
      name="LikedContentFeedConnected"
    />
  </Navigator>
);

export default UserSettingsNavigator;
