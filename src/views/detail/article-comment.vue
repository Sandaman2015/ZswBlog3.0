<template>
  <div>
    <div class="cont wow fadeInRight">
      <ul>
        <li v-for="(item,index) in commentsList" :key="index">
          <div class="main-reply">
            <div class="user-info">
              <!-- 图片的路径 -->
              <img :src="item.article-detail.userPortrait" alt="头像" class="userImage" />
              <p class="info">
                <!-- 用户名 -->
                <a href="javascript:void(0)" class="name white">{{item.userName}}</a>
              </p>
              <div class="comment" v-html="item.comment"></div>
              <div class="more">
                <p class="date">
                  <i class="fa fa-calendar-o" aria-hidden="true"></i>
                  {{item.createDate|subTDate}}
                </p>
                <p class="location">
                  <i class="fa fa-location-arrow" aria-hidden="true"></i>
                  {{item.location}}
                </p>
                <p class="browser">
                  <i class="fa fa-chrome" aria-hidden="true"></i>
                  {{item.browser}}
                </p>
                <p class="submit">
                  <el-button type="text" class="reply fir-reply" @click="showEditor($event)">回复</el-button>
                </p>
              </div>
            </div>
            <div v-bind:class="{'editor-reply':true,'hide':true }">
              <form class="form">
                <div class="reply-box">
                  <editor ref="textArea" />
                </div>
                <div class="submit">
                  <el-button @click="mainSubmit(index,$event)" size="small">提交回复</el-button>
                  <span hidden>{{item.userId}}</span>
                  <span hidden>{{item.id}}</span>
                </div>
              </form>
            </div>
          </div>
          <div class="all-reply">
            <div class="reply-list" v-for="(replyEntry,replyIndex) in item.children" :key="replyIndex">
              <div class="user-info">
                <img :src="replyEntry.userPortrait" alt="头像" class="userImage" />
                <p class="info">
                  <a href="javascript:void(0)" class="name">{{replyEntry.userName}}</a>
                  <span class="ct">
                    &nbsp;&nbsp;回复&nbsp;&nbsp;
                    <a
                      href="javascript:void(0)"
                    >@{{replyEntry.targetUserName}}</a>&nbsp;&nbsp;:
                  </span>
                </p>
                <div class="comment sec-coment" v-html="replyEntry.content"></div>
                <div class="more">
                  <p class="date">
                    <i class="fa fa-calendar-o" aria-hidden="true"></i>
                    {{replyEntry.createDate|subTDate}}
                  </p>
                  <p class="location">
                    <i class="fa fa-location-arrow" aria-hidden="true"></i>
                    {{replyEntry.location}}
                  </p>
                  <p class="browser">
                    <i class="fa fa-chrome" aria-hidden="true"></i>
                    {{replyEntry.browser}}
                  </p>
                  <p class="submit">
                    <el-button type="text" class="reply fir-reply" @click="showEditor($event)">回复</el-button>
                  </p>
                </div>
              </div>
              <div v-bind:class="{'editor-reply':true,'hide':isShow}">
                <form class="form">
                  <div class="reply-box">
                    <editor :ref="'replytextArea'+index" />
                  </div>
                  <div class="submit">
                    <el-button @click="replySubmit(index,replyIndex,$event)" size="small">提交回复</el-button>
                    <span hidden>{{replyEntry.userId}}</span>
                    <span hidden>{{replyEntry.id}}</span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import editorBar from "../../components/wang-editor";
