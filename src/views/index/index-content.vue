<template>
    <div class="warp-content">
      <!-- 视频和主要填充区域 -->
      <div class="wrap">
        <video id="v1" autoplay ref="localVideo" loop  :src="videoSrc" :poster="poster">
        </video>        
        <div class="video-container">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores in adipisci, odit at esse labore soluta autem quos consectetur, fuga, tenetur quisquam! Optio dolorum illum iusto dolorem quos fuga nam quasi sapiente? Nostrum iure debitis nisi repellat id, sit dolorem consequuntur, similique, magnam laudantium doloremque illum dolore porro quae at iusto eius vero nam? Sapiente ullam repellat ipsa, illum, deleniti veritatis voluptate provident qui sed accusamus magnam aspernatur sint pariatur et atque voluptatum. Voluptas, earum? Qui, temporibus laborum. Earum quis assumenda, laudantium vitae, asperiores vero fuga quaerat error est tempora doloribus pariatur facilis dolor distinctio accusamus possimus laboriosam quos totam rem sequi cupiditate? Itaque praesentium blanditiis et sed aliquid unde molestias veritatis explicabo, dolorum doloremque, ipsum totam eligendi aut omnis! Asperiores amet nihil molestias qui distinctio debitis veniam quas harum aliquam. Hic blanditiis iure aliquam, obcaecati modi reiciendis velit, excepturi ad itaque eum officiis veritatis quae accusantium ea! Expedita, sunt laboriosam. Facere corporis consequuntur libero veritatis numquam tenetur corrupti magnam itaque, consequatur similique beatae inventore maxime sequi ab consectetur totam perferendis suscipit! Est unde autem ipsa dicta beatae vero corrupti quam atque cum inventore possimus aperiam sunt eum deserunt, illo at. Iste quam nobis culpa illo consequatur quos alias eveniet, consequuntur minus hic, porro sequi magni aliquam voluptatibus nihil optio veniam veritatis, aperiam doloremque non harum suscipit. Perspiciatis error praesentium debitis ex eius distinctio minus ipsam unde, facere sit fugiat fuga quidem similique excepturi, perferendis minima enim nihil facilis placeat rem aut quisquam corrupti. Deserunt hic magni corrupti adipisci molestias voluptatibus sed, debitis suscipit at nihil explicabo? Similique ab provident optio itaque veritatis voluptates, aspernatur dignissimos distinctio voluptatibus eos pariatur est asperiores maxime ducimus delectus sequi dolor alias. Accusantium in quidem molestias quos possimus facilis debitis voluptates tempora commodi dolorum laboriosam incidunt nobis nihil voluptatem rem sequi delectus reprehenderit corrupti hic, itaque asperiores ipsa! Animi unde id fuga perferendis quisquam beatae aliquam delectus amet voluptatem? Distinctio iure amet debitis illum facere quasi vitae eligendi assumenda magni. Magni odio animi repudiandae consequuntur alias modi. Consequuntur reprehenderit laborum nisi suscipit, illum qui! Beatae ipsum sit officiis repudiandae esse odio, accusamus animi cum aliquid eaque, at natus optio facilis! Repellat quasi modi quae exercitationem cumque porro nihil dolore sed iste accusamus officia sint distinctio error corrupti corporis tempore rem deserunt numquam beatae obcaecati saepe, voluptatem aspernatur. Perferendis quaerat velit officiis corrupti, odit enim accusantium molestiae laboriosam eum, labore et! Delectus, nostrum accusantium. Mollitia nam molestiae ipsum atque rem explicabo recusandae molestias ratione reprehenderit id voluptates quo praesentium, eligendi odit. Sequi natus at nesciunt illum nihil deleniti, explicabo quis nobis sint hic accusamus placeat velit quas recusandae veritatis delectus incidunt ea ullam. Incidunt dolorem voluptates quisquam corporis, excepturi aperiam velit, quae deleniti dolorum, corrupti rerum perferendis adipisci labore sequi! Assumenda odio repellendus eos officia ad incidunt asperiores debitis odit cupiditate, recusandae aliquid tempore quis maiores nobis, animi similique dolor magni temporibus voluptatem! Minima tempora amet cum illo rerum animi quas, esse nulla ea aliquam expedita cumque blanditiis fugiat numquam, eligendi, saepe eius error cupiditate?测试
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
            <a href="/about">Read More</a>
          </el-col>
          <!-- 热门文章 -->
          <el-col :span="24" justify="center" class="back-continer">
            <div class="middle-container">
              <h2 class="introduce">最新文章</h2>
              <div class="articles-content">
                <el-col tag="article" v-for="item in hotArticles" :key="item.id" @click="jumpToDetails(item.id)">
                  <a href="javascript:void(0)">
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
                        <countTo :startVal="numberAdd.startNum" :endVal="numberAdd.visitCount" :duration="10000"></countTo>
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
                        <countTo :startVal="numberAdd.startNum" :endVal="numberAdd.articleCount" :duration="10000"></countTo>
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
            <!-- <h2 class="typing title-h">
          无论如何，请记得一定要做自己！
          <br />
          <br />每一个不曾起舞的日子都是对生命的辜负。
          <br />
          <br />我在等那双识我的眼睛，我在等那双疼我的手，我在等那颗懂我的心，为了这份执着的等待，
          <br />在这色彩斑斓的世界上，我就做一块石头，我就做我自己。
          <br />
          <br />一步一步地走，这种方式看似缓慢且费力，似乎永远不会达到目的，但是只要你肯坚持，
          <br />做真实敢拼的自己，你就会成为最后的胜者。
          <br />
          <br />在适当的场合适当的地点，合适的放下自己高贵的内心，和朋友一心相待，你会发现生活中到处都是阳光。
          <br />
          <br />
        </h2> -->
          </el-col>
        </el-row>
      </el-main>
      <!-- 底部区域 -->
      <!-- <div class="footer">
        <div class="footer-top">
          <div class="container">
            <div
              class="clear wow fadeInUp animated"
              style="visibility: visible; animation-name: fadeInUp;"
            >
              <div class="left w3">
                <div class="single-widget about">
                  <div class="footer-logo">
                    <h2>ZswBlog</h2>
                  </div>
                  <p>一名阳光,勇敢,治愈的程序员</p>
                  <div class="button">
                    <a href="/about" class="btn">About Me</a>
                  </div>
                </div>
              </div>
              <div class="left w3">
                <div class="single-widget">
                  <h2>相关链接</h2>
                  <ul class="social-icon">
                    <li class="active">
                      <a href="/article"><i class="fa fa-book"></i>所有文章</a>
                    </li>
                    <li class="active">
                       <a href="/message"><i class="fa fa-comments"></i>本站留言</a>
                    </li>
                    <li class="active">
                      <a href="/category"><i class="fa fa-tags"></i>文章分类</a>
                    </li>
                    <li class="active">
                      <a href="/share"><i class="fa fa-snowflake-o"></i>旅游分享</a>
                    </li>
                    <li class="active">
                      <a href="/link"><i class="fa fa-link"></i>友情链接</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="left w3">
                <div class="single-widget contact">
                  <h2>联系我</h2>
                  <ul class="list">
                    <li>
                      <i class="fa fa-map"></i>地址: 安徽省芜湖市
                    </li>
                    <li>
                      <i class="fa fa-qq"></i>QQ: 1761317983
                    </li>
                    <li>
                      <i class="fa fa-envelope"></i>邮箱: 1761317983@qq.com
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="copyright">
          <div class="container">
            <div class="clear">
              <div class="center left w10">
                <p>
                  Copyright © 2019-2020 张晟玮 Powered by .NET Core3.1 on Linux
                  <i
                    class="fa fa-linux"
                    aria-hidden="true"
                  ></i>&nbsp; 备案号:
                  <a style="color:#bbb" href="http://www.miit.gov.cn/">皖ICP备19012774号</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div> -->
    </div>
</template>
<script>
import axios from "axios";
import countTo from "vue-count-to";
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import { getInitData } from "@/api/index.api.js";
export default {
  components: { countTo },
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
        slidesPerView: this._isMobile()==true?1:3,
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
        version: "v2.1.8"
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
  // beforeCreate(){
  //   if (this._isMobile()) {
  //     this.swiperOption.slidesPerView = 1;
  //   } else {
  //     this.swiperOption.slidesPerView = 1;
  //   }
  // },
  mounted() {
    this.initData();
    axios
      .get("/data/index-video.json")
      .then(resolve => {
        this.videoSrc = resolve.videosrc;
        this.poster = resolve.poster;
        this.$refs.localVideo.volume = resolve.volume;
      })
      .catch(e => {
        console.log("请求视频失败,请刷新重试！", e);
      });
  },
  methods: {
    _isMobile() {
      let flag = navigator.userAgent.match(`
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i`
      );
      return flag;
    },
    jumpToDetails(index) {
      window.location.href = "/details?ArticleDetails=" + index + "";
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