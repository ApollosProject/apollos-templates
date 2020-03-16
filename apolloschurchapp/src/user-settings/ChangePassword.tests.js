import React from 'react';
import renderer from 'react-test-renderer';
import wait from 'waait';

import Providers from '../Providers';

import ChangePassword from './ChangePassword';

describe('Change Password component', () => {
  it('renders a change password form', async () => {
    const navigation = {
      navigate: jest.fn(),
      getParam: jest.fn(),
      goBack: jest.fn(),
    };
    const tree = renderer.create(
      <Providers>
        <ChangePassword navigation={navigation} />
      </Providers>
    );
    await wait(0); // wait for response from graphql
    expect(tree).toMatchSnapshot();
  });
});
