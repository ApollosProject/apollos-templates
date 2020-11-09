import React, { PureComponent } from 'react';
import { TableView } from '@apollosproject/ui-kit';
import TouchableCell from './TouchableCell';

export default class TestingControlPanel extends PureComponent {
  static navigationOptions = ({ screenProps }) => ({
    title: 'Testing Control Panel',
    headerStyle: {
      backgroundColor: screenProps.headerBackgroundColor,
      borderBottomWidth: 0,
      elevation: 0,
    },
  });

  render() {
    return (
      <TableView>
        <TouchableCell
          handlePress={() => this.props.navigation.navigate('Onboarding')}
          iconName="Avatar"
          cellText={`Launch Onboarding`}
        />
      </TableView>
    );
  }
}
