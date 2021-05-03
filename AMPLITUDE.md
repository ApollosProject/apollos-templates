# Amplitude Setup

This will explain how to get your Apollos app working with Amplitude

First, create a new project under your organization. This will will give you an API key you need for your local and CI/CD environments. Add key to `.env` to test.

```
AMPLITUDE_API_KEY=<key>
```

For your production app, add it to `.env.production`

```
AMPLITUDE_API_KEY=$AMPLITUDE_API_KEY
```

and as a repo secret on Github

![adding secret](https://files-qv931tk37.vercel.app)

Next we need to add the package to the app. Install with yarn.

`yarn add react-native-amplitude-analytics`

Add the following snippet to your `src/Providers.js` file:

```
import RNAmplitude from 'react-native-amplitude-analytics';

const amplitude = new RNAmplitude(ApollosConfig.AMPLITUDE_API_KEY);
```

Now add Amplitudes `logEvent` to our `AnalyticsProvider`

```
<AnalyticsProvider trackFunctions={
  [({eventName, properties}) => amplitude.logEvent(eventName, properties)]
}>
```
