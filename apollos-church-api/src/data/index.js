import { gql } from 'apollo-server';

import {
  createApolloServerConfig,
  Interfaces,
} from '@apollosproject/server-core';

import * as Analytics from '@apollosproject/data-connector-analytics';
import * as Scripture from '@apollosproject/data-connector-bible';
import * as LiveStream from '@apollosproject/data-connector-church-online';
import * as Cloudinary from '@apollosproject/data-connector-cloudinary';
import * as OneSignal from '@apollosproject/data-connector-onesignal';
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
  Campus as PostgresCampus,
  Person as PostgresPerson,
} from '@apollosproject/data-connector-postgres';
// import * as PostgresPerson from '@apollosproject/data-connector-postgres/lib/people';
// import * as PostgresCampus from '@apollosproject/data-connector-postgres/lib/campus';

import * as Theme from './theme';

// This module is used to attach Rock User updating to the OneSignal module.
// This module includes a Resolver that overides a resolver defined in `OneSignal`
import * as OneSignalWithRock from './oneSignalWithRock';

// This modules ties together certain updates so they occurs in both Rock and Postgres.
// Will be eliminated in the future through an enhancement to the Shovel
import * as Person from './rockWithPostgres';

const data = {
  Interfaces,
  Followings,
  ContentChannel,
  ContentItem,
  RockPerson, // This entry needs to come before (postgres) Person
  BinaryFiles, // This entry needs to come before (postgres) Person
  PostgresPerson, // Postgres person for now, as we extend this dataSource in the 'rockWithPostgres' file
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
  OneSignalWithRock,
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
  PostgresCampus,
  Persona,
  Person, // An extension of Postgres person. Will be eliminated in the near future so you can use just postgres/Person.
};

const {
  dataSources,
  resolvers,
  schema,
  context,
  applyServerMiddleware,
  setupJobs,
} = createApolloServerConfig(data);

export {
  dataSources,
  resolvers,
  schema,
  context,
  applyServerMiddleware,
  setupJobs,
};

// the upload Scalar is added
export const testSchema = [
  gql`
    scalar Upload
  `,
  ...schema,
];
