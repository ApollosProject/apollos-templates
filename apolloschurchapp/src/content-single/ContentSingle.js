import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import { ErrorCard, ThemeMixin } from '@apollosproject/ui-kit';

import { TrackEventWhenLoaded } from '@apollosproject/ui-analytics';
import { InteractWhenLoadedConnected } from '@apollosproject/ui-connected';

import NavigationHeader from '../ui/NavigationHeader';
import ActionContainer from './ActionContainer';
import GET_CONTENT_ITEM from './getContentItem';

import DevotionalContentItem from './DevotionalContentItem';
import UniversalContentItem from './UniversalContentItem';
import WeekendContentItem from './WeekendContentItem';

class ContentSingle extends PureComponent {
  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      push: PropTypes.func,
    }),
  };

  get itemId() {
    return this.props.navigation.getParam('itemId', []);
  }

  get queryVariables() {
    return { itemId: this.itemId };
  }

  static navigationOptions = {
    header: NavigationHeader,
    headerTransparent: true,
    headerMode: 'float',
  };

  renderContent = ({ content, loading, error }) => {
    let { __typename } = content;
    if (!__typename && this.itemId) {
      [__typename] = this.itemId.split(':');
    }

    switch (__typename) {
      case 'DevotionalContentItem':
        return (
          <DevotionalContentItem
            id={this.itemId}
            content={content}
            loading={loading}
            error={error}
          />
        );
      case 'WeekendContentItem':
        return (
          <WeekendContentItem
            id={this.itemId}
            content={content}
            loading={loading}
            error={error}
          />
        );
      case 'UniversalContentItem':
      default:
        return (
          <UniversalContentItem
            id={this.itemId}
            content={content}
            loading={loading}
            error={error}
          />
        );
    }
  };

  renderWithData = ({ loading, error, data }) => {
    if (error) return <ErrorCard error={error} />;

    const content = data.node || {};

    const { theme = {}, id } = content;

    return (
      <ThemeMixin
        mixin={{
          type: get(theme, 'type'),
          colors: get(theme, 'colors'),
        }}
      >
        <InteractWhenLoadedConnected
          isLoading={loading}
          nodeId={this.itemId}
          action={'COMPLETE'}
        />
        <TrackEventWhenLoaded
          isLoading={loading}
          eventName={'View Content'}
          properties={{
            title: content.title,
            itemId: this.itemId,
          }}
        />
        {this.renderContent({ content, loading, error })}
        <ActionContainer itemId={id} />
      </ThemeMixin>
    );
  };

  render() {
    return (
      <Query query={GET_CONTENT_ITEM} variables={this.queryVariables}>
        {this.renderWithData}
      </Query>
    );
  }
}

export default ContentSingle;
