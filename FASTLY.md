# Fastly CDN Set up

This guide will describe how to set up your Heroku server with a Fastly CDN layer

_**NOTE: This will installed the $25/month option. You must already have payment set up on Heroku**_

Install the addon using the Heroku CLI:

```
heroku addons:create fastly:quick
```

The just edit the `ROOT_URL` variable locally and on the server to match the new `FASTLY_CDN_URL`
