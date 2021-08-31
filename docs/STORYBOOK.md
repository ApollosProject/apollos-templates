# Apollos Storybook Setup

This will describe how you can access the Apollos Storybook UI library from within your app.

First, add the necessary libraries

```
yarn add react-native-storybook-loader @apollosproject/ui-storybook
```

Before your bundler starts, you must load all available stories. Add this to the beginning of your `yarn start` command:

```
rnstl --searchDir ./src --pattern **/*.stories.js && react-native start
```

Add a `storybook` directory with an `index.js` file:

```js
index.js
-----------------

import StorybookUI, {
  loadApollosStories,
  addApollosProviderDecorator,
  configure,
} from '@apollosproject/ui-storybook';
import { Providers } from '@apollosproject/ui-kit';
import SplashScreen from 'react-native-splash-screen';

import { loadStories } from './storyLoader';

addApollosProviderDecorator(Providers);

configure(() => {
  loadStories();
  loadApollosStories();
  SplashScreen.hide();
}, module);

export default StorybookUI;
```

Change your main app index file to look like this:

```js
app/index.js
------------

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
```

Now simply set `STORYBOOK` as an `env` variable to `true` and the app will start up in Storybook and you can browse through our components. You can even add your own components anywhere in your `src` directory in the form `<name>.stories.js`
