import { createStackNavigator } from 'react-navigation';

import NodeSingle from './NodeSingle';

const ContentSingleNavigator = createStackNavigator(
  {
    NodeSingle,
  },
  {
    initialRouteName: 'NodeSingle',
    headerMode: 'float',
    headerTransitionPreset: 'fade-in-place',
    navigationOptions: { header: null },
  }
);

export default ContentSingleNavigator;
