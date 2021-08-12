import React from 'react';
import { Animated, View } from 'react-native';
import PropTypes from 'prop-types';
import { styled, withTheme, H6, H4, Icon } from '@apollosproject/ui-kit';

const FlexedScrollView = styled({ flex: 1 })(Animated.ScrollView);

const StyledIcon = withTheme(({ theme: { colors, sizing } }) => ({
  fill: colors.text.tertiary,
  size: sizing.baseUnit * 1.5,
  style: {
    marginRight: 8,
  },
}))(Icon);

const StyledH6 = styled(({ theme: { colors, sizing } }) => ({
  color: colors.text.tertiary,
  fontSize: sizing.baseUnit * 0.875,
  marginTop: sizing.baseUnit / 4,
}))(H6);

const EventInfoContainer = styled({ marginBottom: 24, flexDirection: 'row' })(
  View
);

const TextContainer = styled({ flexDirection: 'column' })(View);

const EventInfoItem = ({ icon, title, subtitle }) => (
  <EventInfoContainer>
    <StyledIcon name={icon} />
    <TextContainer>
      <H4 bold>{title}</H4>
      <StyledH6>{subtitle}</StyledH6>
    </TextContainer>
  </EventInfoContainer>
);

EventInfoItem.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

export { FlexedScrollView, EventInfoItem };
