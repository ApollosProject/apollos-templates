import gql from 'graphql-tag';

export default gql`
  query authToken {
    authToken @client
  }
`;
