import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import { ErrorCard, ThemeMixin } from '@apollosproject/ui-kit';

import { TrackEventWhenLoaded } from '@apollosproject/ui-analytics';

import NavigationHeader from '../ui/NavigationHeader';
import Event from './Event';
import GET_EVENT from './getEvent';

class EventConnected extends PureComponent {
  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      push: PropTypes.func,
    }),
  };

  get eventId() {
    return this.props.navigation.getParam('eventId', []);
  }

  get queryVariables() {
    return { eventId: this.eventId };
  }

  static navigationOptions = {
    header: NavigationHeader,
    headerTransparent: true,
    headerMode: 'float',
  };

  renderWithData = ({ loading, error, data }) => {
    if (error) return <ErrorCard error={error} />;

    const event = data.node || {};

    const { theme = {} } = event;

    return (
      <ThemeMixin
        mixin={{
          type: get(theme, 'type', 'light').toLowerCase(),
          colors: get(theme, 'colors'),
        }}
      >
        <TrackEventWhenLoaded
          loaded={!!(!loading && event.name)}
          eventName={'View Event'}
          properties={{
            title: event.name,
            eventId: this.eventId,
          }}
        />
        <Event
          id={this.eventId}
          event={event}
          loading={loading}
          error={error}
        />
      </ThemeMixin>
    );
  };

  render() {
    return (
      <Query
        query={GET_EVENT}
        fetchPolicy="network-only"
        variables={this.queryVariables}
      >
        {this.renderWithData}
      </Query>
    );
  }
}

export default EventConnected;
