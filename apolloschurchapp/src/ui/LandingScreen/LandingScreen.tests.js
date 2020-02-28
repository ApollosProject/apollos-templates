import React from 'react';
import renderer from 'react-test-renderer';
import { GradientOverlayImage } from '@apollosproject/ui-kit';

import Providers from '../../Providers';

import LandingScreen from '.';

describe('The Onboarding LandingScreen component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <Providers>
        <LandingScreen />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render a custom title', () => {
    const tree = renderer.create(
      <Providers>
        <LandingScreen slideTitle={'Custom title text'} />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render a custom description', () => {
    const tree = renderer.create(
      <Providers>
        <LandingScreen description={'Custom description text'} />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render with a custom text color', () => {
    const tree = renderer.create(
      <Providers>
        <LandingScreen textColor={'salmon'} />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render with an ImageComponent', () => {
    const tree = renderer.create(
      <Providers>
        <LandingScreen
          BackgroundComponent={
            <GradientOverlayImage
              source={'https://picsum.photos/375/812/?random'}
            />
          }
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should pass additional props to Slide', () => {
    const tree = renderer.create(
      <Providers>
        <LandingScreen onPressPrimary={jest.fn()} />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
