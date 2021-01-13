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

If you want to test that your API is functional fill out the `ROCK_API` and `ROCK_TOKEN` in your `.env` file. `ROCK_API` is the URL of your Rock instance with `/api` appended to the end. `ROCK_TOKEN` is the REST key of an admin user. You can get this from "Admin Tools" > "Apollos Dashboard" after you've installed the Apollos Plugin.

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

We deploy through the Github workflow. You need to set three new [Github secrets](https://docs.github.com/en/actions/reference/encrypted-secrets) in your new repository:

- `HEROKU_API_KEY`: This comes from your Heroku account dashboard and is used to upload
- `HEROKU_APP_NAME`: This is the Heroku app name from above when you created the server
- `APP_DATA_URL`: The URL of your server. You can get this by running `heroku info` and using "Web URL"

![github secret](https://files-5eu5fyz6u.vercel.app)

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

For iOS, you will need to choose a new app identifier and clear out certificates to boot in Development mode. Set the app identifier in the Apple Developer [dashboard](https://developer.apple.com/account/resources/identifiers/list)

![apple developer dashboard](https://files-g3cz9dm34.vercel.app)

Use Xcode to edit the settings:

![certificates](https://files-gd7d6gcqz.vercel.app)

Change the display name of the app

![display name](https://files-h2vqr0xje.vercel.app)

Now run the command to start the simulator in a separate tab:

```
yarn ios
```

##### Android

Android uses Google Maps for its map service so you will need to register a [Google Maps API Key](https://developers.google.com/maps/documentation/android-sdk/get-api-key). Once you have that, define it in your `.env` file:

```
GOOGLE_MAPS_API_KEY=<KEY>
```

Change the `app-name` in `apolloschurchapp/android/app/src/main/res/values/strings.xml`

```
<string name="app_name">NEW NAME</string>
```

Then start the app on the default installed emulator in a separate tab.

```
yarn android
```

#### Deploy

We use [Fastlane](#) through Github Actions to manage certificates and build uploads. This will walk you through everything you need to get set up with automated deployments.

##### iOS

First thing we'll do is configure the certificates. Change the following values in the `Matchfile`:

`git_url`: This is the _private_ repo you are going to store the certificates
`app_identifier`: The App ID you chose for your app in the Apple Developer Dashboard
`username`: Admin level Apple Developer account, used to manage certificates and profiles

You'll need to create a personal access token in Github and use that to authenticate to your certificates repo. Once you have the token, you'll need to encode it to base64.

```
python -c "import base64;print(base64.b64encode('<github username>:<token>'))"
```

**_NOTE:_** If this is a new app, you will need to add at least one device to the developer portal. Easiest way is to have Xcode do it by turning off and on "Automatic Code Signing" with an iPhone plugged in.

Inside the app directory run `match` to configure the certificates

```
MATCH_GIT_BASIC_AUTHORIZATION=<encoded token> bundle exec fastlane match development
MATCH_GIT_BASIC_AUTHORIZATION=<encoded token> bundle exec fastlane match appstore
```

Match will ask you to enter a password, remember it! You'll need to decrypt on the CI for automatic deploys.

Next, the `Fastfile`, change all instances of `apolloshchurchapp` and `apolloschurchappprod` to your projects condensed name. It's probably Whatever name you defined earlier with no spaces. You can be sure from `ios/<name>.xcodeproj`

Lastly, in the `Appfile` change, the following variables:

- `app_identifier` - same ID you specified in the `Matchfile`
- `apple_id` - The Apple ID you want responsible for uploads, must be at least "App Manager" level
- `itc_team_id` - iTunes Connect Team ID
- `team_id` - [Apple Developer Portal Team ID](https://developer.apple.com/account/#/membership)

Test the deployment:

```
bundle exec fastlane ios deploy
```

Now configure Github Actions for automated deploys. Add `MATCH_GIT_BASIC_AUTHORIZATION` and `MATCH_PASSWORD` (the one I told you to remember) as repo secrets.
