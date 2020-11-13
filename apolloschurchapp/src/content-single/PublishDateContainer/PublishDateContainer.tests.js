import React from 'react';
import renderer from 'react-test-renderer';
import moment from 'moment';

import Providers from '../Providers';

import PublishDateContainer from './PublishDateContainer';

describe('publish date container', () => {
  it('should render', () => {
        const tree = renderer.create(
          <Providers>
            <PublishDateContainer 
              contentId={'fakeid'}
              publishDate={moment('2019-09-26T15:10:51.200Z')
                .utc()
                .toJSON()}
            />
          </Providers>
        );
        expect(tree).toMatchSnapshot();
  });
});

