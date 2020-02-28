import React from 'react';
import renderer from 'react-test-renderer';
import moment from 'moment';

import Providers from '../Providers';

import Event from './Event';

describe('The Event component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <Providers>
        <Event
          event={{
            __typename: 'Event',
            id: 'Event:123',
            start: moment('2019-09-26T15:10:51.200Z')
              .utc()
              .toJSON(),
            end: moment('2019-09-26T17:10:51.200Z')
              .utc()
              .toJSON(),
            location: 'Willow Creek, Chicago',
            image: { sources: [{ url: 'https://url.com/image.jpg' }] },
          }}
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
