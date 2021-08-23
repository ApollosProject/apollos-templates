# Universal Links

This guide will describe how to set up universal links. This will allow you to create share links that will either open the app or a link to download the app in the app store.

First, set the following environment variables locally to test and on your server:

```
APPLE_APP_ID=<com.church.app>
APPLE_TEAM_ID=<XXXXXXX>
IOS_REDIRECT=<url of app in App store>
ANDROID_REDIRECT=<url of app in Google Play store>
GOOGLE_APP_ID=<com.church.app>
GOOGLE_KEYSTORE_SHA256=<XX:XX:XX:XX>
```

You can get your keystore hash from your Google developer app console.
