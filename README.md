# Apollos Template Project

## ***API template is not currently being supported but will be open sourced again soon. App template HAS MOVED TO [apollos-apps/templates/mobile](https://github.com/ApollosProject/apollos-apps/tree/master/templates/mobile). The instructions below will still work with this directory:***

---

## Getting Started

Click the "Use the Template" button on the repo page ⬆

![template button](https://files-2aze9g2bq.vercel.app)

We are assuming you're using a Mac for this guide. Install tools necessary.

- [Homebrew](https://brew.sh)
- [Yarn](https://yarnpkg.com/)
- [XCode](https://developer.apple.com/xcode/)
- [Android Studio](https://developer.android.com/studio)
- [Bundler](https://bundler.io)

Clone down your new repo, and run the setup script to set up environments

```
yarn
yarn setup
```

## API

---

This section will outline the steps required to get your api up and running.

<br />

### Development

---

A working [Rock RMS](https://www.rockrms.com) instance is required for our API to run. If you want to test that your API is functional fill out the `ROCK_API` and `ROCK_TOKEN` in your `.env` file. `ROCK_API` is the URL of your Rock instance with `/api` appended to the end. `ROCK_TOKEN` is the REST key of an admin user. You can get this info on your Rock instance from "Admin Tools" > "Apollos Dashboard" after you've installed the Apollos Plugin.

![apollos dashboard](https://files-hf537e5zm.vercel.app)

Now simply start the server

```
yarn start
```

### Deploy

---

We use Heroku by default because it's free and easy to get started. If you'd like to use another platform to host your API, you can skip this section.

[Install the Heroku CLI](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up)

```
brew install heroku/brew/heroku
heroku login
```

Create your app on Heroku

```
heroku create APP_NAME [-t OPTIONAL_TEAM]
```

Add your config variables to the remote application

```
heroku config:set ROCK_URL=<url> ROCK_TOKEN=<token>
```

We deploy through the Github workflow. You need to set three new [Github secrets](https://docs.github.com/en/actions/reference/encrypted-secrets) in your new repository. First [Install the Github CLI](https://cli.github.com)

```
brew install gh
gh auth login
```

Now set the secrets you need to deploy

```
gh secret set HEROKU_API_KEY -b <Your user API key>
gh secret set HEROKU_EMAIL -b <Your email address>
gh secret set HEROKU_APP_NAME -b <App name from creation step above>
gh secret set APP_DATA_URL -b <Full Heroku app URL>
```

Simply commit to `master` and push or re-run the action if you haven't made any changes yet. Once the API Deploy action is finished, you should be able to open up the app in the browser

```
heroku open
```

To get started with different API integrations, check out our [docs](https://apollosapp.io)!

### Migrations

Database migrations can be run locally via

```
yarn migrator up
```

and in production / heroku via

```
heroku run -a YOUR_HEROKU_APP_NAME_HERE yarn migrator up
```

**Make sure you `yarn build` before running `yarn migrator` if you have made any changes to your app.**

<br />

## Mobile App

---

This section will outline the steps required to get your Android and iOS apps up and running. You will need a functioning production API from the previous section before moving forward.

Rename your project, **_no spaces_**!

```sh
cd apolloschurchapp
npx react-native-rename "<ChurchName>"
```

Add the new schemes to the workspace. You should see them by going to Xcode > Product > Scheme > Manage Schemes.

![schemes](https://files-7i6cjwshd-redreceipt.vercel.app)

Add new icons and splash screen. For customization, see [react-native-make](#). Icons should be 1024 jpgs and splash should be 3000h transparent png.

![icons](https://user-images.githubusercontent.com/72768221/130254147-fdea1e83-05b0-4466-bf85-7cec05cfddc7.png)

```
yarn icons icon-ios.png --platform ios
yarn icons icon-android.png --platform android
yarn splash splash.png
```

You will also need to setup icons for Android notifications that are not handled by the above lines. This icon needs to be 256x256, and white with a transparent background (see below).

![notification icons](https://files-gurdw0ypj-redreceipt.vercel.app)

Use [Android Asset Studio](http://romannurik.github.io/AndroidAssetStudio/icons-notification.html#source.type=clipart&source.clipart=ac_unit&source.space.trim=1&source.space.pad=0&name=ic_stat_onesignal_default), select `Image`, upload your image, then download the new images.

Navigate to `apolloschurchapp/android/app/src/main/res`. Drop the newly downloaded images into the appropriate folders here. Delete the placeholder Apollos icons in those folders as well.

Install the dependencies

```
yarn
```

### Development

Couple final steps you'll need to get the app booted in development mode.

#### iOS

---

Enable automatic code signing (we'll switch back to manual later when ready to deploy) and pick a new ID.

![xcode signing](https://files-o16fn2ymm-redreceipt.vercel.app)

_*NOTE:*_ Make sure to do these steps for the `OneSignalNotificationExtention` target as well!

Now run the command to start the simulator:

```
yarn ios
```

#### Android

---

Android uses Google Maps for its map service so you will need to register a [Google Maps API Key](https://developers.google.com/maps/documentation/android-sdk/get-api-key). Once you have that, define it in your `.env` file:

```yml
GOOGLE_MAPS_API_KEY=<KEY>
```

Then start the app on the default installed emulator in a separate tab.

```
yarn android
```

### Deploy

---

We use [Fastlane](#) through Github Actions to manage certificates and build uploads. This will walk you through everything you need to get set up with automated deployments.

<br />

#### iOS

---
 
First thing we'll do is configure the certificates. We will create an API key to manage authentication to Apple and upload builds from the CI. Create the key on the Apple Developer Portal, download the file, and move it to ios/apollos.p8. You will also need the key ID and issuer ID, both can be found in the portal. Add the following variables to your .env file:

```yml
MATCH_PASSWORD=<some unique password>
MATCH_GIT_URL=<private repo to store certs and profiles>
DELIVER_APP_IDENTIFIER=<bundle ID of app>
FASTLANE_ITC_TEAM_NAME=<developer team name>
FASTLANE_TEAM_ID=<developer team ID>
APP_STORE_CONNECT_API_KEY_KEY_ID=<key ID>
APP_STORE_CONNECT_API_KEY_ISSUER_ID=<issuer ID>
```

For the CI, You'll need to create a personal access token in Github and use that to authenticate to your certificates repo. Once you have the token, you'll need to encode it to base64.

```sh
echo -n "<github username>:<token>" | base64
```

Add the encoded token to your `.env` file

```yml
MATCH_GIT_BASIC_AUTHORIZATION=<base64 encoded token>
```

You need to have at least one device registered to make provisioning profiles. Plug in your phone and click "try again" if you see this error.

![devices](https://files-bm5voyhrc-redreceipt.vercel.app)

Inside the app directory run `match` to configure the certificates

```
fastlane ios certs
```

Use Xcode to switch the certificate and profile settings to "Manual" and choose the new certificates and profiles that you just created.

<img width="803" alt="Screen Shot 2021-05-06 at 8 07 44 AM" src="https://user-images.githubusercontent.com/2659478/117295710-2cf10680-ae42-11eb-899a-e88c81f5d248.png">

Test the deployment:

```
fastlane ios deploy
```

The last thing you'll want to do to make sure you don't lose your important keys and credentials is encrypt them and add them to the repo. Copy the `.env` file to a new file, `.env.shared`. Then run the following encryption command from within the APP directory, `/apolloschurchapp`. You can also use this same process in the API directory, `/apollos-church-api`. The `<TOKEN>` is an encryption password that you will use for automatic Android deploys.

```
npx @apollosproject/apollos-cli secrets -e <TOKEN>
```

Make sure to remember that password and add it to Github as a secret.

```
gh secret set ENCRYPTION_PASSWORD -b <password>
```

Now push the changes and watch the app deploy!

<br />

#### Android

---

First, you'll need to have the Developer account owner generate an upload key. [Create a service account](https://developers.google.com/android-publisher/getting_started#using_a_service_account) and add it to the Play Console with "Release Manager" role. Move the downloaded JSON file to `android/key.json` once you have it. You can validate the upload key with this command

```
fastlane run validate_play_store_json_key json_key:./android/key.json
```

Next, you'll need to generate a new keystore. Keep the passwords it asks you for.

```
keytool -genkey -v -keystore apollos.keystore -alias apollos -keyalg RSA -keysize 2048 -validity 10000
```

Drop the keystore file here: `apolloschurchapp/android/app/apollos.keystore`

**_NOTE:_** You may also want to save this keystore and credentials somewhere safe outside this repo, it's the only keystore you can ever use for this app and if you lose it, it's very difficult to get a new one.

Now just load these environment variables in your `.env` and `.env.shared` files

```yml
KEYSTORE_FILE=apollos.keystore
KEYSTORE_PASSWORD=<keystore password>
KEY_ALIAS=apollos
KEY_PASSWORD=<alias password>
```

You will need to upload the bundle manually the first time. Create the app in the Play Store console and then set the Application ID in the `android/app/build.gradle` file:

```js
    defaultConfig {
        applicationId "com.company.appname"
        ...
        ...
        ...
    }
```

Run the fastlane command to generate a release build:

```
fastlane run gradle task:bundle build_type:Release project_dir:android
```

You can find the bundle in `android/app/build/outputs/bundle/release/app-release.aab`. Upload the bundle to the **closed testing** track the first time. The app must have been "released" before we push anything to internal. Fastlane will take care of uploading to internal, so you only need to upload to closed testing.

![play store](https://files-6ngafis8q-redreceipt.vercel.app)

Go through the steps to finish your first release.

Lastly, to get automated deploys working on the CI, move the keystore variables to `.env.shared` and re-run the encryption command from a previous step, using the same token from the iOS steps above:

```
npx @apollosproject/apollos-cli secrets -e <TOKEN>
```

Change the metadata information for the Android release:

- `fastlane/metadata/android/en-US/full_description.txt`
- `fastlane/metadata/android/en-US/short_description.txt`
- `fastlane/metadata/android/en-US/title.txt`

Add new images and screenshots

- `fastlane/metadata/android/en-US/images/phoneScreenshots/` (three images)
- `fastlane/metadata/android/en-US/images/icon.png` (512 x 512 jpg)
- `fastlane/metadata/android/en-US/images/featureGraphic.png` (1024 x 500 jpg)

Now when you push to master, you should be all set for automatic deploys!
