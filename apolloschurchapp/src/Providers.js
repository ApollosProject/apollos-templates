import React from 'react';
import ApollosConfig from '@apollosproject/config';
import { Providers, NavigationService } from '@apollosproject/ui-kit';
import { AuthProvider } from '@apollosproject/ui-auth';
import { AnalyticsProvider } from '@apollosproject/ui-analytics';
import { NotificationsProvider } from '@apollosproject/ui-notifications';
import { LiveProvider } from '@apollosproject/ui-connected';
import { checkOnboardingStatusAndNavigate } from '@apollosproject/ui-onboarding';

import ClientProvider, { client } from './client';
import customTheme, { customIcons } from './theme';

const AppProviders = (props) => (
  <ClientProvider {...props}>
    <NotificationsProvider
      oneSignalKey={ApollosConfig.ONE_SIGNAL_APP_ID}
      navigate={NavigationService.navigate}
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
              theme={customTheme}
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
