<template>
  <div class="warp-content">
    <!-- 视频和主要填充区域 -->
    <div class="wrap">
      <video id="v1" autoplay ref="localVideo" loop :src="videoSrc" :poster="poster">
      </video>
      <div class="video-container">
        <el-col justify="center">
          <img src="../../assets/img/index-logo-cut.png" class="content-logo">
          <div class="header-info">
            <p><i class="fa fa-quote-left"></i>追求自我，成为更完美！<i class="fa fa-quote-right"></i></p>
            <div class="top-social_v2">
              <li id="bg-pre">
                <img class="flipx" src="https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.6/img/Sakura/images/next-b.svg">
              </li>
              <li class="wechat"><a href="#"><img
                    src="https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.6/img/Sakura/images/sns/wechat.png"></a>
                <div class="wechatInner">
                  <img src="http://47.97.43.95:8090/upload/2020/09/wechat.1e1b0e5-17b1700392ca4e66bbc51d4ca97a7a21.jpg"
                    alt="微信公众号">
                </div>
              </li>
              <li><a href="https://weibo.com/5060565838/profile?rightmod=1&amp;wvr=6&amp;mod=personinfo&amp;is_all=1"
                  target="_blank" class="social-sina" title="sina"><img
                    src="https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.6/img/Sakura/images/sns/sina.png"></a></li>
              <li class="qq"><a href="//wpa.qq.com/msgrd?v=3&amp;uin=1761317983&amp;site=qq&amp;menu=yes"
                  target="_blank" title="Initiate chat ?"><img
                    src="https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.6/img/Sakura/images/sns/qq.png"></a></li>
              <li><a href="https://github.com/Sandaman2015" target="_blank" class="social-github" title="github"><img
                    src="https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.6/img/Sakura/images/sns/github.png"></a></li>
              <li><a href="https://space.bilibili.com/12014895" target="_blank" class="social-bili"
                  title="bilibili"><img
                    src="https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.6/img/Sakura/images/sns/bilibili.png"></a></li>
              <li><a href="https://twitter.com/DnUJoG07tYOs99p" target="_blank" class="social-wangyiyun"
                  title="Twitter"><img
                    src="https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.6/img/Sakura/images/sns/twitter.png"></a></li>
              <li><a href="https://www.zhihu.com/people/ben-jiu-yi-yang" target="_blank" class="social-wangyiyun"
                  title="知乎"><img src="https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.6/img/Sakura/images/sns/zhihu.png"></a>
              </li>
              <li id="bg-next">
                <img src="https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.6/img/Sakura/images/next-b.svg">
              </li>
            </div>
          </div>
        </el-col>
      </div>
    </div>
    <!-- 关于我 -->
    <el-main>
      <el-row>
        <el-col :span="24" justify="center" class="about-me back-continer">
          <h3>About-me</h3>
          <p class="typing title-h">
            当你忘了自己的过去，满意自己的现在，漠视自己的未来，你就站在了生活的最高处。
            <br />当成功不会让你太高兴，失败不会把你怎么样，平淡不会淹没你时，你就站在了生命的最高处。
            <br />当你以微笑的心想到了过去，以希望的心向前看，以宽厚的心向下看，以坦然的心向上看时，
            <br />你就站在了灵魂的最高处。
          </p>
          <a href="/web/about">Read More</a>
        </el-col>
        <!-- 热门文章 -->
        <el-col :span="24" justify="center" class="back-continer">
          <div class="middle-container">
            <h2 class="introduce">最新文章</h2>
            <div class="articles-content">
              <el-col tag="article" v-for="(item,index) in hotArticles" :key="index" >
                <a :href="'/article-details/'+item.id">
                  <div class="imgBox">
                    <img :src="item.coverImage" class="mini-img" alt="文章插图" />
                  </div>
                  <span class="source">{{item.createDate|filterDate}}</span>
                  <h2 class="title">{{item.title}}</h2>
                  <span class="detail" v-html="item.content">{{item.content}}</span>
                </a>
              </el-col>
            </div>
          </div>
        </el-col>
        <!-- Swiper区域 content-middle  -->
        <el-col :span="24" justify="center" class="messages back-continer">
          <div class="middle-container">
            <h2 class="introduce">最新留言</h2>
            <div class="message-list">
              <swiper :options="swiperOption">
                <swiper-slide v-for="(item,index) in messageList" :key="index">
                  <div class="ols-card">
                    <div class="ols-header">
                      <img :src="item.userPortrait" alt="留言头像" class="ols-desc-img" />
                      <div class="ols-desc-name">
                        {{item.userName}}
                        <br />
                        <span>{{item.createDate|filterDate}}</span>
                      </div>
                    </div>
                    <div class="ols-body">
                      留言:
                      <p class="ols-message-body" v-html="item.content">{{item.content}}</p>
                    </div>
                  </div>
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
                <div class="swiper-button-prev" slot="button-prev"></div>
                <div class="swiper-button-next" slot="button-next"></div>
              </swiper>
            </div>
          </div>
        </el-col>
        <!-- 背景图片 -->
        <el-col :span="24" justify="center" class="content-back">
          <!-- 数字增长 -->
          <div class="product-number-info" id="productNumber">
            <div class="product-number-inner">
              <ul class="q">
                <li class="li-1">
                  <b>
                    <i id="productNumber_1" class="fa fa-laptop">
                      <countTo :startVal="numberAdd.startNum" :endVal="numberAdd.visitCount" :duration="10000">
                      </countTo>
                    </i>
                    <em>+</em>
                  </b>
                  <p>浏览数</p>
                </li>
                <li class="li-2">
                  <b>
                    <i id="productNumber_2" class="fa fa-calendar">
                      <countTo :startVal="numberAdd.startNum" :endVal="numberAdd.runDays" :duration="10000"></countTo>
                    </i>
                    <em>天</em>
                  </b>
                  <p>运行</p>
                </li>
                <li class="li-3">
                  <b>
                    <i id="productNumber_3" class="fa fa-book">
                      <countTo :startVal="numberAdd.startNum" :endVal="numberAdd.articleCount" :duration="10000">
                      </countTo>
                    </i>
                    <sup>+</sup>
                  </b>
                  <p>文章数</p>
                </li>
                <li class="li-4">
                  <b>
                    <i id="productNumber_4" class="fa fa-tags">
                      <countTo :startVal="numberAdd.startNum" :endVal="numberAdd.siteTag" :duration="10000"></countTo>
                    </i>
                    <em>个</em>
                  </b>
                  <p>站点标签</p>
                </li>
                <li class="li-5">
                  <b>
                    <i id="productNumber_5">{{numberAdd.version}}</i>
                  </b>
                  <p>当前版本</p>
                </li>
              </ul>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-main>
  </div>
