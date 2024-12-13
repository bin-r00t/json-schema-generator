import { createRouter, createWebHistory } from "vue-router";

import App from "../App.vue";
import Login from "../Login.vue";
import Dashboard from "@/views/dashboard/DashboardMain.vue";
import Chat from "@/views/chat/ChatMain.vue";

// local routes
const localRoutes = [
  {
    path: "/",
    component: App,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/dashboard",
    component: Dashboard,
  },
  {
    path: "/chat",
    component: Chat,
  },
];
// remote routes
const remoteRoutes = [];

// some nitty gretty functions......

// combine routes
const routes = [...localRoutes, ...remoteRoutes];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;