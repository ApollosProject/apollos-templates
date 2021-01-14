import gql from 'graphql-tag';

export default gql`
  mutation markCacheLoading {
    cacheMarkLoading @client
  }
`;
