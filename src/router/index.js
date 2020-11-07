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
    path:"/404",
    name:"404",
    component:()=>import("../views/404.vue")
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
  },
  {
    path: "/category",
    name: "category",
    component:()=>import("../views/category/category.vue")
  },
  {
    path:"/category-details/:id",
    name:"category-detail",
    component:()=>import("../views/detail/category-details.vue")
  },
  {
    path:"/article-details/:id",
    name:"article-detail",
    component:()=>import("../views/detail/article-details.vue")
  },
  {
    path:"/message",
    name:"message",
    component:()=>import("../views/message/message.vue")
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
