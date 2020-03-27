import gql from 'graphql-tag';

export default gql`
  query getFeedFeatures {
    userFeedFeatures {
      ... on ActionListFeature {
        id
        title
        subtitle
        actions {
          id
          title
          subtitle
          action
          image {
            sources {
              uri
            }
          }
          relatedNode {
            id
          }
        }
      }
      ... on VerticalCardListFeature {
        id
        title
        subtitle
        cards {
          action
          title
          hasAction
          actionIcon
          labelText
          summary
          coverImage {
            sources {
              uri
            }
          }
          relatedNode {
            id
          }
        }
      }
    }
  }
`;
