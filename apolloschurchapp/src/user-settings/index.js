import React from 'react';
import { ScrollView } from 'react-native';
import { useQuery, useMutation, useApolloClient, gql } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { getVersion, getBuildNumber } from 'react-native-device-info';

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
  H4,
  PaddedView,
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
      }
    }
  `);

  if (loading) return <ActivityIndicator />;
  if (!isLoggedIn) return null;
  return (
    <BackgroundView>
      <ScrollView>
        <UserAvatarUpdate />

        <RockAuthedWebBrowser>
          {(openUrl) => (
            <>
              <TableView>
                <Touchable
                  onPress={() => {
                    navigation.navigate('PersonalDetails');
                  }}
                >
                  <Cell>
                    <CellText>Personal Details</CellText>
                    <CellIcon name="arrow-next" />
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
                    <CellIcon name="arrow-next" />
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
                    <CellIcon name="arrow-next" />
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
                    <CellIcon name="arrow-next" />
                  </Cell>
                </Touchable>
              </TableView>
              <TableView>
                <Touchable
                  onPress={() => {
                    openUrl('mailto:support@apollos.app');
                  }}
                >
                  <Cell>
                    <CellText>Give Feedback</CellText>
                    <CellIcon name="arrow-next" />
                  </Cell>
                </Touchable>
              </TableView>
              <TableView>
                <Touchable
                  onPress={() => openUrl('https://apollosrock.newspring.cc/')}
                >
                  <Cell>
                    <CellText>Privacy Policy</CellText>
                    <CellIcon name="arrow-next" />
                  </Cell>
                </Touchable>
                <Divider />
                <Touchable
                  onPress={() => openUrl('https://apollosrock.newspring.cc/')}
                >
                  <Cell>
                    <CellText>Terms of Use</CellText>
                    <CellIcon name="arrow-next" />
                  </Cell>
                </Touchable>
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
                    <CellText>Logout</CellText>
                    <CellIcon name="arrow-next" />
                  </Cell>
                </Touchable>
              </TableView>
              <TableView>
                <Cell>
                  <CellText>
                    {`App Version: ${getVersion()}.${getBuildNumber()}`}
                  </CellText>
                </Cell>
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
