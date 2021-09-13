# Universal Links

This guide will describe how to set up universal links. This will allow you to create share links that will either open the app or a link to download the app in the app store.

First, set the following environment variables locally to test and on your server:

```
UNIVERSAL_LINK_HOST=<API Heroku Url>
APPLE_APP_ID=<com.church.app>
APPLE_TEAM_ID=<XXXXXXX>
IOS_REDIRECT=<url of app in App store>
ANDROID_REDIRECT=<url of app in Google Play store>
GOOGLE_APP_ID=<com.church.app>
GOOGLE_KEYSTORE_SHA256=<XX:XX:XX:XX>
```

You can get your keystore hash from your Google developer app console.

In Xcode, open your application, go to the Signing & Capabilities tab, and add a new Associated Domain. You will need to retype the Universal Link Host here manually.

```
applinks:<UNIVERSAL_LINK_HOST>
```

# Testing

In order to test this functionality, you need to confirm that the Apple App Site Association file and Android Assetlinks files are returned from the server. You should also confirm that Sharing URLs on content items are complete.

While the API is running you can navigate to

```
localhost:4000/.well-known/apple-app-site-association
```

If setup correctly, you should see a JSON object with `appID` set to `<APPLE_TEAM_ID>.<APPLE_APP_ID>` and `paths` set to `[ "/app-link/*" ]`.

Next, you can navigate to

```
localhost:4000/.well-known/assetlinks.json
```

Here you should see a JSON object with `package_name` set to `<GOOGLE_APP_ID>` and `sha256_cert_fingerprints` set to `<GOOGLE_KEYSTORE_SHA256>`.

You can also test iOS and Android by running the following commands while the app is running in the simulator. Get a link by sharing a content item in the app and copying the link there.

##### iOS

```
xcrun simctl openurl booted [LINK]
```

##### Android

```
adb shell am start -W -a android.intent.action.VIEW -d "[LINK]" [GOOGLE_APP_ID]
```
