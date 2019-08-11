import { apolloClient } from "boot/apollo";
import { uid } from "quasar";
import * as queries from "../../graphql/queries";
import * as mutations from "../../graphql/mutations";

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async sendMessage(context, { channelId, body }) {
      const placeholderMessage = {
        id: uid(),
        body,
        user: context.rootGetters["currentUser/getCurrentUser"],
        createdAt: new Date(),
        isPlaceholder: true
      };

      context.commit("channels/addPlaceholderMessage", placeholderMessage, {
        root: 1
      });

      const result = await apolloClient.mutate({
        mutation: mutations.sendMessage,
        variables: {
          channelId,
          body
        }
      });

      const newMessage = result.data.sendMessage;

      context.commit(
        "channels/replacePlaceholderMessage",
        {
          id: placeholderMessage.id,
          message: newMessage
        },
        {
          root: 1
        }
      );

      return newMessage;
    },
    async deleteMessage(context, { messageId }) {
      context.commit(
        "channels/setMessageDeleting",
        { id: messageId },
        {
          root: 1
        }
      );

      const result = await apolloClient.mutate({
        mutation: mutations.deleteMessage,
        variables: {
          id: messageId
        }
      });

      const { deleteMessage } = result.data;

      context.commit(
        "channels/removeMessage",
        {
          id: messageId
        },
        {
          root: 1
        }
      );

      return deleteMessage;
    }
  }
};
