import Store from "../store";

const routes = [
  {
    path: "/",
    component: () => import("layouts/MyLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/Chat.vue"),
        meta: {
          auth: 1
        }
      }
    ]
  },
  {
    path: "/login",
    component: () => import("layouts/LoginLayout.vue"),
    beforeEnter: (to, from, next) => {
      if (Store().getters["auth/isAuthenticated"]) {
        next("/");
        return;
      }
      next();
    },
    children: [
      {
        path: "",
        component: () => import("pages/Login/Login.vue")
      },
      {
        path: "/register",
        component: () => import("pages/Login/Register.vue")
      }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
