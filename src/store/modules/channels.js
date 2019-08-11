import { apolloClient } from "boot/apollo";
import _ from "lodash";
import Vue from "vue";
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
    },
    addPlaceholderMessage(state, v) {
      state.channelMessages.nodes.unshift(v);
    },
    replacePlaceholderMessage(state, { id, message }) {
      const index = _.findIndex(state.channelMessages.nodes, e => e.id === id);

      if (index >= 0) {
        state.channelMessages.nodes.splice(index, 1, message);
      }
    },
    setMessageDeleting(state, { id }) {
      const index = _.findIndex(state.channelMessages.nodes, e => e.id === id);

      console.log("deleting", index);

      if (index >= 0) {
        Vue.set(state.channelMessages.nodes[index], "isDeleting", true);
      }
    },
    removeMessage(state, { id }) {
      const index = _.findIndex(state.channelMessages.nodes, e => e.id === id);

      if (index >= 0) {
        state.channelMessages.nodes.splice(index, 1);
      }
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
    async loadChannelMessages(
      context,
      { channelId, cursor, orderBy = "createdAt_DESC" }
    ) {
      const result = await apolloClient.query({
        query: queries.channelMessages,
        variables: {
          id: channelId,
          cursor,
          orderBy
        }
      });

      context.commit("setChannelMessages", result.data.channelMessages);

      return result.data.channelMessages.nodes;
    }
  }
};
