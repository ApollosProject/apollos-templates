import gql from 'graphql-tag';
import ApollosConfig from '@apollosproject/config';

export default gql`
  query getContentItem($itemId: ID!) {
    node(id: $itemId) {
      __typename
      ... on ContentItem {
        ...contentCardFragment
      }
      ... on WeekendContentItem {
        featureFeed {
          id
        }
      }
      ... on ContentSeriesContentItem {
        featureFeed {
          id
        }
      }
    }
  }
  ${ApollosConfig.FRAGMENTS.CONTENT_CARD_FRAGMENT}
`;
