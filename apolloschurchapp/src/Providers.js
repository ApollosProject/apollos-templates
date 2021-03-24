import React from 'react';
import ApollosConfig from '@apollosproject/config';
import { Providers, NavigationService } from '@apollosproject/ui-kit';
import { AuthProvider } from '@apollosproject/ui-auth';
import { AnalyticsProvider } from '@apollosproject/ui-analytics';
import { NotificationsProvider } from '@apollosproject/ui-notifications';
import {
  LiveProvider,
  ACCEPT_FOLLOW_REQUEST,
} from '@apollosproject/ui-connected';
import { checkOnboardingStatusAndNavigate } from '@apollosproject/ui-onboarding';

import ClientProvider, { client } from './client';
import customTheme, { customIcons } from './theme';

const AppProviders = (props) => (
  <ClientProvider {...props}>
    <NotificationsProvider
      oneSignalKey={ApollosConfig.ONE_SIGNAL_KEY}
      navigate={NavigationService.navigate}
      actionMap={{
        // accept a follow request when someone taps "accept" in a follow request push notification
        acceptFollowRequest: ({ requestPersonId }) =>
          client.mutate({
            mutation: ACCEPT_FOLLOW_REQUEST,
            variables: { personId: requestPersonId },
          }),
      }}
    >
      <AuthProvider
        navigateToAuth={() => NavigationService.navigate('Auth')}
        navigate={NavigationService.navigate}
        closeAuth={() =>
          checkOnboardingStatusAndNavigate({
            client,
            navigation: NavigationService,
          })
        }
      >
        <AnalyticsProvider>
          <LiveProvider>
            <Providers
              themeInput={customTheme}
              iconInput={customIcons}
              {...props}
            />
          </LiveProvider>
        </AnalyticsProvider>
      </AuthProvider>
    </NotificationsProvider>
  </ClientProvider>
);

export default AppProviders;
