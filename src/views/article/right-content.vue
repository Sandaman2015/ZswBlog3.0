<template>
  <div class="right_nav" id="category-search">
    <!-- 文章搜索 -->
    <div class="nav_serch">
      <label class="search-wrap">
        <input type="text" name="title" autocomplete="off" id="keywords" lay-verify="required" placeholder="输入关键字搜索" />
        <span class="search-icon" v-on:click="SerchArticle($event)">
          <i class="fa fa-search"></i>
        </span>
      </label>
    </div>
    <div class="nav_category">
      <div class="about-logo">
        <img src="../../assets/img/about-me.jpg" class="about-me">
      </div>
      <h1>
        Sandaman
        <br />
      </h1>
      <time class="time">10:00</time>
      <h5 class="other-item-title">所有文章分类</h5>
      <div class="inner">
        <ul class="widget">
          <a v-for="(category,index) in categoryList" :key="index">{{category.name}}</a>
        </ul>
      </div>
    </div>
    <!-- 热门点赞文章 -->
    <div class="nav_top5 wow bounceInUp">
      <h5 class="other-item-title">热门点赞文章</h5>
      <div class="inner">
        <ul class="hot-list-article">
          <li v-for="(item,index) in hotLikeArticleList" class="wow slideInLeft" :key="index">
            <a href="javascript:void(0);" @click="jumpToDetails(item.id)">{{item.title}}</a>
          </li>
        </ul>
      </div>
    </div>
    <!-- 热门浏览文章 -->
    <div class="nav_top5 wow bounceInLeft">
      <h5 class="other-item-title">热门浏览文章</h5>
      <div class="inner">
        <ul class="hot-list-article">
          <li v-for="(item,index) in hotVisitArticleList" class="wow slideInLeft" :key="index">
            <a href="javascript:void(0);" @click="jumpToDetails(item.id)">{{item.title}}</a>
          </li>
        </ul>
      </div>
    </div>
    <!-- 最新访客 -->
    <div class="nav_guestlist">
      <h5 class="other-item-title">最新访客</h5>
      <div class="inner">
        <dl class="vistor">
          <dd v-for="(item,index) in guestList" class="wow slideInUp" :key="index">
            <a href="javascript:;">
              <img :src="item.portrait" />
              <cite>{{item.nickName}}</cite>
            </a>
          </dd>
        </dl>
      </div>
    </div>
  </div>
</template>
<script>
  import "../../assets/js/left-introduce";
  export default {
    props: {
      categoryList: {
        type: Array
      },
      hotLikeArticleList: {
        type: Array
      },
      hotVisitArticleList: {
        type: Array
      },
      guestList: {
        type: Array
      }
    },
    data() {
      return {
        pageSize: 3,
        pageIndex: 1
      }
    },
    methods: {
      // 根据类型获取文章分页
      GetArticleByPageClass(categoryId) {
        this.$emit(
          "GetArticlePageByClass",
          this.pageSize,
          this.pageIndex,
          categoryId
        );
      },
      // 获取所有文章
      GetArticle() {
        this.$emit("ReturnAllArticle");
      },
      // 搜索文章
      SerchArticle(event) {
        let inputText =
          event.target.parentElement.parentElement.childNodes[0].value;
        this.$emit("SearchArticle", inputText);
      },
      // 文章详情跳转
      jumpToDetails(index) {
        window.location.href = "details.html?ArticleDetails=" + index + "";
      }
    }
  };
</script>