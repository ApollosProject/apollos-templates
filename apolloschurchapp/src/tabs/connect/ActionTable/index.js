import React from 'react';
import { View } from 'react-native';

import {
  TableView,
  Cell,
  CellIcon,
  CellText,
  Divider,
  Touchable,
  styled,
  PaddedView,
  H4,
  withTheme,
} from '@apollosproject/ui-kit';
import { RockAuthedWebBrowser } from '@apollosproject/ui-connected';

const RowHeader = styled(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingVertical: theme.sizing.baseUnit,
}))(PaddedView);

const Name = styled({
  flexGrow: 1,
})(View);

const ThemedH4 = withTheme(({ theme }) => ({
  style: {
    color: theme.colors.text.secondary,
  },
}))(H4);

const ActionTable = () => (
  <RockAuthedWebBrowser>
    {(openUrl) => (
      <View>
        <RowHeader>
          <Name>
            <ThemedH4>{'Connect'}</ThemedH4>
          </Name>
        </RowHeader>
        <TableView>
          <Touchable onPress={() => openUrl('https://www.google.com')}>
            <Cell>
              <CellText>Contact us</CellText>
              <CellIcon name="arrow-next" />
            </Cell>
          </Touchable>
          <Divider />
          <Touchable onPress={() => openUrl('https://www.google.com')}>
            <Cell>
              <CellText>I need prayer</CellText>
              <CellIcon name="arrow-next" />
            </Cell>
          </Touchable>
          <Divider />
          <Touchable onPress={() => openUrl('https://www.google.com')}>
            <Cell>
              <CellText>Get baptized</CellText>
              <CellIcon name="arrow-next" />
            </Cell>
          </Touchable>
          <Divider />
          <Touchable onPress={() => openUrl('https://www.google.com')}>
            <Cell>
              <CellText>Get care</CellText>
              <CellIcon name="arrow-next" />
            </Cell>
          </Touchable>
          <Divider />
          <Touchable onPress={() => openUrl('https://www.google.com')}>
            <Cell>
              <CellText>Our locations</CellText>
              <CellIcon name="arrow-next" />
            </Cell>
          </Touchable>
          <Divider />
          <Touchable onPress={() => openUrl('https://www.google.com')}>
            <Cell>
              <CellText>Report an issue</CellText>
              <CellIcon name="arrow-next" />
            </Cell>
          </Touchable>
        </TableView>
      </View>
    )}
  </RockAuthedWebBrowser>
);

const StyledActionTable = styled(({ theme }) => ({
  paddingBottom: theme.sizing.baseUnit * 100,
}))(ActionTable);

export default StyledActionTable;
