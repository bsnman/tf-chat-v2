import { apolloClient } from "boot/apollo";
import vueCookie from "vue-cookie";
import * as queries from "../../graphql/queries";

export default {
  namespaced: true,
  state: {
    currentUser: {}
  },
  getters: {
    getCurrentUser: state => state.currentUser
  },
  mutations: {
    setCurrentUser(state, v) {
      state.currentUser = v;
    }
  },
  actions: {
    async loadCurrentUser(context, payload) {
      const result = await apolloClient.query({
        query: queries.me
      });

      context.commit("setCurrentUser", result.data.me);

      return result.data.me;
    }
  }
};
