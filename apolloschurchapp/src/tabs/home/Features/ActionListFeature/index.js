import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { styled, ActionListCard, H3, H6 } from '@apollosproject/ui-kit';

const StyledH6 = styled(({ theme }) => ({
  color: theme.colors.text.tertiary,
}))(H6);

const ActionListFeature = memo(
  ({
    actions,
    id,
    isLoading,
    onPressCardActionButton,
    onPressActionItem,
    subtitle,
    title,
  }) => (
    <ActionListCard
      isLoading={isLoading}
      key={id}
      header={
        <>
          {isLoading || title ? (
            <StyledH6 numberOfLines={1}>{title}</StyledH6>
          ) : null}
          {isLoading || subtitle ? <H3 numberOfLines={3}>{subtitle}</H3> : null}
        </>
      }
      actions={actions}
      onPressActionItem={onPressActionItem}
      onPressCardActionButton={onPressCardActionButton}
    />
  )
);

ActionListFeature.displayName = 'Features';

ActionListFeature.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.shape({})),
  id: PropTypes.number,
  isLoading: PropTypes.bool,
  onPressCardActionButton: PropTypes.func,
  onPressActionItem: PropTypes.func,
  subtitle: PropTypes.string,
  title: PropTypes.string,
};

export default ActionListFeature;
