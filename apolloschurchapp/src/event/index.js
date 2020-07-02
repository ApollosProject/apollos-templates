import { createStackNavigator } from 'react-navigation-stack';

import Event from './EventConnected';

const EventNavigator = createStackNavigator(
  {
    Event,
  },
  {
    initialRouteName: 'Event',
    headerMode: 'float',
    headerTransitionPreset: 'fade-in-place',
    navigationOptions: { header: null },
  }
);

export default EventNavigator;
