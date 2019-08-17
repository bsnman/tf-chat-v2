import gql from "graphql-tag";

export const onChannelMessage = gql`
  subscription onChannelMessage($mutationIn: [MutationType!], $channelId: ID!) {
    onChannelMessage(mutationIn: $mutationIn, channelId: $channelId) {
      mutation
      node {
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
      previousValues {
        id
      }
    }
  }
`;
