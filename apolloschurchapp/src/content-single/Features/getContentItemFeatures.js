import gql from 'graphql-tag';
import ApollosConfig from '@apollosproject/config';

const {
  TEXT_FEATURE_FRAGMENT,
  SCRIPTURE_FEATURE_FRAGMENT,
} = ApollosConfig.FRAGMENTS;

const FEATURES_FRAGMENT = gql`
  fragment FeaturesFragment on Feature {
    id
    ...TextFeatureFragment
    ...ScriptureFeatureFragment
  }
  ${TEXT_FEATURE_FRAGMENT}
  ${SCRIPTURE_FEATURE_FRAGMENT}
`;

export default gql`
  query contentItemFeatures($contentId: ID!) {
    node(id: $contentId) {
      id
      ... on ContentSeriesContentItem {
        features {
          ...FeaturesFragment
        }
      }
      ... on WeekendContentItem {
        features {
          ...FeaturesFragment
        }
      }
    }
  }
  ${FEATURES_FRAGMENT}
`;
