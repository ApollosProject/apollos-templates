import React from 'react';
import PropTypes from 'prop-types';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import { ModalCloseButton, ModalBackButton } from '@apollosproject/ui-kit';
import NodeSingle from './NodeSingle';

const { Screen, Navigator } = createNativeStackNavigator();

const NodeSingleNavigator = ({ route, navigation, ...props }) => (
  <Navigator
    {...props}
    headerMode="float"
    screenOptions={{
      headerTranslucent: true,
      headerStyle: { backgroundColor: 'transparent' },
      headerHideShadow: true,
      headerRight: ModalCloseButton,
      headerLeft: ModalBackButton,
      headerTitle: '',
    }}
  >
    <Screen
      name="NodeSingle"
      component={NodeSingle}
      initialParams={route.params}
    />
  </Navigator>
);

NodeSingleNavigator.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({}),
  }),
};

export default NodeSingleNavigator;
