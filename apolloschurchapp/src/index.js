import hoistNonReactStatic from 'hoist-non-react-statics';
import React from 'react';
import { StatusBar, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import RNBootSplash from 'react-native-bootsplash';

import {
  BackgroundView,
  withTheme,
  NavigationService,
} from '@apollosproject/ui-kit';
import Passes from '@apollosproject/ui-passes';
import { MapViewConnected as Location } from '@apollosproject/ui-mapview';
import { MediaPlayer } from '@apollosproject/ui-media-player';
import Auth, { ProtectedRoute } from '@apollosproject/ui-auth';

import { RockAuthedWebView as UserWebBrowser } from '@apollosproject/ui-connected';
import Providers from './Providers';
import ContentSingle from './content-single';
import Event from './event';
import Tabs from './tabs';
import LandingScreen from './LandingScreen';
import Onboarding from './ui/Onboarding';

const AppStatusBar = withTheme(({ theme }) => ({
  barStyle: theme.barStyle,
  backgroundColor: theme.colors.background.paper,
}))(StatusBar);

const ProtectedRouteWithSplashScreen = (props) => {
  const handleOnRouteChange = () => RNBootSplash.hide({ duration: 250 });

  return <ProtectedRoute {...props} onRouteChange={handleOnRouteChange} />;
};

// Hack to avoid needing to pass emailRequired through the navigator.navigate
const EnhancedAuth = (props) => <Auth {...props} emailRequired />;
// 😑
hoistNonReactStatic(EnhancedAuth, Auth);

const { Navigator, Screen } = createNativeStackNavigator();

const App = (props) => (
  <Providers>
    <BackgroundView>
      <AppStatusBar />
      <NavigationContainer ref={NavigationService.setTopLevelNavigator}>
        <Navigator initialRouteName="ProtectedRoute" {...props}>
          <Screen
            name="ProtectedRoute"
            component={ProtectedRouteWithSplashScreen}
          />
          <Screen name="Tabs" component={Tabs} options={{ title: 'Home' }} />
          <Screen
            name="ContentSingle"
            component={ContentSingle}
            options={{ title: 'Content' }}
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
            name="UserWebBrowser"
            component={UserWebBrowser}
            options={{ headerShown: true }}
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
        </Navigator>
      </NavigationContainer>
      <MediaPlayer />
    </BackgroundView>
  </Providers>
);

const EnhancedApp = withTheme(({ theme, ...props }) => ({
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
}))(App);

export default EnhancedApp;
