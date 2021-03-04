import React from 'react';
import { ActionBar, ActionBarItem } from '@apollosproject/ui-kit';
import { useNavigation } from '@react-navigation/native';

const Toolbar = () => {
  const navigation = useNavigation();
  return (
    <ActionBar>
      <ActionBarItem
        onPress={() => navigation.navigate('Passes')}
        icon="check"
        label="Check-in"
      />
      <ActionBarItem
        onPress={() =>
          navigation.navigate('NodeSingle', {
            nodeId: 'UniversalContentItem:dcd4cbe22b380eed15f3e5c7604d09a6',
          })
        }
        icon="download"
        label="Give"
      />
      <ActionBarItem
        onPress={() => navigation.navigate('TestingControlPanel')}
        icon="information"
        label="Test"
      />
    </ActionBar>
  );
};

export default Toolbar;
