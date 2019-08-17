import { apolloClient } from "boot/apollo";
import vueCookie from "vue-cookie";
import { login, signup } from "../../graphql/mutations";
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
      context.commit("currentUser/setCurrentUser", result.data.login.user, {
        root: 1
      });

      this.$router.push("/chat");

      return result.data.login;
    },
    authenticateGuest(context) {},
    logout(context) {
      context.commit("clearAuthentication");

      apolloClient.resetStore();

      this.$router.push("/login");
    },
    async register(context, { firstName, lastName, email, password }) {
      const result = await apolloClient.mutate({
        mutation: signup,
        variables: {
          firstName,
          lastName,
          email,
          password
        }
      });

      context.commit("setAuthentication", result.data.signup.token);
      context.commit("currentUser/setCurrentUser", result.data.signup.user, {
        root: 1
      });

      this.$router.push("/chat");

      return result.data.signup;
    }
  }
};
