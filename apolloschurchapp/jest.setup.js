import React from 'react';
import { NativeModules } from 'react-native';
import ApollosConfig from '@apollosproject/config';
import FRAGMENTS from '@apollosproject/ui-fragments';

ApollosConfig.loadJs({ FRAGMENTS });

// We ran into an issue where SafeAreaView would break jest tests.
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaConsumer: ({ children }) =>
    children({ top: 0, bottom: 0, left: 0, right: 0 }),
  SafeAreaProvider: ({ children }) => children,
}));

jest.mock('@react-native-community/datetimepicker', () => 'DateTimePicker');

jest.mock('react-navigation', () => {
  const ActualNavigation = require.requireActual('react-navigation');
  return {
    ...ActualNavigation,
    SafeAreaView: require.requireActual('SafeAreaView'),
  };
});

jest.mock('@react-navigation/native', () => {
  const ActualNavigation = require.requireActual('@react-navigation/native');
  return {
    ...ActualNavigation,
    SafeAreaView: require.requireActual('SafeAreaView'),
  };
});

jest.mock('react-native-music-control', () => ({
  enableBackgroundMode: jest.fn(),
  enableControl: jest.fn(),
  on: jest.fn(),
  setNowPlaying: jest.fn(),
  STATE_PLAYING: false,
  STATE_PAUSED: true,
}));

ApollosConfig.loadJs({
  ONE_SIGNAL_KEY: 'doesntmatter',
});

jest.mock('Animated', () => {
  const ActualAnimated = require.requireActual('Animated');
  return {
    ...ActualAnimated,
    timing: (value, config) => ({
      start: (callback) => {
        value.setValue(config.toValue);
        callback && callback();
      },
      stop: () => ({}),
    }),
    spring: (value, config) => ({
      start: (callback) => {
        value.setValue(config.toValue);
        callback && callback();
      },
      stop: () => ({}),
    }),
  };
});

jest.mock('NativeAnimatedHelper');

jest.mock('react-native-safari-view', () => ({
  isAvailable: jest.fn().mockImplementation(() => Promise.resolve(true)),
  show: jest.fn(),
}));

jest.mock('react-native-device-info', () => ({
  getUniqueId: () => 'id-123',
  getSystemVersion: () => 'sys-version-123',
  getModel: () => 'ios',
  getVersion: () => 'version-123',
  getBuildNumber: () => 0,
}));

jest.mock('rn-fetch-blob', () => 'Fetch');

jest.mock('@apollosproject/ui-analytics', () => ({
  track: () => '',
  AnalyticsConsumer: ({ children }) => children({ test: jest.fn() }),
  AnalyticsProvider: ({ children }) => children,
  CoreNavigationAnalytics: ({ children }) =>
    children({ onNavigationStateChange: jest.fn() }),
  TrackEventWhenLoaded: () => null,
  withTrackOnPress: (Component) => (props) => <Component {...props} />,
}));

jest.mock('@apollosproject/ui-kit', () => ({
  ...require.requireActual('@apollosproject/ui-kit'),
  NavigationService: {
    navigate: jest.fn(),
    setTopLevelNavigator: jest.fn(),
  },
}));

jest.mock('@apollosproject/ui-notifications', () => ({
  NotificationsProvider: ({ children }) => children,
}));

jest.mock('@apollosproject/ui-mapview', () => ({
  MapViewConnected: 'MapViewConnected',
}));

jest.mock('@apollosproject/ui-media-player', () => ({
  MediaPlayerSpacer: ({ children }) => children,
  MediaPlayer: () => 'MediaPlayer',
  MediaPlayerProvider: ({ children }) => children,
  playVideoMutation: 'mutation { playVideo }',
  withTabBarMediaSpacer: () => ({ children }) => children,
}));

jest.mock('react-native-video', () => 'Video');

jest.mock('NativeEventEmitter');

jest.mock('DatePickerIOS', () => 'DatePicker');
jest.mock('./src/client/index');

NativeModules.RNGestureHandlerModule = {
  attachGestureHandler: jest.fn(),
  createGestureHandler: jest.fn(),
  dropGestureHandler: jest.fn(),
  updateGestureHandler: jest.fn(),
  State: {},
  Directions: {},
};
