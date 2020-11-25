import React from 'react';
import renderer from 'react-test-renderer';
import wait from 'waait';

import Providers from '../Providers';
import { renderWithApolloData } from '@apollosproject/ui-test-utils';
import ChangePassword from './ChangePassword';

describe('Change Password component', () => {
  it('renders a change password form', async () => {
    const navigation = {
      navigate: jest.fn(),
      goBack: jest.fn(),
    };
    const tree = await renderWithApolloData(
      <Providers>
        <ChangePassword navigation={navigation} />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
