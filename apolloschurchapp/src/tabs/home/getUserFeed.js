import gql from 'graphql-tag';
import ApollosConfig from '@apollosproject/config';

export default gql`
  query getUserFeed($first: Int, $after: String) {
    userFeed(first: $first, after: $after) {
      pageInfo {
        endCursor
      }
      edges {
        node {
          ...contentCardFragment
        }
      }
    }
  }
  ${ApollosConfig.FRAGMENTS.CONTENT_CARD_FRAGMENT}
`;
