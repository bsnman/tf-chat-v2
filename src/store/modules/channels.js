import { apolloClient } from "boot/apollo";
import _ from "lodash";
import Vue from "vue";
import * as queries from "../../graphql/queries";

export default {
  namespaced: true,
  state: {
    myJoinedChannels: {},
    channelMessages: {},
    channelMembers: {}
  },
  getters: {
    getMyJoinedChannels: state => state.myJoinedChannels.nodes,
    getChannelMessagesCursor: state => state.channelMessages.cursor,
    getChannelMembersCursor: state => state.channelMembers.cursor,
    getChannelMessages: state => state.channelMessages.nodes,
    getChannelMembers: state => state.channelMembers.nodes
  },
  mutations: {
    setMyJoinedChannels(state, v) {
      state.myJoinedChannels = v;
    },
    setChannelMessages(state, v) {
      state.channelMessages = v;
    },
    setChannelMembers(state, v) {
      state.channelMembers = v;
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
    },
    async loadChannelMembers(context, { channelId, cursor, orderBy }) {
      const result = await apolloClient.query({
        query: queries.channelMembers,
        variables: {
          id: channelId,
          cursor,
          orderBy
        }
      });

      context.commit("setChannelMembers", result.data.channelMembers);

      return result.data.channelMembers.nodes;
    }
  }
};
