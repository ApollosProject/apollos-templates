# Fastly CDN Set up

This guide will describe how to set up your Heroku server with a Fastly CDN layer

_**NOTE: This will installed the $25/month option. You must already have payment set up on Heroku**_

Install the addon using the Heroku CLI:

```
heroku addons:create fastly:quick
```

Get the new `FASTLY_CDN_URL` and add/replace the `ROOT_URL` variable on the API (local and remote) and the `APP_DATA_URL` variable on the app (local and remote)
