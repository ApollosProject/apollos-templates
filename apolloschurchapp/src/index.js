/* eslint-disable react/jsx-handler-names */

import hoistNonReactStatic from 'hoist-non-react-statics';
import React from 'react';
import { StatusBar, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
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
import ApollosConfig from '@apollosproject/config';

import Providers from './Providers';
import ContentSingle from './content-single';
import ContentFeed from './content-feed';
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

const ProtectedRouteWithSplashScreen = (props) => {
  const handleOnRouteChange = () => SplashScreen.hide();

  return <ProtectedRoute {...props} onRouteChange={handleOnRouteChange} />;
};

const { APP_DATA_URL } = ApollosConfig;

// Hack to avoid needing to pass emailRequired through the navigator.navigate
const EnhancedAuth = (props) => (
  <Auth
    {...props}
    emailRequired
    forgotPasswordURL={`${APP_DATA_URL}/forgot-password`}
  />
);
// 😑
hoistNonReactStatic(EnhancedAuth, Auth);

const { Navigator, Screen } = createNativeStackNavigator();
const ThemedNavigator = withTheme(({ theme, ...props }) => ({
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
    headerShown: false,
    stackPresentation: 'modal',
  },
}))(Navigator);

const App = (props) => (
  <Providers>
    <BackgroundView>
      <AppStatusBar />
      <NavigationContainer
        ref={NavigationService.setTopLevelNavigator}
        onReady={NavigationService.setIsReady}
      >
        <ThemedNavigator initialRouteName="ProtectedRoute" {...props}>
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
          <Screen
            component={ContentFeed}
            name="ContentFeed"
            options={({ route }) => ({
              title: route.params.itemTitle || 'Content Feed',
            })}
          />

          <Screen name="Event" component={Event} options={{ title: 'Event' }} />
          <Screen
            name="Auth"
            component={EnhancedAuth}
            options={{
              title: 'Login',
              gestureEnabled: false,
              stackPresentation: 'push',
            }}
          />
          <Screen
            name="Location"
            component={Location}
            options={{ headerShown: true }}
          />
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
          <Screen
            name="LandingScreen"
            component={LandingScreen}
            options={{ headerShown: false }}
          />
          <Screen component={Search} name="Search" />
        </ThemedNavigator>
      </NavigationContainer>
    </BackgroundView>
  </Providers>
);

export default App;
