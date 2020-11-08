<template>
    <div class="content-cont">
      <el-timeline>
        <el-timeline-item
        v-if="timelineList"
          :timestamp="item.createDate|filterYear"
          v-for="(item,index) in timelineList"
          :key="item.id"
          class="animated fadeInLeft"
          :color="color"
          placement="top"
          :size="size"
          :icon="icon"
          type="success"
        >
          <el-card>
            <h2>{{item.title}}</h2>
            <p class="time">Sandaman 提交于 {{item.createDate|filterDate}}</p>
            <div v-html="item.content" class="iframe">{{item.content}}</div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </template>
  
  <script>
  import { getAllTimeLine } from "../../api/about.api";
  export default {
    data() {
      return {
        timelineList: [],
        color: "#0bbd87",
        size: "large",
        icon: "el-icon-sunny"
      };
    },
    created() {
      this.pageLoad();
    },
    filters: {
      filterDate(date) {
        return date
        .toString()
        .substring(0, 10)
        .replace("-", "年")
        .replace("-", "月")
        .concat("日");
      },
      filterYear(year) {
        return (
          year.toString().substring(0, 4) +
          "年" +
          year.toString().substring(4, 7).replace("-0", "") +
          "月"
        );
      }
    },
    methods: {
      async pageLoad() {
        await getAllTimeLine().then(e => {
          this.timelineList = e.result;
        });
      }
    }
  };
  </script>
  
  <style  scoped>
  .iframe {
    margin-top: 25px;
  }
  .time {
    font-size: 13px;
    color: #555;
  }
  .el-timeline-item__node {
    background-color: cornflowerblue;
  }
  @media screen and (max-width: 475px) {
    .el-card .is-always-shadow img {
      max-width: 100% !important;
    }
  }
  </style>