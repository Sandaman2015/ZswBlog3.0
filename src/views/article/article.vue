<template>
  <div>
    <v-content></v-content>
  </div>
</template>

<script>
import content from "./article-content";
export default {
  components: {
    "v-content": content
  }
};
</script>

<style scoped>
@import "../../assets/css/article/left-content.css";
@import "../../assets/css/article/right-search.css";
</style>