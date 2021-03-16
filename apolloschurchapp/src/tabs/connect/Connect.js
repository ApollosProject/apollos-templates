import React, { PureComponent } from 'react';
import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  HorizontalLikedContentFeedConnected,
  SuggestedFollowListConnected,
  RequestedFollowListConnected,
} from '@apollosproject/ui-connected';
import { BackgroundView } from '@apollosproject/ui-kit';

import ActionTable from './ActionTable';
import ActionBar from './ActionBar';
import UserAvatarHeader from './UserAvatarHeader';

class Connect extends PureComponent {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }),
  };

  render() {
    return (
      <BackgroundView>
        <SafeAreaView edges={['top', 'left', 'right']}>
          <ScrollView>
            <UserAvatarHeader />
            <ActionBar />
            <RequestedFollowListConnected />
            <SuggestedFollowListConnected />
            <HorizontalLikedContentFeedConnected />
            <ActionTable />
          </ScrollView>
        </SafeAreaView>
      </BackgroundView>
    );
  }
}

export default Connect;
