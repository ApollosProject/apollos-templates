import React from 'react';
import { storiesOf } from '@apollosproject/ui-storybook';

import { BackgroundView, CenteredView } from '@apollosproject/ui-kit';
import CampaignItemListFeature from '.';

const cards = [
  {
    action: 'READ_CONTENT',
    title: 'Live for Freedom Toolkit',
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
    relatedNode: {
      id: 'UniversalContentItem:95ff79f60a028b1b506aaeedf8b4c6ae',
      __typename: 'UniversalContentItem',
    },
    __typename: 'CardListItem',
  },
];

storiesOf('CampaignItemListFeature', module)
  .addDecorator((story) => (
    <BackgroundView>
      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <CenteredView style={{ alignItems: 'stretch' }}>{story()}</CenteredView>
    </BackgroundView>
  ))
  .add('example', () => (
    <CampaignItemListFeature
      cards={cards}
      title={'Title'}
      subtitle={'Subtitle'}
    />
  ))
  .add('default', () => <CampaignItemListFeature cards={cards} />)
  .add('isLoading', () => <CampaignItemListFeature cards={[]} isLoading />)
  .add('subtitle', () => (
    <CampaignItemListFeature cards={cards} subtitle={'subtitle'} />
  ))
  .add('title', () => (
    <CampaignItemListFeature cards={cards} title={'Title'} />
  ));
