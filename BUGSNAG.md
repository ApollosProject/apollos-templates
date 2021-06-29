# Bugsnag Setup

This will explain how you can set up error logging in your Apollos app with Bugsnag

## API

First, go to Bugsnag's website and create a new project. Use "Server" > "Node" > "Express" in the onboarding. This will give you an API key to use.

We have a plugin that gives you useful server data. First, add the `BUGSNAG_KEY` variable to your `.env` file and as a config variable on your remote server. On Heroku:

```
heroku config:set BUGSNAG_KEY=<key>
```

Next, add our official integration:

```
cd apollos-church-api
yarn add @apollosproject/bugsnag
```

And then import the plugin and add it to your server config:

```js
server.js
---------

import { BugsnagPlugin } from '@apollosproject/bugsnag';

const apolloServer = new ApolloServer({
  ...
  ...
  ...
  plugins: [new BugsnagPlugin()],
```

## App

First, go to Bugsnag's website and create a new project. Use "Mobile" > "React Native" > "React Native" in the onboarding. This will give you an API key to use.

Then, make sure you are in the `apolloschurchapp` folder and add the CLI to the app dev dependencies.

```
cd apolloschurchapp
yarn add --dev @bugsnag/react-native-cli
```

We need to trick the script into using `yarn`. Then you can run the initialization script.

```
cp ../yarn.lock yarn.lock
yarn bugsnag-react-native-cli init
```

**_Make sure to not commit the local `yarn.lock` file in the `apolloschurchapp` folder!_**

```
rm yarn.lock
```

You can verify it's working by throwing an error right after Bugsnag is initialized on the `index.js` file

```
import Bugsnag from "@bugsnag/react-native";

Bugsnag.start();
Bugsnag.notify(new Error('Test error'));
```
