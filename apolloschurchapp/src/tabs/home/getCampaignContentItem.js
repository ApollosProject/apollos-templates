import gql from 'graphql-tag';

import ApollosConfig from '@apollosproject/config';

export default gql`
  query campaigns {
    campaigns {
      edges {
        node {
          childContentItemsConnection {
            edges {
              node {
                ...contentCardFragment
              }
            }
          }
        }
      }
    }
  }
  ${ApollosConfig.FRAGMENTS.CONTENT_CARD_FRAGMENT}
`;
