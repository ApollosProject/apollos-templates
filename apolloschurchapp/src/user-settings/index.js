import React from 'react';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import { withTheme } from '@apollosproject/ui-kit';
import { MapViewConnected as Location } from '@apollosproject/ui-mapview';
import { LikedContentFeedConnected } from '@apollosproject/ui-connected';
import { NotificationSettingsConnected } from '@apollosproject/ui-notifications';

import PersonalDetails from './PersonalDetails';
import ChangePassword from './ChangePassword';
import UserSettings from './UserSettings';

const StyledText = withTheme(({ theme }) => ({
  style: {
    color: theme.colors.secondary,
    fontSize: theme.sizing.baseUnit * 1.1,
  },
}))(Text);

const ModalCloseText = () => {
  const navigation = useNavigation();
  const onPress = () => navigation.goBack();
  return (
    <StyledText name={'close'} onPress={onPress}>
      Done
    </StyledText>
  );
};

const { Screen, Navigator } = createNativeStackNavigator();

const UserSettingsNavigator = () => (
  <Navigator
    screenOptions={{
      // headerStyle: { backgroundColor: 'transparent' },
      headerHideShadow: true,
      headerRight: ModalCloseText,
      // headerLeft: ModalBackButton,
      // headerTitle: '',
      // headerTopInsetEnabled: false,
    }}
  >
    <Screen
      component={UserSettings}
      name="UserSettings"
      options={{ title: 'Profile' }}
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
