import React from 'react';
import { GET_USER_PROFILE } from '../tabs/connect/UserAvatarHeader';

import Providers from '../Providers';

import { renderWithApolloData } from '../utils/testUtils';
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
      getParam: jest.fn(),
      goBack: jest.fn(),
    };
    const tree = await renderWithApolloData(
      <Providers mocks={[mock]}>
        <PersonalDetails navigation={navigation} />
      </Providers>
    );

    expect(tree).toMatchSnapshot();
  });
});
