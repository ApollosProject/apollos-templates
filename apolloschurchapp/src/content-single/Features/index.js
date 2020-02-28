import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { ErrorCard, H3, PaddedView } from '@apollosproject/ui-kit';
import { get } from 'lodash';
import TextFeature from './TextFeature';
import ScriptureFeature from './ScriptureFeature';

import GET_CONTENT_ITEM_FEATURES from './getContentItemFeatures';

const FEATURE_MAP = {
  TextFeature,
  ScriptureFeature,
};

const Features = ({ contentId }) => {
  if (!contentId) return null;

  return (
    <Query
      query={GET_CONTENT_ITEM_FEATURES}
      fetchPolicy="cache-and-network"
      variables={{ contentId }}
    >
      {({ data: { node } = {}, loading, error }) => {
        if (error) return <ErrorCard error={error} />;
        if (loading) return null;

        const features = get(node, 'features', []);
        if (!features || !features.length) return null;

        return (
          <PaddedView horizontal={false}>
            <PaddedView vertical={false}>
              <H3 padded>Engage</H3>
            </PaddedView>
            {features.map(({ __typename, ...feature }) => {
              const Feature = FEATURE_MAP[__typename];
              if (!Feature) return null;
              return (
                <Feature key={feature.id} {...feature} contentId={contentId} />
              );
            })}
          </PaddedView>
        );
      }}
    </Query>
  );
};

Features.propTypes = {
  contentId: PropTypes.string,
};

export default Features;
