<template>
  <div>
    <div class="card-holder box-card">
      <div class="card-wrapper">
        <a href="javascript:void(0)" @click="changePage($event)">
          <div class="card bg-01">
            <span class="card-content">本站标签</span>
          </div>
        </a>
      </div>
      <div class="card-wrapper">
        <a href="javascript:void(0)" @click="changePage($event)">
          <div class="card bg-02">
            <span class="card-content">时间线</span>
          </div>
        </a>
      </div>
      <div class="card-wrapper">
        <a href="javascript:void(0)" @click="changePage($event)">
          <div class="card bg-03">
            <span class="card-content">关于我</span>
          </div>
        </a>
      </div>
      <div class="card-wrapper">
        <a href="javascript:void(0)" @click="changePage($event)">
          <div class="card bg-04">
            <span class="card-content">关于本站</span>
          </div>
        </a>
      </div>
    </div>
    <cover description="This is ZswBlog" coverHeight="320" coverWidth="100" class="content-warp" />
    <div class="content-warp">
      <component :is="currentPage" class="component"/>
    </div>
  </div>
</template>

<script>
import illustration from "../../components/Illustration";
import aboutMe from "./about-me";
import aboutSite from "./about-site";
import siteTag from "./about-site-tag";
import timeline from "./about-timeline";
export default {
  name: "about-content",
  components: { aboutMe, aboutSite, siteTag, timeline,cover:illustration },
  data() {
    return {
      currentPage: "aboutSite"
    };
  },
  methods: {
    changePage(e) {
      let index = "";
      if (typeof e == "string") {
        index = e;
      } else if (typeof e == "object") {
        index = e.currentTarget.childNodes[0].className.substring(9, 10);
      } else if (typeof e == "undefined") {
        console.log("基地爆炸！问题不大！");
      } else {
        this.$notify.error({
          title: "错误",
          message: "好像遇到错误了！"
        });
      }
      switch (index) {
        case "1":
          this.currentPage = "siteTag";
          break;
        case "2":
          this.currentPage = "timeline";
          break;
        case "3":
          this.currentPage = "aboutMe";
          break;
        case "4":
          this.currentPage = "aboutSite";
          break;
      }
    }
  }
};
</script>

<style  scoped>
@import url("../../assets/css/about/about.css");
</style>