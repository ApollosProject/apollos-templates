import gql from 'graphql-tag';

export default gql`
  mutation markCacheLoaded {
    cacheMarkLoaded @client
  }
`;
