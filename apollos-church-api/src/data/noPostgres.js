// The purpose of this file is to mock the postgres resolvers to null so the API doesn't fail when
// there's no database. This will not be necessary when Postgres is required by all Apollos APIs.
import gql from 'graphql-tag';
import { Comment, Follow } from '@apollosproject/data-connector-postgres';

export default {
  schema: gql`
    ${Comment.schema}
    ${Follow.schema}
  `,
  resolver: {
    Query: {
      followRequests: () => [],
      suggestedFollows: () => [],
      searchPeople: () => {},
    },
    Mutation: {
      addComment: () => null,
      flagComment: () => null,
      requestFollow: () => null,
      acceptFollowRequest: () => null,
      ignoreFollowRequest: () => null,
    },
    Comment: {
      person: () => null,
      id: () => null,
    },
    CommentListFeature: {
      id: () => null,
    },
    AddCommentFeature: {
      id: () => null,
      initialPrompt: () => null,
      addPrompt: () => null,
      relatedNode: () => null,
    },
    Person: {
      currentUserFollowing: () => null,
      followingCurrentUser: () => null,
    },
    SearchPeopleResultsConnection: {
      edges: () => [],
      pageInfo: () => null,
    },
  },
};
