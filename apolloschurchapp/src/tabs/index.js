import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  NavigationService,
  withTheme,
  Icon,
  Touchable,
} from '@apollosproject/ui-kit';
import { useApolloClient } from '@apollo/client';
import { createFeatureFeedTab } from '@apollosproject/ui-connected';
import { checkOnboardingStatusAndNavigate } from '@apollosproject/ui-onboarding';
import Connect from './connect';
import tabBarIcon from './tabBarIcon';

const SearchIcon = withTheme(({ theme: { colors, sizing: { baseUnit } } }) => ({
  name: 'search',
  size: baseUnit * 2,
  fill: colors.primary,
}))(Icon);

const SearchButton = ({ onPress }) => (
  <Touchable onPress={onPress}>
    <SearchIcon />
  </Touchable>
);

SearchButton.propTypes = {
  onPress: PropTypes.func,
};

const HeaderRight = () => {
  const navigation = useNavigation();
  return <SearchButton onPress={() => navigation.navigate('Search')} />;
};

// we nest stack inside of tabs so we can use all the fancy native header features
const HomeTab = createFeatureFeedTab({
  screenOptions: {
    headerHideShadow: true,
    headerRight: HeaderRight,
    headerLargeTitle: false,
  },
  tabName: 'Home',
  feedName: 'HOME',
});

const ReadTab = createFeatureFeedTab({
  tabName: 'Read',
  feedName: 'READ',
});

const WatchTab = createFeatureFeedTab({
  tabName: 'Watch',
  feedName: 'WATCH',
});

const PrayTab = createFeatureFeedTab({
  tabName: 'Pray',
  feedName: 'PRAY',
});

const { Navigator, Screen } = createBottomTabNavigator();

const TabNavigator = () => {
  const client = useApolloClient();
  // this is only used by the tab loaded first
  // if there is a new version of the onboarding flow,
  // we'll navigate there first to show new screens
  useEffect(
    () => {
      checkOnboardingStatusAndNavigate({
        client,
        navigation: NavigationService,
        navigateHome: false,
      });
    },
    [client]
  );
  return (
    <Navigator lazy>
      <Screen
        name="Home"
        component={HomeTab}
        options={{ tabBarIcon: tabBarIcon('home') }}
      />
      <Screen
        name="Read"
        component={ReadTab}
        options={{ tabBarIcon: tabBarIcon('sections') }}
      />
      <Screen
        name="Watch"
        component={WatchTab}
        options={{ tabBarIcon: tabBarIcon('video') }}
      />
      <Screen
        name="Pray"
        component={PrayTab}
        options={{ tabBarIcon: tabBarIcon('like') }}
      />
      <Screen
        name="Connect"
        component={Connect}
        options={{ tabBarIcon: tabBarIcon('profile') }}
      />
    </Navigator>
  );
};

export default TabNavigator;
