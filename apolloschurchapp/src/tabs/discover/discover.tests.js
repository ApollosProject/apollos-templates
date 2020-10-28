import React from 'react';
import Providers from '../../Providers';

import { renderWithApolloData } from '../../utils/testUtils';

import Discover, { GET_DISCOVER_FEED } from './Discover';

jest.mock('@apollosproject/ui-connected', () => ({
  ...require.requireActual('@apollosproject/ui-connected'),
  FeaturesFeedConnected: 'FeaturesFeedConnected',
}));

describe('The Discover tab component', () => {
  it('Should retrieve the discover feed', async () => {
    const feedmock = {
      request: {
        query: GET_DISCOVER_FEED,
      },
      result: {
        data: {
          discoverFeedFeatures: {
            __typename: 'FeatureFeed',
            id:
              'FeatureFeed:c7035fd9677aa209cd4613df53e9c83a0fb3b9ecd853808383d135407161a17bc75b8c451176e861b2ade040817c1b9da6fbfe9c93b76645950e3ce952ba659e',
          },
        },
      },
    };

    const tree = await renderWithApolloData(
      <Providers mocks={[feedmock]}>
        <Discover />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
