import { gql } from 'apollo-server';

import {
  createApolloServerConfig,
  Interfaces,
} from '@apollosproject/server-core';
import ApollosConfig from '@apollosproject/config';

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
  ContentItem,
  ContentChannel,
  Sharable,
  Auth,
  PersonalDevice,
  Template,
  AuthSms,
  Campus,
  Group,
  BinaryFiles,
  Feature,
  FeatureFeed,
  ActionAlgorithm,
  Event,
  PrayerRequest,
  Persona,
  Person as RockPerson,
} from '@apollosproject/data-connector-rock';

import {
  Comment,
  UserFlag,
  Follow,
  Campus as PostgresCampus,
  Person as PostgresPerson,
} from '@apollosproject/data-connector-postgres';

import * as Theme from './theme';

// This modules ties together certain updates so they occurs in both Rock and Postgres.
// Will be eliminated in the future through an enhancement to the Shovel
import { Person, OneSignal } from './rockWithPostgres';

// This will not be necessary when Postgres is required by all
import NoPostgres from './noPostgres';

// NOTE: order matters here!! some resolvers overwrite others depending on feature set
const data = {
  Interfaces,
  Followings,
  ContentChannel,
  ContentItem,
  RockPerson, // MUST come before PostgresPerson
  BinaryFiles, // MUST come before PostgresPerson and after RockPerson
  PostgresPerson,
  Person, // MUST come after PostgresPerson
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
  OneSignal,
  PersonalDevice,
  Pass,
  Search,
  Template,
  Campus,
  Group,
  Feature,
  FeatureFeed,
  ActionAlgorithm,
  Event,
  Cache,
  PrayerRequest,
  Comment,
  UserFlag,
  Follow,
  PostgresCampus,
  Persona,
  NoPostgres: ApollosConfig.DATABASE_URL ? NoPostgres : {}, // this needs to be last to overwrite all Postgres resolvers
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
