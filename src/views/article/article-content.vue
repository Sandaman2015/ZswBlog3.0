<template>
  <div class="content">
    <div class="content-warp">
      <v-left :articleList="articleList" :isClassType="isClassType" :categoryId="categoryId" />
      <v-right
        :allClassArticleList="allClassArticleList"
        :guestList="guestList"
        :hotLikeArticleList="hotLikeArticleList"
        :hotVisitArticleList="hotVisitArticleList"
        @GetArticlePageByClass="startGetPageByClass"
        @ReturnAllArticle="pageLoad"
        @SearchArticle="searchArticle"
      />
    </div>
  </div>
</template>

<script>
import LeftContent from "./left-content";
import RightContent from "./right-content";
import {
  getArticlesByPage,
  getArticlesPageByClass,
  getArticleOnLike,
  getArticleOnClassType,
  getArticleOnVisit,
  getArticleByDimTitle
} from "../../api/article.api";
export default {
 components: {
    "v-left": LeftContent,
    "v-right": RightContent
  }, 
  data() {
    return {
      articleList: [],
      guestList: [],
      allClassArticleList: ["", "", "", ""],
      hotLikeArticleList: [],
      hotVisitArticleList: [],
      isClassType: false,
      categoryId: null
    };
  },
  mounted() {
    this.pageLoad();
  },
  methods: {
    //   页面初始化
    async pageLoad() {
      await getArticlesByPage(3, 1).then(e => {
        this.articleList = e.result.data;
      });
    //   await getArticleOnClassType().then(e => {
    //     this.allClassArticleList = e;
    //   });
      await getArticleOnVisit().then(e => {
        this.hotVisitArticleList = e.result;
      });
      await getArticleOnLike().then(e => {
        this.hotLikeArticleList = e.result;
      });
      await getNearUsers().then(e => {
        this.guestList = e.result;
      });
    },
    // 根据类型获取文章列表
    async startGetPageByClass(pageSize, pageIndex, categoryId) {
      this.isClassType = true;
      await getArticlesPageByClass(pageSize, pageIndex, this.categoryId).then(
        e => {
          this.articleList = e.result;
        }
      );
    },
    // 搜索文章
    async searchArticle(title) {
      await getArticleByDimTitle(title).then(e => {
        this.articleList = e.result;
      });
    }
  }
}
</script>
