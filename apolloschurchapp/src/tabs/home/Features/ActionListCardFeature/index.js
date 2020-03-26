import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { styled, ActionListCard, H3, H6 } from '@apollosproject/ui-kit';

const StyledH6 = styled(({ theme }) => ({
  color: theme.colors.text.tertiary,
}))(H6);

const ActionListCardFeature = memo(
  ({
    actions,
    id,
    isLoading,
    onPressActionListButton,
    onPressActionItem,
    subtitle,
    title,
  }) => (
    <ActionListCard
      isLoading={isLoading}
      key={id}
      header={
        <>
          {isLoading || title ? ( // we check for isloading here so that they are included in the loading state
            <StyledH6 numberOfLines={1}>{title}</StyledH6>
          ) : null}
          {isLoading || subtitle ? <H3>{subtitle}</H3> : null}
        </>
      }
      actions={actions}
      onPressActionItem={onPressActionItem}
      onPressActionListButton={isLoading || onPressActionListButton} // we check for isloading here so that the button is included in the loading state
    />
  )
);

ActionListCardFeature.displayName = 'Features';

ActionListCardFeature.propTypes = {
  // TODO: refactor ActionListCard to safely render without an actions array.
  actions: PropTypes.arrayOf(PropTypes.shape({})).isRequired, // at least for the time being this is required
  id: PropTypes.number,
  isLoading: PropTypes.bool,
  onPressActionListButton: PropTypes.func,
  onPressActionItem: PropTypes.func,
  subtitle: PropTypes.string,
  title: PropTypes.string,
};

export default ActionListCardFeature;
