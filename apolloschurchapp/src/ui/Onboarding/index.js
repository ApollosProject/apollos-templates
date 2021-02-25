import React from 'react';
import { Query } from '@apollo/client/react/components';
import { requestPermissions } from '@apollosproject/ui-notifications';
import {
  GradientOverlayImage,
  styled,
  BackgroundView,
  NavigationService,
} from '@apollosproject/ui-kit';
import {
  AskNotificationsConnected,
  FeaturesConnected,
  LocationFinderConnected,
  OnboardingSwiper,
  onboardingComplete,
  WITH_USER_ID,
} from '@apollosproject/ui-onboarding';

const FullscreenBackgroundView = styled({
  position: 'absolute',
  width: '100%',
  height: '100%',
})(BackgroundView);

const StyledGradient = styled({
  maxHeight: '40%',
})(GradientOverlayImage);

function Onboarding({ navigation }) {
  return (
    <>
      <FullscreenBackgroundView />
      <OnboardingSwiper>
        {({ swipeForward }) => (
          <>
            <FeaturesConnected
              onPressPrimary={swipeForward}
              BackgroundComponent={
                <StyledGradient
                  source={'https://picsum.photos/640/640/?random'}
                />
              }
            />
            <LocationFinderConnected
              onPressPrimary={swipeForward}
              onNavigate={() => {
                navigation.navigate('Location');
              }}
              BackgroundComponent={
                <StyledGradient
                  source={'https://picsum.photos/640/640/?random'}
                />
              }
            />
            <Query query={WITH_USER_ID} fetchPolicy="network-only">
              {({ data }) => (
                <AskNotificationsConnected
                  onPressPrimary={() => {
                    onboardingComplete({ userId: data?.currentUser?.id });
                    navigation.dispatch(
                      NavigationService.resetAction({
                        navigatorName: 'Tabs',
                        routeName: 'Home',
                      })
                    );
                  }}
                  onRequestPushPermissions={requestPermissions}
                  primaryNavText={'Finish'}
                  BackgroundComponent={
                    <StyledGradient
                      source={'http://picsum.photos/640/640/?random'}
                    />
                  }
                />
              )}
            </Query>
          </>
        )}
      </OnboardingSwiper>
    </>
  );
}

export default Onboarding;
