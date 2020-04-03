import React from 'react';
import renderer from 'react-test-renderer';

import Providers from '../../../../Providers';

import CampaignItemListFeature from '.';

const cards = [
  {
    action: 'READ_CONTENT',
    title: 'Card Title',
    hasAction: null,
    actionIcon: null,
    labelText: null,
    summary: 'Card summary',
    coverImage: [
      {
        uri: 'https://picsum.photos/800',
      },
    ],
    relatedNode: {
      id: 'UniversalContentItem:95ff79f60a028b1b506aaeedf8b4c6ae',
      __typename: 'UniversalContentItem',
    },
    __typename: 'CardListItem',
  },
];

describe('The CampaignItemListFeature component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <Providers>
        <CampaignItemListFeature cards={cards} />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render a section title', () => {
    const tree = renderer.create(
      <Providers>
        <CampaignItemListFeature
          cards={cards}
          title={'This renders smaller than its name would suggest'}
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render with a subtitle', () => {
    const tree = renderer.create(
      <Providers>
        <CampaignItemListFeature
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
        <CampaignItemListFeature cards={[]} isLoading />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
