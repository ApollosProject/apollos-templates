import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useApolloClient, gql, useQuery } from '@apollo/client';

import { BackgroundView, NavigationService } from '@apollosproject/ui-kit';
import {
  FeaturesFeedConnected,
  FEATURE_FEED_ACTION_MAP,
  RockAuthedWebBrowser,
} from '@apollosproject/ui-connected';

import { checkOnboardingStatusAndNavigate } from '@apollosproject/ui-onboarding';

import { ONBOARDING_VERSION } from '../ui/Onboarding';

function handleOnPress({ action, ...props }) {
  if (FEATURE_FEED_ACTION_MAP[action]) {
    FEATURE_FEED_ACTION_MAP[action]({ action, ...props });
  }
}

const Tab = ({ tab }) => {
  const client = useApolloClient();
  const { data } = useQuery(
    gql`
      query GetTabFeatures($tab: Tab!) {
        tabFeedFeatures(tab: $tab) {
          id
        }
      }
    `,
    { variables: { tab }, fetchPolicy: 'cache-and-network' }
  );

  // this is only used by the tab loaded first
  // if there is a new version of the onboarding flow,
  // we'll navigate there first to show new screens
  useEffect(
    () => {
      checkOnboardingStatusAndNavigate({
        client,
        navigation: NavigationService,
        latestOnboardingVersion: ONBOARDING_VERSION,
        navigateHome: false,
      });
    },
    [client]
  );

  return (
    <RockAuthedWebBrowser>
      {(openUrl) => (
        <BackgroundView>
          <FeaturesFeedConnected
            openUrl={openUrl}
            featureFeedId={data?.tabFeedFeatures?.id}
            onPressActionItem={handleOnPress}
          />
        </BackgroundView>
      )}
    </RockAuthedWebBrowser>
  );
};

Tab.propTypes = {
  tab: PropTypes.string.isRequired,
};

export default Tab;
