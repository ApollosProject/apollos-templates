import React from 'react';
import { StyleSheet } from 'react-native';
import { styled, ConnectedImage } from '@apollosproject/ui-kit';

import LandingScreen from './LandingScreen';

const FullScreenImage = styled({
  resizeMode: 'cover',
  ...StyleSheet.absoluteFill,
})(ConnectedImage);

const LandingScreenSlide = ({ navigation }) => (
  <LandingScreen
    onPressPrimary={() => navigation.push('Auth')}
    textColor={'white'}
    BackgroundComponent={
      <FullScreenImage source={'https://picsum.photos/375/812/?random'} />
    }
    primaryNavText={"Let's go!"}
  />
);

LandingScreenSlide.navigationOptions = {
  header: null,
};

export default LandingScreenSlide;
