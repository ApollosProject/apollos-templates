import React from 'react';

module.exports = {
  track: () => '',
  AnalyticsConsumer: ({ children }) => children({ test: jest.fn() }),
  AnalyticsProvider: ({ children }) => children,
  CoreNavigationAnalytics: ({ children }) =>
    children({ onNavigationStateChange: jest.fn() }),
  TrackEventWhenLoaded: () => null,
  withTrackOnPress: (Component) => (props) => <Component {...props} />,
};
