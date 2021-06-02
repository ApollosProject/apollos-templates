/* eslint-disable react/jsx-handler-names */

import React from 'react';
import { StatusBar } from 'react-native';
import {
  NavigationContainer,
  useNavigation,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
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

import { ContentFeedConnected } from '@apollosproject/ui-connected';
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

const ThemedNavigationContainer = withTheme(({ theme, ...props }) => ({
  theme: {
    ...(theme.type === 'dark' ? DarkTheme : DefaultTheme),
    dark: theme.type === 'dark',
    colors: {
      ...(theme.type === 'dark' ? DarkTheme.colors : DefaultTheme.colors),
      primary: theme.colors.secondary,
      background: theme.colors.background.screen,
      card: theme.colors.background.paper,
      text: theme.colors.text.primary,
    },
  },
  ...props,
}))(({ containerRef, ...props }) => (
  <NavigationContainer ref={containerRef} {...props} />
));

const { Navigator, Screen } = createNativeStackNavigator();

const App = () => (
  <Providers>
    <BackgroundView>
      <AppStatusBar />
      <ThemedNavigationContainer
        containerRef={NavigationService.setTopLevelNavigator}
        onReady={NavigationService.setIsReady}
      >
        <Navigator
          screenOptions={{ headerShown: false, stackPresentation: 'modal' }}
        >
          <Screen
            name="ProtectedRoute"
            component={ProtectedRouteWithSplashScreen}
          />
          <Screen name="Tabs" component={Tabs} />
          <Screen
            name="ContentSingle"
            component={ContentSingle}
            options={{
              title: 'Content',
              stackPresentation: 'push',
            }}
          />
          <Screen
            component={ContentFeedConnected}
            name="ContentFeed"
            options={({ route }) => ({
              title: route.params.itemTitle || 'Content Feed',
              stackPresentation: 'push',
            })}
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
              gestureEnabled: false,
              stackPresentation: 'push',
            }}
          />
          <Screen name="LandingScreen" component={LandingScreen} />
          <Screen component={Search} name="Search" />
        </Navigator>
      </ThemedNavigationContainer>
    </BackgroundView>
  </Providers>
);

export default App;
