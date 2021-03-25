import React from 'react';
import PropTypes from 'prop-types';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import { ModalCloseButton, ModalBackButton } from '@apollosproject/ui-kit';
import ContentSingle from './ContentSingle';

const { Screen, Navigator } = createNativeStackNavigator();

const ContentSingleNavigator = ({ route, navigation, ...props }) => (
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
      headerTopInsetEnabled: false,
    }}
  >
    <Screen
      name="ContentSingle"
      component={ContentSingle}
      initialParams={route.params}
    />
  </Navigator>
);

ContentSingleNavigator.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({}),
  }),
};

export default ContentSingleNavigator;
