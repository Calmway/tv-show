import { createWebHistory, createRouter } from "vue-router";

const routes = [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/Home.vue"),
    },
    {
      path: "/show/:showId",
      name: "show",
      component: () => import("@/views/Show.vue"),
    },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
