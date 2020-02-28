import React from 'react';
import { ActionBar, ActionBarItem } from '@apollosproject/ui-kit';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import { RockAuthedWebBrowser } from '@apollosproject/ui-connected';

const Toolbar = ({ navigation }) => (
  <RockAuthedWebBrowser>
    {(openUrl) => (
      <ActionBar>
        <ActionBarItem
          onPress={() => navigation.navigate('Passes')}
          icon="check"
          label="Check-in"
        />
        <ActionBarItem
          onPress={() => openUrl('https://apollosrock.newspring.cc/page/186')}
          icon="download"
          label="Give"
        />
        <ActionBarItem
          onPress={() => navigation.navigate('TestingControlPanel')}
          icon="information"
          label="Test"
        />
      </ActionBar>
    )}
  </RockAuthedWebBrowser>
);

Toolbar.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default withNavigation(Toolbar);
