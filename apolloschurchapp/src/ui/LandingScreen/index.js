import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { styled, withTheme } from '@apollosproject/ui-kit';

import LandingScreen from './LandingScreen';

const FullScreenImage = styled({
  resizeMode: 'cover',
  ...StyleSheet.absoluteFill,
  width: '100%',
  height: '100%',
})(Image);

const ThemedLandingScreen = withTheme(({ theme }) => ({
  textColor: theme.colors.primary,
}))(LandingScreen);

const LandingScreenSlide = ({ navigation }) => (
  <ThemedLandingScreen
    onPressPrimary={() => navigation.push('Auth')}
    BackgroundComponent={
      <FullScreenImage source={require('./img/landing.jpg')} />
    }
    primaryNavText={"Let's go!"}
  />
);

export default LandingScreenSlide;
