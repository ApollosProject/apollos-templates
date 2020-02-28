import { createBottomTabNavigator } from 'react-navigation';

import TabBar from './tabBar';

import Connect from './connect';
import Home from './home';
import Discover from './discover';

const TabNavigator = createBottomTabNavigator(
  {
    Home,
    Discover,
    Connect,
  },
  {
    tabBarComponent: TabBar,
    lazy: true,
    removeClippedSubviews: true,
    navigationOptions: { header: null },
  }
);

export default TabNavigator;
