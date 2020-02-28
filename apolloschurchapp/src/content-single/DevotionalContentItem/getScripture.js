import gql from 'graphql-tag';
import ApollosConfig from '@apollosproject/config';

export default gql`
  query getScripture($itemId: ID!) {
    node(id: $itemId) {
      __typename
      id
      ... on DevotionalContentItem {
        scriptures {
          ...ScriptureFragment
        }
      }
    }
  }
  ${ApollosConfig.FRAGMENTS.SCRIPTURE_FRAGMENT}
`;
