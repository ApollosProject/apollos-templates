import React, { PureComponent } from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';

import { HorizontalLikedContentFeedConnected } from '@apollosproject/ui-connected';
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
        <SafeAreaView>
          <ScrollView>
            <UserAvatarHeader />
            <ActionBar />
            <HorizontalLikedContentFeedConnected />
            <ActionTable />
          </ScrollView>
        </SafeAreaView>
      </BackgroundView>
    );
  }
}

export default Connect;