import { addComment } from "../../api/comment.api";
import { getCookie } from "../../assets/js/cookie";
export default {
  components: {
    editor: editorBar
  },
  props: {
    commentsList: {
      type: Array
    },
    articleId: {
      type: String
    }
  },
  data() {
    return {
      isShow: true,
      replyText: ""
    };
  },
  filters: {
    // 过滤日期
    subTDate(data) {
      return data.toString().replace("T", " ");
    }
  },
  methods: {
    // 显示文本编辑器
    showEditor(e) {
      if (
        e.currentTarget.parentElement.parentElement.parentElement.parentElement
          .childNodes[1].nextElementSibling.className == "editor-reply hide"
      ) {
        e.currentTarget.parentElement.parentElement.parentElement.parentElement.childNodes[1].nextElementSibling.className =
          "editor-reply";
        e.currentTarget.innerText = "收起";
      } else {
        e.currentTarget.parentElement.parentElement.parentElement.parentElement.childNodes[1].nextElementSibling.className =
          "editor-reply hide";
        e.currentTarget.innerText = "回复";
      }
    },
    // 第一个回复
    async mainSubmit(index, target) {
      const mainText = this.$refs.textArea[index].getContent();
      if (mainText !== "" && mainText !== "<p><br></p>") {
        let userId = document.getElementById("userId").innerText;
        if (parseInt(userId) !== 0) {
          if (getCookie("userEmail") !== null) {
            let ip = "";
            let url = "https://bird.ioliu.cn/ip";
            await this.$jsonp(url).then(e => {
              ip = e.data.ip;
            });
            let tUserId =
              target.target.parentElement.parentElement.childNodes[2].innerText;
            let tId = parseInt(
              target.target.parentElement.parentElement.childNodes[4].innerText
            );
            // 主回复
            let comment = {
              location: ip,
              browser: this.getBrowser(),
              userId: userId,
              articleId: this.articleId,
              content: mainText,
              targetId: tId,
              targetUserId: tUserId
            };
            await addComment(comment).then(e => {
              if (e.code == 200) {
                this.$message({
                  message: e.msg,
                  type: "success"
                });
                this.changeCommentList();
              } else if (e.code == 401) {
                this.$message({
                  message: "请注册邮箱后再填写哦!",
                  type: "warning"
                });
                window.location.href = "register.html";
              }
            });
          } else {
            this.$message({
              message: "请注册邮箱后再填写哦!",
              type: "warning"
            });
            window.location.href = "register.html";
          }
        } else {
          this.$message({
            message: "请先登录哦！",
            type: "warning"
          });
        }
      } else {
        this.$message({
          message: "再多写点字吧,我相信你的文笔！",
          type: "warning"
        });
      }
    },
    // 获取浏览器
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
    // 第二个回复
    async replySubmit(index, replyIndex, target) {
      //分五次判断
      switch (index) {
        case 0:
          this.replyText = this.$refs.replytextArea0[replyIndex].getContent();
          break;
        case 1:
          this.replyText = this.$refs.replytextArea1[replyIndex].getContent();
          break;
        case 2:
          this.replyText = this.$refs.replytextArea2[replyIndex].getContent();
          break;
        case 3:
          this.replyText = this.$refs.replytextArea3[replyIndex].getContent();
          break;
        case 4:
          this.replyText = this.$refs.replytextArea4[replyIndex].getContent();
          break;
      }
      if (this.replyText !== "" && this.replyText !== "<p><br></p>") {
        let userId = document.getElementById("userId").innerText;
        if (parseInt(userId) !== 0) {
          if (getCookie("userEmail") !== null) {
            let ip = "";
            let url = "https://bird.ioliu.cn/ip";
            await this.$jsonp(url).then(e => {
              ip = e.data.ip;
            });

            let tUserId =
              target.target.parentElement.parentElement.childNodes[2].innerText;
            let tId = parseInt(
              target.target.parentElement.parentElement.childNodes[4].innerText
            );
            
            // 主回复
            let comment = {
              location: ip,
              browser: this.getBrowser(),
              userId: userId,
              articleId: this.articleId,
              content: this.replyText,
              targetId: tId,
              targetUserId: tUserId
            };
            await addComment(comment).then(e => {
              if (e.code == 200) {
                this.$message({
                  message: e.msg,
                  type: "success"
                });
                this.changeCommentList();
              } else if (e.code == 401) {
                this.$message({
                  message: "请注册邮箱后再填写哦!",
                  type: "warning"
                });
                window.location.href = "register.html";
              } 
            });
          } else {
            this.$message({
              message: "请注册邮箱后再填写哦!",
              type: "warning"
            });
            window.location.href = "register.html";
          }
        } else {
          this.$message({
            message: "请先登录哦！",
            type: "warning"
          });
        }
      } else {
        this.$message({
          message: "再多写点字吧,我相信你的文笔！",
          type: "warning"
        });
      }
    },
    changeCommentList() {
      this.$emit("changeList");
    }
  }
};
</script>

<style scoped>
.hide {
  display: none;
}

.comments .cont {
  display: block !important;
}
.user-info .userImage {
  float: left;
  margin: 10px 10px;
  border-radius: 20px;
}
.user-info .info {
  margin-top: 15px;
  margin-bottom: 10px;
  height: 20px;
}

.name {
  float: left;
  font-size: 16px;
}

.date {
  float: left;
}

.comment {
  width: 900px;
  margin-left: 65px;
}

.comment > p {
  font-size: 16px;
}

.submit {
  float: left;
  text-align: center;
}
.submit .reply {
  line-height: 21px;
}
.info .ct {
  float: left;
}

.more {
  line-height: 25px;
  margin-left: 65px;
  margin-top: 10px;
  font-size: 13px;
  color: #555;
}
.more:after {
  content: "";
  display: table;
  clear: both;
}

.location {
  float: left;
  margin-left: 20px;
}

.browser {
  float: left;
  margin-left: 20px;
}
.main-reply {
  float: left;
}

a {
  color: #66b1ff;
  text-decoration: none;
}
.reply-box {
  position: relative;
  width: 100%;
}
.editor-reply {
  margin-top: 10px;
}
.all-reply {
  float: right;
}
.reply-list {
  float: right;
  border-top: #96c2f1 dashed 1px;
}
ul:after {
  content: "";
  display: table;
  clear: both;
}
li {
  float: left;
  width: 100%;
  min-height: 100px;
  margin-top: 10px;
  border-top: ghostwhite solid 1px;
  list-style: none;
  display: block;
}
li:before {
  content: "";
  display: table;
  clear: both;
}
p {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
</style>