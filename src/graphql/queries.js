import gql from "graphql-tag";

export const me = gql`
  query me {
    me {
      id
      firstName
      lastName
      displayName
      email
      userType
    }
  }
`;

export const myJoinedChannels = gql`
  query myJoinedChannels {
    myJoinedChannels {
      pageInfo {
        cursor
      }
      nodes {
        id
        title
        createdBy {
          id
        }
      }
    }
  }
`;

export const channelMessages = gql`
  query channelMessages($id: ID!, $cursor: ID) {
    channelMessages(id: $id, cursor: $cursor) {
      pageInfo {
        cursor
      }
      nodes {
        id
        user {
          id
          displayName
          userType
        }
        body
        createdAt
      }
    }
  }
`;
