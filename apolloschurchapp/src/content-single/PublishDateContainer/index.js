import React from 'react';
import { View } from 'react-native';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import moment from 'moment';

import {
  styled,
  FlexedView,
  H6,
} from '@apollosproject/ui-kit';

const DATE_FORMAT = 'MMMM DD, YYYY';

const Container = styled(({ theme }) => ({
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'center',
  marginTop: theme.sizing.baseUnit * 0.5,
  marginBottom: theme.sizing.baseUnit,
}))(View);

const TextContainer = styled(({ theme }) => ({
  justifyContent: 'center',
  paddingLeft: theme.sizing.baseUnit * 0.5,
}))(FlexedView);

const StyledH6 = styled(({ theme, color = 'primary' }) => ({
  color: theme.colors.text[color],
}))(H6);

const PublishDateContainer = ({ contentId }) => {
  const publishDate =
    get(node, 'publishDate', '') !== ''
      ? moment(node.publishDate).format(DATE_FORMAT)
      : moment().format(DATE_FORMAT);
  
  return (
    <Container>
      <TextContainer>
        <StyledH6
          numberOfLines={2}
          ellipsizeMode="tail"
          isLoading={loading}
          color="tertiary"
        >
          {`${publishDate}`}
        </StyledH6>
      </TextContainer>
    </Container>
  );
};

PublishDateContainer.propTypes = {
  contentId: PropTypes.string,
};

export default PublishDateContainer;


