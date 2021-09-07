import React from 'react';
import { ScrollView } from 'react-native';
import { useQuery, useMutation, useApolloClient, gql } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { getVersion, getBuildNumber } from 'react-native-device-info';
import { get } from 'lodash';

import {
  BackgroundView,
  TableView,
  Cell,
  CellIcon,
  CellText,
  Divider,
  Touchable,
  ActivityIndicator,
  NavigationService,
  H3,
  H4,
  H6,
  PaddedView,
  withTheme,
  styled,
} from '@apollosproject/ui-kit';
import {
  checkOnboardingStatusAndNavigate,
  onboardingComplete,
} from '@apollosproject/ui-onboarding';
import { GET_LOGIN_STATE, LOGOUT } from '@apollosproject/ui-auth';
import {
  RockAuthedWebBrowser,
  UserAvatarUpdate,
} from '@apollosproject/ui-connected';

const StyledPaddedView = withTheme(({ theme }) => ({
  style: {
    paddingLeft: theme.sizing.baseUnit,
    paddingBottom: theme.sizing.baseUnit * 0.5,
    paddingTop: 0,
  },
}))(PaddedView);

const StyledCellIcon = withTheme(({ theme }) => ({
  fill: theme.colors.neutral.gray2,
}))(CellIcon);

const Container = styled({
  alignItems: 'center',
  justifyContent: 'center',
})(PaddedView);

const UserSettings = () => {
  const navigation = useNavigation();
  const {
    data: { isLoggedIn = false },
    loading,
  } = useQuery(GET_LOGIN_STATE, { fetchPolicy: 'cache-and-network' });
  const [logout] = useMutation(LOGOUT);
  const client = useApolloClient();
  const { data } = useQuery(gql`
    query currentUserId {
      currentUser {
        id
        profile {
          firstName
          lastName
        }
      }
    }
  `);

  const firstName = get(data, 'currentUser.profile.firstName');
  const lastName = get(data, 'currentUser.profile.lastName');

  if (loading) return <ActivityIndicator />;
  if (!isLoggedIn) return null;
  return (
    <BackgroundView>
      <ScrollView>
        <Container>
          <UserAvatarUpdate />
          <H3>{firstName && lastName ? `${firstName} ${lastName}` : ''}</H3>
        </Container>
        <RockAuthedWebBrowser>
          {(openUrl) => (
            <>
              <TableView>
                <Touchable
                  onPress={() => {
                    navigation.navigate('LikedContentFeedConnected');
                  }}
                >
                  <Cell>
                    <StyledCellIcon name="like" />
                    <CellText>Likes</CellText>
                  </Cell>
                </Touchable>
              </TableView>
              <StyledPaddedView>
                <H6>Your Profile</H6>
              </StyledPaddedView>
              <TableView>
                <Touchable
                  onPress={() => {
                    navigation.navigate('PersonalDetails');
                  }}
                >
                  <Cell>
                    <CellText>Personal Details</CellText>
                    <StyledCellIcon name="arrow-next" />
                  </Cell>
                </Touchable>
                <Divider />
                <Touchable
                  onPress={() => {
                    navigation.navigate('Location');
                  }}
                >
                  <Cell>
                    <CellText>Location</CellText>
                    <StyledCellIcon name="arrow-next" />
                  </Cell>
                </Touchable>
                <Divider />
                <Touchable
                  onPress={() => {
                    navigation.navigate('ChangePassword');
                  }}
                >
                  <Cell>
                    <CellText>Change Password</CellText>
                    <StyledCellIcon name="arrow-next" />
                  </Cell>
                </Touchable>
                <Divider />
                <Touchable
                  onPress={() => {
                    navigation.navigate('Notifications');
                  }}
                >
                  <Cell>
                    <CellText>Notification Settings</CellText>
                    <StyledCellIcon name="arrow-next" />
                  </Cell>
                </Touchable>
              </TableView>
              <StyledPaddedView>
                <H6>Help & Feedback</H6>
              </StyledPaddedView>
              <TableView>
                <Touchable
                  onPress={() => {
                    openUrl('mailto:support@apollos.app');
                  }}
                >
                  <Cell>
                    <CellText>Give Feedback</CellText>
                    <StyledCellIcon name="arrow-next" />
                  </Cell>
                </Touchable>
                <Divider />
                <Touchable
                  onPress={() => openUrl('https://apollosrock.newspring.cc/')}
                >
                  <Cell>
                    <CellText>Privacy Policy</CellText>
                    <StyledCellIcon name="arrow-next" />
                  </Cell>
                </Touchable>
                <Divider />
                <Touchable
                  onPress={() => openUrl('https://apollosrock.newspring.cc/')}
                >
                  <Cell>
                    <CellText>Terms of Use</CellText>
                    <StyledCellIcon name="arrow-next" />
                  </Cell>
                </Touchable>
                <Divider />
                <Cell>
                  <CellText>
                    {`App Version: ${getVersion()}.${getBuildNumber()}`}
                  </CellText>
                </Cell>
              </TableView>
              <TableView>
                <Touchable
                  onPress={async () => {
                    await logout();
                    // This resets the navigation stack, and the navigates to the first auth screen.
                    // This ensures that user isn't navigated to a subscreen of Auth, like the pin entry screen.
                    NavigationService.resetToAuth();
                  }}
                >
                  <Cell>
                    {
                      // Uncomment this once this icon is merged to master in core
                      // <StyledCellIcon name="arrow-down-right" />
                    }
                    <CellText>Logout</CellText>
                  </Cell>
                </Touchable>
              </TableView>

              {/* testing panel */}
              {process.env.NODE_ENV !== 'production' ? (
                <>
                  <PaddedView>
                    <H4>For development only</H4>
                  </PaddedView>
                  <TableView>
                    <Touchable
                      onPress={() =>
                        checkOnboardingStatusAndNavigate({
                          latestOnboardingVersion: 2,
                          navigation: NavigationService,
                          client,
                        })
                      }
                    >
                      <Cell>
                        <CellText>Launch Onboarding</CellText>
                      </Cell>
                    </Touchable>
                    <Divider />
                    <Touchable
                      onPress={() =>
                        onboardingComplete({
                          version: 0,
                          userId: data?.currentUser?.id,
                        })
                      }
                    >
                      <Cell>
                        <CellText>Reset Onboarding to Unseen</CellText>
                      </Cell>
                    </Touchable>
                    <Divider />
                    <Touchable
                      onPress={() =>
                        onboardingComplete({
                          version: 1,
                          userId: data?.currentUser?.id,
                        })
                      }
                    >
                      <Cell>
                        <CellText>Reset Onboarding to Seen v1</CellText>
                      </Cell>
                    </Touchable>
                  </TableView>
                </>
              ) : null}
            </>
          )}
        </RockAuthedWebBrowser>
      </ScrollView>
    </BackgroundView>
  );
};

export default UserSettings;
