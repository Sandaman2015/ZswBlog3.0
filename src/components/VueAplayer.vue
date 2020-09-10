<template>
  <aplayer
    autoplay
    controls
    v-if="flag"
    :music="{
    title: '前世今生（《白蛇缘起》片尾曲）（翻自 左宏元）',
    artist: '杜南 / 龚子笑',
    src: 'http://m7.music.126.net/20200625170631/a07960a092b1503a9971ce5e9fb674e3/ymusic/075e/025c/520c/049c0bb5455612be6aebef319191d974.mp3',
    pic: 'http://p2.music.126.net/ka7kZIHdviNfYO9lqBaOEQ==/109951163906385177.jpg?param=130y130',
    lrc: ''
  }"
    :float="true"
    :list="songList"
    :showLrc="true"
    class="player"
  ></aplayer>
</template>

<script>
import axios from "axios";
import Aplayer from "vue-aplayer";
import { getTop30MusicList,getAllMusicList } from "@/api/common.api";
export default {
  components: {
    Aplayer
  },
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
      this.songList=await getTop30MusicList();      
    },
    async getAllMusic(){
      this.flag = true;
      this.songList.length = 0;
      this.songList=await getAllMusicList(); 
    }
  }
};
</script>

<style>
</style>