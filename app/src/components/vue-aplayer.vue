<template>
  <div id="app">
    <!--    <aplayer v-if="songList" :audio="songList" :lrcType="1" fixed/>-->
    <div id="aplayer"></div>
  </div>
</template>

<script>
import {getMusicList} from "@/api/common.api";
import 'aplayer/dist/APlayer.min.css';
import APlayer from 'aplayer';

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
      await getMusicList().then(e => {
        // this.songList = e.result;
        const ap = new APlayer({
          container: document.getElementById('aplayer'),
          fixed: true,
          autoplay: true,
          order: 'random',
          volume: 0.7,
          lrcType: 1,
          audio: e.result
        });
      })
    },
  }
};
</script>

<style>
</style>