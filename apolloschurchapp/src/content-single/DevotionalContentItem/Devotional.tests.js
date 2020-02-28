import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { GET_CONTENT_ITEM_CONTENT } from '@apollosproject/ui-connected';

import Providers from '../../Providers';
import { renderWithApolloData } from '../../utils/testUtils';
import GET_SCRIPTURE from './getScripture';
import Devotional from '.';

const contentScriptureMock = {
  request: {
    query: GET_SCRIPTURE,
    variables: { itemId: '1' },
  },
  result: {
    data: {
      node: {
        __typename: 'DevotionalContentItem',
        id: '1',
        scriptures: [
          {
            __typename: 'Scripture',
            id: '1CO.15.57',
            reference: '1 Corinthians 15:57',
            html:
              '<p class="p"><span data-number="57" class="v">57</span>But thanks be to God, who gives us the victory through our Lord Jesus Christ. </p>',
            copyright: 'PUBLIC DOMAIN',
            version: 'WEB',
          },
          {
            __typename: 'Scripture',
            id: 'EXO.17.8-EXO.17.15',
            reference: 'Exodus 17:8-15',
            html:
              '<p class="p"><span data-number="8" class="v">8</span>Then Amalek came and fought with Israel in Rephidim. <span data-number="9" class="v">9</span>Moses said to Joshua, “Choose men for us, and go out to fight with Amalek. Tomorrow I will stand on the top of the hill with God’s rod in my hand.” <span data-number="10" class="v">10</span>So Joshua did as Moses had told him, and fought with Amalek; and Moses, Aaron, and Hur went up to the top of the hill. <span data-number="11" class="v">11</span>When Moses held up his hand, Israel prevailed. When he let down his hand, Amalek prevailed. <span data-number="12" class="v">12</span>But Moses’ hands were heavy; so they took a stone, and put it under him, and he sat on it. Aaron and Hur held up his hands, the one on the one side, and the other on the other side. His hands were steady until sunset. <span data-number="13" class="v">13</span>Joshua defeated Amalek and his people with the edge of the sword. <span data-number="14" class="v">14</span>Yahweh said to Moses, “Write this for a memorial in a book, and rehearse it in the ears of Joshua: that I will utterly blot out the memory of Amalek from under the sky.” <span data-number="15" class="v">15</span>Moses built an altar, and called its name “Yahweh our Banner”.</p>',
            copyright: 'PUBLIC DOMAIN',
            version: 'WEB',
          },
        ],
      },
    },
  },
};

const contentHTMLMock = {
  request: {
    query: GET_CONTENT_ITEM_CONTENT,
    variables: { contentId: '1' },
  },
  result: {
    data: {
      node: {
        __typename: 'DevotionalContentItem',
        id: '1',
        htmlContent: '<b>Some content!</b>',
      },
    },
  },
};

const mocks = [contentScriptureMock, contentHTMLMock];

describe('the Devotional component', () => {
  it('renders a devotional', async () => {
    const DevotionalStack = createStackNavigator({
      Devotional: (props) => <Devotional id="1" content={{ title: 'Title' }} {...props} />, //eslint-disable-line
    });
    const DevotionalWithNavigation = createAppContainer(DevotionalStack);
    const tree = await renderWithApolloData(
      <Providers mocks={mocks}>
        <DevotionalWithNavigation />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
