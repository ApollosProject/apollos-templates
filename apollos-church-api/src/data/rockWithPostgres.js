/* eslint-disable import/prefer-default-export, max-classes-per-file */
import { parseGlobalId } from '@apollosproject/server-core';
import { Person as postgresPerson } from '@apollosproject/data-connector-postgres';
import * as OneSignalOriginal from '@apollosproject/data-connector-onesignal';

class personDataSource extends postgresPerson.dataSource {
  async create(attributes) {
    const rockPersonId = await this.context.dataSources.RockPerson.create(
      attributes
    );
    super.create({
      ...attributes,
      originType: 'rock',
      originId: String(rockPersonId),
    });
    return rockPersonId;
  }
}

// These resolvers make sure that calls to updating profile fields update both the
const personResolver = {
  Mutation: {
    updateProfileField: async (
      root,
      { input: { field, value } },
      { dataSources }
    ) => {
      await dataSources.RockPerson.updateProfile([{ field, value }]); // Update in Rock
      return dataSources.Person.updateProfile([{ field, value }]); // updates in Postgres
    },
    updateProfileFields: async (root, { input }, { dataSources }) => {
      await dataSources.RockPerson.updateProfile(input); // Update in Rock
      return dataSources.Person.updateProfile(input); // updates in Postgres
    },
    uploadProfileImage: async (root, { file, size }, { dataSources }) => {
      const person = await dataSources.RockPerson.uploadProfileImage(
        file,
        size
      ); // Update in Rock
      return dataSources.Person.updateProfile([
        { field: 'profileImageUrl', value: person.photo.url },
      ]); // updates in Postgres. Reuses already uploaded imageUrl
      // return dataSources.Person.uploadProfileImage(file, size); // updates in Postgres. Performs the upload again.
    },
    updateUserCampus: async (root, { campusId }, { dataSources }) => {
      await dataSources.Campus.updateCurrentUserCampus({ campusId }); // updates in Rock

      const { id: rockCampusId } = parseGlobalId(campusId);
      const campus = await dataSources.PostgresCampus.getFromId(
        rockCampusId,
        null,
        {
          originType: 'rock',
        }
      ); // finds the postgres campus id
      return dataSources.Person.updateProfile([
        { field: 'campusId', value: campus.id },
      ]); // updates in Postgres
    },
    updateUserPushSettings: async (root, { input }, { dataSources }) => {
      // register the changes w/ postgres
      await dataSources.NotificationPreference.updateUserNotificationPreference(
        {
          notificationProviderId: input.pushProviderUserId,
          notificationProviderType: 'one_signal', // hard coded for now
          enabled: input.enabled,
        }
      );
      // register the changes w/ one signal
      const returnValue = await dataSources.OneSignal.updatePushSettings(input);

      // if the pushProviderUserId is changing, we need ot register the device with rock.
      if (input.pushProviderUserId != null) {
        await dataSources.PersonalDevice.addPersonalDevice({
          pushId: input.pushProviderUserId,
        });
      }

      try {
        await dataSources.Person.updateProfile([
          {
            field: 'apollosUser',
            value: true,
          },
        ]);
      } catch (e) {
        console.warn(e);
      }

      // return the original return value (which is currentPerson)
      return returnValue;
    },
  },
};

export const Person = {
  dataSource: personDataSource,
  resolver: personResolver,
};

class oneSignalDataSource extends OneSignalOriginal.dataSource {
  async createNotification({
    toUserIds = [],
    to,
    content = '',
    heading,
    subtitle,
    ...args
  }) {
    if (to && to.originId && to.originType === 'rock') {
      const person = await this.context.dataSources.RockPerson.getFromId(
        to.originId
      );
      return super.createNotification({
        toUserIds: [person.primaryAliasId],
        content,
        heading,
        subtitle,
        ...args,
      });
    }
    return super.createNotification({
      toUserIds,
      content,
      heading,
      subtitle,
      ...args,
    });
  }
}

export const OneSignal = {
  ...OneSignalOriginal,
  dataSource: oneSignalDataSource,
};

const defaultContentItemResolvers = {
  likedCount: (root, args, { dataSources }) =>
    console.log(root, root.apollosId, root.originId) ||
    dataSources.Followings.getFollowingsCountByNodeId({
      nodeId: root.apollosId,
      originId: root.originId,
    }),

  isLiked: async (root, args, { dataSources }) =>
    dataSources.Followings.getIsLikedForCurrentUserAndNode({
      nodeId: root.apollosId,
      originId: root.originId,
      isLiked: null,
    }),
};

const followingsResolvers = {
  Mutation: {
    updateLikeEntity: async (
      root,
      { input: { nodeId, operation } },
      { dataSources },
      resolveInfo
    ) => {
      const { originId } = await dataSources.ContentItem.getFromId(
        nodeId.split(':')[1]
      );
      return dataSources.Followings.updateLikeContentItem({
        nodeId,
        originId,
        operation,
        resolveInfo,
      });
    },
    updateLikeNode: async (
      root,
      { input: { nodeId, operation } },
      { dataSources },
      resolveInfo
    ) => {
      const { originId } = await dataSources.ContentItem.getFromId(
        nodeId.split(':')[1]
      );
      return dataSources.Followings.updateLikeNode({
        nodeId,
        originId,
        operation,
        resolveInfo,
      });
    },
  },
  Query: {
    likedContent: async (root, { after, first }, { dataSources }) => {
      const followingsPaginated = await dataSources.Followings.paginatedGetFollowingsForCurrentUser(
        { type: 'ContentItem', after, first }
      );

      const followings = await followingsPaginated.edges;
      const ids = followings.map((f) => f.node.entityId);
      const contentItems = await dataSources.ContentItem.getFromOriginIds(ids);
      const contentItemEdges = contentItems.map((contentItem) => ({
        node: contentItem,
        following: followings.find(
          (f) => String(f.node.entityId) === contentItem.originId
        ).node,
        cursor: followings.find(
          (f) => String(f.node.entityId) === contentItem.originId
        ).cursor,
      }));
      const sortedContentItemEdges = contentItemEdges.sort(
        (a, b) =>
          new Date(a.following.createdDateTime) <
          new Date(b.following.createdDateTime)
      );

      return { edges: sortedContentItemEdges };
    },
  },
  UniversalContentItem: defaultContentItemResolvers,
  DevotionalContentItem: defaultContentItemResolvers,
  ContentSeriesContentItem: defaultContentItemResolvers,
  WeekendContentItem: defaultContentItemResolvers,
  MediaContentItem: defaultContentItemResolvers,
};

export const Followings = {
  resolver: followingsResolvers,
};
