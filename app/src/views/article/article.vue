<template>
  <div class="content">
    <div class="content-warp">
      <v-left :articleList="articleList" :isClassType="isClassType" :total="total" :categoryId="categoryId"/>
      <v-right :categoryList="categoryList" :guestList="guestList" :hotLikeArticleList="hotLikeArticleList"
               :hotVisitArticleList="hotVisitArticleList" @GetArticlePageByClass="startGetPageByClass"
               @ReturnAllArticle="pageLoad" @SearchArticle="searchArticle"/>
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
  getArticleOnVisit,
  getArticleByDimTitle
} from "../../api/article.api";
import {
  getAllCategory
} from "../../api/category.api";
import {
  getNearUsers
} from "../../api/user.api"
import marked from "marked";

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
      categoryId: null,
      total: 0,
      req_count: 0
    };
  },
  mounted() {
    this.pageLoad();
  },
  methods: {
    //   页面初始化
    async pageLoad() {
      await getArticlesByPage(3, 1).then(e => {
        for (let i = 0; i < e.result.data.length; i++) {
          e.result.data[i].content = marked(e.result.data[i].content);
        }
        this.articleList = e.result.data;
        this.total = e.result.count;
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
            for (let i = 0; i < e.result.data.length; i++) {
              e.result.data[i].content = marked(e.result.data[i].content);
            }
            this.articleList = e.result;
          }
      );
    },
    // 搜索文章
    async searchArticle(title) {
      if (title.trim() === "") {
        this.req_count++;
        if (this.req_count >= 10) {
          this.$message({
            message: "您的操作太频繁了QAQ！",
            type: "warning"
          });
        } else {
          await getArticlesByPage(3, 1).then(e => {
            for (let i = 0; i < e.result.data.length; i++) {
              e.result.data[i].content = marked(e.result.data[i].content);
            }
            this.articleList = e.result.data;
            this.total = e.result.count;
          });
        }
      } else {
        await getArticleByDimTitle(title).then(e => {
          for (let i = 0; i < e.result.data.length; i++) {
            e.result.data[i].content = marked(e.result.data[i].content);
          }
          this.articleList = e.result;
        });
      }
    }
  }
}
</script>
<style scoped>
@import "../../assets/css/article/left-content.css";
@import "../../assets/css/article/right-search.css";
</style>
