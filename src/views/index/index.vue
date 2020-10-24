<template>
   <div id="index">
    <div class="index-content">
      <index-content></index-content>
    </div>
  </div>
</template>

<script>
import IndexContent from "./index-content";
export default {
  components: {
    "index-content": IndexContent,
  }  
};
</script>