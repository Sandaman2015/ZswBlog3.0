<template>
  <div id="app">
    <aplayer v-if="songList" :audio="songList" :lrcType="1" fixed/>
  </div>
</template>

<script>
import {getMusicList} from "@/api/common.api";
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
    init() {
      this.flag = true;
      this.songList.length = 0;
      getMusicList().then(e => {
        this.songList = e.result;
      })
    }
  }
};
</script>

<style>
</style>