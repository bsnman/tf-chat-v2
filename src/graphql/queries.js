import gql from "graphql-tag";

export const login = gql`
  query me {
    me {
      id
      firstName
      lastName
      displayName
      userType
      email
    }
  }
`;
