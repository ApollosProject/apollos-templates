import hoistNonReactStatic from 'hoist-non-react-statics';
import React from 'react';
import { StatusBar } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import RNBootSplash from 'react-native-bootsplash';

import {
  BackgroundView,
  withTheme,
  NavigationService,
} from '@apollosproject/ui-kit';
import Passes from '@apollosproject/ui-passes';
import { CoreNavigationAnalytics } from '@apollosproject/ui-analytics';
import { MapViewConnected as Location } from '@apollosproject/ui-mapview';
import { MediaPlayer } from '@apollosproject/ui-media-player';
import Auth, { ProtectedRoute } from '@apollosproject/ui-auth';

import Providers from './Providers';
import ContentSingle from './content-single';
import NodeSingle from './node-single';
import Event from './event';
import Tabs from './tabs';
import PersonalDetails from './user-settings/PersonalDetails';
import ChangePassword from './user-settings/ChangePassword';
import LandingScreen from './ui/LandingScreen';
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

const AppNavigator = createStackNavigator(
  {
    ProtectedRoute: ProtectedRouteWithSplashScreen,
    Tabs,
    ContentSingle,
    NodeSingle,
    Event,
    Auth: EnhancedAuth,
    PersonalDetails,
    ChangePassword,
    Location,
    Passes,
    Onboarding,
    LandingScreen,
  },
  {
    initialRouteName: 'ProtectedRoute',
    mode: 'modal',
    headerMode: 'screen',
  }
);

const AppContainer = createAppContainer(AppNavigator);

const App = () => (
  <Providers>
    <BackgroundView>
      <AppStatusBar />
      <CoreNavigationAnalytics>
        {(props) => (
          <AppContainer
            ref={(navigatorRef) => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
            {...props}
          />
        )}
      </CoreNavigationAnalytics>
      <MediaPlayer />
    </BackgroundView>
  </Providers>
);

export default App;
