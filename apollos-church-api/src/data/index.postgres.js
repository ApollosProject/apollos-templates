import fs from 'fs';
import path from 'path';
import { gql } from 'apollo-server';

import {
  createApolloServerConfig,
  Interfaces,
} from '@apollosproject/server-core';

import * as Analytics from '@apollosproject/data-connector-analytics';
import * as Scripture from '@apollosproject/data-connector-bible';
import * as LiveStream from '@apollosproject/data-connector-church-online';
import * as Cloudinary from '@apollosproject/data-connector-cloudinary';
import * as Search from '@apollosproject/data-connector-algolia-search';
import * as Pass from '@apollosproject/data-connector-passes';
import * as Cache from '@apollosproject/data-connector-redis-cache';
import * as Sms from '@apollosproject/data-connector-twilio';
import {
  Followings,
  Interactions,
  RockConstants,
  Sharable,
  Auth,
  PersonalDevice,
  Template,
  AuthSms,
  Campus,
  Group,
  BinaryFiles,
  FeatureFeed,
  Event,
  PrayerRequest,
  Person as RockPerson,
  ContentItem as RockContentItem,
  ContentChannel,
  Feature as RockFeature,
  ActionAlgorithm as RockActionAlgorithm,
} from '@apollosproject/data-connector-rock';

import {
  Comment,
  UserFlag,
  UserLike,
  Follow,
  Notification,
  NotificationPreference,
  Tag,
  Campus as PostgresCampus,
  Person as PostgresPerson,
  Media as PostgresMedia,
  Feature as PostgresFeature,
  ContentItem as PostgresContentItem,
  ContentItemsConnection,
  ContentItemCategory,
  ActionAlgorithm as PostgresActionAlgorithm,
} from '@apollosproject/data-connector-postgres';

import * as Theme from './theme';

// This modules ties together certain updates so they occurs in both Rock and Postgres.
// Will be eliminated in the future through an enhancement to the Shovel
import {
  Person,
  OneSignal,
  Followings as FollowingsPostgresBridge,
} from './rockWithPostgres';

const postgresContentModules = {
  ActionAlgorithm: PostgresActionAlgorithm,
  Feature: PostgresFeature,
  PostgresMedia,
  Tag,
  ContentItem: PostgresContentItem,
  ContentItemsConnection,
  ContentChannel: ContentItemCategory,
};

const rockContentModules = {
  ActionAlgorithm: RockActionAlgorithm,
  Feature: RockFeature,
  ContentItem: RockContentItem,
  ContentChannel,
};

const data = {
  Interfaces,
  Followings,
  FollowingsPostgresBridge, // This entry needs to come after Followings.
  FeatureFeed,
  RockPerson, // This entry needs to come before (postgres) Person
  BinaryFiles, // This entry needs to come before (postgres) Person
  PostgresPerson, // Postgres person for now, as we extend this dataSource in the 'rockWithPostgres' file
  ...(fs.existsSync(path.join(__dirname, '../..', 'config.postgres.yml'))
    ? postgresContentModules
    : rockContentModules),
  Cloudinary,
  Auth,
  AuthSms,
  Sms,
  LiveStream,
  Theme,
  Scripture,
  Interactions,
  RockConstants,
  Sharable,
  Analytics,
  PersonalDevice,
  Pass,
  Search,
  Template,
  Campus,
  Group,
  Event,
  Cache,
  PrayerRequest,
  Comment,
  UserLike,
  UserFlag,
  Follow,
  PostgresCampus,
  Notification,
  NotificationPreference,
  OneSignal,
  Person, // An extension of Postgres person. Will be eliminated in the near future so you can use just postgres/Person.
};

const {
  dataSources,
  resolvers,
  schema,
  context,
  applyServerMiddleware,
  setupJobs,
  migrations,
} = createApolloServerConfig(data);

export {
  dataSources,
  resolvers,
  schema,
  context,
  applyServerMiddleware,
  setupJobs,
  migrations,
};

// the upload Scalar is added
export const testSchema = [
  gql`
    scalar Upload
  `,
  ...schema,
];
