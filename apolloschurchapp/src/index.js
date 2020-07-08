import hoistNonReactStatic from 'hoist-non-react-statics';
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
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

import Providers from './Providers';
import ContentSingle from './content-single';
import Event from './event';
import Tabs from './tabs';
import PersonalDetails from './user-settings/PersonalDetails';
import ChangePassword from './user-settings/ChangePassword';
import LandingScreen from './LandingScreen';
import UserWebBrowser from './user-web-browser';
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

const { Navigator, Screen } = createStackNavigator();

const App = () => (
  <Providers>
    <BackgroundView>
      <AppStatusBar />
      <NavigationContainer>
        <Navigator
          ref={(navigatorRef) => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
          initialRouteName="ProtectedRoute"
          mode="modal"
          headerMode="screen"
        >
          <Screen
            name="ProtectedRoute"
            component={ProtectedRouteWithSplashScreen}
          />
          <Screen name="Tabs" component={Tabs} />
          <Screen name="ContentSingle" component={ContentSingle} />
          <Screen name="Event" component={Event} />
          <Screen name="Auth" component={EnhancedAuth} />
          <Screen name="PersonalDetails" component={PersonalDetails} />
          <Screen name="ChangePassword" component={ChangePassword} />
          <Screen name="Location" component={Location} />
          <Screen name="Passes" component={Passes} />
          <Screen name="UserWebBrowser" component={UserWebBrowser} />
          <Screen name="Onboarding" component={Onboarding} />
          <Screen name="LandingScreen" component={LandingScreen} />
        </Navigator>
      </NavigationContainer>
      <MediaPlayer />
    </BackgroundView>
  </Providers>
);

export default App;
