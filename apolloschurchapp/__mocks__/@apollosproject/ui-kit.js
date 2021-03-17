module.exports = {
  ...jest.requireActual('@apollosproject/ui-kit'),
  NavigationService: {
    navigate: jest.fn(),
    setTopLevelNavigator: jest.fn(),
  },
};
