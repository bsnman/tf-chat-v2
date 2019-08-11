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
