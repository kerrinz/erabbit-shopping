import { createRouter, createWebHistory } from "vue-router";
import FrameLayout from "@/views/frame/FrameLayout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/home",
      component: FrameLayout,
      children: [
        {
          path: "/home",
          name: "home",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("../views/HomeView.vue"),
        },
        {
          path: "/about",
          name: "about",
          component: () => import("../views/AboutView.vue"),
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/authorization/login/AccountLogin.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () =>
        import("../views/authorization/register/AccountRegister.vue"),
    },
  ],
});
export default router;
