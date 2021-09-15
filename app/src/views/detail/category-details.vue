<template>
  <div id="content" class="site-content">
    <main id="main" class="site-main" role="main">
      <div class="page-header" v-if="category">
        <h1 class="cat-title">{{category.name}}</h1>
        <span class="cat-des">
          {{category.description}}
        </span>
      </div>
      <article v-if="articleList" v-for="(item,index) in articleList" :key="index" class="post post-list">
        <a :href="'/web/article-details/' + item.id">
          <div class="post-entry">
            <div class="feature">
              <a :href="'/web/article-details/' + item.id">
                <img width="150" height="150" :src="item.coverImage"
                  class="attachment-post-thumbnail size-post-thumbnail" alt="">
              </a>
            </div>
            <h1 class="entry-title">
              <a :href="'/web/article-details/' + item.id">{{item.title}}</a>
            </h1>
            <div class="p-time">
              <!-- <i class="fa fa-fire"></i> -->
              <i class="fa fa-fire"></i>{{item.visits}} 热度
              <i class="fa fa-comment"></i>{{item.textCount}} 字数
              <i class="fa fa-calendar"></i>发布于 {{item.createDate|dateFilter}}
            </div>
            <p class="content-body" v-html="item.content">
              {{item.content}}
            </p>
          </div>
          <hr>
        </a>
      </article>
      <div class="pagination">
        <el-button type="text" @click="loadMore" :disabled="disabled">
          {{message}}
        </el-button>
      </div>
    </main>
  </div>
</template>

<script>
  import {
    getCategoryById
  } from "../../api/category.api";
  import {
    getArticlesPageByCategory
  } from "../../api/article.api";
  export default {
    data() {
      return {
        categoryId: "",
        category: {},
        articleList: [],
        pageSize: 3,
        pageIndex: 1,
        total: 0,
        message: "加载更多",
        disabled: false
      };
    },
    filters: {
      dateFilter(date) {
        return date
          .toString()
          .replace("T", " ")
          .substring(0, date.toString().length);
      }
    },
    mounted() {
      this.categoryId = this.$route.params.id;
      this.initLoad();
    },
    methods: {
      async initLoad() {
        await getCategoryById(this.categoryId).then(e => {
          this.category = e.result;
        });
        await getArticlesPageByCategory(
          this.pageSize,
          this.pageIndex,
          this.categoryId
        ).then(e => {
          this.articleList = e.result.data;
          this.total = e.result.count;
        });
      },
      async loadMore() {
        this.pageIndex++;
        if (this.articleList.length <= this.total && this.total !== 0 && this.articleList.length !== 0) {
          await getArticlesPageByCategory(
            this.pageSize,
            this.pageIndex,
            this.categoryId
          ).then(e => {
            for (let i = 0; i < e.result.data.length; i++) {
              this.articleList.push(e.result.data[i]);
            }
          });
        } else {
          this.message = "没有更多了";
          this.disabled = true;
        }
      }
    }
  };
</script>

<style scoped>
  @import "../../assets/css/detail/category-details.css";
</style>
