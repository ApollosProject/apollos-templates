# REDIS Setup

For local usage, we recommend installing REDIS with homebrew

```
brew install redis
brew services start redis
```

Add the REDIS URL to your `.env` file

```
REDIS_URL=redis://127.0.0.1:6379
```

In production, add a REDIS instance to your Heroku server

```
heroku addons:create heroku-redis:hobby-dev
```
