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
