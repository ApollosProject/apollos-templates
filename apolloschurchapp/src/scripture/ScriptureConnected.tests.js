import React from 'react';

import Providers from '../Providers';

import { renderWithApolloData } from '../utils/testUtils';
import getScripture from './getScripture';
import ScriptureConnected from '.';

const mocks = {
  request: {
    query: getScripture,
    variables: { query: 'Genesis 1:1' },
  },
  result: {
    data: {
      scripture: {
        __typename: 'Scripture',
        id: 'GEN.1.1',
        reference: 'Genesis 1:1',
        copyright: 'PUBLIC DOMAIN',
        version: 'WEB',
        html:
          '<p class="p"><span data-number="1" class="v">1</span>In the beginning, God created the heavens and the earth. </p>',
      },
    },
  },
};

describe('ScriptureConnected component', () => {
  it('renders without errors', async () => {
    const tree = await renderWithApolloData(
      <Providers mocks={[mocks]}>
        <ScriptureConnected references={['Genesis 1:1']} />
      </Providers>
    );

    expect(tree).toMatchSnapshot();
  });
});
