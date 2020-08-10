import React from 'react';
import { StyleSheet } from 'react-native';
import { styled, ConnectedImage } from '@apollosproject/ui-kit';

import ApollosLandingScreen from './ui/LandingScreen';

const FullScreenImage = styled({
  resizeMode: 'cover',
  ...StyleSheet.absoluteFill,
})(ConnectedImage);

const LandingScreen = ({ navigation }) => (
  <ApollosLandingScreen
    onPressPrimary={() => navigation.push('Auth')}
    textColor={'white'}
    BackgroundComponent={
      <FullScreenImage source={'https://picsum.photos/375/812/?random'} />
    }
    primaryNavText={"Let's go!"}
  />
);

LandingScreen.navigationOptions = {
  header: null,
};

export default LandingScreen;
