# Content Shovel Migration Steps

Migrating Content from being pulled directly from Rock to being pulled via the shovel is a one time process. Depending on the level of customization of your API, it may be time consuming, but overall will result in far greater stability and maintainability. 

Listed below are a number of steps you may have to take in order to complete the migration. 

## Understanding Core API changes 

Moving all the content item data to Postgres comes with some rethinking of how the Content Item data is structured. Here are some of the important changes. 

Personas are now tags (with `type: persona`). Content Items can have tags, and people can have tags. 

Content items now have a `parentId` 

Content items have a `coverImageId`, pointing at their cover image. 

ApollosIDs (what you see come through GraphQL) are now stored directly on the content item table.

Features are now a row in the Features table. The entire configuration for the feature is no longer stored in the ID. (Right now this is only true for Content Item features.)

A lot of the ContentItem.dataSource methods have been renamed or changed. In general, a lot more data is available on the ContentItem objects themselves (example - `contentItem.getCoverImage()` vs `ContentItemDataSource.getCoverImage(contentItem)`) but a lot of methods have been aliased to ease the transition.

The request builder is no more. You will want to read up on Sequelize query syntax. Most `getByXXX` methods take a `args` argument that lets you pass filters, eager loads, etc. 

*Important*. You can't spread the objects returned by Sequelize methods. For example, if you have a an `item` returned by `getFromId()` doing `{ ...item, attribute: value }` will cause problems. 



## Move Typename Configuration to the Shovel.

Moving forward, typenames are pre-determined for content items. The API no longer has to decide what type an item is, that information is stored in the shovel. You'll need to create a new Variable in your Airflow instance storing your typename configuration. The form is a subset of the previous config.yml format. Example below 

```json
{
  "CONTENT_MAPPINGS": {
    "ContentSeriesContentItem": {
      "ContentChannelTypeId": [
        6
      ]
    },
    "DevotionalContentItem": {
      "ContentChannelId": [
        7
      ]
    },
    "WeekendContentItem": {
      "ContentChannelId": [
        5
      ]
    }
  }
}
```

## Update Action Algorithm ID references

Once you have the shovel up and running, you'll want to connect to it via your favorite postgres client. Inside your `config.yml`, you'll want to replace references to the Rock integer IDS with the new Postgres UUIDs. This is easily done, by cross referencing the Integer IDs with the Postgres Database, and then copying in the appropriate UUIDS. You'll find the "ContentChannelItems" in the "contentChannel" table, and the "ContentChannel"s in the "ContentItemsCategory" table. 

When using `relatedNodes`, you will want to use the apollosId field instead of the `id` field.


