import { apolloClient } from "boot/apollo";
import vueCookie from "vue-cookie";
import { login } from "../../graphql/mutations";
import Cons from "../../utils/constants";

export default {
  namespaced: true,
  state: {},
  getters: {
    isAuthenticated() {
      const token = vueCookie.get(Cons.COOKIE.USER_TOKEN);

      if (token) {
        return true;
      }
      return false;
    }
  },
  mutations: {
    clearAuthentication() {
      vueCookie.delete(Cons.COOKIE.USER_TOKEN);
    },
    setAuthentication(state, token) {
      vueCookie.set(Cons.COOKIE.USER_TOKEN, token, { expire: "1D" });
    }
  },
  actions: {
    authenticate(context, { email, password }) {
      apolloClient.mutate({
        mutation: login,
        variables: {
          email,
          password
        }
      });
    },
    authenticateGuest(context) {}
  }
};
