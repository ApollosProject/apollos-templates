import React from 'react';
import { ActionBar, ActionBarItem } from '@apollosproject/ui-kit';
import { useNavigation } from '@react-navigation/native';
import { RockAuthedWebBrowser } from '@apollosproject/ui-connected';

const Toolbar = () => {
  const navigation = useNavigation();
  return (
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
};

export default Toolbar;
