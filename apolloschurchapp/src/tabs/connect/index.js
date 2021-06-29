import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { withTheme } from '@apollosproject/ui-kit';

import Connect from './Connect';

const { Screen, Navigator } = createNativeStackNavigator();

const ConnectNavigator = (props) => (
  <Navigator {...props}>
    <Screen
      component={Connect}
      name="Connect"
      options={{ headerShown: false }}
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
