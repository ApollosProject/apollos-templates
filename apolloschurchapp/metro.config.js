const {
  applyConfigForLinkedDependencies,
} = require('@carimus/metro-symlinked-deps');

module.exports = applyConfigForLinkedDependencies(
  {
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false,
        },
      }),
    },
  },
  {
    projectRoot: __dirname,
    blacklistLinkedModules: [
      'react-native',
      'react-native-linear-gradient',
      'react-native-svg',
      '@storybook',
    ],
    resolveNodeModulesAtRoot: true,
  }
);
