import { createRouter, createWebHashHistory } from "vue-router";
import FrameLayout from "@/views/frame/FrameLayout.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
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
          component: () => import("../views/home/HomePage.vue"),
        },
        {
          path: "/product/:id",
          name: "product",
          component: () => import("../views/product/ProductDetailPage.vue"),
        },
        {
          path: "/category/:id",
          name: "category",
          component: () => import("../views/category/main-category/CategoryPage.vue"),
        },
        {
          path: "/category/sub/:id",
          name: "subcategory",
          component: () => import("../views/category/sub-category/SubCategoryPage.vue"),
        },
        {
          path: "/about",
          name: "about",
          component: () => import("../views/AboutPage.vue"),
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
      component: () => import("../views/authorization/register/AccountRegister.vue"),
    },
  ],
});
export default router;
