<template>
  <div class="left-articlelist">
    <ul class="flow-default">
      <li
        v-for="(item,index) in articleList"
        data-wow-delay="0.5s"
        data-wow-duration="1s"
        class="wow zoomIn"
        :key="index"
      >
        <div class="post-wrapper">
          <article
            class="post reveal"
            data-sr-id="0"
            style="visibility: visible; opacity: 1; transition: opacity 0.6s cubic-bezier(0.5, 0, 0, 1) 0s;"
          >
          <!-- 文章统计 -->
            <section class="meta">
              <a
                :title="item.title"
                href="javascript:void(0)"
                @click="jumpToDetails(item.id)"
              ></a>
              <div class="meta" id="header-meta">
                <h2 class="title">
                  <a
                    href="javascript:void(0)"
                    @click="jumpToDetails(item.id)"
                  >{{item.title}}</a>
                </h2>
                <div class="new-meta-box">
                  <div class="new-meta-item author">
                    <el-tooltip
                      class="item"
                      effect="dark"
                      content="菜逼就是我！"
                      placement="left-start"
                    >
                      <a href="http://www.zswblog.xyz" rel="nofollow">
                        <img class="article-image" src="../../assets/img/icon-me.jpg" />
                        <p>Sandman</p>
                      </a>
                    </el-tooltip>
                  </div>
                  <div class="new-meta-item date">
                    <a class="notlink">
                      <i class="fa fa-calendar" aria-hidden="true"></i>
                      <p>{{item.createDate|dateFilter}}</p>
                    </a>
                  </div>
                  <div class="new-meta-item category">
                    <a href="javascript:void(0)" rel="nofollow">
                      <i class="fa fa-folder-open" aria-hidden="true"></i>
                      <p>&nbsp;{{item.category.name}}</p>
                    </a>
                  </div>
                  <div class="new-meta-item wordcount">
                    <a class="notlink">
                      <i class="fa fa-keyboard-o" aria-hidden="true"></i>
                      <p>字数统计:</p>
                      <p>{{item.textCount}}字</p>
                    </a>
                  </div>
                  <div class="new-meta-item readtime">
                    <a class="notlink">
                      <i class="fa fa-hourglass-half" aria-hidden="true"></i>
                      <p>阅读时长:</p>
                      <p>{{item.readTime}}分钟</p>
                    </a>
                  </div>
                  <div class="new-meta-item visitscount">
                    <a class="notlink">
                      <i class="fa fa-envira" aria-hidden="true"></i>
                      <p>浏览数:</p>
                      <p>{{item.visits}}</p>
                    </a>
                  </div>
                  <div class="new-meta-item likescount">
                    <el-tooltip
                      class="item"
                      effect="dark"
                      content="看见这赞这么少！还不点进去点个赞！"
                      placement="top-start"
                    >
                      <a class="notlink">
                        <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
                        <p>点赞数:</p>
                        <p>{{item.like}}</p>
                      </a>
                    </el-tooltip>
                  </div>
                </div>
                <hr />
              </div>
            </section>
            <!-- 文章详情 -->
            <section class="article typo">
              <div class="article-entry">
                <div class="content-body">
                  <img class="articleImage" :src="item.coverImage" />
                  <p class="article-content" v-html="item.content">{{item.content}}</p>
                </div>
                <hr />
                <div class="readmore">
                  <a
                    href="javascript:void(0)"
                    @click="jumpToDetails(item.id)"
                    class="flat-box waves-effect waves-block"
                  >
                    <i class="fa fa-folder-open-o" aria-hidden="true"></i>
                    阅读全文
                  </a>
                </div>
              </div>
              <!-- 文章标签 -->
              <div class="full-width auto-padding tags">
                <a
                  href="javascript:void(0)"
                  rel="nofollow"
                  v-for="(tag,index) in item.tags"
                  :key="index"
                >
                  &nbsp;
                  <i class="fa fa-tag"></i>
                  &nbsp;{{tag.name}}
                </a>
              </div>
            </section>
          </article>
        </div>
      </li>
    </ul>
    <div class="load-more">
      <el-button
        @click="loadMore()"
        :disabled="disabledBtn"
        size="small"
        :loading="load"
      >{{loadMoreText}}</el-button>
    </div>
  </div>
</template>
<script>
import {
  getArticlesByPage,
  getArticlesPageByCategory
} from "../../api/article.api";
export default {
  props: {
    articleList: {
      type: Array
    },
    isClassType: {
      type: Boolean
    },
    categoryId: {
      type: Number
    }
  },
  data() {
    return {
      load: true,
      loadMoreText: "加载ing",
      pageSize: 3,
      pageIndex: 1,
      disabledBtn: false
    };
  },
  filters: {
    dateFilter(date) {
      return date.substring(0, 10);
    }
  },
  created() {
    this.load = false;
    this.loadMoreText = "加载更多";
  },
  methods: {
    //   加载更多
    async loadMore() {
      this.load = true;
      this.pageIndex++;
      let that = this;
    //   如果不是搜索类型则按照默认分页查询文章列表
      if (!this.isClassType) {
        await getArticlesByPage(this.pageSize, this.pageIndex).then(e => {
           for (let i = 0; i < e.result.count; i++) {
              this.articleList.push(e.result.data[i]);
            }
            that.loadMoreText = "加载更多";
            that.load = false;
        });
      } else {
        await getArticlesPageByClass(
          this.pageSize,
          this.pageIndex,
          this.categoryId
        ).then(e => {
          if (e.result.length < 3) {
            that.loadMoreText = "到底了呦！刷新页面重新看吧！";
            for (let i = 0; i < e.result.length; i++) {
              this.articleList.push(e.result[i]);
            }
            that.disabledBtn = true;
            that.$message.error(
              "已经没有这个类型的文章了哦！刷新页面重新浏览吧"
            );
          } else if (e.result.length > 2) {
            for (let i = 0; i < e.result.length; i++) {
              this.articleList.push(e.result[i]);
            }
            that.loadMoreText = "加载更多";
          } else {
            that.loadMoreText = "到底了呦！刷新页面重新看吧！";
            that.disabledBtn = true;
            that.$message.error(
              "已经没有这个类型的文章了哦！刷新页面重新浏览吧"
            );
          }
          that.load = false;
        });
      }
    },
    // 详情跳转
    jumpToDetails(index) {
      this.$router.push({
                        path: `/article-details/${index}`,
                    })
      // window.location.href = "/article-details/" + index ;
    }
  }
};
</script>