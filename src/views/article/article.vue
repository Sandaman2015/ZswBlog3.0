<template>
  <div>
    <common-header />
    <v-content></v-content>
    <common-footer class="float" />
  </div>
</template>

<script>
import "@/assets/css/font-awesome.min.css";
import ScrollTop from "@/components/Gotop";
import Header from "../../components/Header";
import Content from "./article-content";
import Footer from "../../components/Footer";
export default {
  components: {
    "common-header": Header,
    "v-content": Content,
    "common-footer": Footer
  }
};
</script>

<style scoped>
@import "../../assets/css/article/left-content.css";
@import "../../assets/css/article/right-search.css";
</style>