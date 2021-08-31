# Church Online Platform Setup

Add your CHOP URL to the `.env` file locally and to the server environment variables

```
CHURCH_ONLINE_URL=https://<church>.online.church
```

Our `liveStreams` query is dependent on having sermon content set up in the app. Once you have defined the `SERMON_CHANNEL_ID` in the config, you can test with this query:

```
{
  liveStreams {
    isLive
  }
}
```
