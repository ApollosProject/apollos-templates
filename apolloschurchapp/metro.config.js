/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const path = require('path');
const blacklist = require('metro-config/src/defaults/blacklist');

const flatten = (array) =>
  array.reduce((accum, curr) => curr.concat(accum), []);

const localDeps = [
  path.resolve('..', 'apollos-config'),
  path.resolve('..', 'apollos-ui-analytics'),
  path.resolve('..', 'apollos-ui-auth'),
  path.resolve('..', 'apollos-ui-connected'),
  path.resolve('..', 'apollos-ui-fragments'),
  path.resolve('..', 'apollos-ui-htmlview'),
  path.resolve('..', 'apollos-ui-kit'),
  path.resolve('..', 'apollos-ui-mapview'),
  path.resolve('..', 'apollos-ui-media-player'),
  path.resolve('..', 'apollos-ui-notifications'),
  path.resolve('..', 'apollos-ui-onboarding'),
  path.resolve('..', 'apollos-ui-passes'),
  path.resolve('..', 'apollos-ui-scripture'),
  path.resolve('..', 'apollos-ui-storybook'),
];

const sharedNativeModules = [
  '@apollosproject/react-native-airplay-btn',
  '@react-native-community/async-storage',
  'react-native-geolocation-service',
  'react-native-config',
  'react-native-gesture-handler',
  'react-native-linear-gradient',
  'react-native-maps',
  'react-native-modal-datetime-picker',
  'react-native-music-control',
  'react-native-onesignal',
  'react-native-safe-area-context',
  'react-native-svg',
  'react-native-video',
  'react-native-video-controls',
  'react-navigation',
];

module.exports = {
  resolver: {
    extraNodeModules: {
      'react-native': path.resolve('.', 'node_modules/react-native'),
      ...sharedNativeModules.reduce(
        (accum, curr) => ({
          ...accum,
          [curr]: path.resolve('.', `node_modules/${curr}`),
        }),
        {}
      ),
      'react-native-svg': path.resolve('.', 'node_modules/react-native-svg'),
    },
    blacklistRE: blacklist([
      ...localDeps.map(
        (depPath) => new RegExp(`${depPath}/node_modules/react-native/.*`)
      ),
      ...flatten(
        localDeps.map((depPath) =>
          sharedNativeModules.map(
            (moduleName) =>
              new RegExp(`${depPath}/node_modules/${moduleName}/.*`)
          )
        )
      ),
      ...sharedNativeModules.map(
        (moduleName) =>
          new RegExp(`${path.resolve(`../../node_modules/${moduleName}`)}/.*`)
      ),
      ...localDeps.map(
        (depPath) => new RegExp(`${depPath}/node_modules/react-native-svg/.*`)
      ),
      ...localDeps.map(
        (depPath) =>
          new RegExp(`${depPath}/node_modules/.*/node_modules/react-native/.*`)
      ),
      new RegExp(
        `${path.resolve('.', 'node_modules')}/.*/node_modules/react-native/.*`
      ),
      new RegExp(
        `${path.resolve('..', '..', 'node_modules', 'react-native')}/.*`
      ),
      new RegExp(
        `${path.resolve(
          '..',
          '..',
          'node_modules'
        )}/.*/node_modules/react-native/.*`
      ),
    ]),
  },
  watchFolders: [...localDeps, path.resolve('..', '..', 'node_modules')],
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
};
