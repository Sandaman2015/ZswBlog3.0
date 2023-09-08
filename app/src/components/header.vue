<template>
  <header class="box">
    <div class="box-nav">
      <a href="/web/index" class="logo hide">ZswBlog</a>
      <nav class="site-nav">
        <ul>
          <li>
            <a href="/web/index">首页</a>
          </li>
          <li>
            <a href="/web/article">文章</a>
          </li>
          <li>
            <a href="/web/category">分类</a>
          </li>
          <li>
            <a href="/web/message">留言</a>
          </li>
          <li>
            <a href="/web/link">友链</a>
          </li>
          <li>
            <a href="/web/share">分享</a>
          </li>
          <li>
            <a href="/web/about">关于</a>
          </li>
        </ul>
      </nav>
      <div class="header-login">
        <el-popover placement="bottom-start" trigger="hover">
          <div v-if="userId!==0">
            <p>确定退出登录吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text">取消</el-button>
              <el-button type="primary" size="mini" @click="resetCookie">确定</el-button>
            </div>
          </div>
          <div v-else>
            <a :href="callbackUrl" target="_self" @click="loopGetUserInfo">直接点击登录哦！</a>
          </div>
          <a :href="callbackUrl" target="blank" class="qqLogin" slot="reference">
            <p id="userId" hidden>{{ userId }}</p>
            <img :src="userImage" alt="头像" class="userImage"/>
          </a>
        </el-popover>
      </div>
      <div class="media-menu">
        <a href="/web/index" class="logo show">ZswBlog</a>
        <div class="menu">
          <img :src="menu" @click="changeMenu" alt="menu"/>
        </div>
      </div>
      <div v-if="showMenu" class="mobile-menu">
        <ul>
          <li>
            <a href="/web/index">
              <img src="../assets/img/icon-index.png"/>
              &nbsp;&nbsp;首页
            </a>
          </li>
          <li>
            <a href="/web/article">
              <img src="../assets/img/icon-article.png"/>
              &nbsp;&nbsp;文章
            </a>
          </li>
          <li>
            <a href="/web/category">
              <img src="../assets/img/icon-tag.png"/>&nbsp;&nbsp;标签
            </a>
          </li>
          <li>
            <a href="/web/message">
              <img src="../assets/img/icon-message.png"/>&nbsp;&nbsp;留言
            </a>
          </li>
          <li>
            <a href="/web/link">
              <img src="../assets/img/icon-link.png"/>&nbsp;&nbsp;友链
            </a>
          </li>
          <li>
            <a href="/web/share">
              <img src="../assets/img/icon-about.png"/>&nbsp;&nbsp;分享
            </a>
          </li>
          <li>
            <a href="/web/about">
              <img src="../assets/img/icon-about.png"/>&nbsp;&nbsp;关于
            </a>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>
<script>
import {getQQLoginUrl, getQQLoginUserInfo} from "../api/login.api";
import {clear, get, set} from "../utils/storage";
import el from "element-ui/src/locale/lang/el";

export default {
  data() {
    return {
      userId: 0,
      userImage: require("../assets/img/qq.png"),
      flag: false,
      value: false,
      showMenu: this.isMobile(),
      menu: require("../assets/img/cc-menu.png"),
      callbackUrl: "",
    };
  },
  created() {
    this.loginCheck();
  },
  methods: {
    isMobile() {
      return navigator.userAgent.match(
          `/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i`
      );
    },
    changeMenu() {
      if (this.showMenu === false) {
        this.menu = require("../assets/img/error.png");
        this.showMenu = true;
      } else {
        this.menu = require("../assets/img/cc-menu.png");
        this.showMenu = false;
      }
    },
    resetCookie() {
      // 清空localstorage缓存
      clear();
      this.$message({
        message: "退出成功",
        type: "success"
      });
      location.reload();
    },
    // QQ登录
    qqLogin() {
      const params = {
        requestPath: window.location.toString()
      };
      getQQLoginUrl(params).then(e => {
        this.callbackUrl = e.result.generateUrl;
        set("state", e.result.state)
        set("requestFlag", e.result.requestFlag)
        set("expireIn", e.result.expireIn)
        console.log(e.result.expireIn, "Key过期时间");
      });
    },
    loopGetUserInfo(){
        const params = {
          state: get("state")
        }
        getQQLoginUserInfo(params).then(e => {
          // 判断是否登录成功
          if (e.result.code === 200) {
            this.userImage = e.result.user.portrait;
            this.userId = e.result.user.id;
            // 保存用户到localstorage
            set("userImage", this.userImage);
            set("userId", this.userId);
            set("userEmail", e.result.user.email);
            if (e.result.user.loginCount <= 1) {
              this.$message({
                message: "第一次访问建议先完善邮箱哦",
                type: "success"
              });
              // 此处应该弹出完善邮箱的信息
            } else {
              this.$message({
                message: "欢迎您，" + e.result.user.nickName,
                type: "success"
              });
            }
          }
        })
    },
    loginCheck() {console.log(1);
      if (get("userImage") && get("userId") && get("userEmail")) {
        this.userImage =get("userImage")
        this.userId = get("userId")
      } else {
        if (get("requestFlag") && new Date() <= new Date(get("expireIn"))){
          this.loopGetUserInfo();
        } else{
          clear();
          this.qqLogin();
        }
      }
    }
  }
};
</script>

<style scoped>
@import "../assets/css/header.css";
</style>
