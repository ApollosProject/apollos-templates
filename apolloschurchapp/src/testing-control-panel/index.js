import React, { PureComponent } from 'react';
import { TableView, BackgroundView } from '@apollosproject/ui-kit';
import TouchableCell from './TouchableCell';

export default class TestingControlPanel extends PureComponent {
  render() {
    return (
      <BackgroundView>
        <TableView>
          <TouchableCell
            handlePress={() => this.props.navigation.navigate('Onboarding')}
            iconName="Avatar"
            cellText={`Launch Onboarding`}
          />
        </TableView>
      </BackgroundView>
    );
  }
}
