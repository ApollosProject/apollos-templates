import React from 'react';
import { GET_FEED_FEATURES } from '@apollosproject/ui-connected';
import renderer from 'react-test-renderer';
import Providers from '../../Providers';

import Discover, { GET_DISCOVER_FEED } from './Discover';

describe('The Discover tab component', () => {
  it('Should retrieve the discover feed', () => {
    const feedmock = {
      request: {
        query: GET_DISCOVER_FEED,
      },
      result: {
        data: {
          discoverFeedFeatures: {
            __typename: 'FeatureFeed',
            id:
              'FeatureFeed:c7035fd9677aa209cd4613df53e9c83a0fb3b9ecd853808383d135407161a17bc75b8c451176e861b2ade040817c1b9da6fbfe9c93b76645950e3ce952ba659e',
          },
        },
      },
    };

    const featuresmock = {
      request: {
        query: GET_FEED_FEATURES,
        variables: {
          featureFeedId:
            'FeatureFeed:c7035fd9677aa209cd4613df53e9c83a0fb3b9ecd853808383d135407161a17bc75b8c451176e861b2ade040817c1b9da6fbfe9c93b76645950e3ce952ba659e',
        },
      },
      result: {
        data: {
          node: {
            id:
              'FeatureFeed:c7035fd9677aa209cd4613df53e9c83a0fb3b9ecd853808383d135407161a17bc75b8c451176e861b2ade040817c1b9da6fbfe9c93b76645950e3ce952ba659e',
            features: [
              {
                id:
                  'HorizontalCardListFeature:f6b30a38eb547f1f75676ce0557a7e05bed66de665564bd0c5e37f069267679550e6d23b01e068694595ba074cd0d145c3508d6249fc0adc58f325fa1e4621dfe90a5361c8c98d884c881d6d9afa141b39d49fcd235e3d17158d68893fdf02d7b7ed566ba8668b0e656c8ab7c1dc8c8282deab4c60ad6c741d350c43d4a9c233c0aa0111428a0c8fab78ec0cfac071296280e22e7fd9ab90bcd91f71331c5788c1c0c36267fb9748a255429eb8ece44a',
                __typename: 'HorizontalCardListFeature',
                title: null,
                subtitle: 'Sermons',
              },
              {
                id:
                  'HorizontalCardListFeature:f6b30a38eb547f1f75676ce0557a7e05bed66de665564bd0c5e37f069267679550e6d23b01e068694595ba074cd0d145c3508d6249fc0adc58f325fa1e4621df9713b2b9e6fd250133e5f82925c30617532e08ed13bfd9a993aada478d8d56b5bfdd387adadd4c69cdbf6bccb91d07f1a9186ecbf70d759184a357a2d689fd5bbde35c4e3e1d1e1504d7128cfe846c524288bbfe7e34675fa8d1ddf9fbc399a7babdbb1b07f6c2d6940808540ac0c505fea88bcbac244e56c16850ecf677715850dfe3029b948911c966b657e61e4f0345e6455b655399e68988e837ee8d0f59ae9bff9b3222ce9ae8e2472e2d11a61a5fc09f58ce5630c0f63e14d0446f81c2f64a1114a2719bef1f847547198dd2f98886febc2915b19fb1118e933cfee2b1aa2219efaad631f7671221bacc977029',
                __typename: 'HorizontalCardListFeature',
                title: null,
                subtitle: 'Podcasts',
              },
              {
                id:
                  'HorizontalCardListFeature:f6b30a38eb547f1f75676ce0557a7e05bed66de665564bd0c5e37f069267679550e6d23b01e068694595ba074cd0d145c3508d6249fc0adc58f325fa1e4621df1484b46476d2c52ad9c0542bda10e9fabf20084da3a3906e87a83666e20615280fe6ced6fb057dd5d07befa9577b5aa1a70cf5e50f620db4d1f87745af13e13a79414f88abf2792b0ce875a64c859741de4210b0872a8fd20c1bb8ad89332dce3fec9d821d84929520954fae0bf51716d5da8fc3862abb54c1896ce098bd6a6c78bff53fe9266e26d66d65654705d8cadb95bead7ea929cbe8a379da99f5aab7da04f0c02e2dbfdd23f7dac247a7a1414efa9f55e9e6ed81a5dbaaddd06f711bb89afd211ce243fadcadf6903d617667a459fa9ba432fd3e9b5b045737244aeda7d89ea36fe925bb82fb8742b6bc47eb',
                __typename: 'HorizontalCardListFeature',
                title: 'Videos',
                subtitle: null,
              },
              {
                id:
                  'HorizontalCardListFeature:f6b30a38eb547f1f75676ce0557a7e05bed66de665564bd0c5e37f069267679550e6d23b01e068694595ba074cd0d145c3508d6249fc0adc58f325fa1e4621df8ec5c49e43b6192a0482133116eddc3788c642745564b4c362224de4e55c8d67b4767f2da303b8d1cd256b236f8a25e67a78e90a15be3ae7627bdd66b62a0d17c083704aee6db05b87d7c49b3ad92cf519ee1055bd95a1e2a44aa3ea2f1d7c1b940069a43aced4398501bed9bfe3a469',
                __typename: 'HorizontalCardListFeature',
                title: null,
                subtitle: 'Something Else',
              },
            ],
            __typename: 'FeatureFeed',
          },
        },
      },
    };

    const tree = renderer.create(
      <Providers mocks={[feedmock, featuresmock]}>
        <Discover />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
