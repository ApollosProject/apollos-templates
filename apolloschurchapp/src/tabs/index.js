import React from 'react';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { styled } from '@apollosproject/ui-kit';

import { SearchButton } from '../ui/Search';
import { createTab } from './Tab';
import Connect from './connect';
import tabBarIcon from './tabBarIcon';

const HeaderLogo = styled(({ theme }) => ({
  height: theme.sizing.baseUnit,
  resizeMode: 'contain',
}))(Image);

const HeaderCenter = () => <HeaderLogo source={require('./wordmark.png')} />;
const HeaderRight = () => {
  const navigation = useNavigation();
  return <SearchButton onPress={() => navigation.navigate('Search')} />;
};

// we nest stack inside of tabs so we can use all the fancy native header features
const HomeTab = createTab({
  screenOptions: {
    headerHideShadow: true,
    headerCenter: HeaderCenter,
    headerRight: HeaderRight,
    headerLargeTitle: false,
  },
  tabName: 'Home',
});

const ReadTab = createTab({
  tabName: 'Read',
});

const WatchTab = createTab({
  tabName: 'Watch',
});

const PrayTab = createTab({
  tabName: 'Pray',
});

const { Navigator, Screen } = createBottomTabNavigator();

const TabNavigator = () => (
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

export default TabNavigator;
