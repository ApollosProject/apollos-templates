import renderer from 'react-test-renderer';
import React from 'react';

import App from '../index';

it('renders without crashing', () => {
  const rendered = renderer.create(<App />).toJSON();
  expect(rendered).toBeTruthy();
});
