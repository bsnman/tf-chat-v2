import { apolloClient } from 'boot/apollo';
import { login } from '../../graphql/mutations';

export default {
  namespaced: true,
  state: {

  },
  getters: {

  },
  mutations: {

  },
  actions: {
    authenticate(context, { email, password }) {
      apolloClient.mutate({
        mutation: login,
        variables: {
          email: 'radihjrprgs@gmail.com',
          password: 'test123',
        },
      });
    },
  },
};
