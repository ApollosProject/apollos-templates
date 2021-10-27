import { useEffect } from 'react';
import { Image, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  NavigationService,
  withTheme,
  useTheme,
  Icon,
  Touchable,
} from '@apollosproject/ui-kit';
import { useApolloClient } from '@apollo/client';
import {
  createFeatureFeedTab,
  UserAvatarConnected,
  ConnectScreenConnected,
} from '@apollosproject/ui-connected';
import { checkOnboardingStatusAndNavigate } from '@apollosproject/ui-onboarding';
import ActionTable from '../ui/ActionTable';
import ActionBar from '../ui/ActionBar';
import tabBarIcon from './tabBarIcon';

const HeaderLogo = withTheme(({ theme }) => ({
  style: {
    height: theme.sizing.baseUnit * 2.5,
    width: '70%',
    resizeMode: 'contain',
  },
  source:
    theme.type === 'light'
      ? require('./wordmark.png')
      : require('./wordmark.dark.png'),
}))(Image);

const ProfileButton = () => {
  const navigation = useNavigation();
  return (
    <Touchable
      onPress={() => {
        navigation.navigate('UserSettingsNavigator');
      }}
    >
      <View>
        <UserAvatarConnected size="xsmall" />
      </View>
    </Touchable>
  );
};

const SearchButton = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  return (
    <Touchable
      onPress={() => {
        navigation.navigate('Search');
      }}
    >
      <Icon
        name="search"
        size={theme.sizing.baseUnit * 2}
        fill={theme.colors.primary}
      />
    </Touchable>
  );
};

// we nest stack inside of tabs so we can use all the fancy native header features
const HomeTab = createFeatureFeedTab({
  screenOptions: {
    headerHideShadow: true,
    headerCenter: HeaderLogo,
    headerRight: SearchButton,
    headerLeft: ProfileButton,
    headerLargeTitle: false,
  },
  tabName: 'Home',
  feedName: 'HOME',
});

const ReadTab = createFeatureFeedTab({
  options: {
    headerLeft: ProfileButton,
  },
  tabName: 'Read',
  feedName: 'READ',
});

const WatchTab = createFeatureFeedTab({
  options: {
    headerLeft: ProfileButton,
  },
  tabName: 'Watch',
  feedName: 'WATCH',
});

const PrayTab = createFeatureFeedTab({
  options: {
    headerLeft: ProfileButton,
  },
  tabName: 'Pray',
  feedName: 'PRAY',
});

const CustomConnectScreen = () => (
  <ConnectScreenConnected ActionTable={ActionTable} ActionBar={ActionBar} />
);

const ConnectTabStack = createNativeStackNavigator();
const ConnectTabStackNavigator = () => (
  <ConnectTabStack.Navigator
    screenOptions={{
      headerHideShadow: true,
      headerLargeTitle: true,
    }}
  >
    <ConnectTabStack.Screen
      name={'Connect'}
      component={CustomConnectScreen}
      options={{
        headerLeft: ProfileButton,
      }}
    />
  </ConnectTabStack.Navigator>
);

const { Navigator, Screen } = createBottomTabNavigator();

const TabNavigator = () => {
  const client = useApolloClient();
  // this is only used by the tab loaded first
  // if there is a new version of the onboarding flow,
  // we'll navigate there first to show new screens
  useEffect(() => {
    checkOnboardingStatusAndNavigate({
      client,
      navigation: NavigationService,
      navigateHome: false,
    });
  }, [client]);
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
        component={ConnectTabStackNavigator}
        options={{
          tabBarIcon: tabBarIcon('profile'),
        }}
      />
    </Navigator>
  );
};

export default TabNavigator;
