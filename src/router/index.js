import Vue from "vue";
import VueRouter from "vue-router";
// import Store from "../store";

import routes from "./routes";

Vue.use(VueRouter);

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function({ store }) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  });

  Router.beforeEach((to, from, next) => {
    console.log("hello", to);
    if (to.meta.auth && !store.getters["auth/isAuthenticated"]) {
      store.commit("auth/clearAuthentication");
      next("/login");
      return;
    }
    next();
  });

  return Router;
}
