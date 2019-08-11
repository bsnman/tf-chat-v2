import { apolloClient } from "boot/apollo";
import * as queries from "../../graphql/queries";

export default {
  namespaced: true,
  state: {
    myJoinedChannels: {},
    channelMessages: {}
  },
  getters: {
    getMyJoinedChannels: state => state.myJoinedChannels.nodes,
    getChannelMessagesCursor: state => state.myJoinedChannels.cursor,
    getChannelMessages: state => state.channelMessages.nodes
  },
  mutations: {
    setMyJoinedChannels(state, v) {
      state.myJoinedChannels = v;
    },
    setChannelMessages(state, v) {
      state.channelMessages = v;
    }
  },
  actions: {
    async loadMyJoinedChannels(context) {
      const result = await apolloClient.query({
        query: queries.myJoinedChannels
      });

      context.commit("setMyJoinedChannels", result.data.myJoinedChannels);

      return result.data.myJoinedChannels.nodes;
    },
    async loadChannelMessages(context, { channelId, cursor }) {
      const result = await apolloClient.query({
        query: queries.channelMessages,
        variables: {
          id: channelId,
          cursor
        }
      });

      context.commit("setChannelMessages", result.data.channelMessages);

      return result.data.channelMessages.nodes;
    }
  }
};
