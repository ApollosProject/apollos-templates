import React from 'react';
import { NavigationService } from '@apollosproject/ui-kit';
import { renderWithApolloData } from '../../utils/testUtils';
import Providers from '../../Providers';
import BrowserWithUserCookie, { WITH_USER_COOKIE } from '../index';
import { OpenUserWebView } from '../Provider';

const mocks = [
  {
    request: { query: WITH_USER_COOKIE },
    result: {
      data: {
        __typename: 'AuthenticatedUser',
        currentUser: {
          __typename: 'Person',
          id: 'Person:123',
          rockToken: 'ABC',
        },
      },
    },
  },
];
const navigation = { navigate: jest.fn(), getParam: jest.fn() };

describe('the BrowserWithUserCookie component', () => {
  it('renders with a user', async () => {
    const tree = await renderWithApolloData(
      <Providers mocks={mocks}>
        <BrowserWithUserCookie navigation={navigation} />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('renders with modal false', async () => {
    const tree = await renderWithApolloData(
      <Providers mocks={mocks}>
        <BrowserWithUserCookie modal={false} navigation={navigation} />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
describe('the OpenUserWebView', () => {
  it('navigtes', () => {
    OpenUserWebView({ url: 'fake.com' });
    expect(NavigationService.navigate).toBeCalledWith('UserWebBrowser', {
      url: 'fake.com',
    });
  });
});
