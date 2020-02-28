import React from 'react';
import PropTypes from 'prop-types';

import {
  styled,
  withTheme,
  CenteredView,
  PaddedView,
  Icon,
  H4,
  BodySmall,
} from '@apollosproject/ui-kit';

const StyledIcon = withTheme(({ theme }) => ({
  fill: theme.colors.text.tertiary,
  style: {
    marginRight: theme.sizing.baseUnit / 2,
  },
}))(Icon);

const Title = styled({
  flexDirection: 'row',
  alignItems: 'center',
})(PaddedView);

const NoResultsText = styled(
  ({ theme }) => ({
    color: theme.colors.text.tertiary,
    textAlign: 'center',
  }),
  'Discover.SearchFeed.NoResultsText'
);

const StyledH4 = NoResultsText(H4);
const StyledBodySmall = NoResultsText(BodySmall);

const NoResults = ({ searchText }) => (
  <CenteredView>
    <Title vertical={false}>
      <StyledIcon name={'umbrella'} />
      <StyledH4 padded>Uh Oh!</StyledH4>
    </Title>
    <PaddedView vertical={false}>
      <StyledBodySmall>
        {"Looks like we couldn't find anything for "}
        <StyledBodySmall bold>{`"${searchText}."`}</StyledBodySmall>
        {' Try searching for something else!'}
      </StyledBodySmall>
    </PaddedView>
  </CenteredView>
);

NoResults.propTypes = {
  searchText: PropTypes.string,
};

export default NoResults;
