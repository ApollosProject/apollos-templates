import React from 'react';
import { View } from 'react-native';
import { withNavigation } from 'react-navigation';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';

import {
  styled,
  withTheme,
  H5,
  H6,
  HorizontalTileFeed,
  ButtonLink,
  TouchableScale,
  Touchable,
  withIsLoading,
} from '@apollosproject/ui-kit';

import { HorizontalContentCardConnected } from '@apollosproject/ui-connected';

const RowHeader = styled(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  zIndex: 2, // UX hack to improve tapability. Positions RowHeader above StyledHorizontalTileFeed
  paddingLeft: theme.sizing.baseUnit,
}))(View);

const Name = styled({
  flexGrow: 2,
})(View);

const AndroidTouchableFix = withTheme(({ theme }) => ({
  borderRadius: theme.sizing.baseBorderRadius / 2,
}))(Touchable);

const ButtonLinkSpacing = styled(({ theme }) => ({
  flexDirection: 'row', // correctly positions the loading state
  justifyContent: 'flex-end', // correctly positions the loading state
  padding: theme.sizing.baseUnit, // UX hack to improve tapability.
}))(View);

const StyledHorizontalTileFeed = styled(({ theme }) => ({
  /* UX hack to improve tapability. The magic number below happens to be the number of pixels that
   * aligns everything in the same place as if none of the UX hacks were there. */
  marginTop: theme.sizing.baseUnit * -1.25,
  paddingBottom: theme.sizing.baseUnit,
  zIndex: 1,
}))(HorizontalTileFeed);

const loadingStateObject = {
  id: 'fake_id',
  title: '',
  coverImage: [],
};

const TileContentFeed = ({ isLoading, id, name, navigation, content = [] }) =>
  (isLoading || !isEmpty(content)) && (
    <>
      <RowHeader>
        <Name>
          <H5>{name}</H5>
        </Name>
        <AndroidTouchableFix
          onPress={() => {
            navigation.navigate('ContentFeed', {
              itemId: id,
              itemTitle: name,
            });
          }}
        >
          <ButtonLinkSpacing>
            <H6>
              <ButtonLink>View All</ButtonLink>
            </H6>
          </ButtonLinkSpacing>
        </AndroidTouchableFix>
      </RowHeader>
      <StyledHorizontalTileFeed
        content={content}
        renderItem={({ item }) => (
          <TouchableScale
            onPress={() => {
              navigation.push('ContentSingle', {
                itemId: item.id,
              });
            }}
          >
            <HorizontalContentCardConnected
              contentId={item.id}
              isLoading={isLoading}
            />
          </TouchableScale>
        )}
        loadingStateObject={loadingStateObject}
        isLoading={isLoading}
      />
    </>
  );

TileContentFeed.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
  isLoading: PropTypes.bool,
  id: PropTypes.string,
  name: PropTypes.string,
  content: PropTypes.arrayOf(
    PropTypes.any // this component doesn't care about the shape of `node`, just that it exists
  ),
};

export default withNavigation(withIsLoading(TileContentFeed));
