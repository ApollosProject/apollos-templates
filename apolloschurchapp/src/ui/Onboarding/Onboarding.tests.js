import React from 'react';
import { Providers, renderWithApolloData } from '@apollosproject/ui-test-utils';

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