</template>
<script>
  import countTo from "vue-count-to";
  import {
    Swiper,
    SwiperSlide,
    directive
  } from "vue-awesome-swiper";
  import {
    getInitData
  } from "@/api/index.api.js";
  import video from "../../assets/data/index-video.json";
  export default {
    components: {
      countTo
    },
    data() {
      return {
        videoSrc: "",
        poster: "",
        swiperOption: {
          pagination: {
            el: ".swiper-pagination",
            clickable: true // 允许点击小圆点跳转
          },
          autoplay: {
            delay: 3000,
            disableOnInteraction: true // 手动切换之后继续自动轮播
          },
          loop: false,
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
          },
          slidesPerView: this.isMobile() == true ? 1 : 3,
          spaceBetween: 25,
          centeredSlides: true
        },
        messageList: [],
        hotArticles: [],
        numberAdd: {
          startNum: 0,
          visitCount: 0,
          runDays: 0,
          articleCount: 0,
          siteTag: 0,
          version: "v3.0.1"
        }
      };
    },
    filters: {
      filterDate(date) {
        if (date.indexOf("T") !== -1) {
          return date.replace("T", " ");
        } else {
          return date;
        }
      }
    },
    mounted() {
      this.initData();
      this.videoSrc = video.videosrc;
      this.poster = video.poster;
      this.$refs.localVideo.volume = video.volume;
    },
    methods: {
      isMobile() {
        let flag = navigator.userAgent.match(
          `
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i`
        );
        return flag;
      },
      async initData() {
        await getInitData().then(e => {
          this.numberAdd.runDays = Number.parseInt(e.result.dataCount.runDays);
          this.numberAdd.articleCount = Number.parseInt(
            e.result.dataCount.articleCount
          );
          this.numberAdd.siteTag = Number.parseInt(e.result.dataCount.tagsCount);
          this.numberAdd.visitCount = Number.parseInt(
            e.result.dataCount.visitsCount
          );
          this.hotArticles = e.result.articles;
          this.messageList = e.result.messages;
        });
      }
    }
  };
</script>
<style scoped>
  @import "../../assets/css/index/index-content.css";
</style>