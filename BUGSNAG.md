# Bugsnag Setup

This will explain how you can set up error logging in your Apollos app with Bugsnag

## API

First, go to Bugsnag's website and create a new project. Use "Server" > "Node" > "Express" in the onboarding. This will give you an API key to use.

Our API comes precoonfigured with Bugsnag. All you have to do is add the `BUGSNAG_KEY` variable to your `.env` file and as a config variable on your remote server. On Heroku:

```
heroku config:set BUGSNAG_KEY=<key>
```

## App

First add the CLI to the app dev dependencies

```
cd apolloschurchapp
yarn add --dev @bugsnag/react-native-cli
```

We need to trick the script into using `yarn`. Then you can run the initialization script.

```
cp ../yarn.lock yarn.lock
yarn bugsnag-react-native-cli init
```

***Make sure to not commit the local `yarn.lock` file!***

```
rm yarn.lock
```

You can verify it's working by throwing an error right after Bugsnag is initialized on the `index.js` file

```
Bugsnag.start();
Bugsnag.notify(new Error('Test error'));
```
