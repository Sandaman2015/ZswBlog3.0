import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// Element-UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 轮播组件
import VueAwesomeSwiper from 'vue-awesome-swiper'
// import 'swiper/swiper-bundle.css'
// import style (>= Swiper 6.x)
// import 'swiper/swiper-bundle.css'

// import style (<= Swiper 5.x)
import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper);

// Vue分享功能
import Share from 'vue-social-share' 
import 'vue-social-share/dist/client.css';
import '../node_modules/social-share.js/dist/js/social-share.min.js'
Vue.use(Share);

// 顶部进度条插件
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({
  easing: 'ease',  // 动画方式    
  speed: 2500,  // 递增进度条的速度    
  showSpinner: true, // 是否显示加载ico    
  trickleSpeed: 100, // 自动递增间隔    
  minimum: 0.1 // 初始化时的最小百分比
})
NProgress.start();
NProgress.done();

/* 通用CSS */
import "./assets/css/common.css";

// axios请求
import axios from "axios";
Vue.prototype.$http = axios;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
