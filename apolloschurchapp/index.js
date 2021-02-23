import './loadConfig';
import { AppRegistry, YellowBox } from 'react-native';
import ApollosConfig from '@apollosproject/config';

// temp fix for the promise.finally
// https://github.com/storybookjs/storybook/issues/8371
const fn = Promise.prototype.finally;
const Storybook = require('./storybook').default; // eslint-disable-line
Promise.prototype.finally = fn; // eslint-disable-line
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
