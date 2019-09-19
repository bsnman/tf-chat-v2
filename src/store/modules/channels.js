import { apolloClient } from "boot/apollo";
import _ from "lodash";
import Vue from "vue";
import * as queries from "../../graphql/queries";
import * as mutations from "../../graphql/mutations";
import * as subscriptions from "../../graphql/subscriptions";

import ringtone from "../../utils/ringtone";

export default {
  namespaced: true,
  state: {
    myJoinedChannels: {},
    channelMessages: {},
    channelMembers: {},
    singleChannel: {}
  },
  getters: {
    getSingleChannel: state => state.singleChannel,
    getMyJoinedChannels: state => state.myJoinedChannels.nodes,
    getChannelMessagesCursor: state => state.channelMessages.cursor,
    getChannelMembersCursor: state => state.channelMembers.cursor,
    getChannelMessages: state => state.channelMessages.nodes,
    getChannelMembers: state => state.channelMembers.nodes,
    isViewingChannel: state => ({ channelId, currentRoute }) => {
      return (
        currentRoute.name === "Channel" &&
        currentRoute.params.channelId === channelId
      );
    }
  },
  mutations: {
    setSingleChannel(state, v) {
      state.singleChannel = v;
    },
    setMyJoinedChannels(state, v) {
      state.myJoinedChannels = v;
    },
    setChannelMessages(state, v) {
      state.channelMessages = v;
    },
    setChannelMembers(state, v) {
      state.channelMembers = v;
    },
    addMyJoinedChannel(state, v) {
      const index = state.myJoinedChannels.nodes.findIndex(
        channel => channel.id === v.id
      );

      if (index >= 0) {
        state.myJoinedChannels.nodes.splice(index, 1, v);
      } else {
        state.myJoinedChannels.nodes.unshift(v);
      }
    },
    updateChannel(state, v) {
      const index = _.findIndex(
        state.myJoinedChannels.nodes,
        e => e.id === v.id
      );

      if (index >= 0) {
        state.myJoinedChannels.nodes.splice(index, 1, v);
      }
    },
    addNewMessage(state, v) {
      const index = _.findIndex(
        state.channelMessages.nodes,
        e => e.id === v.id
      );

      if (index >= 0) {
        state.channelMessages.nodes.splice(index, 1, v);
      } else {
        state.channelMessages.nodes.unshift(v);
      }
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
    async loadSingleChannel(context, { channelId }) {
      const result = await apolloClient.query({
        query: queries.channel,
        variables: {
          id: channelId
        }
      });

      context.commit("setSingleChannel", result.data.channel);

      return result.data.channel;
    },
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
    },
    onChannelMessageMutation(context, { channelId }) {
      const self = this;

      const subscriber = apolloClient.subscribe({
        query: subscriptions.onChannelMessage,
        variables: {
          channelId
        }
      });

      subscriber.subscribe({
        next(result) {
          const currentRoute = self.$router.history.current;
          const mutatedMessage = result.data.onChannelMessage.node;
          const { previousValues } = result.data.onChannelMessage;
          const { mutation } = result.data.onChannelMessage;

          const currentUser = context.rootGetters["currentUser/getCurrentUser"];

          if (
            mutatedMessage.user.id !== currentUser.id &&
            (document.visibilityState === "hidden" ||
              !context.getters.isViewingChannel({ channelId, currentRoute }))
          ) {
            ringtone.play();
          }

          if (mutation === "CREATED") {
            context.commit("addNewMessage", mutatedMessage);
          } else if (mutation === "DELETED") {
            context.commit("removeMessage", previousValues);
          }
        }
      });
    },
    async updateChannel(context, { payload }) {
      const result = await apolloClient.mutate({
        mutation: mutations.updateChannel,
        variables: payload
      });

      context.commit("updateChannel", result.data.updateChannel);
      context.commit("setSingleChannel", payload);

      return result.data.updateChannel;
    },
    async createChannel(context, { title, initialMessage }) {
      const variables = {
        title,
        initialMessage
      };

      try {
        const result = await apolloClient.mutate({
          mutation: mutations.createChannel,
          variables
        });

        context.commit("addMyJoinedChannel", result.data.createChannel);

        return result.data.createChannel;
      } catch (err) {
        return err;
      }
    },
    async joinChannel(context, { channelId }) {
      try {
        const result = await apolloClient.mutate({
          mutation: mutations.joinChannel,
          variables: {
            id: channelId
          }
        });

        context.commit("addMyJoinedChannel", result.data.joinChannel);

        return result.data.joinChannel;
      } catch (err) {
        return err;
      }
    }
  }
};
