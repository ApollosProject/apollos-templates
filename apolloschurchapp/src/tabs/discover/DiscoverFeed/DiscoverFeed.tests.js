import React from 'react';
import { flatMap } from 'lodash';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import renderer from 'react-test-renderer';

import { GET_CONTENT_CARD } from '@apollosproject/ui-connected';
import Providers from '../../../Providers';
import { renderWithApolloData } from '../../../utils/testUtils';

import GET_CONTENT_CHANNELS from './getContentChannels';
import DiscoverFeed from '.';

describe('The DiscoverFeed component', () => {
  it('should render', async () => {
    const mockFeedData = {
      request: {
        query: GET_CONTENT_CHANNELS,
      },
      result: {
        data: {
          contentChannels: [
            {
              id: 'ContentChannel:965b6e6d7046a885bea4e300b5c0400d',
              name: 'News',
              childContentItemsConnection: {
                edges: [
                  {
                    node: {
                      id:
                        'UniversalContentItem:00bb7b364911281c97fc50f2a0d17b11',
                      title: 'Anderson Family Cookout!',
                      hyphenatedTitle: 'Anderson Family Cookout!',
                      isLiked: false,
                      likedCount: 0,
                      summary: 'Come join us!',
                      coverImage: {
                        name: 'Landscape Image',
                        sources: [
                          {
                            uri:
                              'https://res.cloudinary.com/apollos/image/fetch/c_limit,f_auto,w_1600/https://apollosrock.newspring.cc/GetImage.ashx%3Fguid%3D62e0e2ba-2dac-468b-a852-7e8cf2533efc',
                            __typename: 'ImageMediaSource',
                          },
                        ],
                        __typename: 'ImageMedia',
                      },
                      theme: null,
                      parentChannel: {
                        id: 'ContentChannel:965b6e6d7046a885bea4e300b5c0400d',
                        name: 'News',
                        __typename: 'ContentChannel',
                      },
                      videos: [],
                      audios: [],
                      __typename: 'UniversalContentItem',
                    },
                    __typename: 'ContentItemsConnectionEdge',
                  },
                  {
                    node: {
                      id:
                        'UniversalContentItem:7db601b238aa4345a818654300f83dd2',
                      title: 'Robert Madu is Coming to Christ Fellowship',
                      hyphenatedTitle:
                        'Robert Madu is Coming to Christ Fellowship',
                      isLiked: false,
                      likedCount: 5,
                      summary:
                        "Don't miss a powerful message from preacher and speaker, Robert Madu.",
                      coverImage: {
                        name: 'Square Image',
                        sources: [
                          {
                            uri:
                              'https://res.cloudinary.com/apollos/image/fetch/c_limit,f_auto,w_1600/https://apollosrock.newspring.cc/GetImage.ashx%3Fguid%3Df3ba0936-8aab-46c1-8245-0e5aef637ae3',
                            __typename: 'ImageMediaSource',
                          },
                        ],
                        __typename: 'ImageMedia',
                      },
                      theme: null,
                      parentChannel: {
                        id: 'ContentChannel:965b6e6d7046a885bea4e300b5c0400d',
                        name: 'News',
                        __typename: 'ContentChannel',
                      },
                      videos: [],
                      audios: [],
                      __typename: 'UniversalContentItem',
                    },
                    __typename: 'ContentItemsConnectionEdge',
                  },
                  {
                    node: {
                      id:
                        'UniversalContentItem:296373ecb53580855cadffa0375ebe18',
                      title: 'Guys Night!',
                      hyphenatedTitle: 'Guys Night!',
                      isLiked: false,
                      likedCount: 0,
                      summary:
                        'A time to connect with other guys who live nearby.',
                      coverImage: {
                        name: 'Square Image',
                        sources: [
                          {
                            uri:
                              'https://res.cloudinary.com/apollos/image/fetch/c_limit,f_auto,w_1600/https://apollosrock.newspring.cc/GetImage.ashx%3Fguid%3D58c037fa-cc7f-4d72-9571-a0cc0558e346',
                            __typename: 'ImageMediaSource',
                          },
                        ],
                        __typename: 'ImageMedia',
                      },
                      theme: null,
                      parentChannel: {
                        id: 'ContentChannel:965b6e6d7046a885bea4e300b5c0400d',
                        name: 'News',
                        __typename: 'ContentChannel',
                      },
                      videos: [],
                      audios: [],
                      __typename: 'UniversalContentItem',
                    },
                    __typename: 'ContentItemsConnectionEdge',
                  },
                ],
                __typename: 'ContentItemsConnection',
              },
              __typename: 'ContentChannel',
            },
            {
              id: 'ContentChannel:4f68015ba18662a7409d1219a4ce013e',
              name: 'Articles',
              childContentItemsConnection: {
                edges: [
                  {
                    node: {
                      id:
                        'UniversalContentItem:604a4a763a5fc0edfe386684ca6b3515',
                      title: 'Test Article',
                      hyphenatedTitle: 'Test Article',
                      isLiked: false,
                      likedCount: 0,
                      summary: 'Test article...',
                      coverImage: null,
                      theme: null,
                      parentChannel: {
                        id: 'ContentChannel:4f68015ba18662a7409d1219a4ce013e',
                        name: 'Articles',
                        __typename: 'ContentChannel',
                      },
                      videos: [],
                      audios: [],
                      __typename: 'UniversalContentItem',
                    },
                    __typename: 'ContentItemsConnectionEdge',
                  },
                  {
                    node: {
                      id:
                        'UniversalContentItem:c495ff18cd998ed516a798b6218907cd',
                      title: '10 ways to refresh your spirit every day',
                      hyphenatedTitle:
                        '10 ways to refresh your spirit every day',
                      isLiked: false,
                      likedCount: 2,
                      summary:
                        '1. Be slow What would it look like to live your life at half-speed?',
                      coverImage: null,
                      theme: null,
                      parentChannel: {
                        id: 'ContentChannel:4f68015ba18662a7409d1219a4ce013e',
                        name: 'Articles',
                        __typename: 'ContentChannel',
                      },
                      videos: [],
                      audios: [],
                      __typename: 'UniversalContentItem',
                    },
                    __typename: 'ContentItemsConnectionEdge',
                  },
                  {
                    node: {
                      id:
                        'UniversalContentItem:95ff79f60a028b1b506aaeedf8b4c6ae',
                      title: 'Live for Freedom Toolkit',
                      hyphenatedTitle: 'Live for Freedom Toolkit',
                      isLiked: false,
                      likedCount: 1,
                      summary:
                        "Get in the Groove\nCelebrate your freedom in Christ — in the car, shower, cubicle or wherever you go — with this playlist of NewSpring Worship's favorite songs of the summer.",
                      coverImage: null,
                      theme: null,
                      parentChannel: {
                        id: 'ContentChannel:4f68015ba18662a7409d1219a4ce013e',
                        name: 'Articles',
                        __typename: 'ContentChannel',
                      },
                      videos: [],
                      audios: [],
                      __typename: 'UniversalContentItem',
                    },
                    __typename: 'ContentItemsConnectionEdge',
                  },
                ],
                __typename: 'ContentItemsConnection',
              },
              __typename: 'ContentChannel',
            },
            {
              id: 'ContentChannel:a0f64573eabf00a607bec911794d50fb',
              name: 'Sermon Series',
              childContentItemsConnection: {
                edges: [
                  {
                    node: {
                      id:
                        'ContentSeriesContentItem:6d8dc8e4bad017f815ae0cac8bf692bb',
                      title: 'The New Weekend Experience',
                      hyphenatedTitle: 'The New Weekend Experience',
                      isLiked: false,
                      likedCount: 1,
                      summary:
                        'Have you come into relationship with Jesus Christ?',
                      coverImage: {
                        name: 'Series Image',
                        sources: [
                          {
                            uri:
                              'https://res.cloudinary.com/apollos/image/fetch/c_limit,f_auto,w_1600/https://apollosrock.newspring.cc/GetImage.ashx%3Fguid%3D98be229f-dfed-4344-86ab-0d11666fc781',
                            __typename: 'ImageMediaSource',
                          },
                        ],
                        __typename: 'ImageMedia',
                      },
                      theme: null,
                      parentChannel: {
                        id: 'ContentChannel:a0f64573eabf00a607bec911794d50fb',
                        name: 'Sermon Series',
                        __typename: 'ContentChannel',
                      },
                      videos: [
                        { sources: [], __typename: 'VideoMedia' },
                        { sources: [], __typename: 'VideoMedia' },
                      ],
                      audios: [],
                      __typename: 'ContentSeriesContentItem',
                    },
                    __typename: 'ContentItemsConnectionEdge',
                  },
                  {
                    node: {
                      id:
                        'ContentSeriesContentItem:08449058d438ebeaffe9adb7a8e633cc',
                      title: 'Gathering',
                      hyphenatedTitle: 'Gathering',
                      isLiked: false,
                      likedCount: 0,
                      summary: '',
                      coverImage: {
                        name: 'Square Image',
                        sources: [
                          {
                            uri:
                              'https://res.cloudinary.com/apollos/image/fetch/c_limit,f_auto,w_1600/https://apollosrock.newspring.cc/GetImage.ashx%3Fguid%3D50f4e3e3-2842-4991-9f64-8fc6fbb3067c',
                            __typename: 'ImageMediaSource',
                          },
                        ],
                        __typename: 'ImageMedia',
                      },
                      theme: null,
                      parentChannel: {
                        id: 'ContentChannel:a0f64573eabf00a607bec911794d50fb',
                        name: 'Sermon Series',
                        __typename: 'ContentChannel',
                      },
                      videos: [
                        { sources: [], __typename: 'VideoMedia' },
                        { sources: [], __typename: 'VideoMedia' },
                      ],
                      audios: [],
                      __typename: 'ContentSeriesContentItem',
                    },
                    __typename: 'ContentItemsConnectionEdge',
                  },
                  {
                    node: {
                      id:
                        'ContentSeriesContentItem:b74c2d295a0cf1340232ffa8be856c00',
                      title: 'Gauntlet 2018',
                      hyphenatedTitle: 'Gauntlet 2018',
                      isLiked: false,
                      likedCount: 0,
                      summary: '',
                      coverImage: {
                        name: 'Square Image',
                        sources: [
                          {
                            uri:
                              'https://res.cloudinary.com/apollos/image/fetch/c_limit,f_auto,w_1600/https://apollosrock.newspring.cc/GetImage.ashx%3Fguid%3D3e3e38d2-d804-45db-b45a-3b7a82c415d1',
                            __typename: 'ImageMediaSource',
                          },
                        ],
                        __typename: 'ImageMedia',
                      },
                      theme: null,
                      parentChannel: {
                        id: 'ContentChannel:a0f64573eabf00a607bec911794d50fb',
                        name: 'Sermon Series',
                        __typename: 'ContentChannel',
                      },
                      videos: [
                        { sources: [], __typename: 'VideoMedia' },
                        { sources: [], __typename: 'VideoMedia' },
                      ],
                      audios: [],
                      __typename: 'ContentSeriesContentItem',
                    },
                    __typename: 'ContentItemsConnectionEdge',
                  },
                ],
                __typename: 'ContentItemsConnection',
              },
              __typename: 'ContentChannel',
            },
            {
              id: 'ContentChannel:7fba1b1ee253e0fd5f0795b4b8b1175e',
              name: 'Devotion Series',
              childContentItemsConnection: {
                edges: [
                  {
                    node: {
                      id:
                        'ContentSeriesContentItem:b085ec27d53006e9e6b95f3ac57da581',
                      title: 'Jeremiah: A 33-Day Devotional',
                      hyphenatedTitle: 'Jeremiah: A 33-Day Devotional',
                      isLiked: true,
                      likedCount: 6,
                      summary: 'Have you ever had to deliver difficult news?',
                      coverImage: {
                        name: 'Square Image',
                        sources: [
                          {
                            uri:
                              'https://res.cloudinary.com/apollos/image/fetch/c_limit,f_auto,w_1600/https://apollosrock.newspring.cc/GetImage.ashx%3Fguid%3D31af1a61-360c-4b1e-8e62-45517c06a9a2',
                            __typename: 'ImageMediaSource',
                          },
                        ],
                        __typename: 'ImageMedia',
                      },
                      theme: null,
                      parentChannel: {
                        id: 'ContentChannel:7fba1b1ee253e0fd5f0795b4b8b1175e',
                        name: 'Devotion Series',
                        __typename: 'ContentChannel',
                      },
                      videos: [{ sources: [], __typename: 'VideoMedia' }],
                      audios: [],
                      __typename: 'ContentSeriesContentItem',
                    },
                    __typename: 'ContentItemsConnectionEdge',
                  },
                  {
                    node: {
                      id:
                        'ContentSeriesContentItem:71bfdac0b98ea1b72a63ff4ea64e3c5a',
                      title: 'How To Be A Better Leader: A 7-Day Devotional',
                      hyphenatedTitle:
                        'How To Be A Better Leader: A 7-Day Devotional',
                      isLiked: false,
                      likedCount: 0,
                      summary: '',
                      coverImage: {
                        name: 'Square Image',
                        sources: [
                          {
                            uri:
                              'https://res.cloudinary.com/apollos/image/fetch/c_limit,f_auto,w_1600/https://apollosrock.newspring.cc/GetImage.ashx%3Fguid%3Dd3a96243-2558-4c04-bf41-3aadcf41771f',
                            __typename: 'ImageMediaSource',
                          },
                        ],
                        __typename: 'ImageMedia',
                      },
                      theme: null,
                      parentChannel: {
                        id: 'ContentChannel:7fba1b1ee253e0fd5f0795b4b8b1175e',
                        name: 'Devotion Series',
                        __typename: 'ContentChannel',
                      },
                      videos: [{ sources: [], __typename: 'VideoMedia' }],
                      audios: [],
                      __typename: 'ContentSeriesContentItem',
                    },
                    __typename: 'ContentItemsConnectionEdge',
                  },
                  {
                    node: {
                      id:
                        'ContentSeriesContentItem:44fd3b82373ea8f197bd1e1e77c4bed0',
                      title: '2 Thessalonians: A 5-Day Devotional',
                      hyphenatedTitle: '2 Thessalonians: A 5-Day Devotional',
                      isLiked: false,
                      likedCount: 0,
                      summary: '',
                      coverImage: {
                        name: 'Square Image',
                        sources: [
                          {
                            uri:
                              'https://res.cloudinary.com/apollos/image/fetch/c_limit,f_auto,w_1600/https://apollosrock.newspring.cc/GetImage.ashx%3Fguid%3D70b0b57c-5a15-4f46-8e6a-c759231685bf',
                            __typename: 'ImageMediaSource',
                          },
                        ],
                        __typename: 'ImageMedia',
                      },
                      theme: null,
                      parentChannel: {
                        id: 'ContentChannel:7fba1b1ee253e0fd5f0795b4b8b1175e',
                        name: 'Devotion Series',
                        __typename: 'ContentChannel',
                      },
                      videos: [{ sources: [], __typename: 'VideoMedia' }],
                      audios: [],
                      __typename: 'ContentSeriesContentItem',
                    },
                    __typename: 'ContentItemsConnectionEdge',
                  },
                ],
                __typename: 'ContentItemsConnection',
              },
              __typename: 'ContentChannel',
            },
            {
              id: 'ContentChannel:be7381e9c2fea9f41504cd98d4b14321',
              name: 'Stories',
              childContentItemsConnection: {
                edges: [
                  {
                    node: {
                      id:
                        'UniversalContentItem:cf8fa657f23af88a2d63f7e4a2237db8',
                      title:
                        'The surprising journey that changed me and my dad',
                      hyphenatedTitle:
                        'The surprising journey that changed me and my dad',
                      isLiked: false,
                      likedCount: 6,
                      summary:
                        'My father, Darwin, has always been involved in my life.',
                      coverImage: {
                        name: 'Square Image',
                        sources: [
                          {
                            uri:
                              'https://res.cloudinary.com/apollos/image/fetch/c_limit,f_auto,w_1600/https://apollosrock.newspring.cc/GetImage.ashx%3Fguid%3D2a65e561-cd6e-4590-bb37-029a21c554e8',
                            __typename: 'ImageMediaSource',
                          },
                        ],
                        __typename: 'ImageMedia',
                      },
                      theme: null,
                      parentChannel: {
                        id: 'ContentChannel:be7381e9c2fea9f41504cd98d4b14321',
                        name: 'Stories',
                        __typename: 'ContentChannel',
                      },
                      videos: [],
                      audios: [],
                      __typename: 'UniversalContentItem',
                    },
                    __typename: 'ContentItemsConnectionEdge',
                  },
                  {
                    node: {
                      id:
                        'UniversalContentItem:2e17f5a66407d114ab9f2392b03ebccd',
                      title: 'When I lost hope, my church family had my back',
                      hyphenatedTitle:
                        'When I lost hope, my church family had my back',
                      isLiked: true,
                      likedCount: 5,
                      summary:
                        'Brian Kalwat was just trying to knock something off his honey-do list.',
                      coverImage: {
                        name: 'Square Image',
                        sources: [
                          {
                            uri:
                              'https://res.cloudinary.com/apollos/image/fetch/c_limit,f_auto,w_1600/https://apollosrock.newspring.cc/GetImage.ashx%3Fguid%3D0305285f-1155-4405-ba38-a61b9c8558be',
                            __typename: 'ImageMediaSource',
                          },
                        ],
                        __typename: 'ImageMedia',
                      },
                      theme: null,
                      parentChannel: {
                        id: 'ContentChannel:be7381e9c2fea9f41504cd98d4b14321',
                        name: 'Stories',
                        __typename: 'ContentChannel',
                      },
                      videos: [],
                      audios: [],
                      __typename: 'UniversalContentItem',
                    },
                    __typename: 'ContentItemsConnectionEdge',
                  },
                  {
                    node: {
                      id:
                        'UniversalContentItem:ae8ec75906ba7437c49ad2534b5024db',
                      title: 'A Place to Worship Free of Fear',
                      hyphenatedTitle: 'A Place to Worship Free of Fear',
                      isLiked: false,
                      likedCount: 1,
                      summary:
                        'Cornelius &amp; Stephanie Mack, proud parents of a Special Friends adult, share about their experience\nOur son Cameron began attending Willow Creek Special Friends in 2015.',
                      coverImage: {
                        name: 'Portrait Image',
                        sources: [
                          {
                            uri:
                              'https://res.cloudinary.com/apollos/image/fetch/c_limit,f_auto,w_1600/https://apollosrock.newspring.cc/GetImage.ashx%3Fguid%3Da65bc45d-f961-4b7e-a899-63eb1f9b8da9',
                            __typename: 'ImageMediaSource',
                          },
                        ],
                        __typename: 'ImageMedia',
                      },
                      theme: null,
                      parentChannel: {
                        id: 'ContentChannel:be7381e9c2fea9f41504cd98d4b14321',
                        name: 'Stories',
                        __typename: 'ContentChannel',
                      },
                      videos: [],
                      audios: [],
                      __typename: 'UniversalContentItem',
                    },
                    __typename: 'ContentItemsConnectionEdge',
                  },
                ],
                __typename: 'ContentItemsConnection',
              },
              __typename: 'ContentChannel',
            },
          ],
        },
      },
    };
    const mockChannelCardData = flatMap(
      mockFeedData.result.data.contentChannels,
      (contentChannel) =>
        contentChannel.childContentItemsConnection.edges.map((edge) => ({
          request: {
            query: GET_CONTENT_CARD,
            variables: { contentId: edge.node.id },
          },
          result: {
            data: {
              node: edge.node,
            },
          },
        }))
    );

    const DiscoverStack = createStackNavigator({ DiscoverFeed });
    const DiscoverFeedWithNavigation = createAppContainer(DiscoverStack);
    const tree = await renderWithApolloData(
      <Providers mocks={[mockFeedData, ...mockChannelCardData]}>
        <DiscoverFeedWithNavigation />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render a loading state', () => {
    const DiscoverStack = createStackNavigator({ DiscoverFeed });
    const DiscoverFeedWithNavigation = createAppContainer(DiscoverStack);
    const tree = renderer.create(
      <Providers cache={null}>
        <DiscoverFeedWithNavigation />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
