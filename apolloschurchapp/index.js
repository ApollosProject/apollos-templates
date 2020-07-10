import 'react-native-gesture-handler'; // required for react-navigation
import './loadConfig';
import { AppRegistry, YellowBox } from 'react-native';
import ApollosConfig from '@apollosproject/config';
import { enableScreens } from 'react-native-screens';
import Storybook from './storybook';

enableScreens(); // improves performance for react-navigation

const useStorybook = ApollosConfig.STORYBOOK === 'true';

const MainApp = require('./src').default;

let App = MainApp;
if (useStorybook) {
  App = Storybook;
}

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
]);

AppRegistry.registerComponent('apolloschurchapp', () => App);
