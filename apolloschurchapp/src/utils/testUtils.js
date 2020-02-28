/* eslint-disable import/prefer-default-export */
import renderer from 'react-test-renderer';
import wait from 'waait';

export const renderWithApolloData = async (component) => {
  const tree = renderer.create(component);
  await wait(1);
  tree.update(component);
  return tree;
};
