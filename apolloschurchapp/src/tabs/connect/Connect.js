import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { ConnectScreenConnected } from '@apollosproject/ui-connected';

import ActionTable from './ActionTable';
import ActionBar from './ActionBar';

class Connect extends PureComponent {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }),
  };

  render() {
    return (
      <ConnectScreenConnected ActionTable={ActionTable} ActionBar={ActionBar} />
    );
  }
}

export default Connect;
