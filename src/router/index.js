import {
  createRouter,
  // createWebHashHistory,
  createWebHistory,
} from "vue-router";
const gameView = () => import("../views/gameView.vue");
// import gameView from "../views/gameView.vue";
import homeView from "../views/homeView.vue";
import newUserView from "../views/newUserView.vue";
import loadingView from "../views/loadingView.vue";
import introPage from "../components/newUserView/introPage.vue";
import selectPage from "../components/newUserView/selectPage.vue";

const routes = [
  { path: "/", redirect: "/loading" },
  { path: "/loading", component: loadingView },
  { path: "/home", component: homeView },
  { path: "/game", component: gameView },
  {
    path: "/newUser",
    component: newUserView,
    children: [
      {
        path: "intro",
        component: introPage,
      },
      {
        path: "select",
        component: selectPage,
      },
    ],
  },
  { path: "/:path(.*)", redirect: "/loading" },
];

const router = createRouter({
  history: createWebHistory(), //历史模式在后端服务器路由要写一个非匹配任何资源就返回index主页
  routes, // short for `routes: routes`
});

export default router;
