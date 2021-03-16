import React from 'react';
import { Animated } from 'react-native';
import ApollosConfig from '@apollosproject/config';
import FRAGMENTS from '@apollosproject/ui-fragments';
import 'react-native/Libraries/Animated/src/bezier';

ApollosConfig.loadJs({ FRAGMENTS });

ApollosConfig.loadJs({
  ONE_SIGNAL_KEY: 'doesntmatter',
});

Animated.timing = (value, config) => ({
  start: (callback) => {
    value.setValue(config.toValue);
    callback && callback({ finished: true });
  },
  stop: () => ({}),
});
Animated.spring = (value, config) => ({
  start: (callback) => {
    value.setValue(config.toValue);
    callback && callback({ finished: true });
  },
  stop: () => ({}),
});

jest.mock('react-native-device-info', () => ({
  getUniqueId: () => 'id-123',
  getSystemVersion: () => 'sys-version-123',
  getModel: () => 'ios',
  getVersion: () => 'version-123',
  getBuildNumber: () => 0,
}));

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

jest.mock('./src/client/index');
