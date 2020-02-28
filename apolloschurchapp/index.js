import './loadConfig';
import { AppRegistry, YellowBox } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import ApollosConfig from '@apollosproject/config';
import Storybook from './storybook';

const useStorybook = ApollosConfig.STORYBOOK === 'true';

const MainApp = require('./src').default;

let App = MainApp;
if (useStorybook) {
  App = Storybook;
}

// If there's an error before the splash screen goes away, you never see that error.
// This tries to hide the splash screen so you can see the error.
// Shouldnt't do anything in Prod.
// Depending on the error, splash screen might not go away ;)
global.ErrorUtils.setGlobalHandler(() => SplashScreen.hide());

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
]);

AppRegistry.registerComponent('apolloschurchapp', () => App);
