import React from 'react';
import { View, Image } from 'react-native';
import { Query } from '@apollo/client/react/components';
import PropTypes from 'prop-types';
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

function Onboarding({ navigation, route }) {
  const userVersion = route?.params?.userVersion || 0;
  const onboardingVersion = 2;
  return (
    <>
      <FullscreenBackgroundView />
      <OnboardingSwiper navigation={navigation} userVersion={userVersion}>
        {({ swipeForward }) => (
          <>
            <FeaturesConnected
              userVersion={userVersion}
              onPressPrimary={swipeForward}
              BackgroundComponent={
                <ImageContainer>
                  <StyledImage source={require('./img/personalize.jpg')} />
                </ImageContainer>
              }
            />
            <LocationFinderConnected
              userVersion={userVersion}
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
              userVersion={userVersion}
              onPressPrimary={swipeForward}
              version={2}
              BackgroundComponent={
                <ImageContainer>
                  <StyledImage source={require('./img/follow.jpg')} />
                </ImageContainer>
              }
            />
            <Query query={WITH_USER_ID} fetchPolicy="network-only">
              {({ data }) => (
                <AskNotificationsConnected
                  userVersion={userVersion}
                  onPressPrimary={() => {
                    onboardingComplete({
                      userId: data?.currentUser?.id,
                      version: onboardingVersion,
                    });
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

Onboarding.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      userVersion: PropTypes.number,
    }),
  }),
};

export default Onboarding;
