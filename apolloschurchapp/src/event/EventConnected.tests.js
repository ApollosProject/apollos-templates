import React from 'react';

import moment from 'moment';
import Providers from '../Providers';

import { renderWithApolloData } from '../utils/testUtils';
import getEvent from './getEvent';
import EventConnected from './EventConnected';

const mocks = {
  request: {
    query: getEvent,
    variables: { eventId: 'Event:123' },
  },
  result: {
    data: {
      node: {
        __typename: 'Event',
        id: 'Event:123',
        start: moment('2019-09-26T15:10:51.200Z')
          .utc()
          .toJSON(),
        end: moment('2019-09-26T17:10:51.200Z')
          .utc()
          .toJSON(),
        location: 'Willow Creek, Chicago',
        name: 'Cookout',
        description: 'Some detailed description',
        image: {
          __typename: 'ImageMedia',
          sources: [
            {
              uri: 'https://url.com/image.jpg',
              __typename: 'ImageMediaSource',
            },
          ],
        },
      },
    },
  },
};

describe('EventConnected component', () => {
  it('renders without errors', async () => {
    const tree = await renderWithApolloData(
      <Providers mocks={[mocks]}>
        <EventConnected navigation={{ getParam: () => 'Event:123' }} />
      </Providers>
    );

    expect(tree).toMatchSnapshot();
  });
});
