import { createStackNavigator } from 'react-navigation';

import NodeSingle from './NodeSingle';

const NodeSingleNavigator = createStackNavigator(
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

export default NodeSingleNavigator;
