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
  query channelMessages($id: ID!, $cursor: ID, $orderBy: MessageOrderByInput) {
    channelMessages(id: $id, cursor: $cursor, orderBy: $orderBy) {
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

export const channelMembers = gql`
  query channelMembers($id: ID!, $orderBy: UserOrderByInput, $cursor: ID) {
    channelMembers(id: $id, orderBy: $orderBy, cursor: $cursor) {
      pageInfo {
        cursor
      }
      nodes {
        id
        displayName
        email
        userType
      }
    }
  }
`;
