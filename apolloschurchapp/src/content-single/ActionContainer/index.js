import React from 'react';
import { Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PropTypes from 'prop-types';
import { SideBySideView, styled } from '@apollosproject/ui-kit';
import {
  LikeButtonConnected,
  ShareButtonConnected,
} from '@apollosproject/ui-connected';

const PositioningView = styled(({ theme }) => ({
  justifyContent: 'space-around',
  paddingVertical: theme.sizing.baseUnit / 2,
  paddingHorizontal: theme.sizing.baseUnit,
}))(SideBySideView);

const Container = styled(({ theme, safeAreaMargin }) => ({
  backgroundColor: theme.colors.background.paper,
  position: 'absolute',
  width: '100%',
  bottom: 0,
  paddingBottom: safeAreaMargin,
  ...Platform.select(theme.shadows.default),
}))(View);

const ActionContainer = ({ itemId }) => {
  const { bottom } = useSafeAreaInsets();
  return (
    <Container safeAreaMargin={bottom}>
      <PositioningView>
        <LikeButtonConnected itemId={itemId} />
        <ShareButtonConnected itemId={itemId} />
      </PositioningView>
    </Container>
  );
};

ActionContainer.propTypes = {
  content: PropTypes.shape({}),
  itemId: PropTypes.string,
};

export default ActionContainer;
