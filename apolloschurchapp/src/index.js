/* eslint-disable react/jsx-handler-names */

import React from 'react';
import PropTypes from 'prop-types';
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
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import {
  BackgroundView,
  NavigationService,
  Themer,
  useTheme,
} from '@apollosproject/ui-kit';
import Passes from '@apollosproject/ui-passes';
import { MapViewConnected as Location } from '@apollosproject/ui-mapview';
import Auth, { ProtectedRoute } from '@apollosproject/ui-auth';
import { Landing, Onboarding } from '@apollosproject/ui-onboarding';

import {
  ContentFeedConnected,
  SearchScreenConnected,
} from '@apollosproject/ui-connected';
import Providers from './Providers';
import ContentSingle from './content-single';
import Tabs from './tabs';
import customTheme, { customIcons } from './theme';

enableScreens(); // improves performance for react-navigation

const AppStatusBar = () => {
  const theme = useTheme();
  return (
    <StatusBar
      barStyle={theme.barStyle}
      backgroundColor={theme.colors.background.paper}
    />
  );
};

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

const ThemedNavigationContainer = ({ containerRef, onReady, children }) => {
  const theme = useTheme();
  return (
    <NavigationContainer
      ref={containerRef}
      onReady={onReady}
      theme={{
        ...(theme.type === 'dark' ? DarkTheme : DefaultTheme),
        dark: theme.type === 'dark',
        colors: {
          ...(theme.type === 'dark' ? DarkTheme.colors : DefaultTheme.colors),
          primary: theme.colors.secondary,
          background: theme.colors.background.screen,
          card: theme.colors.background.paper,
          text: theme.colors.text.primary,
        },
      }}
    >
      {children}
    </NavigationContainer>
  );
};

ThemedNavigationContainer.propTypes = {
  containerRef: PropTypes.func,
  onReady: PropTypes.func,
  children: PropTypes.element,
};

const LandingToAuth = () => {
  const navigation = useNavigation();
  return <Landing onPressPrimary={() => navigation.navigate('Auth')} />;
};

const { Navigator, Screen } = createNativeStackNavigator();

const App = () => (
  <Themer theme={customTheme} icons={customIcons}>
    <SafeAreaProvider>
      <BottomSheetModalProvider>
        <BackgroundView>
          <AppStatusBar />
          <ThemedNavigationContainer
            containerRef={NavigationService.setTopLevelNavigator}
            onReady={NavigationService.setIsReady}
          >
            <Providers>
              <Navigator
                screenOptions={{
                  headerShown: false,
                  stackPresentation: 'modal',
                }}
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
                <Screen name="LandingScreen" component={LandingToAuth} />
                <Screen name="Search" component={SearchScreenConnected} />
              </Navigator>
            </Providers>
          </ThemedNavigationContainer>
        </BackgroundView>
      </BottomSheetModalProvider>
    </SafeAreaProvider>
  </Themer>
);

export default App;
