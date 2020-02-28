import React from 'react';
import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import {
  ContentHTMLViewConnected,
  HorizontalContentSeriesFeedConnected,
} from '@apollosproject/ui-connected';
import { PaddedView, H2, styled, withIsLoading } from '@apollosproject/ui-kit';
import { ScriptureList } from '@apollosproject/ui-scripture';

const ContentContainer = withIsLoading(
  styled({ paddingVertical: 0 })(PaddedView)
);

/**
 * This is the Content side of the Devotional tabbed component.
 * Displays a header, scripture list (using the ScriptureList component),
 * and the body text of the devo.
 */
const ContentTab = ({
  id,
  title,
  references,
  isLoading,
  navigationState,
  navigation,
}) => (
  <ScrollView>
    <ContentContainer isLoading={isLoading}>
      <H2 padded>{title}</H2>
      {references && references.length ? (
        <ScriptureList
          references={references}
          onPress={navigationState.route.jumpTo} // eslint-disable-line react/jsx-handler-names
          tabDestination={'scripture'}
        />
      ) : null}
      <ContentHTMLViewConnected contentId={id} />
    </ContentContainer>
    <HorizontalContentSeriesFeedConnected
      contentId={id}
      navigation={navigation}
    />
  </ScrollView>
);

ContentTab.propTypes = {
  /** The id of the devotional item */
  id: PropTypes.string,
  /** Toggles placeholders */
  isLoading: PropTypes.bool,
  /**
   * The state of the TabView component (of which the ContentTab is one child component). Mostly used
   * for the ScriptureList component to be able to jump to the ScriptureTab when the scripture
   * reference link is tapped.
   */
  navigationState: PropTypes.shape({ routes: PropTypes.array }),
  /** An array of human readable references (i.e. '1 Corinthians 15:57') */
  references: PropTypes.arrayOf(PropTypes.string),
  /** The devotional title */
  title: PropTypes.string,
  navigation: PropTypes.shape({ navigate: PropTypes.array }).isRequired,
};

export default ContentTab;
