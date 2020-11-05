import React from 'react';
import { Text } from 'react-native';

import { renderWithApolloData } from '../testUtils';

test('renderWithApolloData renders the component', async () => {
  const tree = await renderWithApolloData(<Text>hello, world!</Text>);
  expect(tree).toMatchSnapshot();
});
