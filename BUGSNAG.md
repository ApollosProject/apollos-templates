# Bugsnag Setup

This will explain how you can set up error logging in your Apollos app with Bugsnag

## API

First, go to Bugsnag's website and create a new project. Use "Server" > "Node" > "Express" in the onboarding. This will give you an API key to use.

Our API comes precoonfigured with Bugsnag. All you have to do is add the `BUGSNAG_KEY` variable to your `.env` file and as a config variable on your remote server. On Heroku:

```
heroku config:set BUGSNAG_KEY=<key>
```

## App
