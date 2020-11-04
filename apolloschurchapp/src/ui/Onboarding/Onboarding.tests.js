import React from 'react';

import Providers from '../../Providers';
import { renderWithApolloData } from '../../utils/testUtils';

import Onboarding from '.';

describe('the Onboarding component', () => {
  it('should render Onboarding', async () => {
    const tree = await renderWithApolloData(
      <Providers>
        <Onboarding />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
