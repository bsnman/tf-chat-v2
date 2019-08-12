import Store from "../store";

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/chat",
    component: () => import("layouts/MyLayout.vue"),
    children: [
      {
        path: "/chat/:channelId",
        name: "Channel",
        component: () => import("pages/Chat.vue"),
        meta: {
          auth: 1
        }
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("layouts/LoginLayout.vue"),
    beforeEnter: (to, from, next) => {
      if (Store().getters["auth/isAuthenticated"]) {
        next("/chat");
        return;
      }
      next();
    },
    meta: {
      auth: 0
    },
    children: [
      {
        path: "/login",
        name: "Login",
        component: () => import("pages/Login/Login.vue"),
        meta: {
          auth: 0
        }
      },
      {
        path: "/register",
        name: "Register",
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
