import React from 'react';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { styled } from '@apollosproject/ui-kit';

import { SearchButton } from '../ui/Search';
import Tab from './Tab';
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
const HomeStack = createNativeStackNavigator();
const Home = () => <Tab tab={'HOME'} />;
const HomeTab = () => (
  <HomeStack.Navigator
    screenOptions={{
      headerHideShadow: true,
      headerCenter: HeaderCenter,
      headerRight: HeaderRight,
    }}
  >
    <HomeStack.Screen name="Home" component={Home} />
  </HomeStack.Navigator>
);

const ReadStack = createNativeStackNavigator();
const Read = () => <Tab tab={'READ'} />;
const ReadTab = () => (
  <ReadStack.Navigator
    screenOptions={{
      headerHideShadow: true,
      headerLargeTitle: true,
    }}
  >
    <ReadStack.Screen name="Read" component={Read} />
  </ReadStack.Navigator>
);

const WatchStack = createNativeStackNavigator();
const Watch = () => <Tab tab={'WATCH'} />;
const WatchTab = () => (
  <WatchStack.Navigator
    screenOptions={{
      headerHideShadow: true,
      headerLargeTitle: true,
    }}
  >
    <WatchStack.Screen name="Watch" component={Watch} />
  </WatchStack.Navigator>
);

const PrayStack = createNativeStackNavigator();
const Pray = () => <Tab tab={'READ'} />;
const PrayTab = () => (
  <PrayStack.Navigator
    screenOptions={{
      headerHideShadow: true,
      headerLargeTitle: true,
    }}
  >
    <PrayStack.Screen name="Pray" component={Pray} />
  </PrayStack.Navigator>
);
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
