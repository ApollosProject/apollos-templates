# Bull Setup

This will explain how to configure the Bull jobs scheduler

**_NOTE: This requires that REDIS has already been set up_**

Add credentials your local `.env` file and the remote server config variables

```
JOBS_USERNAME=<whatever>
JOBS_PASSWORD=<whatever>
```

You can view and manage jobs through the `<YourHerokuAppUrl>/admin/queues` endpoint
