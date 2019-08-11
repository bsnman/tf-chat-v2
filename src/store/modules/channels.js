import { apolloClient } from "boot/apollo";
import * as queries from "../../graphql/queries";

export default {
  namespaced: true,
  state: {
    myJoinedChannels: {}
  },
  getters: {
    getMyJoinedChannels: state => state.myJoinedChannels.nodes
  },
  mutations: {
    setMyJoinedChannels(state, v) {
      state.myJoinedChannels = v;
    }
  },
  actions: {
    async loadMyJoinedChannels(context) {
      const result = await apolloClient.query({
        query: queries.myJoinedChannels
      });

      context.commit("setMyJoinedChannels", result.data.myJoinedChannels);

      return result.data.myJoinedChannels.nodes;
    }
  }
};
