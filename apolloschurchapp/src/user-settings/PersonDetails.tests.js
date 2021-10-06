import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import {
  Providers,
  renderWithApolloData,
  WithReactNavigator,
} from '@apollosproject/ui-test-utils';
import { GET_USER_PROFILE } from '@apollosproject/ui-connected';

import PersonalDetails from './PersonalDetails';

describe('PersonalDetails component', () => {
  it('renders PersonalDetails when logged in', async () => {
    const mock = {
      request: {
        query: GET_USER_PROFILE,
      },
      result: {
        data: {
          currentUser: {
            __typename: 'AuthenticatedUser',
            id: 'AuthenticatedUser:123',
            profile: {
              __typename: 'Person',
              id: 'Profile:123',
              firstName: 'Isaac',
              lastName: 'Hardy',
              nickName: 'Ike',
              email: 'isaac.hardy@newspring.cc',
              birthDate: '2019-09-12T21:01:06.026Z',
              gender: 'Male',
              campus: null,
              photo: null,
            },
          },
        },
      },
    };
    const navigation = {
      navigate: jest.fn(),
      goBack: jest.fn(),
    };
    const tree = await renderWithApolloData(
      WithReactNavigator(
        <Providers MockedProvider={MockedProvider} mocks={[mock]}>
          <PersonalDetails navigation={navigation} />
        </Providers>
      )
    );

    expect(tree).toMatchSnapshot();
  });
});
