module.exports = {
  isAvailable: jest.fn().mockImplementation(() => Promise.resolve(true)),
  show: jest.fn(),
  default: require.requireActual('react-native').SafeAreaView,
};
