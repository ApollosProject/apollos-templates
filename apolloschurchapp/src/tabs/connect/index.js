import { createStackNavigator } from 'react-navigation';
import { withTheme } from '@apollosproject/ui-kit';
import { LikedContentFeedConnected } from '@apollosproject/ui-connected';

import UserSettings from '../../user-settings';
import TestingControlPanel from '../../testing-control-panel';

import tabBarIcon from '../tabBarIcon';
import Connect from './Connect';

const ConnectNavigator = createStackNavigator(
  {
    Connect,
    TestingControlPanel,
    UserSettings,
    LikedContentFeedConnected,
  },
  {
    initialRouteName: 'Connect',
    headerMode: 'screen',
    defaultNavigationOptions: ({ screenProps }) => ({
      headerTintColor: screenProps.headerTintColor,
      headerTitleStyle: screenProps.headerTitleStyle,
    }),
    navigationOptions: { tabBarIcon: tabBarIcon('profile') },
  }
);

const EnhancedConnect = withTheme(({ theme, ...props }) => ({
  ...props,
  screenProps: {
    headerTintColor: theme.colors.action.secondary,
    headerTitleStyle: {
      color: theme.colors.text.primary,
    },
    headerBackgroundColor: theme.colors.background.paper,
  },
}))(ConnectNavigator);

export default EnhancedConnect;
