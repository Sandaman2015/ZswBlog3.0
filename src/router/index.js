import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "main",
    component:()=>import("../views/index/index.vue")
  },
  {
    path: "/index",
    name: "index",
    component:()=>import("../views/index/index.vue")
  },
  {
    path: "/article",
    name: "article",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/article/article.vue")
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
