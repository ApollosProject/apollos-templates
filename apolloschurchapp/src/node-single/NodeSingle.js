import React, { PureComponent } from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import { ThemeMixin } from '@apollosproject/ui-kit';

// import { TrackEventWhenLoaded } from '@apollosproject/ui-analytics';
import {
  InteractWhenLoadedConnected,
  NodeSingleConnected,
} from '@apollosproject/ui-connected';

// import ActionContainer from './ActionContainer';

import NavigationHeader from '../ui/NavigationHeader';

class ContentSingle extends PureComponent {
  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      push: PropTypes.func,
    }),
  };

  get nodeId() {
    return this.props.navigation.getParam('nodeId', []);
  }

  static navigationOptions = {
    header: NavigationHeader,
    headerTransparent: true,
    headerMode: 'float',
  };

  render() {
    return (
      <ThemeMixin
        mixin={{
          type: get(this.props, 'theme.type'),
          colors: get(this.props, 'theme.colors'),
        }}
      >
        <InteractWhenLoadedConnected nodeId={this.nodeId} action={'COMPLETE'} />
        {/* <TrackEventWhenLoaded */}
        {/*   isLoading={loading} */}
        {/*   eventName={'View Node'} */}
        {/*   properties={{ */}
        {/*     title: content.title, */}
        {/*     itemId: this.itemId, */}
        {/*   }} */}
        {/* /> */}
        <NodeSingleConnected nodeId={this.nodeId} />
        {/* <ActionContainer itemId={id} /> */}
      </ThemeMixin>
    );
  }
}

export default ContentSingle;
