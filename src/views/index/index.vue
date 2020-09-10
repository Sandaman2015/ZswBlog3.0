<template>
   <div id="index">
    <div class="header">
      <index-header></index-header>
    </div>    
    <div class="index-content">
      <index-content></index-content>
      <scroll-top></scroll-top>
    </div>
  </div>
</template>

<script>
import "@/assets/css/index/nheader.css";
import "@/assets/css/index/nstyle.css";
import "@/assets/css/font-awesome.min.css";
import "@/assets/js/jquery.js"
import "@/assets/js/page.js"
import ScrollTop from "@/components/Gotop";
import IndexHeader from "./index-header";
import IndexContent from "./index-content";
export default {
  components: {
    "index-header": IndexHeader,
    "index-content": IndexContent,
    "scroll-top": ScrollTop
  },
  mounted() {
    const script = document.createElement("script");
    script.src =
      "https://v1.cnzz.com/z_stat.php?id=1278706390&web_id=1278706390"; //友盟中的代码
    script.language = "JavaScript";
    document.getElementsByClassName("header")[0].appendChild(script);
  }  
};
</script>