import React, { PureComponent } from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';
import { SafeAreaView } from 'react-native-safe-area-context';

import { styled, BackgroundView } from '@apollosproject/ui-kit';
import {
  FeaturesFeedConnected,
  RockAuthedWebBrowser,
} from '@apollosproject/ui-connected';

const LogoTitle = styled(({ theme }) => ({
  height: theme.sizing.baseUnit,
  margin: theme.sizing.baseUnit,
  alignSelf: 'center',
  resizeMode: 'contain',
}))(Image);

class Home extends PureComponent {
  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      setParams: PropTypes.func,
      navigate: PropTypes.func,
    }),
  };

  handleOnPress = ({ openUrl }) => ({ action, relatedNode }) => {
    if (action === 'READ_CONTENT') {
      this.props.navigation.navigate('ContentSingle', {
        itemId: relatedNode.id,
        transitionKey: 2,
      });
    }
    if (action === 'READ_EVENT') {
      this.props.navigation.navigate('Event', {
        eventId: relatedNode.id,
        transitionKey: 2,
      });
    }
    if (action === 'OPEN_URL') {
      openUrl(relatedNode.url);
    }
  };

  render() {
    return (
      <RockAuthedWebBrowser>
        {(openUrl) => (
          <BackgroundView>
            <SafeAreaView edges={['top', 'left', 'right']}>
              <FeaturesFeedConnected
                onPressActionItem={this.handleOnPress({ openUrl })}
                ListHeaderComponent={
                  <LogoTitle source={require('./wordmark.png')} />
                }
              />
            </SafeAreaView>
          </BackgroundView>
        )}
      </RockAuthedWebBrowser>
    );
  }
}

export default Home;
