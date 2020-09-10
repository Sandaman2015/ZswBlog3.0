import Vue from "vue";
import VueRouter from "vue-router";
import index from "../views/index/index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    component:()=>import("../views/index/index.vue")
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
