import React from 'react';
import { storiesOf } from '@apollosproject/ui-storybook';
import { GradientOverlayImage } from '@apollosproject/ui-kit';

import LandingScreen from '.';

storiesOf('LandingScreen', module)
  .add('default', () => <LandingScreen />)
  .add('slideTitle', () => <LandingScreen slideTitle={'Custom title text'} />)
  .add('description', () => (
    <LandingScreen description={'Custom description text'} />
  ))
  .add('textColor', () => <LandingScreen textColor={'salmon'} />)
  .add('ImageComponent', () => (
    <LandingScreen
      BackgroundComponent={
        <GradientOverlayImage
          source={'https://picsum.photos/375/812/?random'}
        />
      }
    />
  ))
  .add('Slide props', () => <LandingScreen onPressPrimary={() => {}} />);
