<template>
  <div class="right_nav" id="categoryand-search">
      <!-- 文章搜索 -->
    <div class="nav_serch">
      <label class="search-wrap">
        <input
          type="text"
          name="title"
          autocomplete="off"
          id="keywords"
          lay-verify="required"
          placeholder="输入关键字搜索"
        />
        <span class="search-icon" v-on:click="SerchArticle($event)">
          <i class="fa fa-search"></i>
        </span>
      </label>
    </div>
    <!-- 文章分类 -->
    <ul class="category mt20">
      <li data-index="0" class="slider" style="top: 0px;"></li>
      <li data-index="1" class v-on:click="GetArticle()">
        <a href="javascript:void(0);">全部文章</a>
      </li>
      <li
        v-for="(item,index) in allClassArticleList"
        class="wow slideInLeft"
        v-on:click="GetArticleByPageClass(item)"
        :key="index"
      >
        <a href="javascript:void(0);">{{item}}</a>
      </li>
    </ul>
    <!-- 热门点赞文章 -->
    <div class="nav_top5 wow bounceInUp">
      <h5 class="other-item-title">热门点赞文章</h5>
      <div class="inner">
        <ul class="hot-list-article">
          <li v-for="(item,index) in hotLikeArticleList"
           class="wow slideInLeft" 
           :key="index">
            <a
              href="javascript:void(0);"
              @click="jumpToDetails(item.id)"
            >{{item.title}}</a>
          </li>
        </ul>
      </div>
    </div>
    <!-- 热门浏览文章 -->
    <div class="nav_top5 wow bounceInLeft">
      <h5 class="other-item-title">热门浏览文章</h5>
      <div class="inner">
        <ul class="hot-list-article">
          <li v-for="(item,index) in hotVisitArticleList" 
          class="wow slideInLeft" 
          :key="index">
            <a
              href="javascript:void(0);"
              @click="jumpToDetails(item.id)"
            >{{item.title}}</a>
          </li>
        </ul>
      </div>
    </div>
    <!-- 最新访客 -->
    <div class="nav_guestlist">
      <h5 class="other-item-title">最新访客</h5>
      <div class="inner">
        <dl class="vistor">
          <dd v-for="(item,index) in guestList" 
          class="wow slideInUp" 
          :key="index">
            <a href="javascript:;">
              <img :src="item.userPortrait" />
              <cite>{{item.userName}}</cite>
            </a>
          </dd>
        </dl>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    allClassArticleList: { type: Array },
    hotLikeArticleList: { type: Array },
    hotVisitArticleList: { type: Array },
    guestList: { type: Array }
  },
  data() {
    return {
      pageSize: 3,
      pageIndex: 1
    };
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