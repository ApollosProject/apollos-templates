import React from 'react';
import { storiesOf } from '@apollosproject/ui-storybook';

import { BackgroundView, CenteredView } from '@apollosproject/ui-kit';
import ActionListFeature from '.';

const actions = [
  {
    id: 'fakeId1',
    title: 'Boom',
    subtitle: 'What',
    parentChannel: {
      id: '',
      name: '',
    },
    image: {
      sources: [
        {
          uri: 'https://picsum.photos/200/200',
        },
      ],
    },
  },
  {
    id: 'fakeId2',
    title: 'Boom',
    subtitle: 'What',
    parentChannel: {
      id: '',
      name: '',
    },
    image: {
      sources: [
        {
          uri: 'https://picsum.photos/200',
        },
      ],
    },
  },
  {
    id: 'fakeId3',
    title: 'Boom',
    subtitle: 'What',
    parentChannel: {
      id: '',
      name: '',
    },
    image: {
      sources: [
        {
          uri: 'https://picsum.photos/200',
        },
      ],
    },
  },
  {
    id: 'fakeId4',
    title: 'Boom',
    subtitle: 'What',
    parentChannel: {
      id: '',
      name: '',
    },
    image: {
      sources: [
        {
          uri: 'https://picsum.photos/200',
        },
      ],
    },
  },
];

storiesOf('ActionListFeature', module)
  .addDecorator((story) => (
    <BackgroundView>
      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <CenteredView style={{ alignItems: 'stretch' }}>{story()}</CenteredView>
    </BackgroundView>
  ))
  .add('example', () => (
    <ActionListFeature
      actions={actions}
      title={'Title'}
      subtitle={'Subtitle'}
      onPressActionListButton={() => {}}
    />
  ))
  .add('default', () => <ActionListFeature actions={actions} />)
  .add('isLoading', () => {
    const loadingStateData = [
      {
        id: 'fakeId1',
        title: '',
        subtitle: '',
        parentChannel: {
          id: '',
          name: '',
        },
        image: {
          sources: [
            {
              uri: '',
            },
          ],
        },
      },
      {
        id: 'fakeId2',
        title: '',
        subtitle: '',
        parentChannel: {
          id: '',
          name: '',
        },
        image: {
          sources: [
            {
              uri: '',
            },
          ],
        },
      },
      {
        id: 'fakeId3',
        title: '',
        subtitle: '',
        parentChannel: {
          id: '',
          name: '',
        },
        image: {
          sources: [
            {
              uri: '',
            },
          ],
        },
      },
      {
        id: 'fakeId4',
        title: '',
        subtitle: '',
        parentChannel: {
          id: '',
          name: '',
        },
        image: {
          sources: [
            {
              uri: '',
            },
          ],
        },
      },
    ];

    return (
      <ActionListFeature
        actions={loadingStateData}
        onPressActionListButton={() => {}}
        isLoading
      />
    );
  })
  .add('onPressActionListButton', () => (
    <ActionListFeature actions={actions} onPressActionListButton={() => {}} />
  ))
  .add('subtitle', () => (
    <ActionListFeature actions={actions} subtitle={'subtitle'} />
  ))
  .add('title', () => <ActionListFeature actions={actions} title={'Title'} />);
