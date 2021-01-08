import { sequelize } from '@apollosproject/data-connector-postgres';
import { get } from 'lodash';
import ContentChannelItemSeeds from './ContentChannelItems';
import ContentChannelSeeds from './ContentChannels';

export const seed = async () => {
  const { content_item, content_channel, media } = sequelize.models;

  await content_item.destroy({ truncate: true });
  await content_channel.destroy({ truncate: true });
  await media.destroy({ truncate: true });

  await Promise.all(
    ContentChannelSeeds.map((channel, id) =>
      content_channel.create({
        name: channel.Name,
        description: channel.Description,
        originType: 'rock',
        originId: channel.Id,
      })
    )
  );

  await Promise.all(
    ContentChannelItemSeeds.map(async (item, id) => {
      const channel = await content_channel.findOne({
        where: { originId: item.ContentChannelId },
      });
      const createdItem = await content_item.create({
        title: item.Title,
        summary: get(item.AttributeValues, 'Summary.Value', ''),
        htmlContent: item.Content,
        publishedAt: item.StartDateTime,
        originType: 'rock',
        originId: item.Id,
        contentChannelId: channel.id,
      });
      await createdItem.createCoverImage({
        sourceUrls: [
          {
            uri:
              'https://s3.amazonaws.com/ns.images/newspring/collection/studies/468.communications.cen.web.corevalue.heroes.1.1x2.jpg',
          },
        ],
      });
    })
  );

  const childItems = await content_item.findAll({
    include: {
      model: content_channel,
      where: {
        originId: 17,
      },
    },
  });

  const parentItem = await content_item.findOne({
    include: {
      model: content_channel,
      where: {
        originId: 18,
      },
    },
  });

  await Promise.all(
    childItems.map(async (i) => {
      i.setParent(parentItem);
      i.save();
    })
  );

  console.log(childItems);
};
