import React from 'react';
import { storiesOf } from '@apollosproject/ui-storybook';

import Browser from '.';

const navigation = {
  navigate: () => {},
  pop: () => {},
};

storiesOf('Browser', module)
  .add('default', () => (
    <Browser
      url={
        'https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DWWvHBEQLnV1N'
      }
      navigation={navigation}
    />
  ))
  .add('modal', () => (
    <Browser
      url={
        'https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DWWvHBEQLnV1N'
      }
      modal
      navigation={navigation}
    />
  ));
