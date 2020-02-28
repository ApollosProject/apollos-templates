import React from 'react';
import {
  checkNotifications,
  openSettings,
  requestNotifications,
  RESULTS,
} from 'react-native-permissions';
import {
  GradientOverlayImage,
  styled,
  BackgroundView,
} from '@apollosproject/ui-kit';
import {
  AskNotificationsConnected,
  AskNameConnected,
  FeaturesConnected,
  AboutYouConnected,
  LocationFinderConnected,
  OnboardingSwiper,
} from '@apollosproject/ui-onboarding';
import { resetAction } from '../../NavigationService';

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
            <AskNameConnected onPressPrimary={swipeForward} />
            <FeaturesConnected
              onPressPrimary={swipeForward}
              BackgroundComponent={
                <StyledGradient
                  source={'https://picsum.photos/640/640/?random'}
                />
              }
            />
            <AboutYouConnected
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
            <AskNotificationsConnected
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
              onPressPrimary={() =>
                navigation.dispatch(
                  resetAction({
                    navigatorName: 'Tabs',
                    routeName: 'Home',
                  })
                )
              }
              primaryNavText={'Finish'}
              BackgroundComponent={
                <StyledGradient
                  source={'https://picsum.photos/640/640/?random'}
                />
              }
            />
          </>
        )}
      </OnboardingSwiper>
    </>
  );
}

Onboarding.navigationOptions = {
  title: 'Onboarding',
  header: null,
  gesturesEnabled: false,
};

export default Onboarding;
