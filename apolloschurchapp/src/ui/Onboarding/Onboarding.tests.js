import React from 'react';
import renderer from 'react-test-renderer';

import Providers from '../../Providers';

import Onboarding from '.';

describe('the Onboarding component', () => {
  it('should render Onboarding', () => {
    const tree = renderer.create(
      <Providers>
        <Onboarding />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
