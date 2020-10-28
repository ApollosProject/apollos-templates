import React from 'react';
import { GET_FEED_FEATURES } from '@apollosproject/ui-connected';
import Providers from '../../Providers';

import { renderWithApolloData } from '../../utils/testUtils';

import Home, { GET_HOME_FEED } from './Home';

describe('The Home tab component', () => {
  it('Should retrieve the home feed', async () => {
    const feedmock = {
      request: {
        query: GET_HOME_FEED,
      },
      result: {
        data: {
          homeFeedFeatures: {
            __typename: 'FeatureFeed',
            id:
              'FeatureFeed:c7035fd9677aa209cd4613df53e9c83a0fb3b9ecd853808383d135407161a17b98645698d03097766084632c51ea2eb271dbdadb1205a7012706cfd3d3a513fb',
          },
        },
      },
    };

    const featuresmock = {
      request: {
        query: GET_FEED_FEATURES,
        variables: {
          featureFeedId:
            'FeatureFeed:c7035fd9677aa209cd4613df53e9c83a0fb3b9ecd853808383d135407161a17b98645698d03097766084632c51ea2eb271dbdadb1205a7012706cfd3d3a513fb',
        },
      },
      result: {
        data: {
          node: {
            id:
              'FeatureFeed:c7035fd9677aa209cd4613df53e9c83a0fb3b9ecd853808383d135407161a17b98645698d03097766084632c51ea2eb271dbdadb1205a7012706cfd3d3a513fb',
            features: [
              {
                id:
                  'ActionBarFeature:714c190b8f4b43fdb55b3b46536614a3e0c52da8fb79fc7107b4650c05ea17cf212d4c240b3fe371c42295a4880ef412549934d22ac0de0257b66604ee79563890dda9a9e65fa1abaf1996244a50ca877f3b160178532670e8129dbe4bc35bee9797d5cfbc1cda427f2d9c529a8f87af2ada4b8d15e8210589ed61401a6a8623143ab1c4da33897112147bccfcff8fe63db9d7508153693ad6653f8c48ded5f81d9a51c8aa0ae6bbce410392a642ef69515d510466f85427186304b06581ec21',
                __typename: 'ActionBarFeature',
              },
              {
                id:
                  'HeroListFeature:9724110384a5109532f35a4980ea9b77927f27b594c842d177352e01e8226a2ecb77e08907545af4ce3b670ab3b320b04ee7344a0e89841eecb4c72c7e16bf2eeca137a34503b8395200498bdfa8e4bb2b11c289d1fde435c2cea2d20e2a81052e3af61392aa3459c28615595385ce4dea942e2d1a89ae068763211d22f5d20179c6a4014868e08985cf718ceb9974b00bbf00856976698197048b78a305b059782d36aeb699786af913fe18579349850a5869b63daf5d533d11bbfd0688e11ccb31aefa8b85d49f83a8557529eec41f65a14990ae5bf67ee14af453fbe5b8a7',
                __typename: 'HeroListFeature',
                title: null,
                subtitle: null,
              },
              {
                id:
                  'PrayerListFeature:9724110384a5109532f35a4980ea9b77f2d199f4cb456bb8c8ea55a925cec739815c742a0c3ce42c726d35af507ce66e9ecc4a362a0aceddfce3679112dd4319b532da8bfe1c432cc83006af579a44bb242b25ae969c21accaeda8f473cfaa3317d1ffaaf6aee0fb510676947d27a629c975b730fa3e98b9866a922d84040a87',
                __typename: 'PrayerListFeature',
                title: 'Daily Prayer',
                subtitle: null,
                isCard: false,
              },
              {
                id:
                  'HeroListFeature:9724110384a5109532f35a4980ea9b77f95c2a2b8a0943252964d15273d8a517e825df2914229ff0aeb2a3382669facb66498e017643f8c47200391e858876b31322f1ee6e8cb2c368b8032e2cbcf11247b57ce6ea4bddecd530ea533b5f2b5ed36679caa2d95faadf91d97cd9cd8e2b7cd7cdeb0bb83b91ab73f186d50c119f',
                __typename: 'HeroListFeature',
                title: null,
                subtitle: null,
              },
              {
                id:
                  'ActionListFeature:9724110384a5109532f35a4980ea9b77b7a918389784452bc4e113adf105f3ea127f90f017f69aaf559572dcd95650eee53524e81615ffc32c33db72a2f5c60dea0a0ee24fb5c2e58fd4f7fdce093a379fbff37611ab309b2d2653ed759cb0783eb02fe34123322890197bce3345eb4d3653b044ee4a6e3c059e0c47f90c114d288746b77a7aa2cdda584c1a73924cdc20ba9c623ccd69bd8d4b843630aa4719a6aa413b45d779fda7116524d8352c69',
                __typename: 'ActionListFeature',
                title: 'FOR YOU',
                subtitle: 'Explore what God calls you to today',
              },
              {
                id:
                  'HorizontalCardListFeature:9724110384a5109532f35a4980ea9b7732b56327ff3959d32d21ba892a0dc560f72e28cbcd7e0d725a3fde7b581d3bd5e733947326608e07e7c351013f37d85166363e4913aa731a0ffa5bb526b30054be8e005758886944831b63e3698779c9ed86f069abff52869ac361fa18cc9c79',
                __typename: 'HorizontalCardListFeature',
                title: null,
                subtitle: 'Continue',
              },
              {
                id:
                  'VerticalCardListFeature:9724110384a5109532f35a4980ea9b77b7a918389784452bc4e113adf105f3eae04c6b4da7faf0d66fbb2742f9d0a0746e22a4e183b74aeee74f19b79a5814f16a1395019d555f4ec510063dcbefceedab4b25ddafcb95208ea69c0d2d4a28cde16c99588093f2f62ed157d5f2038e536124cd2f200bd264466ef9a5fc5b9e0effb76a80c374ee018b280063f4660f595ce1ed712308a2fa0be9d64cdeedee01',
                __typename: 'VerticalCardListFeature',
                isFeatured: false,
                title: 'RECOMMENDED',
                subtitle: 'For Him',
              },
              {
                id:
                  'ActionListFeature:f6b30a38eb547f1f75676ce0557a7e05bed66de665564bd0c5e37f069267679550e6d23b01e068694595ba074cd0d145c3508d6249fc0adc58f325fa1e4621df1b190ecb40d4a0ea5cfaaef8c8b8b528b97371f9a0cbb35081d96c0060dfb613d4ebde79bb4ebfb9a2eb19409883b76d69d8190f41f9ae0f614d15f2da5d3aae5ad1cc92747d00060ac3b780ece047b9e45a7b707915d737a4bc478269c1c82fa1f2b6248a0018c89864b3f2de4d9805b48e0c7289b771feb51d97bf9c1ebb2cf556bbff1053b5c3589c4bfabac22c74109756c596b4aec71feb2c9d1999c72e',
                __typename: 'ActionListFeature',
                title: 'BULLETIN',
                subtitle: "What's happening at apollos?",
              },
            ],
            __typename: 'FeatureFeed',
          },
        },
      },
    };

    const tree = await renderWithApolloData(
      <Providers mocks={[feedmock, featuresmock]}>
        <Home />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
