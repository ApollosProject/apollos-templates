import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import moment from 'moment';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import {
  GradientOverlayImage,
  BackgroundView,
  PaddedView,
  H2,
  Paragraph,
  StretchyView,
} from '@apollosproject/ui-kit';
import HTMLView from '@apollosproject/ui-htmlview';

import { FlexedScrollView, EventInfoItem } from './components';

const handlePressAnchor = (url) => {
  InAppBrowser.open(url);
};

const Event = ({ event, loading }) => {
  const coverImageSources = get(event, 'image.sources', []);
  return (
    <BackgroundView>
      <StretchyView>
        {({ Stretchy, ...scrollViewProps }) => (
          <FlexedScrollView {...scrollViewProps}>
            {coverImageSources.length || loading ? (
              <Stretchy>
                <GradientOverlayImage
                  isLoading={!coverImageSources.length && loading}
                  source={coverImageSources}
                />
              </Stretchy>
            ) : null}
            <PaddedView vertical={false}>
              <H2 padded isLoading={!event.name && loading}>
                {event.name}
              </H2>
              <Paragraph>
                <EventInfoItem
                  icon={'time'}
                  title={moment(event.start).format('ddd, MMMM Do, YYYY')}
                  subtitle={`${moment(event.start).format('LT')} — ${moment(
                    event.end
                  ).format('LT')}`}
                />
                <EventInfoItem icon={'pin'} title={event.location} />
              </Paragraph>
              <HTMLView isLoading={loading} onPressAnchor={handlePressAnchor}>
                {event.description}
              </HTMLView>
            </PaddedView>
          </FlexedScrollView>
        )}
      </StretchyView>
    </BackgroundView>
  );
};

Event.propTypes = {
  event: PropTypes.shape({
    __typename: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    start: PropTypes.string,
    end: PropTypes.string,
    location: PropTypes.string,
  }),
  loading: PropTypes.bool,
};

export default Event;
