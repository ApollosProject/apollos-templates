import React, { useEffect } from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApolloClient, gql, useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';

import {
  BackgroundView,
  PaddedView,
  NavigationService,
  styled,
  H2,
} from '@apollosproject/ui-kit';
import {
  FeaturesFeedConnected,
  FEATURE_FEED_ACTION_MAP,
  RockAuthedWebBrowser,
} from '@apollosproject/ui-connected';

import { checkOnboardingStatusAndNavigate } from '@apollosproject/ui-onboarding';

import { ONBOARDING_VERSION } from '../ui/Onboarding';
import { SearchButton } from '../ui/Search';

function handleOnPress({ action, ...props }) {
  if (FEATURE_FEED_ACTION_MAP[action]) {
    FEATURE_FEED_ACTION_MAP[action]({ action, ...props });
  }
}

const HeaderLogo = styled(({ theme }) => ({
  height: theme.sizing.baseUnit,
  margin: theme.sizing.baseUnit,
  alignSelf: 'center',
  resizeMode: 'contain',
}))(Image);

const TabTitle = styled(({ theme }) => ({
  paddingLeft: theme.sizing.baseUnit,
  paddingTop: theme.sizing.baseUnit * 2,
}))(H2);

const Tab = ({ tab, showHeader, showTitle }) => {
  const client = useApolloClient();
  const navigation = useNavigation();
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
          <SafeAreaView edges={['top', 'left', 'right']}>
            {showHeader ? (
              <PaddedView>
                <HeaderLogo source={require('./wordmark.png')} />
                <SearchButton onPress={() => navigation.navigate('Search')} />
              </PaddedView>
            ) : null}
            <FeaturesFeedConnected
              openUrl={openUrl}
              featureFeedId={data?.tabFeedFeatures?.id}
              onPressActionItem={handleOnPress}
              ListHeaderComponent={
                showTitle ? <TabTitle>TITLE</TabTitle> : null
              }
            />
          </SafeAreaView>
        </BackgroundView>
      )}
    </RockAuthedWebBrowser>
  );
};

Tab.propTypes = {
  tab: PropTypes.string,
  showHeader: PropTypes.bool,
  showTitle: PropTypes.bool,
};

Tab.defaultProps = {
  showHeader: false,
  showTitle: true,
};

export default Tab;
