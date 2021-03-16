module.exports = {
  SafeAreaConsumer: ({ children }) =>
    children({ top: 0, bottom: 0, left: 0, right: 0 }),
  SafeAreaProvider: ({ children }) => children,
  SafeAreaView: jest.requireActual('react-native').SafeAreaView,
  useSafeAreaInsets: () => ({ top: 3 }),
};
