# Apollos Server Configuration

This will describe the various configuration variables you can use to customize your instance of the Apollos API.

#### Suggested Follows

`SUGGESTED_FOLLOWS` - Users that will be suggested to follow for everyone (or under certain conditions). Is an array of either strings or objects in the form:

```js
{
  email: <user account email>
  campusId: <Rock campus guid>
}
```

Example yaml:

```yml
SUGGESTED_FOLLOWS:
  - fake@email.com
  - email: fake2@email.com
    campusId: 123123-123123-123123
```
