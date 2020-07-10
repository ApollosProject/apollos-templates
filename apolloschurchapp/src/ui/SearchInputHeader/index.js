/* eslint-disable react-native/no-unused-styles */
import React from 'react';
import { Platform, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styled, PaddedView, SearchInput } from '@apollosproject/ui-kit';

const HeaderBorder = styled(
  ({ theme }) => ({
    paddingBottom: theme.sizing.baseUnit / 2,
    /* It's unclear why this is necessary but without it the layout breaks on both platforms. Limited
     * research suggest that without a background color the shadows don't know what to blend with so
     * the view collapses. */
    backgroundColor: theme.colors.background.paper,
    ...Platform.select(theme.shadows.default),
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

const SearchInputHeader = ({ style, ...props }) => (
  <AndroidClipElevationFix style={style}>
    <HeaderBorder vertical={false}>
      <SafeAreaView edges={['top', 'left', 'right']}>
        <SearchInput {...props} />
      </SafeAreaView>
    </HeaderBorder>
  </AndroidClipElevationFix>
);

SearchInputHeader.propTypes = {
  ...SearchInput.propTypes,
};

export { SearchInputHeader as default };
