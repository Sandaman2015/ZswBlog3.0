<template>  
  <header class="box">
    <div class="box-nav">
    <a href="/index" class="logo hide">ZswBlog</a>
    <!-- <a href="/index" class="logo">ZswBlog</a> -->
    <nav class="site-nav">
      <ul>
        <li>
          <a href="/index">首页</a>
        </li>
        <li>
          <a href="/article">文章</a>
        </li>
        <li>
          <a href="/category">分类</a>
        </li>
        <li>
          <a href="/message">留言</a>
        </li>
        <li>
          <a href="/link">友链</a>
        </li>
        <li>
          <a href="/share">分享</a>
        </li>
        <li>
          <a href="/about">关于</a>
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
          <a href="https://graph.qq.com/oauth2.0/authorize?client_id=101858486&response_type=token&scope=all&redirect_uri=http://www.zswblog.xyz/index"
          >直接点击登录哦！</a>
        </div>
        <a href="https://graph.qq.com/oauth2.0/authorize?client_id=101858486&response_type=token&scope=all&redirect_uri=http://www.zswblog.xyz/index"
          class="qqLogin"
          slot="reference"
        >
          <p id="userId" hidden>{{userId}}</p>
          <img :src="userImage" alt="头像" class="userImage" />
        </a>
      </el-popover>
    </div>
    <div class="media-menu">
      <a href="/index" class="logo show">ZswBlog</a>
      <div class="menu">
        <img :src="menu" @click="changeMenu" alt="menu" />
      </div>
    </div>
    <div v-if="showMenu" class="mobile-menu">
      <ul>
        <li>
          <a href="/index">
            <img src="../assets/img/icon-index.png" />
            &nbsp;&nbsp;首页
          </a>
        </li>
        <li>
          <a href="/article">
            <img src="../assets/img/icon-article.png" />
            &nbsp;&nbsp;文章
          </a>
        </li>
        <li>
          <a href="/category">
            <img src="../assets/img/icon-tag.png" />&nbsp;&nbsp;标签
          </a>
        </li>
        <li>
          <a href="/message">
            <img src="../assets/img/icon-message.png" />&nbsp;&nbsp;留言
          </a>
        </li>
        <li>
          <a href="/link">
            <img src="../assets/img/icon-link.png" />&nbsp;&nbsp;友链
          </a>
        </li>
        <li>
          <a href="/share">
            <img src="../assets/img/icon-about.png" />&nbsp;&nbsp;分享
          </a>
        </li>
        <li>
          <a href="/about">
            <img src="../assets/img/icon-about.png" />&nbsp;&nbsp;关于
          </a>
        </li>
      </ul>
    </div>
  </div>
  </header>
</template>
<script>
import { getQQUserInfo } from "../api/login.api";
import { getCookie, setCookie } from "../assets/js/cookie";
export default {
  data() {
    return {
      userId: 0,
      userImage: require("../assets/img/qq.png"),
      flag: false,
      value: false,
      showMenu: this.isMobile(),
      menu: require("../assets/img/cc-menu.png"),
      msg: "哈哈"
    };
  },
  created() {
    this.login();
  },
  methods: {
    isMobile() {
      let flag = navigator.userAgent.match(`
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i`
      );
      return flag;
    },
    changeMenu() {
      if (this.showMenu == false) {
        this.menu = require("../assets/img/error.png");
        this.showMenu = true;
      } else {
        this.menu = require("../assets/img/cc-menu.png");
        this.showMenu = false;
      }
    },
    resetCookie() {
      setCookie("userImage", "../assets/img/qq.png", -1);
      setCookie("userId", 0, -1);
      this.$message({ message: "退出成功", type: "success" });
      location.reload();
    },
    login() {
      let image = getCookie("userImage");
      let id = getCookie("userId");
      if (image !== null && id !== null && id !== 0) {
        this.userId = id;
        this.userImage = image.replace("%3A", ":");
      } else {
        this.userImage = require("../assets/img/qq.png");
        this.userId = 0;
      }
    }
  }
};
</script>

<style scoped>
@import "../assets/css/header.css";
</style>