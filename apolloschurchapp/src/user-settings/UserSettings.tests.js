import React from 'react';

import { GET_LOGIN_STATE } from '@apollosproject/ui-auth';
import {
  renderWithApolloData,
  Providers,
  WithReactNavigator,
} from '@apollosproject/ui-test-utils';
import { gql } from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing';
import { InMemoryCache } from '@apollo/client/cache';

import UserSettings from './UserSettings';

const mock = {
  request: {
    query: gql`
      query currentUserId {
        currentUser {
          id
        }
      }
    `,
  },
  result: {
    data: {
      currentUser: {
        id: 1,
      },
    },
  },
};

describe('UserSettings component', () => {
  it('renders UserSettings when logged in', async () => {
    const cache = new InMemoryCache();
    cache.writeQuery({
      query: GET_LOGIN_STATE,
      data: { isLoggedIn: true },
    });
    const tree = await renderWithApolloData(
      WithReactNavigator(
        <Providers cache={cache} MockedProvider={MockedProvider} mocks={[mock]}>
          <UserSettings />
        </Providers>
      )
    );
    expect(tree).toMatchSnapshot();
  });
});
