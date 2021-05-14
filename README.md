# Apollos Template Project

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

### API

#### Development

A working [Rock RMS](https://www.rockrms.com) instance is required for our API to run. If you want to test that your API is functional fill out the `ROCK_API` and `ROCK_TOKEN` in your `.env` file. `ROCK_API` is the URL of your Rock instance with `/api` appended to the end. `ROCK_TOKEN` is the REST key of an admin user. You can get this info on your Rock instance from "Admin Tools" > "Apollos Dashboard" after you've installed the Apollos Plugin.

![apollos dashboard](https://files-hf537e5zm.vercel.app)

Now simply start the server

```
yarn start
```

#### Deploy

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
heroku config:set ROCK_API=<url> ROCK_TOKEN=<token>
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

### Mobile App

This will outline the steps required to get your Android and iOS apps up and running. You will need a functioning production API from the previous section before moving forward.

Rename your project, **_no spaces_**!

```
cd apolloschurchapp
npx react-native-rename "<ChurchName>"
```

Add new icons and splash screen. For customization, see [react-native-make](#). Icons should be 1024 jpgs and splash should be 3000h transparent png.

![icons](https://files-lrt96nsk5.vercel.app)

```
yarn icons icon-ios.png --platform ios
yarn icons icon-android.jpg --platform android
yarn splash splash.png
```

#### Development

Install dependencies and start the server and bundler

```
cd ..
yarn
yarn start
```

Couple final steps you'll need to get the app booted in development mode.

##### iOS

Enable automatic code signing (we'll switch back to manual later when ready to deploy) and pick a new ID.

![xcode signing](https://files-o16fn2ymm-redreceipt.vercel.app)

Add the new schemes to the workspace. You should see them by going to Xcode > Product > Scheme > Manage Schemes.

![schemes](https://files-7i6cjwshd-redreceipt.vercel.app)

Now run the command to start the simulator in a separate tab:

```
yarn ios
```

##### Android

Android uses Google Maps for its map service so you will need to register a [Google Maps API Key](https://developers.google.com/maps/documentation/android-sdk/get-api-key). Once you have that, define it in your `.env` file:

```
GOOGLE_MAPS_API_KEY=<KEY>
```

Then start the app on the default installed emulator in a separate tab.

```
yarn android
```

#### Deploy

We use [Fastlane](#) through Github Actions to manage certificates and build uploads. This will walk you through everything you need to get set up with automated deployments.

##### iOS

First thing we'll do is configure the certificates. Add the following values to your `.env` file:

```
MATCH_PASSWORD=<some unique password>
MATCH_GIT_URL=<private repo to store certs and profiles>
MATCH_APP_IDENTIFIER=<bundle ID of app>
FASTLANE_ITC_TEAM_NAME=<developer team name>
FASTLANE_TEAM_ID=<developer team ID>
```

For the CI, You'll need to create a personal access token in Github and use that to authenticate to your certificates repo. Once you have the token, you'll need to encode it to base64.

```
echo -n "<github username>:<token>" | base64
```

Add the encoded token to your `.env` file

```
MATCH_BASIC_GIT_AUTHORIZATION=<base64 encoded token>
```

Inside the app directory run `match` to configure the certificates

```
bundle exec fastlane match development
bundle exec fastlane match appstore
```

Use Xcode to switch the certificate and profile settings to "Manual" and choose the new certificates and profiles that you just created.

<img width="803" alt="Screen Shot 2021-05-06 at 8 07 44 AM" src="https://user-images.githubusercontent.com/2659478/117295710-2cf10680-ae42-11eb-899a-e88c81f5d248.png">

Now we will create an API key to manage authentication to Apple and upload builds from the CI. Create the key on the Apple Developer Portal, download the file, and move it to `ios/apollos.p8`. You will also need the key ID and issuer ID, both can be found in the portal. Add the following variables to your `.env` file:

```
APP_STORE_CONNECT_API_KEY_KEY_ID=<key ID>
APP_STORE_CONNECT_API_KEY_ISSUER_ID=<issuer ID>
```

Test the deployment:

```
bundle exec fastlane ios deploy
```

The last thing you'll want to do to make sure you don't lose your important keys and credentials is encrypt them and add them to the repo. Copy the `.env` file to a new file, `.env.shared`. Then from the root directory, run the encryption command. You can also use this through for the API directory as well as important Android secrets when we get there.

```
yarn secrets -e <password>
```

Make sure to remember that password as we'll use it later for automatic Android deploys. Add it to Github as a secret

`ENCRYPTION_PASSWORD=<password>`

Now push the changes and watch the app deploy!

##### Android

First, you'll need to have the Developer account owner generate an upload key.

![upload key](https://files-2w1r6fc7m.vercel.app)

Move that file to `android/key.json` once you have it. You can validate the upload key with this command

```
fastlane run validate_play_store_json_key --json_key android/key.json
```

Next, you'll need to generate a new signing key. Keep the passwords it asks you for.

```
keytool -genkey -v -keystore apollos.keystore -alias apollos -keyalg RSA -keysize 2048 -validity 10000
```

Drop the keystore file here: `apolloschurchapp/android/app/apollos.keystore`

**_NOTE:_** You may also want to save this keystore and credentials somewhere safe outside this repo, it's the only keystore you can ever use for this app and if you lose it, it's very difficult to get a new one.

Now just load these environment variables in your local `.env` file and as Github secrets for the CI

```
KEYSTORE_FILE=apollos.keystore
KEYSTORE_PASSWORD=<keystore password>
KEY_ALIAS=apollos
KEY_PASSWORD=<alias password>
```

Change the `package_name` variable in the `Appfile` to your new bundle ID. You can get this from your `android/app/build.gradle` file.

You will need to upload the bundle manually the first time, Fastlane can't do it for you. Run the command to create a release build

```
bundle exec fastlane gradle --task clean --project_dir android
bundle exec fastlane gradle --task bundle --build_type Release --project_dir android
```

Upload to the store on the internal track

![play store](https://files-rglw2353v.vercel.app)

Go through the steps to finish your first release.

Now you're ready to test the deploy

```
bundle exec fastlane android deploy
```

Lastly, to get automated deploys working on the CI, re-run the encryption command from a previous step to add the new keystore and upload key to the repo

```
yarn secrets -e <password>
```
