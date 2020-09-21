# Apollos Template Project

## Getting Started

Click the "Use the Template" button on the repo page ⬆

![template button](https://files-2aze9g2bq.vercel.app)

Clone down your new repo and run the initialization script:

```
npx @apollosproject/apollos-cli init
```

## Develop

Install tools necessary

- [Yarn](https://yarnpkg.com/)
- [XCode](https://developer.apple.com/xcode/)
- [Android Studio](https://developer.android.com/studio)
- [Bundler](https://bundler.io)

Run initialization script to set up environments

```
yarn init
```

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
