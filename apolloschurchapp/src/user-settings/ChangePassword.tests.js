import React from 'react';

import { Providers, renderWithApolloData } from '@apollosproject/ui-test-utils';
import { MockedProvider } from '@apollo/client/testing';
import ChangePassword from './ChangePassword';

describe('Change Password component', () => {
  it('renders a change password form', async () => {
    const navigation = {
      navigate: jest.fn(),
      goBack: jest.fn(),
    };
    const tree = await renderWithApolloData(
      <Providers MockedProvider={MockedProvider}>
        <ChangePassword navigation={navigation} />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
