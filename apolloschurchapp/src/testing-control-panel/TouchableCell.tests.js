import React from 'react';
import renderer from 'react-test-renderer';

import Providers from '../Providers';

import TouchableCell from './TouchableCell';

describe('touchable cell', () => {
  it('renders the cell, icon, and text', () => {
    const tree = renderer.create(
      <Providers>
        <TouchableCell
          cellText="This is a cell"
          iconName="play"
          handlePress={() => ({})}
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
