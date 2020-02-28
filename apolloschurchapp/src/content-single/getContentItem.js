import gql from 'graphql-tag';
import ApollosConfig from '@apollosproject/config';

export default gql`
  query getContentItem($itemId: ID!) {
    node(id: $itemId) {
      __typename
      ... on ContentItem {
        ...contentItemFragment
      }
    }
  }
  ${ApollosConfig.FRAGMENTS.CONTENT_ITEM_FRAGMENT}
`;
