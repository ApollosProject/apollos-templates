import React, { PureComponent } from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import PropTypes from 'prop-types';

import { HorizontalLikedContentFeedConnected } from '@apollosproject/ui-connected';
import { BackgroundView } from '@apollosproject/ui-kit';

import ActionTable from './ActionTable';
import ActionBar from './ActionBar';
import UserAvatarHeader from './UserAvatarHeader';

class Connect extends PureComponent {
  static navigationOptions = () => ({
    title: 'Connect',
    header: null,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
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
