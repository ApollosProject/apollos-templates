import React, { useState } from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';
import gql from 'graphql-tag';
import { Query } from '@apollo/client/react/components';

import { throttle } from 'lodash';

import { BackgroundView } from '@apollosproject/ui-kit';
import {
  FeaturesFeedConnected,
  FEATURE_FEED_ACTION_MAP,
  RockAuthedWebBrowser,
  SearchInputHeader,
  SearchFeedConnected,
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

function Discover({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  return (
    <RockAuthedWebBrowser>
      {(openUrl) => (
        <BackgroundView>
          <SafeAreaView>
            <SearchInputHeader
              onChangeText={throttle(setSearchText, 300)}
              onFocus={setIsFocused}
            />
            {isFocused || searchText ? (
              <SearchFeedConnected searchText={searchText} />
            ) : (
              <Query query={GET_DISCOVER_FEED}>
                {({ data }) => (
                  <FeaturesFeedConnected
                    openUrl={openUrl}
                    navigation={navigation}
                    featureFeedId={data?.discoverFeedFeatures?.id}
                    onPressActionItem={handleOnPress}
                  />
                )}
              </Query>
            )}
          </SafeAreaView>
        </BackgroundView>
      )}
    </RockAuthedWebBrowser>
  );
}

export default Discover;
