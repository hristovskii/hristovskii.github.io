import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import BlogList from "../pages/BlogList.vue";
import BlogPost from "../pages/BlogPost.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/blog", name: "BlogList", component: BlogList },
  { path: "/blog/:slug", name: "BlogPost", component: BlogPost, props: true },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
