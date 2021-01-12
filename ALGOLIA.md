# Algolia Setup

This will walk you through setting up content indexing and search in your Apollos app.

**_NOTE: This will require a REDIS instance has already been installed_**

First add the Algolia add on to your Heroku instance

```
heroku addons:create algoliasearch:free
```

For local development, get your apps Admin API key and Application ID and add those to your `.env` file. You can get these from your Heroku server config variables. They are added automatically.

```
ALGOLIASEARCH_APPLICATION_ID=<id>
ALGOLIASEARCH_API_KEY=<key>
```
