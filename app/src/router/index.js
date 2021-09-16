import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "home",
    component: () => import("../views/index/index.vue")
  },
  {
    path: "/web/",
    name: "main",
    component: () => import("../views/index/index.vue")
  },
  {
    path: "/web/404",
    name: "404",
    component: () => import("../views/404.vue")
  },
  {
    path: "/web/index",
    name: "index",
    component: () => import("../views/index/index.vue")
  },
  {
    path: "/web/article",
    name: "article",
    component: () => import("../views/article/article.vue")
  },
  {
    path: "/web/category",
    name: "category",
    component: () => import("../views/category/category.vue")
  },
  {
    path: "/web/category-details/:id",
    name: "category-detail",
    component: () => import("../views/detail/category-details.vue")
  },
  {
    path: "/web/article-details/:id",
    name: "article-detail",
    component: () => import("../views/detail/article-details.vue")
  },
  {
    path: "/web/message",
    name: "message",
    component: () => import("../views/message/message.vue")
  },
  {
    path: "/web/link",
    name: "link",
    component: () => import("../views/link/link.vue")
  },
  {
    path: "/web/share",
    name: "share",
    component: () => import("../views/share/share.vue")
  },
  {
    path: "/web/about",
    name: "about",
    component: () => import("../views/about/about.vue")
  },
  {
    path: "*",
    redirect: "/web/404"
  },
  {
    path: "/web/login",
    name: "login",
    component: () => import("../views/login.vue")
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
