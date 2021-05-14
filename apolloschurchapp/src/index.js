/* eslint-disable react/jsx-handler-names */

import React from 'react';
import { StatusBar, Platform } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import SplashScreen from 'react-native-splash-screen';
import 'react-native-gesture-handler'; // required for react-navigation
import { enableScreens } from 'react-native-screens';

import {
  BackgroundView,
  withTheme,
  NavigationService,
} from '@apollosproject/ui-kit';
import Passes from '@apollosproject/ui-passes';
import { MapViewConnected as Location } from '@apollosproject/ui-mapview';
import Auth, { ProtectedRoute } from '@apollosproject/ui-auth';

import Providers from './Providers';
import ContentSingle from './content-single';
import Event from './event';
import Tabs from './tabs';
import LandingScreen from './ui/LandingScreen';
import Onboarding from './ui/Onboarding';
import Search from './ui/Search';

enableScreens(); // improves performance for react-navigation

const AppStatusBar = withTheme(({ theme }) => ({
  barStyle: theme.barStyle,
  backgroundColor: theme.colors.background.paper,
}))(StatusBar);

const ProtectedRouteWithSplashScreen = () => {
  const handleOnRouteChange = () => SplashScreen.hide();
  const navigation = useNavigation();
  return (
    <ProtectedRoute
      onRouteChange={handleOnRouteChange}
      navigation={navigation}
    />
  );
};

const { Navigator, Screen } = createNativeStackNavigator();
const ThemedNavigator = withTheme(({ theme }) => ({
  screenOptions: {
    headerTintColor: theme.colors.action.secondary,
    headerTitleStyle: {
      color: theme.colors.text.primary,
    },
    headerStyle: {
      backgroundColor: theme.colors.background.paper,
      ...Platform.select(theme.shadows.default),
    },
    headerShown: false,
    stackPresentation: 'modal',
  },
}))(Navigator);

const App = () => (
  <Providers>
    <BackgroundView>
      <AppStatusBar />
      <NavigationContainer
        ref={NavigationService.setTopLevelNavigator}
        onReady={NavigationService.setIsReady}
      >
        <ThemedNavigator>
          <Screen
            name="ProtectedRoute"
            component={ProtectedRouteWithSplashScreen}
          />
          <Screen name="Tabs" component={Tabs} options={{ title: 'Home' }} />
          <Screen
            name="ContentSingle"
            component={ContentSingle}
            options={{
              title: 'Content',
              stackPresentation: 'push',
            }}
          />
          <Screen name="Event" component={Event} options={{ title: 'Event' }} />
          <Screen
            name="Auth"
            component={Auth}
            options={{
              gestureEnabled: false,
              stackPresentation: 'push',
            }}
          />
          <Screen name="Location" component={Location} />
          <Screen
            name="Passes"
            component={Passes}
            options={{ title: 'Check-In Pass' }}
          />
          <Screen
            name="Onboarding"
            component={Onboarding}
            options={{
              title: 'Onboarding',
              gestureEnabled: false,
              stackPresentation: 'push',
            }}
          />
          <Screen name="LandingScreen" component={LandingScreen} />
          <Screen component={Search} name="Search" />
        </ThemedNavigator>
      </NavigationContainer>
    </BackgroundView>
  </Providers>
);

export default App;
