import React, { useEffect } from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Query } from '@apollo/client/react/components';
import { useApolloClient, gql } from '@apollo/client';
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

const Tab = ({ queryName, showHeader = false, showTitle = true }) => {
  const client = useApolloClient();
  const navigation = useNavigation();

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
            <Query
              query={gql`
              query {
                ${queryName} {
                  id
                }
              }
            `}
              fetchPolicy="cache-and-network"
            >
              {({ data }) => (
                <FeaturesFeedConnected
                  openUrl={openUrl}
                  featureFeedId={data[queryName].id}
                  onPressActionItem={handleOnPress}
                  ListHeaderComponent={
                    showTitle ? <TabTitle>TITLE</TabTitle> : null
                  }
                />
              )}
            </Query>
          </SafeAreaView>
        </BackgroundView>
      )}
    </RockAuthedWebBrowser>
  );
};

Tab.propTypes = {
  queryName: PropTypes.string,
  showHeader: PropTypes.bool,
  showTitle: PropTypes.bool,
};

export default Tab;
