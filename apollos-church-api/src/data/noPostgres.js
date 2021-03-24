// The purpose of this file is to mock the postgres resolvers to null so the API doesn't fail when
// there's no database. This will not be necessary when Postgres is required by all Apollos APIs.
import { Person } from '@apollosproject/data-connector-rock';

export default {
  resolver: {
    ...Person.resolver,
    Query: {
      followRequests: null,
      suggestedFollows: null,
      searchPeople: null,
    },
    Mutation: {
      addComment: null,
      flagComment: null,
      requestFollow: null,
      acceptFollowRequest: null,
      ignoreFollowRequest: null,
    },
    Comment: {
      person: null,
      id: null,
    },
    CommentListFeature: {
      id: null,
    },
    AddCommentFeature: {
      id: null,
      initialPrompt: null,
      addPrompt: null,
      relatedNode: null,
    },
    Person: {
      currentUserFollowing: null,
      followingCurrentUser: null,
    },
    SearchPeopleResultsConnection: {
      edges: null,
      pageInfo: null,
    },
  },
};
