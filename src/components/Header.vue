<template>
  <header class="box">
    <!-- //使用组件 -->
    <scroll-top />
    <a href="index.html" class="logo hide">ZswBlog</a>
    <!-- <a href="index.html" class="logo">ZswBlog</a> -->
    <nav class="site-nav">
      <ul>
        <li>
          <a href="index.html">首页</a>
        </li>
        <li>
          <a href="whisper.html">文章</a>
        </li>
        <li>
          <a href="tags.html">标签</a>
        </li>
        <li>
          <a href="leacots.html">留言</a>
        </li>
        <li>
          <a href="link.html">友链</a>
        </li>
        <li>
          <a href="about.html">关于</a>
        </li>
      </ul>
    </nav>
    <div class="head-login">
      <el-popover placement="bottom-start" trigger="hover">
        <div v-if="userId!==0">
          <p>确定退出登录吗？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text">取消</el-button>
            <el-button type="primary" size="mini" @click="resetCookie">确定</el-button>
          </div>
        </div>
        <div v-else>
          <a
            href="https://graph.qq.com/oauth2.0/authorize?client_id=101858486&response_type=token&scope=all&redirect_uri=http://www.zswblog.xyz/index.html"
          >直接点击登录哦！</a>
        </div>
        <a
          href="https://graph.qq.com/oauth2.0/authorize?client_id=101858486&response_type=token&scope=all&redirect_uri=http://www.zswblog.xyz/index.html"
          id="qqLogin"
          slot="reference"
        >
          <p id="userId" hidden>{{userId}}</p>

          <img :src="userImage" alt="头像" class="userImage" />
        </a>
      </el-popover>
    </div>
    <div class="media-menu">
      <a href="index.html" class="logo show">ZswBlog</a>
      <div class="menu">
        <img :src="menu" @click="changeMenu" alt="menu" />
      </div>
    </div>
    <div v-if="showMenu" class="mobile-menu">
      <ul>
        <li>
          <a href="index.html">
            <img src="../assets/img/index.png" />
            &nbsp;&nbsp;首页
          </a>
        </li>
        <li>
          <a href="whisper.html">
            <img src="../assets/img/article.png" />
            &nbsp;&nbsp;文章
          </a>
        </li>
        <li>
          <a href="tags.html">
            <img src="../assets/img/tag.png" />&nbsp;&nbsp;标签
          </a>
        </li>
        <li>
          <a href="leacots.html">
            <img src="../assets/img/message.png" />&nbsp;&nbsp;留言
          </a>
        </li>
        <li>
          <a href="link.html">
            <img src="../assets/img/link.png" />&nbsp;&nbsp;友链
          </a>
        </li>
        <li>
          <a href="about.html">
            <img src="../assets/img/about.png" />&nbsp;&nbsp;关于
          </a>
        </li>
      </ul>
    </div>
  </header>
</template>
<script>
import ScrollTop from "./Gotop";
import $ from "@/assets/js/jquery.js";
import "@/assets/js/header.js";
import "@/assets/js/scroll.js";
import { getQQUserInfo } from "@/api/login.api";
import { getCookie, setCookie } from "@/assets/js/cookie";
export default {
  components: {
    "scroll-top": ScrollTop
  },
  data() {
    return {
      userId: 0,
      userImage: require("../assets/img/qq.png"),
      flag: false,
      value: false,
      showMenu: false,
      menu: require("../assets/img/cc-menu.png"),
      msg: "哈哈"
    };
  },
  created() {
    this.login();
  },
  methods: {
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

.media-menu {
  display: none;
}
@media screen and (max-width: 475px) {
  .media-menu {
    display: flex;
  }
  .fa-bars {
    font-size: 28px;
  }

  .menu {
    position: relative;
    line-height: 100px;
    margin-left: 36%;
    width: 100%;
  }
  .menu img {
    line-height: 100px;
  }
  .mobile-menu {
    display: inline-block;
    position: relative;
    width: 96%;
    height: 270px;
    z-index: 99999;
    margin: 0px 2%;
    background-color: rgba(0, 0, 0, 0.8);
  }
  .mobile-menu ul {
    content: "";
    display: table !important;
    clear: both;
    position: absolute;
    width: 100%;
  }
  .mobile-menu ul li {
    padding: 0 !important;
    height: 28px;
    line-height: 28px;
    margin: 15px 0;
    transition: 0.5s;
  }
  .box-active .mobile-menu ul li a {
    display: block;
    color: #fff !important;
    text-align: center;
    font-size: 26px;
    font-weight: 400;
    font-family: Microsoft YaHei;
  }
  .mobile-menu ul li a {
    display: block;
    color: #fff;
    text-align: center;
    font-size: 26px;
    font-weight: 400;
    font-family: Microsoft YaHei;
  }
  .mobile-menu ul li img {
    /* display: block; */
    width: 22px;
    height: 22px;
    text-align: center;
    vertical-align: middle;
  }
}
</style>