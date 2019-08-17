import gql from "graphql-tag";

export const login = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        firstName
        lastName
        displayName
        email
        userType
      }
    }
  }
`;

export const signup = gql`
  mutation register(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    signup(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        id
        firstName
        lastName
        displayName
        userType
        email
        createdAt
        updatedAt
      }
    }
  }
`;

export const sendMessage = gql`
  mutation sendMessage($channelId: ID!, $body: String!) {
    sendMessage(channelId: $channelId, body: $body) {
      id
      channel {
        id
      }
      user {
        id
        displayName
      }
      body
      createdAt
    }
  }
`;

export const deleteMessage = gql`
  mutation deleteMessage($id: ID!) {
    deleteMessage(id: $id) {
      id
    }
  }
`;

export const updateChannel = gql`
  mutation updateChannel($id: ID!, $title: String!) {
    updateChannel(id: $id, title: $title) {
      id
      title
      createdBy {
        id
      }
    }
  }
`;
