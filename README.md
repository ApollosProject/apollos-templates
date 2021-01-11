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

Rename your app, this should be the name you want displayed on the phone screen

```
cd apolloschurchapp
npx react-native-rename "<church name>"
```

Create new [icons](https://appicon.co) and [splash screens](https://github.com/zoontek/react-native-bootsplash#setup).

## Develop

Install dependencies and start the server and bundler

```
cd ..
yarn
yarn start
```

Couple final steps you'll need to get the app booted in development mode.

### iOS

For iOS, you will need to change the app identifier and clear out certificates to boot in Development mode. Use Xcode to edit the settings:

[PIC]

Now run the command to start the simulator in a separate tab:

```
yarn ios
```

### Android

Android uses Google Maps for its map service so you will need to register a [Google Maps API Key](https://developers.google.com/maps/documentation/android-sdk/get-api-key). Once you have that, define it in your `.env` file:

```
GOOGLE_MAPS_API_KEY=<KEY>
```

Then start the app on the default installed emulator in a separate tab.

```
yarn android
```
