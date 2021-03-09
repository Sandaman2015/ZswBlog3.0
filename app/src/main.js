import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./assets/css/font-awesome.min.css";
// Element-UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 轮播组件
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';
Vue.use(VueAwesomeSwiper);

// Vue分享功能
import Share from 'vue-social-share' ;
import 'vue-social-share/dist/client.css';
import '../node_modules/social-share.js/dist/js/social-share.min.js';
Vue.use(Share);

// // 代码高亮
import hljs from 'highlight.js' // 导入代码高亮文件
import 'highlight.js/styles/monokai-sublime.css' // 导入代码高亮样式
Vue.directive('highlight', function (el) {
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  })
})

import Viewer from 'v-viewer';
import 'viewerjs/dist/viewer.css';

Vue.use(Viewer);
Viewer.setDefaults({
  Options: { "inline": true, "button": true, "navbar": true, "title": true, "toolbar": true, "tooltip": true, "movable": true, "zoomable": true, "rotatable": true, "scalable": true, "transition": true, "fullscreen": true, "keyboard": true, "url": "data-source" }
});
// Vue音乐播放器组件
import APlayer from '@moefe/vue-aplayer';
Vue.use(APlayer, {
  defaultCover: 'https://github.com/u3u.png',
  productionTip: true,
});

// 关于页面的标签云
import tagCloud from 'v-tag-cloud';
Vue.use(tagCloud);

// 顶部进度条插件
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
NProgress.configure({
  easing: 'ease',  // 动画方式    
  speed: 2500,  // 递增进度条的速度    
  showSpinner: true, // 是否显示加载ico    
  trickleSpeed: 100, // 自动递增间隔    
  minimum: 0.1 // 初始化时的最小百分比
})
NProgress.start();
NProgress.done();

// 通用CSS
import "./assets/css/common.css";

// 粒子线条动画 
import VueParticles from 'vue-particles';
Vue.use(VueParticles);

// axios请求
import axios from "axios";
Vue.prototype.$http = axios;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
