import React, { PureComponent } from 'react';
import { Query } from '@apollo/client/react/components';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import { ErrorCard, ThemeMixin } from '@apollosproject/ui-kit';

import { TrackEventWhenLoaded } from '@apollosproject/ui-analytics';

import Event from './Event';
import GET_EVENT from './getEvent';

class EventConnected extends PureComponent {
  static propTypes = {
    navigation: PropTypes.shape({
      push: PropTypes.func,
    }),
    route: PropTypes.shape({
      params: PropTypes.shape({
        eventId: PropTypes.string,
      }),
    }),
  };

  get eventId() {
    return this.props.route.params.eventId;
  }

  get queryVariables() {
    return { eventId: this.eventId };
  }

  renderWithData = ({ loading, error, data }) => {
    if (error) return <ErrorCard error={error} />;

    const event = data?.node || {};

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
