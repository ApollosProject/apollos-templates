import { sequelize } from '@apollosproject/data-connector-postgres';
import { get } from 'lodash';
import ContentChannelItemSeeds from './ContentChannelItems';
import ContentChannelSeeds from './ContentChannels';

export const seed = async () => {
  const { content_item, content_channel } = sequelize.models;

  await content_item.destroy({ truncate: true });
  await content_channel.destroy({ truncate: true });

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
      return content_item.create({
        title: item.Title,
        summary: get(item.AttributeValues, 'Summary.Value', ''),
        htmlContent: item.Content,
        publishedAt: item.StartDateTime,
        originType: 'rock',
        originId: item.Id,
        contentChannelId: channel.id,
      });
    })
  );
};
