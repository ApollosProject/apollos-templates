# Apollo Engine Setup

This will explain how to get Apollo Engine schema reporting and metrics set up on your API. Go to [studio.apollographql.com](https://studio.apollographql.com) and create a new graph. Add the key they give you to your local and remote environment variables.

```
ENGINE_API_KEY=<apollo graph key>
```

Now to publish the schema for the first time, simply run the server with the key in the environment

```
ENGINE_API_KEY=<key> yarn start
```
