<template>
  <div id="parent">
    <common-header />
    <router-view :key="$route.fullPath"></router-view>
    <common-footer class="float" />
    <scroll-top/>
    <music style="padding:0;margin-left:0.3px;" />
  </div>
</template>
<script>
import "./assets/css/font-awesome.min.css";
import $ from "./assets/js/jquery";
import head from "./components/header";
import foot from "./components/footer";
import scroll from "./components/scroll-top";
  import musicLocation from "./components/vue-aplayer";
export default {  
   components: {
    "music": musicLocation,
    "common-header": head,
    "common-footer": foot,
    "scroll-top": scroll
  },
  mounted() {
    // const script = document.createElement("script");
    // script.src =
    //   "https://v1.cnzz.com/z_stat.php?id=1278706390&web_id=1278706390"; //友盟中的代码
    // script.language = "JavaScript";
    // document.getElementById("parent")[0].appendChild(script);
  } 
}
</script>