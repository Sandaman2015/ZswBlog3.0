<template>
  <div>
    <cover description="{ 旅行分享 }" coverHeight="280" coverWidth="100" class="content-warp" />
    <div class="content-cont">
      <div class="wrapper clearfix-time">
        <div class="tit">
          <h5 class="f24">旅行历程</h5>
        </div>
        <ul class="clearfix-time" v-if="travelList">
          <li v-for="(item,index) in travelList" :key="index">
            <h4 class="f30">{{item.title}}</h4>
            <span class="span">{{item.createDate|filterDate}}</span>
            <viewer :images="item.content">
              <p class="f14" v-html="item.priview">{{item.priview}}</p>
            <p class="f14" v-html="item.content">{{item.content}}</p>
            <p class="f14">create by iphone 12</p>
          </viewer>
          </li>
        </ul>
        <div class="future">
          <el-button type="text" :disabled="disabled" @click="loadMore">{{message}}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import illustration from "../../components/Illustration";
import { getTravelByPage } from "../../api/share.api";
export default {
  components: {
    cover: illustration
  },
  data() {
    return {
      travelList: [],
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      message: "加载更多",
      disabled: false
    };
  },
  filters: {
    filterDate(date) {
      return date
        .toString()
        .substring(0, 10)
        .replace("-", "年")
        .replace("-", "月")
        .concat("日");
    }
  },
  created() {
    this.initLoad();
  },
  methods: {
    async initLoad() {
      await getTravelByPage(this.pageSize, this.pageIndex).then(e => {
        this.travelList = e.result.data;
        this.total = e.result.count;
      });
    },
    async loadMore() {
      this.pageIndex++;
      if (this.pageIndex * this.pageSize > this.total) {
        (this.message = "没有更多了"), (this.disabled = true);
      } else {
        await getTravelByPage(this.pageSize, this.pageIndex).then(e => {
          this.travelList = e.result.data;
          this.total = e.result.count;
        });
      }
    }
  }
};
</script>

<style scoped>
@import "../../assets/css/share/share.css";
</style>