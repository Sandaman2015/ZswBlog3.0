<template>
  <div id="content">
    <div class="content-header" :style="headerStyle">
      <!-- 文章信息 -->
      <div class="warp-content wow slideInRight">
        <h1 class="title">{{article.title}}</h1>
        <div class="info" v-highlight>
          <p>
            <span>
              <i class="fa fa-user-circle-o" aria-hidden="true"></i>
              Sandman
            </span>
            &nbsp;
            <span>
              <i class="fa fa-keyboard-o" aria-hidden="true"></i>
              文章类型:
              {{article.category.name}}
            </span>
            &nbsp;
            <span>
              <i class="fa fa-heart-o" aria-hidden="true"></i>
              满意度:
              {{article.like}}
            </span>
          </p>
        </div>
        <div class="info">
          <p>
            <span>
              <i class="fa fa-calendar" aria-hidden="true"></i>
              发布日期:
              {{article.createDate|filterSubDate}}日
            </span>&nbsp;
            &nbsp;
            <span>
              <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
              字数:
              {{article.textCount}}字
            </span>
            &nbsp;
            <span>
              <i class="fa fa-clock-o" aria-hidden="true"></i>
              阅读时间:
              {{article.readTime}}分钟
            </span>
            &nbsp;
            <span>
              <i class="fa fa-eye" aria-hidden="true"></i>
              浏览次数:
              {{article.visits}}次
            </span>
          </p>
        </div>
      </div>
    </div>
    <div class="warp">
      <div class="details-warp">
        <!-- 内容区域 -->
        <div class="article-detail container" v-html="article.content" v-highlight>{{article.content}}</div>
        <!-- 分享 -->
        <div class="share-info">
          <blockquote class="elem-quote quote-nm share">
            <div class="op-list" style="margin-bottom: 10px;">
              <a href="javascript:void(0)" @click="likeAdd(article.id)">
                <p style="font-size: 18px;color:rgba(0,0,0,0.8)">
                  觉得不错,点个赞吧！👉
                  <i :class="likeClass" aria-hidden="true" class="like" style="font-size: 20px; line-height: 20px;"></i>
                </p>
              </a>
            </div>
            <div style="margin-bottom: 20px;">
              <h4>
                <strong>本文标题：</strong>
                <span>{{article.title}}</span>
              </h4>
              <h4>
                <strong>本文网址：</strong>
                <span>http://www.zswblog.xyz/article-details/{{article.id}}</span>
              </h4>
            </div>
            <p>温馨提示：本站所有文章，若非特别声明，均为原创，转载请注明作者及原文链接。</p>
            <h4>
              分享到：
              <share></share>
            </h4>
          </blockquote>
        </div>
        <!-- 评论区 -->
        <div class="editor">
          <h3>评论区</h3>
          <editor ref="baseTextarea" />
          <el-row class="btn-up">
            <el-button @click="CommentsSubmit()">提交留言</el-button>
          </el-row>
        </div>
        <!-- 评论列表 -->
        <div class="comments">
          <h3>评论列表</h3>
          <comments :commentsList="commentList" :articleId="articleId" @changeList="loadMoreComments"
            :disabledBtn="disabledBtn" />
          <div class="load-more">
            <el-pagination layout="prev, pager, next" :total="total" :disabled="disabledBtn"
              @current-change="loadMoreComments" :current-page="pageIndex" :page-size="limit" @prev-click="prev"
              @next-click="next" :hide-on-single-page="true"></el-pagination>
          </div>
        </div>
      </div>
      <!-- 广告区域 -->
      <div class="ad">
        <div class="whitebg cloud">
          <h2 class="htitle">标签云</h2>
          <ul>
            <a href="javascript:void(0)" v-for="(item,index) in categoryList" :key="index" class="wow fadeInLeft"
              @click="jumpToCategory(item.id)">{{item.name}}</a>
          </ul>
        </div>
        <div class="whitebg cloud">
          <h2 class="htitle">音乐</h2>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import editorBar from "../../components/wang-editor";
  import comment from "./article-comment";
  import {
    getAllComment,
    addComment
  } from "../../api/comment.api";
  import {
    getMusicList
  } from "../../api/common.api"
  import {
    getArticleById
  } from "../../api/article.api";
  import {getAllCategory} from "../../api/category.api"
  import list from "../../assets/data/detailsPic.json";
  export default {
    components: {
      editor: editorBar,
      comments: comment
    },
    data() {
      return {
        articleId: "",
        pageIndex: 1,
        siteUrl: "",
        config: {
          url: this.siteUrl
        },
        tagsList: [],
        limit: 5,
        disabledBtn: false,
        total: 1,
        comment: "",
        likeClass: "fa fa-heart",
        headerStyle: {
          backgroundImage: ""
        },
        commentList: [],
        categoryList: [],
        article: {
          id: Number,
          createDate: Date,
          title: String,
          content: String,
          like: Number,
          visits: Number,
          readTime: Number,
          textCount: Number,
          category: {},
          coverImage: String
        }
      }
    },
    filters: {
      filterSubDate(date) {
        return date.toString().substring(0, 10);
      }
    },
    mounted() {
      this.articleId = this.$route.params.id;
      this.article = {};
      this.initBackgroundImage();
      this.getArticleDetailAndCategoryList();
      this.siteUrl =
        "https://www.zswblog.xyz/details.html?ArticleDetails=" + this.index;
    },
    methods: {
      initBackgroundImage() {
        let index = Math.floor(Math.random() * (0 - 4) + 4);
        this.headerStyle.backgroundImage = "url(" + list[index].src + ")";
      },
      getArticleDetailAndCategoryList() {
        if (this.articleId == undefined || this.articleId == null || this.articleId === '' || this.articleId <= 0) {
          this.$router.push({
            path: `/404`,
          })
        }
        getArticleById(this.articleId).then(e => {
          if (e.code === 404) {
            this.$router.push({
              path: `/404`,
            })
          }
          this.article = e.result;
        })
        getAllCategory().then(e=>{
          this.categoryList = e.result;
        })
        getAllComment().then(e=>{
          console.log(e);
            this.commentList = e.result;
        })        
      },
      jumpToCategory(id) {

      },
      async loadMoreComments(page) {
        if (page == null) {
          page = this.pageIndex;
        }
        await getAllComment(this.articleId, this.limit, page).then(e => {
          this.commentList = e.result;
        });
      },
      prev(p) {
        getAllComment(this.articleId, this.limit, p).then(e => {
          this.commentList = e.data;
        });
      },
      next(p) {
        getAllComment(this.articleId, this.limit, p).then(e => {
          this.commentList = e.data;
        });
      },
      // 文章点赞
      likeAdd() {

      },
      // 文章提交评论
      commentsSubmit() {

      }
    }
  }
</script>

<style scoped>
  @import "../../assets/css/detail/article-details.css";
</style>