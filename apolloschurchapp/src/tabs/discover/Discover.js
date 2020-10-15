import React, { PureComponent } from 'react';

import SafeAreaView from 'react-native-safe-area-view';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import { BackgroundView } from '@apollosproject/ui-kit';
import {
  FeaturesFeedConnected,
  FEATURE_FEED_ACTION_MAP,
  RockAuthedWebBrowser,
} from '@apollosproject/ui-connected';

function handleOnPress({ action, ...props }) {
  if (FEATURE_FEED_ACTION_MAP[action]) {
    FEATURE_FEED_ACTION_MAP[action]({ action, ...props });
  }
  // If you add additional actions, you can handle them here.
  // Or add them to the FEATURE_FEED_ACTION_MAP, with the syntax
  // { [ActionName]: function({ relatedNode, action, ...FeatureFeedConnectedProps}) }
}

// getHomeFeed uses the HOME_FEATURES in the config.yml
// You can also hardcode an ID if you are confident it will never change
// Or use some other strategy to get a FeatureFeed.id
export const GET_DISCOVER_FEED = gql`
  query getDiscoverFeatureFeed {
    discoverFeedFeatures {
      id
    }
  }
`;

class Discover extends PureComponent {
  static navigationOptions = () => ({
    header: null,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      setParams: PropTypes.func,
      navigate: PropTypes.func,
    }),
  };

  render() {
    return (
      <RockAuthedWebBrowser>
        {(openUrl) => (
          <BackgroundView>
            <SafeAreaView>
              <Query query={GET_DISCOVER_FEED}>
                {({ data, ...args }) =>
                  console.log(data, args) || (
                    <FeaturesFeedConnected
                      openUrl={openUrl}
                      navigation={this.props.navigation}
                      nodeId={data?.discoverFeedFeatures?.id}
                      onPressActionItem={handleOnPress}
                    />
                  )
                }
              </Query>
            </SafeAreaView>
          </BackgroundView>
        )}
      </RockAuthedWebBrowser>
    );
  }
}

export default Discover;
