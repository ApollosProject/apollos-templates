import React from 'react';
import { Animated, Dimensions } from 'react-native';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import {
  ContentHTMLViewConnected,
  HorizontalContentSeriesFeedConnected,
  LiveConsumer,
  MediaControlsConnected,
  ContentSingleFeaturesConnected,
} from '@apollosproject/ui-connected';
import {
  styled,
  GradientOverlayImage,
  BackgroundView,
  PaddedView,
  H2,
  StretchyView,
  ThemeMixin,
  ThemeConsumer,
  CardLabel,
  withTheme,
} from '@apollosproject/ui-kit';

const FlexedScrollView = styled({ flex: 1 })(Animated.ScrollView);

const Header = styled(({ hasMedia, theme }) => ({
  paddingTop: Dimensions.get('window').width * 0.5, // for some reason % based padding still is buggy
  alignItems: 'flex-start',
  paddingBottom: hasMedia ? theme.sizing.baseUnit : theme.sizing.baseUnit * 2,
  // backgroundColor: theme.colors.primary,
}))(PaddedView);

const StyledMediaControlsConnected = styled(({ theme }) => ({
  marginTop: -(theme.sizing.baseUnit * 2.5),
}))(MediaControlsConnected);

const LiveAwareLabel = withTheme(({ isLive, title, theme }) => ({
  ...(isLive
    ? {
        title: 'Live',
        type: 'secondary',
        icon: 'live-dot',
        iconSize: theme.helpers.rem(0.4375), // using our typographic size unit based on fontSize so that the icon scales correctly with font size changes.
      }
    : {
        title,
      }),
}))(CardLabel);

const WeekendContentItem = ({ content, loading }) => {
  const coverImageSources = get(content, 'coverImage.sources', []);
  return (
    <ThemeConsumer>
      {(theme) => (
        <BackgroundView>
          <StretchyView>
            {({ Stretchy, ...scrollViewProps }) => (
              <FlexedScrollView {...scrollViewProps}>
                <Header hasMedia={content.videos && content.videos.sources}>
                  <ThemeMixin mixin={{ type: 'dark' }}>
                    {coverImageSources.length || loading ? (
                      <Stretchy
                        background
                        style={{ backgroundColor: theme.colors.primary }}
                      >
                        <GradientOverlayImage
                          isLoading={!coverImageSources.length && loading}
                          overlayColor={theme.colors.primary}
                          overlayType="featured"
                          source={coverImageSources}
                        />
                      </Stretchy>
                    ) : null}
                    <LiveConsumer contentId={content.id}>
                      {(liveStream) => (
                        <LiveAwareLabel
                          isLive={!!liveStream}
                          title={
                            content.parentChannel && content.parentChannel.name
                          }
                        />
                      )}
                    </LiveConsumer>
                    <H2 padded isLoading={!content.title && loading}>
                      {content.title}
                    </H2>
                    <ContentHTMLViewConnected contentId={content.id} />
                  </ThemeMixin>
                </Header>
                <StyledMediaControlsConnected contentId={content.id} />
                <ContentSingleFeaturesConnected contentId={content.id} />
                <HorizontalContentSeriesFeedConnected contentId={content.id} />
              </FlexedScrollView>
            )}
          </StretchyView>
        </BackgroundView>
      )}
    </ThemeConsumer>
  );
};

WeekendContentItem.propTypes = {
  content: PropTypes.shape({
    __typename: PropTypes.string,
    parentChannel: PropTypes.shape({
      name: PropTypes.string,
    }),
    id: PropTypes.string,
    title: PropTypes.string,
    videos: PropTypes.arrayOf(PropTypes.shape({ sources: PropTypes.array })),
  }),
  loading: PropTypes.bool,
};

export default WeekendContentItem;
