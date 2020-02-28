import StorybookUI, {
  loadApollosStories,
  addApollosProviderDecorator,
  configure,
} from '@apollosproject/ui-storybook';
import SplashScreen from 'react-native-splash-screen';
import Providers from '../src/Providers';

import { loadStories } from './storyLoader';

addApollosProviderDecorator(Providers);

configure(() => {
  require('./Welcome');
  loadStories();
  loadApollosStories();

  SplashScreen.hide();
}, module);

export default StorybookUI;
