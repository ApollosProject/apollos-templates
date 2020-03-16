import React from 'react';
import { flatMap } from 'lodash';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import renderer from 'react-test-renderer';

import { GET_CONTENT_CARD } from '@apollosproject/ui-connected';
import Providers from '../../../Providers';
import { renderWithApolloData } from '../../../utils/testUtils';

import GET_SEARCH_RESULTS from './getSearchResults';
import SearchFeed from '.';

describe('The SearchFeed component', () => {
  it('should render', async () => {
    const mockFeedData = {
      request: {
        query: GET_SEARCH_RESULTS,
        variables: { searchText: 'Love' },
      },
      result: {
        data: {
          search: {
            edges: [
              {
                title: 'How to lead people to Jesus',
                summary:
                  'Love compels a mother to lose all dignity in public as she screams the name of her lost child.',
                coverImage: {
                  name: null,
                  sources: [
                    {
                      uri:
                        'https://res.cloudinary.com/apollos/image/fetch/c_limit,f_auto,w_1600/https://apollosrock.newspring.cc/GetImage.ashx%3Fguid%3Dd3a96243-2558-4c04-bf41-3aadcf41771f',
                      __typename: 'ImageMediaSource',
                    },
                  ],
                  __typename: 'ImageMedia',
                },
                cursor: 'b487224762b030f470967f45d7205823',
                node: {
                  id: 'DevotionalContentItem:561dfb7dbd8a5c093fd8385c7edaadbc',
                  title: 'How to lead people to Jesus',
                  hyphenatedTitle: '-',
                  isLiked: false,
                  likedCount: 0,
                  summary:
                    'Love compels a mother to lose all dignity in public as she screams the name of her lost child.',
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
                    id: 'ContentChannel:559b23fd0aa90e81b1c023e72e230fa1',
                    name: 'Devotional',
                    __typename: 'ContentChannel',
                  },
                  videos: [{ sources: [], __typename: 'VideoMedia' }],
                  audios: [],
                  __typename: 'DevotionalContentItem',
                },
                __typename: 'SearchResult',
              },
              {
                title: 'Live for Freedom Toolkit',
                summary:
                  "Get in the Groove\nCelebrate your freedom in Christ — in the car, shower, cubicle or wherever you go — with this playlist of NewSpring Worship's favorite songs of the summer.",
                coverImage: null,
                cursor: '4affc1122ad80d4edcf6c5bc9d88ae99',
                node: {
                  id: 'UniversalContentItem:95ff79f60a028b1b506aaeedf8b4c6ae',
                  title: 'Live for Freedom Toolkit',
                  hyphenatedTitle: '-',
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
                __typename: 'SearchResult',
              },
              {
                title: 'Should your 20-something live at home?',
                summary:
                  'Daughter: “Mom, can I bring some friends from college over for dinner Sunday?',
                coverImage: {
                  name: null,
                  sources: [
                    {
                      uri:
                        'https://res.cloudinary.com/apollos/image/fetch/c_limit,f_auto,w_1600/https://apollosrock.newspring.cc/GetImage.ashx%3Fguid%3Db08e4d69-0acf-40ff-920a-4517de086175',
                      __typename: 'ImageMediaSource',
                    },
                  ],
                  __typename: 'ImageMedia',
                },
                cursor: '659a26257a49fb2bf1446bb747bf7dd3',
                node: {
                  id: 'UniversalContentItem:895738f70482712adb3ab45a08c30456',
                  title: 'Should your 20-something live at home?',
                  hyphenatedTitle: '-',
                  isLiked: false,
                  likedCount: 0,
                  summary:
                    'Daughter: “Mom, can I bring some friends from college over for dinner Sunday?',
                  coverImage: {
                    name: 'Landscape Image',
                    sources: [
                      {
                        uri:
                          'https://res.cloudinary.com/apollos/image/fetch/c_limit,f_auto,w_1600/https://apollosrock.newspring.cc/GetImage.ashx%3Fguid%3Db08e4d69-0acf-40ff-920a-4517de086175',
                        __typename: 'ImageMediaSource',
                      },
                    ],
                    __typename: 'ImageMedia',
                  },
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
                __typename: 'SearchResult',
              },
              {
                title: 'Guys Night!',
                summary: 'A time to connect with other guys who live nearby.',
                coverImage: {
                  name: null,
                  sources: [
                    {
                      uri:
                        'https://res.cloudinary.com/apollos/image/fetch/c_limit,f_auto,w_1600/https://apollosrock.newspring.cc/GetImage.ashx%3Fguid%3D58c037fa-cc7f-4d72-9571-a0cc0558e346',
                      __typename: 'ImageMediaSource',
                    },
                  ],
                  __typename: 'ImageMedia',
                },
                cursor: 'c8d2fe738629909c33010432432f21c8',
                node: {
                  id: 'UniversalContentItem:296373ecb53580855cadffa0375ebe18',
                  title: 'Guys Night!',
                  hyphenatedTitle: '-',
                  isLiked: false,
                  likedCount: 0,
                  summary: 'A time to connect with other guys who live nearby.',
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
                __typename: 'SearchResult',
              },
              {
                title: '10 ways to refresh your spirit every day',
                summary:
                  '1. Be slow What would it look like to live your life at half-speed?',
                coverImage: null,
                cursor: 'ba47485fbc61945a38a4147fe7ff3703',
                node: {
                  id: 'UniversalContentItem:c495ff18cd998ed516a798b6218907cd',
                  title: '10 ways to refresh your spirit every day',
                  hyphenatedTitle: '-',
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
                __typename: 'SearchResult',
              },
              {
                title: 'Why leadership isn’t all about the title',
                summary:
                  'We all like to know that our boss or the authority over us is pleased, and it means even more when they take the time to share that in front of other people.',
                coverImage: {
                  name: null,
                  sources: [
                    {
                      uri:
                        'https://res.cloudinary.com/apollos/image/fetch/c_limit,f_auto,w_1600/https://apollosrock.newspring.cc/GetImage.ashx%3Fguid%3Dd3a96243-2558-4c04-bf41-3aadcf41771f',
                      __typename: 'ImageMediaSource',
                    },
                  ],
                  __typename: 'ImageMedia',
                },
                cursor: '9456eef87e314dcf19f013384a29fd22',
                node: {
                  id: 'DevotionalContentItem:4dd74ceca9e09b5276e93cbf53821bd6',
                  title: 'Why leadership isn’t all about the title',
                  hyphenatedTitle: '-',
                  isLiked: false,
                  likedCount: 0,
                  summary:
                    'We all like to know that our boss or the authority over us is pleased, and it means even more when they take the time to share that in front of other people.',
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
                    id: 'ContentChannel:559b23fd0aa90e81b1c023e72e230fa1',
                    name: 'Devotional',
                    __typename: 'ContentChannel',
                  },
                  videos: [{ sources: [], __typename: 'VideoMedia' }],
                  audios: [],
                  __typename: 'DevotionalContentItem',
                },
                __typename: 'SearchResult',
              },
            ],
            __typename: 'SearchResultsConnection',
          },
        },
      },
    };

    const mockSearchResultsCardData = flatMap(
      mockFeedData.result.data.search.edges,
      (node) => ({
        request: {
          query: GET_CONTENT_CARD,
          variables: { contentId: node.id },
        },
        result: {
          data: {
            node,
          },
        },
      })
    );

    const SearchStack = createStackNavigator({
      SearchFeed: (props) => <SearchFeed searchText={'Love'} {...props} />, // eslint-disable-line react/display-name
    });
    const SearchFeedWithNavigation = createAppContainer(SearchStack);
    const tree = await renderWithApolloData(
      <Providers mocks={[mockFeedData, ...mockSearchResultsCardData]}>
        <SearchFeedWithNavigation searchText={'Love'} />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render an empty state', async () => {
    const mockEmptyFeedData = {
      request: {
        query: GET_SEARCH_RESULTS,
        variables: { searchText: 'No results here' },
      },
      result: {
        data: {
          search: {
            edges: [],
            __typename: 'SearchResultsConnection',
          },
        },
      },
    };

    const mockEmptySearchResultsCardData = [
      {
        request: {
          query: GET_CONTENT_CARD,
          variables: { contentId: 'fake-id' },
        },
        result: {
          data: {},
        },
      },
    ];

    const SearchStack = createStackNavigator({
      // eslint-disable-next-line react/display-name
      SearchFeed: (props) => (
        <SearchFeed searchText={'No results here'} {...props} />
      ),
    });

    const SearchFeedWithNavigation = createAppContainer(SearchStack);
    const tree = await renderWithApolloData(
      <Providers
        mocks={[mockEmptyFeedData, ...mockEmptySearchResultsCardData]}
        cache={null}
      >
        <SearchFeedWithNavigation searchText={'No results here'} />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render a loading state', () => {
    const SearchStack = createStackNavigator({ SearchFeed });
    const SearchFeedWithNavigation = createAppContainer(SearchStack);
    const tree = renderer.create(
      <Providers cache={null}>
        <SearchFeedWithNavigation searchText={'Love'} />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
