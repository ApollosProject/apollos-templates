import React from 'react';
import renderer from 'react-test-renderer';
import wait from 'waait';

import { GET_LOGIN_STATE } from '@apollosproject/ui-auth';
import Providers from '../Providers';

import UserSettings from '.';

describe('UserSettings component', () => {
  it('renders UserSettings when logged in', async () => {
    const mock = {
      request: {
        query: GET_LOGIN_STATE,
      },
      result: {
        data: { isLoggedIn: true },
      },
    };
    const navigation = { navigate: jest.fn(), getParam: jest.fn() };
    const tree = renderer.create(
      <Providers mocks={[mock]}>
        <UserSettings navigation={navigation} />
      </Providers>
    );
    await wait(0); // wait for response from graphql
    expect(tree).toMatchSnapshot();
  });
});
