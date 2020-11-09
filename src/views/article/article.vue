<template>
  <div class="content">
    <div class="content-warp">
      <v-left :articleList="articleList" :isClassType="isClassType" :categoryId="categoryId" />
      <v-right
        :categoryList="categoryList"
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
import leftContent from "./left-content";
import rightContent from "./right-content";
import {
  getArticlesByPage,
  getArticlesPageByCategory,
  getArticleOnLike,
  getArticleOnClassType,
  getArticleOnVisit,
  getArticleByDimTitle
} from "../../api/article.api";
import {getAllCategory} from "../../api/category.api";
import {getNearUsers} from "../../api/user.api"
export default {
 components: {
    "v-left": leftContent,
    "v-right": rightContent
  }, 
  data() {
    return {
      articleList: [],
      guestList: [],
      categoryList: [],
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
      await getAllCategory().then(e => {
        this.categoryList = e.result;
      });
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
      await getArticlesPageByCategory(pageSize, pageIndex, this.categoryId).then(
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
<style scoped>
@import "../../assets/css/article/left-content.css";
@import "../../assets/css/article/right-search.css";
</style>