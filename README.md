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
yarn setup
```

### API

We use Heroku by default because it's free and easy to get started. If you'd like to use another platform to host your API, you can skip this section.

[Install the Heroku CLI](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up)

```
brew install heroku/brew/heroku
heroku login
```

Create your app and upload to Heroku.

```
heroku create apollos-api
git push heroku master
```

_NOTE: If you have a [team](https://devcenter.heroku.com/articles/heroku-teams) you'd like to use on Heroku to manage billing, you can use the `-t <teamname>` flag in the `create` command above._

Open the GraphQL Playground on your API to test the deploy

```
heroku open
```

To deploy automatically through the Github workflow, copy your [Heroku API key](https://dashboard.heroku.com/account) and set a [Github secret](https://docs.github.com/en/actions/reference/encrypted-secrets) in your new repository called `HEROKU_API_KEY`.

![github secret](https://files-5eu5fyz6u.vercel.app)

To get started with different API integrations, check out our [docs](https://apollosapp.io)!

### Mobile App

This will outline the steps required to get your Android and iOS apps up and running. You will need a functioning production API from the previous section before moving forward.

Set the API URL in the `.env.production` file.

```
APP_DATA_URL=<url>
```

Rename your app

```
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
