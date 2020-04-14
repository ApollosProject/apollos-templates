import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import { Image, ScrollView } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import {
  ContentCardConnected,
  fetchMoreResolver,
} from '@apollosproject/ui-connected';
import { styled, FeedView, BackgroundView } from '@apollosproject/ui-kit';

import Features from './Features';
import GET_USER_FEED from './getUserFeed';

const LogoTitle = styled(({ theme }) => ({
  height: theme.sizing.baseUnit,
  margin: theme.sizing.baseUnit,
  alignSelf: 'center',
  resizeMode: 'contain',
}))(Image);

class Home extends PureComponent {
  static navigationOptions = () => ({
    header: null,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      setParams: PropTypes.func,
      navigate: PropTypes.func,
    }),
  };

  handleOnPress = (item) =>
    this.props.navigation.navigate('ContentSingle', {
      itemId: item.id,
      transitionKey: item.transitionKey,
    });

  render() {
    return (
      <BackgroundView>
        <SafeAreaView>
          <ScrollView>
            <LogoTitle source={require('./wordmark.png')} />
            <Features navigation={this.props.navigation} />
          </ScrollView>
        </SafeAreaView>
      </BackgroundView>
    );
  }
}

export default Home;
