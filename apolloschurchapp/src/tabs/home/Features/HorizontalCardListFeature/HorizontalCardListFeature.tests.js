import React from 'react';
import renderer from 'react-test-renderer';

import Providers from '../../../../Providers';

import HorizontalCardListFeature from '.';

const cards = [
  {
    action: 'READ_CONTENT',
    title: 'Live for Freedom Toolkit',
    hyphenatedTitle: 'Live for Freedom Toolkit',
    hasAction: true,
    actionIcon: 'umbrella',
    labelText: 'Stormy',
    summary:
      "Celebrate your freedom in Christ — in the car, shower, cubicle or wherever you go — with this playlist of NewSpring Worship's favorite songs of the summer.",
    coverImage: [
      {
        uri: 'https://picsum.photos/800',
      },
    ],
    __typename: 'WeekendContentItem',
    id: 'WeekendContentItem:95ff79f60a028b1b506aaeedf8b4c6ae',
  },
  {
    action: 'READ_CONTENT',
    title: 'Live for Freedom Toolkit',
    hyphenatedTitle: 'Live for Freedom Toolkit',
    hasAction: null,
    actionIcon: null,
    labelText: null,
    summary:
      "Celebrate your freedom in Christ — in the car, shower, cubicle or wherever you go — with this playlist of NewSpring Worship's favorite songs of the summer.",
    coverImage: [
      {
        uri: 'https://picsum.photos/800',
      },
    ],
    __typename: 'UniversalContentItem',
    id: 'UniversalContentItem:95ff79f60a028b1b506aaeedf8b4c6ae',
  },
  {
    action: 'READ_CONTENT',
    title: 'Live for Freedom Toolkit',
    hyphenatedTitle: 'Live for Freedom Toolkit',
    hasAction: null,
    actionIcon: null,
    labelText: null,
    summary:
      "Celebrate your freedom in Christ — in the car, shower, cubicle or wherever you go — with this playlist of NewSpring Worship's favorite songs of the summer.",
    coverImage: [
      {
        uri: 'https://picsum.photos/800',
      },
    ],
    __typename: 'DevotionalContentItem',
    id: 'DevotionalContentItem:95ff79f60a028b1b506aaeedf8b4c6ae',
  },
];

describe('The HorizontalCardListFeature component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <Providers>
        <HorizontalCardListFeature cards={cards} />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render a section title', () => {
    const tree = renderer.create(
      <Providers>
        <HorizontalCardListFeature
          cards={cards}
          title={'This renders smaller than its name would suggest'}
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render with a section subtitle', () => {
    const tree = renderer.create(
      <Providers>
        <HorizontalCardListFeature
          cards={cards}
          subtitle={'This renders larger than you might expect'}
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render a loading state for isLoading', () => {
    const tree = renderer.create(
      <Providers>
        <HorizontalCardListFeature cards={[]} isLoading />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
