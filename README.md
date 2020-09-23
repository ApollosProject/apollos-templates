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

Clone down your new repo, and run initialization script to set up environments

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
heroku create apollos-api -s container
git push heroku master
```

_NOTE: If you have a [team](https://devcenter.heroku.com/articles/heroku-teams) you'd like to use on Heroku to manage billing, you can use the `-t <teamname>` flag in the create command above._

Test to make sure the app deployed correctly, open the GraphQL Playground on your API

```
heroku open
```

To enable to deploy on push to master automatically through the workflow, copy your [Heroku API key](https://dashboard.heroku.com/account) and set a [Github secret](https://docs.github.com/en/actions/reference/encrypted-secrets) in your new repository called `HEROKU_API_KEY`.

![github secret](https://files-5eu5fyz6u.vercel.app)

To get started with different API integrations, check out our [docs](https://apollosapp.io)!

### Mobile App

(TBD)

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

## Deploy

We use `fastlane` to deploy test builds to Testflight and the Play Store interal track. From the app directory:

```
bundle exec fastlane ios deploy
bundle exec fastlane android deploy
```
