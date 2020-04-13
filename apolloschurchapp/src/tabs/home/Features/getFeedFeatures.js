import gql from 'graphql-tag';
import ApollosConfig from '@apollosproject/config';

export default gql`
  query getFeedFeatures {
    userFeedFeatures {
      ...ActionListFeatureFragment
      ...VerticalCardListFeatureFragment
      ...HorizontalCardListFeatureFragment
    }
  }
  ${ApollosConfig.FRAGMENTS.ACTION_LIST_FEATURE_FRAGMENT}
  ${ApollosConfig.FRAGMENTS.VERTICAL_CARD_LIST_FEATURE_FRAGMENT}
  ${ApollosConfig.FRAGMENTS.HORIZONTAL_CARD_LIST_FEATURE_FRAGMENT}
`;
