<template>
  <div>
    <common-header />
    <v-content></v-content>
    <common-footer class="float" />
  </div>
</template>

<script>
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

<style>
@import "../../assets/css/article/left-content.css";
.float {
  float: left;    
}
</style>