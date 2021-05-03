import React from 'react';
import {
  TableView,
  BackgroundView,
  NavigationService,
} from '@apollosproject/ui-kit';
import {
  checkOnboardingStatusAndNavigate,
  onboardingComplete,
} from '@apollosproject/ui-onboarding';
import { useApolloClient, useQuery, gql } from '@apollo/client';
import TouchableCell from './TouchableCell';

export default function TestingControlPanel() {
  const client = useApolloClient();
  const { data } = useQuery(gql`
    query currentUserId {
      currentUser {
        id
      }
    }
  `);
  return (
    <BackgroundView>
      <TableView>
        <TouchableCell
          handlePress={() =>
            checkOnboardingStatusAndNavigate({
              latestOnboardingVersion: 2,
              navigation: NavigationService,
              client,
            })
          }
          iconName="Avatar"
          cellText={`Launch Onboarding`}
        />
      </TableView>
      <TouchableCell
        handlePress={() =>
          onboardingComplete({ version: 0, userId: data?.currentUser?.id })
        }
        iconName="Avatar"
        cellText={`Reset Onboarding to Unseen`}
      />
      <TouchableCell
        handlePress={() =>
          onboardingComplete({ version: 1, userId: data?.currentUser?.id })
        }
        iconName="Avatar"
        cellText={`Reset Onboarding to Seen v1`}
      />
    </BackgroundView>
  );
}
