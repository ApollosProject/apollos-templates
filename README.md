# Apollos Template Project

## Getting Started

Click the "Use the Template" button on the repo page ⬆

<pic>

Clone down your new repo and you're off the to races!

### Set Up

TBD

## Instructions for co-development with [Apollos Apps](https://github.com/ApollosProject/apollos-apps)

First of all, to those of you who remember, the Monorepo, I'm sorry, stick with me. You'll need to change how you work slightly now that the app themselves have been split out, but you'll still get the same great features.

### Setting up "linked" development

1. From this repo, cd into apollos-church-api and apolloschurchapp and run `yarn install`.
2. From this repo, run `yarn pods` from the root.
3. Edit your `.env`. in apolloschurchapp, and add a relative or direct path to your apollos-apps root under the `APOLLOS_APPS_LOCATION` variable. ex: `APOLLOS_APPS_LOCATION=../../apollos-prototype`.
4. From the root of `apollos-apps`, run `yarn link-packages`. **You only need to run this once**
5. From the root of this repo, run `yarn link-packages`. **You only need to run this once**

### Running the linked environments

1. If you are working on API packages, cd into the `apollos-apps` project and run `yarn build:api-watch`.
   If you don't do this, you can still run the app, but you won't get live updates on changes to the API packages.
2. From this repo, run `yarn start`. Just like the good old days.

### FAQ

**Q**: Why `linkemon`? How is it different than `nodemon`?<br>
**A**: `linkemon` will refresh the app if symlinked (yarn linked) packages are changed.

**Q**: Who do I yell at if things are broken?<br>
**A**: @vinnyjth

**Q**: Do I need to set that `APOLLOS_APPS_LOCATION` variable?<br>
**A**: Yes. Because `metro` doesn't support symlinks, we need to use `wml`, which needs to know where the packages live on disk.

**Q**: I'm getting errors when starting the bundler saying folders are not being watched!<br>
**A**: `watchman watch-del-all` and then try `yarn start` from this repo again.

**Q**: What if I need to add a package to either repo?<br>
**A**: In this case the node modules have changed and you'll need to `yarn unlink/link` from this repo again.
