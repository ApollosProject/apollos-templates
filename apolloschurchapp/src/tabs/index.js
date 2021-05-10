import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { withTheme } from '@apollosproject/ui-kit';

import Tab from './Tab';
import Connect from './connect';
import tabBarIcon from './tabBarIcon';

const { Navigator, Screen } = createBottomTabNavigator();

const TabNavigator = () => (
  <Navigator lazy>
    <Screen
      name="Home"
      component={() => (
        <Tab queryName={'homeFeedFeatures'} showHeader showTitle={false} />
      )}
      options={{ tabBarIcon: tabBarIcon('home') }}
    />
    <Screen
      name="Read"
      component={() => <Tab queryName={'readFeedFeatures'} />}
      options={{ tabBarIcon: tabBarIcon('sections') }}
    />
    <Screen
      name="Watch"
      component={() => <Tab queryName={'watchFeedFeatures'} />}
      options={{ tabBarIcon: tabBarIcon('video') }}
    />
    <Screen
      name="Pray"
      component={() => <Tab queryName={'prayFeedFeatures'} />}
      options={{ tabBarIcon: tabBarIcon('heart') }}
    />
    <Screen
      name="Connect"
      component={Connect}
      options={{ tabBarIcon: tabBarIcon('profile') }}
    />
  </Navigator>
);

const ThemedTabNavigator = withTheme(({ theme }) => ({
  tabBarOptions: {
    activeTintColor: theme?.colors?.secondary,
    inactiveTintColor: theme?.colors?.text?.tertiary,
    style: {
      backgroundColor: theme?.colors?.background?.paper,
      borderTopColor: theme?.colors?.shadows.default,
      ...Platform.select(theme?.shadows.default),
    },
  },
}))(TabNavigator);

export default ThemedTabNavigator;
