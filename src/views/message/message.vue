<template>
  <div class="w1000">
    <cdn-flower />
    <div class="content-cont">
      <div class="form-box warp-out">
        <el-tooltip class="item" effect="dark" content="愿你遇良人 予你欢喜城 长歌暖浮生 怎知我所希求" placement="left-start">
          <el-row :gutter="24">
            <el-col :span="24">
              <h2 class="h2">留言板</h2>
              <div class="grid-content bg-purple wow zoomIn">
                <img class="banner-img" :src="bannerImage" />
              </div>
            </el-col>
          </el-row>
        </el-tooltip>
        <div class="form">
          <editor ref="baseTextarea" />
          <el-row class="btn-up">
            <el-button @click="commentsSubmit()">提交留言</el-button>
          </el-row>
        </div>
      </div>
      <div class="comment-list">
        <div class="second">
          <h2 class="h2">留言列表</h2>
          <comments :messageList="messageList" @changeList="loadMore" />
          <div class="load-more">
            <el-pagination layout="prev, pager, next" :total="total" :disabled="disabledBtn" @current-change="loadMore" :current-page="pageIndex" :page-size="limit" @prev-click="prev" @next-click="next"></el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import messageComment from "./message-comment";
import cdnFlower from "../../components/cdn-component.vue";
import editorBar from "../../components/wang-editor";
import { getMessageByPage, addMessage } from "../../api/message.api";
export default {
  components: {
    editor: editorBar,
    "cdn-flower": cdnFlower,
    comments: messageComment
  },
  data() {
    return {
      bannerImage: require("../../assets/img/liuyan.png"),
      messageList: [],
      limit: 5,
      pageIndex: 1,
      disabledBtn: false,
      message: "",
      total: 1
    };
  },
  created() {
    this.pageLoad();
  },
  methods: {
    async pageLoad() {
      await getMessageByPage(this.limit, this.pageIndex).then(e => {
        this.messageList = e.result.data;
        this.total = e.result.count;
      });
    },
    async commentsSubmit() {
      this.message = this.$refs.baseTextarea.getContent();
      let that = this;
      if (this.message !== "" && this.message !== "<p><br></p>") {
        let userId = document.getElementById("userId").innerText;
        if (parseInt(userId) !== 0) {
          if (getCookie("userEmail") !== null) {
            let ip = "";
            let url = "https://bird.ioliu.cn/ip";
            await this.$jsonp(url).then(e => {
              ip = e.data.ip;
            });
            let message = {
              Location: ip,
              Browser: this.getBrowser(),
              UserId: userId,
              Message1: this.message
            };
            await addMessage(message).then(e => {
              if (e.code == 200) {
                this.$message({
                  message: e.msg,
                  type: "success"
                });
                that.total += 1;
                that.loadMore(that.pageIndex);
              } else if (e.code == 401) {
                this.$message({
                  message: "请注册邮箱后再填写哦!",
                  type: "error"
                });
                window.location.href = "register.html";
              } else {
                this.$message({
                  message: e.msg,
                  type: "error"
                });
              }
            });
          } else {
            this.$message({
              message: "请注册邮箱后再填写哦!",
              type: "error"
            });
            window.location.href = "register.html";
          }
        } else {
          this.$message({
            message: "请先登录哦！",
            type: "error"
          });
        }
      } else {
        this.$message({
          message: "再多写点字吧,我相信你的文笔！",
          type: "error"
        });
      }
    },
    getBrowser() {
      let userAgent = navigator.userAgent; // 取得浏览器的userAgent字符串
      let broswer = "";
      let isOpera = userAgent.indexOf("Opera") > -1;
      if (isOpera) {
        broswer = "Opera";
      } else if (userAgent.indexOf("Firefox") > -1) {
        broswer = userAgent.substring(66, 78);
      } else if (userAgent.indexOf("Chrome") > -1) {
        broswer = userAgent.substring(81, 92);
      } else if (userAgent.indexOf("Safari") > -1) {
        broswer = "Safari";
      } else if (
        userAgent.indexOf("compatible") > -1 &&
        userAgent.indexOf("MSIE") > -1 &&
        !isOpera
      ) {
        broswer = "IE";
      } else if (userAgent.indexOf("Trident") > -1) {
        broswer = "Edge";
      } else {
      }
      return broswer;
    },
    async loadMore(page) {
      if (page == null) {
        page = this.pageIndex;
      }
      await getMessageByPage(this.limit, page).then(e => {
        this.messageList = e.result.data;
      });
    },
    prev(page) {
      getMessageByPage(this.limit, page).then(e => {
        this.messageList = e.result.data;
      });
    },
    next(page) {
      getMessageByPage(this.limit, page).then(e => {
        this.messageList = e.result.data;
      });
    }
  }
};
</script>

<style scoped>
@import "../../assets/css/message/message.css";
</style>