import React, { PureComponent } from 'react';
import { TableView } from '@apollosproject/ui-kit';
import { RockAuthedWebBrowser } from '@apollosproject/ui-connected';
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
        <RockAuthedWebBrowser>
          {(openUrl) => (
            <>
              <TouchableCell
                handlePress={() =>
                  openUrl(
                    'https://apollosrock.newspring.cc',
                    {},
                    { useRockToken: true }
                  )
                }
                iconName="share"
                cellText={`Open InAppBrowser With Rock Token`}
              />
              <TouchableCell
                handlePress={() =>
                  openUrl(
                    'https://apollosrock.newspring.cc',
                    { externalBrowser: true },
                    { useRockToken: true }
                  )
                }
                iconName="share"
                cellText={`Open Safari With Rock Token`}
              />
              <TouchableCell
                handlePress={() => openUrl('mailto:fake@apollosproject.com')}
                iconName="share"
                cellText={`Open Email link`}
              />
            </>
          )}
        </RockAuthedWebBrowser>
        <TouchableCell
          handlePress={() => this.props.navigation.navigate('Onboarding')}
          iconName="Avatar"
          cellText={`Launch Onboarding`}
        />
      </TableView>
    );
  }
}
