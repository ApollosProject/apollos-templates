import gql from 'graphql-tag';
import ApollosConfig from '@apollosproject/config';

export default gql`
  query GetScripture($query: String!) {
    scripture(query: $query) {
      ...ScriptureFragment
    }
  }
  ${ApollosConfig.FRAGMENTS.SCRIPTURE_FRAGMENT}
`;
