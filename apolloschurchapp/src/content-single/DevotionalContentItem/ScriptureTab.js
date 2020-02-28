import React from 'react';
import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { PaddedView } from '@apollosproject/ui-kit';
import ScriptureItem from '@apollosproject/ui-scripture';
import { HorizontalContentSeriesFeedConnected } from '@apollosproject/ui-connected';

/**
 * This is the Scripture side of the Devotional tabbed component.
 * Maps over an array of scripture references and renders them
 * using the ScriptureItem component.
 */
const ScriptureTab = ({ id, scripture, isLoading, navigation }) => (
  <ScrollView>
    <PaddedView>
      {scripture.map((ref, i) => (
        <ScriptureItem
          key={ref.id}
          reference={ref.reference}
          html={ref.html}
          isLoading={isLoading}
          copyright={
            // only show last copyright
            scripture.length - 1 === i ? ref.copyright : null
          }
          version={ref.version}
        />
      ))}
    </PaddedView>
    <HorizontalContentSeriesFeedConnected
      contentId={id}
      navigation={navigation}
    />
  </ScrollView>
);

ScriptureTab.propTypes = {
  /** The id of the devotional content item */
  id: PropTypes.string,
  /** Toggles placeholders */
  isLoading: PropTypes.bool,
  /** An array of scripture objects */
  scripture: PropTypes.arrayOf(
    PropTypes.shape({
      /** The ID of the verse (i.e. '1CO.15.57') */
      id: PropTypes.string,
      /** A human readable reference (i.e. '1 Corinthians 15:57') */
      reference: PropTypes.string,
      /** The scripture source to render */
      html: PropTypes.string,
      /** The copyright of the Bible version */
      copyright: PropTypes.string,
      /** The Bible version abbreviation */
      version: PropTypes.string,
    })
  ),
};

export default ScriptureTab;
