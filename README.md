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

#### Local Development

If you want to test that you're API is functional fill out the `ROCK_API` and `ROCK_TOKEN` (must have admin rights) in your `.env` file and start the server

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

Rename your app

```
cd apolloschurchapp
npx react-native-rename <church name>
```

Create new [icons](https://appicon.co) and [splash screens](https://github.com/zoontek/react-native-bootsplash#setup).

## Develop

Install dependencies, cocoapods, start the bundler

```
yarn
yarn start
```

Start the sims _in separate tabs_

```
yarn ios
yarn android
```
