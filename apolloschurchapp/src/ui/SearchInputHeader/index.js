import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import { styled, PaddedView, SearchInput } from '@apollosproject/ui-kit';

const HeaderBorder = styled(
  ({ theme }) => ({
    paddingBottom: theme.sizing.baseUnit / 2,
    /* It's unclear why this is necessary but without it the layout breaks on both platforms. Limited
     * research suggest that without a background color the shadows don't know what to blend with so
     * the view collapses. */
    backgroundColor: theme.colors.background.paper,
    // Renders the same shadows that React Navigation does.
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.3)',
        shadowOpacity: 0.85,
        shadowRadius: 0,
        shadowOffset: {
          width: 0,
          height: StyleSheet.hairlineWidth,
        },
      },
      android: {
        elevation: 4,
      },
    }),
  }),
  'SearchInputHeader.HeaderBorder'
)(PaddedView);

// This element is used to clip the Android shadow in every directection except the bottom.
const AndroidClipElevationFix = styled(
  {
    ...Platform.select({
      android: {
        paddingBottom: 4,
        overflow: 'hidden',
      },
    }),
  },
  'SearchInputHeader.AndroidClipElevationFix'
)(View);

const ReactNavigationStyleReset = StyleSheet.create({
  header: {
    borderBottomWidth: 0,
    elevation: 0,
  },
});

const SearchInputHeader = ({ style, ...props }) => (
  <AndroidClipElevationFix style={style}>
    <HeaderBorder vertical={false}>
      <SearchInput {...props} />
    </HeaderBorder>
  </AndroidClipElevationFix>
);

SearchInputHeader.propTypes = {
  ...SearchInput.propTypes,
};

export { SearchInputHeader as default, ReactNavigationStyleReset };
