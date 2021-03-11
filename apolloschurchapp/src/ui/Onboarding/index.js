import React from 'react';
import { View, Image } from 'react-native';
import { Query } from '@apollo/client/react/components';
import {
  checkNotifications,
  openSettings,
  requestNotifications,
  RESULTS,
} from 'react-native-permissions';
import {
  styled,
  BackgroundView,
  NavigationService,
} from '@apollosproject/ui-kit';
import {
  AskNotificationsConnected,
  FeaturesConnected,
  LocationFinderConnected,
  FollowConnected,
  OnboardingSwiper,
  onboardingComplete,
  WITH_USER_ID,
} from '@apollosproject/ui-onboarding';

const FullscreenBackgroundView = styled({
  position: 'absolute',
  width: '100%',
  height: '100%',
})(BackgroundView);

const ImageContainer = styled({
  height: '40%',
})(View);

const StyledImage = styled({
  height: '100%',
  width: '100%',
})(Image);

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
                <ImageContainer>
                  <StyledImage source={require('./img/personalize.jpg')} />
                </ImageContainer>
              }
            />
            <LocationFinderConnected
              onPressPrimary={swipeForward}
              onNavigate={() => {
                navigation.navigate('Location');
              }}
              BackgroundComponent={
                <ImageContainer>
                  <StyledImage source={require('./img/locations.jpg')} />
                </ImageContainer>
              }
            />
            <FollowConnected
              onPressPrimary={swipeForward}
              BackgroundComponent={
                <ImageContainer>
                  <StyledImage source={require('./img/follow.jpg')} />
                </ImageContainer>
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
                  onRequestPushPermissions={(update) => {
                    checkNotifications().then((checkRes) => {
                      if (checkRes.status === RESULTS.DENIED) {
                        requestNotifications(['alert', 'badge', 'sound']).then(
                          () => {
                            update();
                          }
                        );
                      } else {
                        openSettings();
                      }
                    });
                  }}
                  primaryNavText={'Finish'}
                  BackgroundComponent={
                    <ImageContainer>
                      <StyledImage
                        source={require('./img/notifications.jpg')}
                      />
                    </ImageContainer>
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
