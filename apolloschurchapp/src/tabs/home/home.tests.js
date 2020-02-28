import React from 'react';
import renderer from 'react-test-renderer';

import Providers from '../../Providers';

import Home from './Home';
import GET_USER_FEED from './getUserFeed';

describe('User Home Feed Query', () => {
  it('should return correct query results', () => {
    const mock = {
      request: {
        query: GET_USER_FEED,
      },
      result: {
        data: {
          userFeed: {
            edges: [
              {
                node: {
                  __typename: 'UniversalContentItem',
                  id: 'UniversalContentItem:678b4a38968fc6004dd8b23e586c923e',
                  coverImage: {
                    name: 'Square Image',
                    sources: [
                      {
                        uri:
                          'https://apollosrock.newspring.cc/GetImage.ashx?guid=ed857076-2623-4fdc-8476-50b3a60e0b68',
                      },
                    ],
                  },
                  parentChannel: {
                    id: 'ContentChannel:7fba1b1ee253e0fd5f0795b4b8b1175e',
                    name: 'Devotion Series',
                    iconName: 'text',
                  },
                  title: 'Psalms: A 28-Day Devotional',
                },
              },
              {
                node: {
                  __typename: 'UniversalContentItem',
                  id: 'UniversalContentItem:0f361c619b7e5dd511da181069498250',
                  coverImage: {
                    name: 'Square Image',
                    sources: [
                      {
                        uri:
                          'https://apollosrock.newspring.cc/GetImage.ashx?guid=aa68b674-9cf4-4f8a-8702-9564a4a9fa7b',
                      },
                    ],
                  },
                  parentChannel: {
                    id: 'ContentChannel:7fba1b1ee253e0fd5f0795b4b8b1175e',
                    name: 'Devotion Series',
                    iconName: 'text',
                  },
                  title: '2 Samuel: A 5-Week Devotional',
                },
              },
            ],
          },
        },
      },
    };

    const navigation = {
      getParam: jest.fn(),
      setParams: jest.fn(),
      navigate: jest.fn(),
    };
    const tree = renderer.create(
      <Providers mocks={[mock]} addTypename={false}>
        <Home navigation={navigation} />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
