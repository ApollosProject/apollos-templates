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

## iOS

Edit the `[App Name].entitlements` file and add the following key:

```
<key>com.apple.developer.associated-domains</key>
<array>
    <string>applinks:[URL HOST]</string>
</array>
```

## Android

Edit the `main/AndroidManifest.xml` file and add the following intent:

```xml
<intent-filter android:autoVerify="true">
  <action android:name="android.intent.action.VIEW" />
  <category android:name="android.intent.category.DEFAULT" />
  <category android:name="android.intent.category.BROWSABLE" />
  <data android:scheme="https"
        android:host="[URL HOST]"
        android:pathPrefix="/app-link" />
  <data android:scheme="http" />
</intent-filter>
```

# Testing

In order to test this functionality, you need to confirm that the Apple App Site Association file and Android Assetlinks files are returned from the server. You should also confirm that Sharing URLs on content items are complete. There are several ways to test this functionality.

## Testing via website

You can use these two websites to test your server for AASA and assetlinks files.

##### iOS

https://branch.io/resources/aasa-validator/

##### Android

https://developers.google.com/digital-asset-links/tools/generator

## Testing the server directly

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

## Testing via the console

You can also test iOS and Android by running the following commands while the app is running in the simulator. Get a link by sharing a content item in the app and copying the link there. These two commands will not work properly unless the app is released and in the public Apple or Google Play Stores.

##### iOS

```
xcrun simctl openurl booted [LINK]
```

##### Android

```
adb shell am start -W -a android.intent.action.VIEW -d "[LINK]" [GOOGLE_APP_ID]
```
