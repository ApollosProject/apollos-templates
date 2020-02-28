import React from 'react';
import { storiesOf } from '@apollosproject/ui-storybook';

import App from '../../src';
import Intro from './Intro';

storiesOf('Storybook', module)
  .add('Welcome', () => <Intro />)
  .add('App', () => <App />);
