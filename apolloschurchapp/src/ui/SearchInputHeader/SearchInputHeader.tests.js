import React from 'react';
import renderer from 'react-test-renderer';

import Providers from '../../Providers';

import SearchInputHeader from '.';

describe('The Onboarding LandingScreen component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <Providers>
        <SearchInputHeader />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should be stylable', () => {
    const style = { backgroundColor: 'salmon' };
    const tree = renderer.create(
      <Providers>
        <SearchInputHeader style={style} />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render pass props to SearchInput', () => {
    const tree = renderer.create(
      <Providers>
        <SearchInputHeader cancelButtonText={'Boom'} />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
