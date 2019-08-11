import { apolloClient } from "boot/apollo";
import vueCookie from "vue-cookie";
import Vue from "vue";
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
    async authenticate(context, { email, password }) {
      const result = await apolloClient.mutate({
        mutation: login,
        variables: {
          email,
          password
        }
      });

      context.commit("setAuthentication", result.data.login.token);

      this.$router.push("/");

      return result.data.login;
    },
    authenticateGuest(context) {},
    logout(context) {
      context.commit("clearAuthentication");
      this.$router.push("/login");
    }
  }
};
