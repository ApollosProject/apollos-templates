import gql from 'graphql-tag';

export default gql`
  query searchResults($searchText: String!) {
    search(query: $searchText) {
      edges {
        title
        summary
        coverImage {
          name
          sources {
            uri
          }
        }
        cursor
        node {
          ... on ContentItem {
            id
            __typename
          }
        }
      }
    }
  }
`;
