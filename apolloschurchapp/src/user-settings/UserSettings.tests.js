import React from 'react';

import { GET_LOGIN_STATE } from '@apollosproject/ui-auth';
import { renderWithApolloData, Providers } from '@apollosproject/ui-test-utils';
import { MockedProvider } from '@apollo/client/testing';
import { InMemoryCache } from '@apollo/client/cache';

import UserSettings from '.';

describe('UserSettings component', () => {
  it('renders UserSettings when logged in', async () => {
    const cache = new InMemoryCache();
    cache.writeQuery({
      query: GET_LOGIN_STATE,
      data: { isLoggedIn: true },
    });
    const navigation = { navigate: jest.fn() };
    const tree = await renderWithApolloData(
      <Providers cache={cache} MockedProvider={MockedProvider}>
        <UserSettings navigation={navigation} />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
