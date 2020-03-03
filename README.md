# Apollos Template Project

## Instructions for starting your own app.

### 1. Forking this repo

Forking this repo via forking this project on GitHub is not recommended, as it will tie your project directly to our repo. Instead, we recommend taking the following steps.

1. Clone this repo locally.
2. From the root of this repo, `rm -rf .git`
3. Intialize a new git repository, `git init`.

### 2. Setting up your environment.

TBD

## Instructions for co-development with [Apollos Apps](https://github.com/ApollosProject/apollos-apps)

First of all, to those of you who remember, the Monorepo, I'm sorry, stick with me. You'll need to change how you work slightly now that the app themselves have been split out, but you'll still get the same great features.

### Setting up "linked" development

1. From this repo, cd into apollos-church-api and apolloschurchapp and run `yarn install`.
2. Edit your `.env. in apolloschurchapp, and add a relative or direct path to your apollos-apps root under the `APOLLOS_APPS_LOCATION` variable. ex: `APOLLOS_APPS_LOCATION='../../apollos-prototype'.
3. From the root of `apollos-apps`, run `yarn link-packages`. **You only need to run this once**
4. From the root of this repo, run `yarn link-packages`. **You only need to run this once**

### Running the linked environments

1. If you are working on API packages, cd into the `apollos-apps` project and run `yarn build:api-watch`.
   If you don't do this, you can still run the app, but you won't get live updates on changes to the API packages.
2. From this repo, run `yarn start`. Just like the good old days.

### FAQ

**Q**: Why `linkemon`? How is it different than `nodemon`?
**A**: `linkemon` will refresh the app if symlinked (yarn linked) packages are changed.

**Q**: Who do I yell at if things are broken?
**A**: @vinnyjth

**Q**: Do I need to set that `APOLLOS_APPS_LOCATION` variable?
**A**: Yes. Because `metro` doesn't support symlinks, we need to use `wml`, which needs to know where the packages live on disk.
