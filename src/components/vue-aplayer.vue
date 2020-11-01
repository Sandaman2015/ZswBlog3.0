<template>
  <div id="app">
    <aplayer :audio="songList" :lrcType="1" fixed/>
  </div>
</template>

<script>
import { getMusicList } from "../api/common.api";
export default {
  data() {
    return {
      flag: false,
      songList: []
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      this.flag = true;
      this.songList.length = 0;
      await getMusicList().then(e=>{
        this.songList=e.result;      
      })      
    }
  }
};
</script>

<style>
</style>