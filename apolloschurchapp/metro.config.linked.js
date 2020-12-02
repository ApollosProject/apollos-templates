const path = require('path');
const blacklist = require('metro-config/src/defaults/blacklist');

const extraNodeModules = {
  '@apollosproject/config': path.resolve(
    `${__dirname}/../../apollos-apps/packages/apollos-config/`
  ),
  '@apollosproject/ui-analytics': path.resolve(
    `${__dirname}/../../apollos-apps/packages/apollos-ui-analytics/`
  ),
  '@apollosproject/ui-auth': path.resolve(
    `${__dirname}/../../apollos-apps/packages/apollos-ui-auth/`
  ),
  '@apollosproject/ui-connected': path.resolve(
    `${__dirname}/../../apollos-apps/packages/apollos-ui-connected/`
  ),
  '@apollosproject/ui-fragments': path.resolve(
    `${__dirname}/../../apollos-apps/packages/apollos-ui-fragments/`
  ),
  '@apollosproject/ui-htmlview': path.resolve(
    `${__dirname}/../../apollos-apps/packages/apollos-ui-htmlview/`
  ),
  '@apollosproject/ui-kit': path.resolve(
    `${__dirname}/../../apollos-apps/packages/apollos-ui-kit/`
  ),
  '@apollosproject/ui-mapview': path.resolve(
    `${__dirname}/../../apollos-apps/packages/apollos-ui-mapview/`
  ),
  '@apollosproject/ui-media-player': path.resolve(
    `${__dirname}/../../apollos-apps/packages/apollos-ui-media-player/`
  ),
  '@apollosproject/ui-notifications': path.resolve(
    `${__dirname}/../../apollos-apps/packages/apollos-ui-notifications/`
  ),
  '@apollosproject/ui-onboarding': path.resolve(
    `${__dirname}/../../apollos-apps/packages/apollos-ui-onboarding/`
  ),
  '@apollosproject/ui-passes': path.resolve(
    `${__dirname}/../../apollos-apps/packages/apollos-ui-passes/`
  ),
  '@apollosproject/ui-prayer': path.resolve(
    `${__dirname}/../../apollos-apps/packages/apollos-ui-prayer/`
  ),
  '@apollosproject/ui-scripture': path.resolve(
    `${__dirname}/../../apollos-apps/packages/apollos-ui-scripture/`
  ),
  '@apollosproject/ui-storybook': path.resolve(
    `${__dirname}/../../apollos-apps/packages/apollos-ui-storybook/`
  ),
  '@apollosproject/eslint-config': path.resolve(
    `${__dirname}/../../apollos-apps/packages/apollos-eslint-config/`
  ),
  '@apollosproject/babel-preset-apollos': path.resolve(
    `${__dirname}/../../apollos-apps/packages/babel-preset-apollos/`
  ),
};
const watchFolders = [
  path.resolve(`${__dirname}/../../apollos-apps/packages/apollos-config/`),
  path.resolve(
    `${__dirname}/../../apollos-apps/packages/apollos-ui-analytics/`
  ),
  path.resolve(`${__dirname}/../../apollos-apps/packages/apollos-ui-auth/`),
  path.resolve(
    `${__dirname}/../../apollos-apps/packages/apollos-ui-connected/`
  ),
  path.resolve(
    `${__dirname}/../../apollos-apps/packages/apollos-ui-fragments/`
  ),
  path.resolve(`${__dirname}/../../apollos-apps/packages/apollos-ui-htmlview/`),
  path.resolve(`${__dirname}/../../apollos-apps/packages/apollos-ui-kit/`),
  path.resolve(`${__dirname}/../../apollos-apps/packages/apollos-ui-mapview/`),
  path.resolve(
    `${__dirname}/../../apollos-apps/packages/apollos-ui-media-player/`
  ),
  path.resolve(
    `${__dirname}/../../apollos-apps/packages/apollos-ui-notifications/`
  ),
  path.resolve(
    `${__dirname}/../../apollos-apps/packages/apollos-ui-onboarding/`
  ),
  path.resolve(`${__dirname}/../../apollos-apps/packages/apollos-ui-passes/`),
  path.resolve(`${__dirname}/../../apollos-apps/packages/apollos-ui-prayer/`),
  path.resolve(
    `${__dirname}/../../apollos-apps/packages/apollos-ui-scripture/`
  ),
  path.resolve(
    `${__dirname}/../../apollos-apps/packages/apollos-ui-storybook/`
  ),
  path.resolve(
    `${__dirname}/../../apollos-apps/packages/apollos-eslint-config/`
  ),
  path.resolve(
    `${__dirname}/../../apollos-apps/packages/babel-preset-apollos/`
  ),
];

const blacklistRE = blacklist([
  /.*\/apollos-apps\/packages\/.*\/node_modules\/react-native\/.*/,
]);

module.exports = {
  resolver: {
    extraNodeModules,
    blacklistRE,
  },
  watchFolders,
};
