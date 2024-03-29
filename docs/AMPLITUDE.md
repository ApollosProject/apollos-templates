# Amplitude Setup

This will explain how to get your Apollos app working with Amplitude

First, create a new project under your organization. This will will give you an API key you need for your local and CI/CD environments. Add key to `.env` to your shared environment variables.

```
AMPLITUDE_API_KEY=<key>
```

Next we need to add the package to the app. Install with yarn.

`yarn add @amplitude/react-native@latest`

Add the following snippet to your `src/Providers.js` file:

```
import { Amplitude } from '@amplitude/react-native';
import ApollosConfig from '@apollosproject/config';

const amplitude = Amplitude.getInstance();
amplitude.init(ApollosConfig.AMPLITUDE_API_KEY);
```

Now add Amplitudes `logEvent` to our `AnalyticsProvider`

```
<AnalyticsProvider
  trackFunctions={[
    ({ eventName, properties }) =>
      amplitude.logEvent(eventName, properties),
  ]}
>
```
