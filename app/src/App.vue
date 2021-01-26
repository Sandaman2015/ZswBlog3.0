<template>
  <div id="parent">
    <common-header  v-if="isShow" />
    <router-view :key="$route.fullPath"></router-view>
    <common-footer class="float" v-if="isShow" />
    <scroll-top />
    <music style="padding:0;margin-left:0.3px;" v-if="isShow" />
    <audio v-if="!isShow" autoplay loop src="https://zswblog.oss-cn-hangzhou.aliyuncs.com/404/404.mp3">
    </audio>
    <bulletin-board />
  </div>
</template>
<script>
import "./assets/css/font-awesome.min.css";
import bulletin from "./components/bulletin-board.vue";
import $ from "./assets/js/jquery";
import head from "./components/header";
import foot from "./components/footer";
import scroll from "./components/scroll-top";
import musicLocation from "./components/vue-aplayer";
export default {
  components: {
    music: musicLocation,
    "common-header": head,
    "common-footer": foot,
    "scroll-top": scroll,
    "bulletin-board": bulletin,
  },
  data() {
    return {
      isShow: true,
    };
  },
  updated() {
    if (this.$route.fullPath == "/web/404") {
      this.isShow = false;
    }
    // const script = document.createElement("script");
    // script.src =
    //   "https://v1.cnzz.com/z_stat.php?id=1278706390&web_id=1278706390"; //友盟中的代码
    // script.language = "JavaScript";
    // document.getElementById("parent")[0].appendChild(script);
  },
  
};
</script>