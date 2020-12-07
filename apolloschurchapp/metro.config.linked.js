const path = require('path');
const blacklist = require('metro-config/src/defaults/blacklist');

const watchFolders = [
  path.resolve(`${__dirname}/../../apollos-apps/node_modules/`),
  path.resolve(`${__dirname}/node_modules/`),
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
    `${__dirname}/../../apollos-apps/packages/apollos-ui-test-utils/`
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
  /.*\/apollos-apps\/packages\/.*\/node_modules\/react-native-screens\/.*/,
  /.*\/apollos-apps\/node_modules\/.*\/node_modules\/react-native\/.*/,
  /.*\/apollos-apps\/node_modules\/.*\/node_modules\/react-native-screens\/.*/,
  /.*\/apollos-apps\/node_modules\/react-native\/.*/,
  /.*\/apollos-apps\/node_modules\/react-native-gesture-handler\/.*/,
  /.*\/apollos-apps\/node_modules\/react-native-linear-gradient\/.*/,
  /.*\/apollos-apps\/node_modules\/react-native-svg\/.*/,
  /.*\/apollos-apps\/node_modules\/apollo-client\/.*/,
  /.*\/apollos-apps\/node_modules\/react-apollo\/.*/,
  /.*\/apollos-apps\/node_modules\/react\/.*/,
]);

const extraNodeModules2 = new Proxy(
  {
    // If we would have an actual package with "package.json" it would go here.
    // e.g. if @local/core would be a package:
    // '@local/core': path.resolve(__dirname, '../../local-packages/core/'),
  },
  {
    get: (target, name) => {
      if (target.hasOwnProperty(name)) {
        return target[name];
      }
      // Redirect dependencies referenced from shared folders to mobile package node_modules
      return path.join(process.cwd(), `node_modules/${name}`);
    },
  }
);

module.exports = {
  resolver: {
    extraNodeModules: extraNodeModules2,
    blacklistRE,
    sourceExts: ['ts', 'tsx', 'js', 'jsx'],
  },
  watchFolders,
};
