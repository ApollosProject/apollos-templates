import React, { useEffect } from 'react';
import { Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Query } from '@apollo/client/react/components';
import { gql, useApolloClient } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';

import {
  styled,
  BackgroundView,
  NavigationService,
} from '@apollosproject/ui-kit';
import {
  FeaturesFeedConnected,
  FEATURE_FEED_ACTION_MAP,
  RockAuthedWebBrowser,
} from '@apollosproject/ui-connected';

import { checkOnboardingStatusAndNavigate } from '@apollosproject/ui-onboarding';

import { SearchButton } from '../../ui/Search';
import { ONBOARDING_VERSION } from '../../ui/Onboarding';

const LogoTitle = styled(({ theme }) => ({
  height: theme.sizing.baseUnit,
  margin: theme.sizing.baseUnit,
  alignSelf: 'center',
  resizeMode: 'contain',
}))(Image);

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
export const GET_HOME_FEED = gql`
  query getHomeFeatureFeed {
    homeFeedFeatures {
      id
    }
  }
`;

const Home = () => {
  const navigation = useNavigation();
  const client = useApolloClient();

  useEffect(() => {
    checkOnboardingStatusAndNavigate({
      client,
      navigation: NavigationService,
      latestOnboardingVersion: ONBOARDING_VERSION,
      navigateHome: false,
    });
  }, []);

  return (
    <RockAuthedWebBrowser>
      {(openUrl) => (
        <BackgroundView>
          <SafeAreaView edges={['top', 'left', 'right']}>
            <Query query={GET_HOME_FEED} fetchPolicy="cache-and-network">
              {({ data }) => (
                <FeaturesFeedConnected
                  openUrl={openUrl}
                  navigation={navigation}
                  featureFeedId={data?.homeFeedFeatures?.id}
                  onPressActionItem={handleOnPress}
                  ListHeaderComponent={
                    <>
                      <LogoTitle source={require('./wordmark.png')} />
                      <SearchButton
                        onPress={() => navigation.navigate('Search')}
                      />
                    </>
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

export default Home;
