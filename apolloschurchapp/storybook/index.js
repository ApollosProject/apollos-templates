import StorybookUI, {
  loadApollosStories,
  addApollosProviderDecorator,
  configure,
} from '@apollosproject/ui-storybook';
import RNBootSplash from 'react-native-bootsplash';
import Providers from '../src/Providers';

import { loadStories } from './storyLoader';

addApollosProviderDecorator(Providers);

configure(() => {
  require('./Welcome');
  loadStories();
  loadApollosStories();

  RNBootSplash.hide({ duration: 250 });
}, module);

export default StorybookUI;
