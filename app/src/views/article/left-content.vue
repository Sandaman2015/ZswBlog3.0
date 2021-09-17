<template>
  <div class="left-articlelist">
    <ul class="flow-default">
      <li v-for="(item,index) in articleList" data-wow-delay="0.5s" data-wow-duration="1s" class="wow zoomIn"
          :key="index">
        <div class="post-wrapper" v-if="item">
          <article class="post reveal" data-sr-id="0"
                   style="visibility: visible; opacity: 1; transition: opacity 0.6s cubic-bezier(0.5, 0, 0, 1) 0s;">
            <!-- 文章统计 -->
            <section class="meta">
              <!-- <a :title="item.title" href="javascript:void(0)"></a> -->
              <div class="meta" id="header-meta">
                <h2 class="title">
                  <a :href="'/web/article-details/'+item.id">{{ item.title }}</a>
                </h2>
                <div class="new-meta-box">
                  <div class="new-meta-item author">
                    <el-tooltip class="item" effect="dark" content="打工人，打工魂，打工都是人上人！"
                                placement="left-start">
                      <a href="/web/index" rel="nofollow">
                        <img class="article-image" src="../../assets/img/icon-me.jpg"/>
                        <p>Sandman</p>
                      </a>
                    </el-tooltip>
                  </div>
                  <div class="new-meta-item date">
                    <a class="notlink">
                      <i class="fa fa-calendar" aria-hidden="true"></i>
                      <p>{{ item.createDate|dateFilter }}</p>
                    </a>
                  </div>
                  <div class="new-meta-item category">
                    <a href="javascript:void(0)" rel="nofollow">
                      <i class="fa fa-folder-open" aria-hidden="true"></i>
                      <p v-if="item.category">&nbsp;{{ item.category.name }}</p>
                    </a>
                  </div>
                  <div class="new-meta-item wordcount">
                    <a class="notlink">
                      <i class="fa fa-keyboard-o" aria-hidden="true"></i>
                      <p>字数统计:</p>
                      <p>{{ item.textCount }}字</p>
                    </a>
                  </div>
                  <div class="new-meta-item readtime">
                    <a class="notlink">
                      <i class="fa fa-hourglass-half" aria-hidden="true"></i>
                      <p>阅读时长:</p>
                      <p>{{ item.readTime }}分钟</p>
                    </a>
                  </div>
                  <div class="new-meta-item visitscount">
                    <a class="notlink">
                      <i class="fa fa-envira" aria-hidden="true"></i>
                      <p>浏览数:</p>
                      <p>{{ item.visits }}</p>
                    </a>
                  </div>
                  <div class="new-meta-item likescount">
                    <el-tooltip class="item" effect="dark" content="看见这赞这么少！还不点进去点个赞！"
                                placement="top-start">
                      <a class="notlink">
                        <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
                        <p>点赞数:</p>
                        <p>{{ item.like }}</p>
                      </a>
                    </el-tooltip>
                  </div>
                </div>
                <hr/>
              </div>
            </section>
            <!-- 文章详情 -->
            <section class="article typo">
              <div class="article-entry">
                <div class="content-body">
                  <el-image class="articleImage" :fit="scale-down" :src="item.coverImage"></el-image>
                  <p class="article-content" v-html="item.content">{{ item.content }}</p>
                </div>
                <hr/>
                <div class="readmore">
                  <a :href="'/web/article-details/'+item.id"
                     class="flat-box waves-effect waves-block">
                    <i class="fa fa-folder-open-o" aria-hidden="true"></i>
                    阅读全文
                  </a>
                </div>
              </div>
              <!-- 文章标签 -->
              <div class="full-width auto-padding tags">
                <a href="javascript:void(0)" rel="nofollow" v-if="item.tags"
                   v-for="(tag,index) in item.tags"
                   :key="tag.id">
                  &nbsp;
                  <i class="fa fa-tag"></i>
                  &nbsp;{{ tag.name }}
                </a>
              </div>
            </section>
          </article>
        </div>
      </li>
    </ul>
    <div class="load-more">
      <el-button type="text" @click="loadMore" :disabled="disabled">{{ message }}</el-button>
    </div>
  </div>
</template>
<script>
import {
  getArticlesByPage
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
    },
    total: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      pageSize: 3,
      pageIndex: 1,
      message: "加载更多",
      disabled: false
    };
  },
  filters: {
    dateFilter(date) {
      return date.toString().substring(0, 10);
    }
  },
  methods: {
    //   加载更多
    async loadMore() {
      this.pageIndex++
      if (this.articleList.length <= this.total && this.total !== 0 && this.articleList.length !== 0) {
        //   如果不是搜索类型则按照默认分页查询文章列表
        if (!this.isClassType) {
          await getArticlesByPage(this.pageSize, this.pageIndex).then(e => {
            // let index = e.result.count - this.articleList.length;
            for (let i = 0; i <= e.result.data.length; i++) {
              // e.result.data[i].content = marked(e.result.data()[i].content);
              this.articleList.push(e.result.data[i]);
            }
          });
        } else {
          getArticlesPageByClass(
              this.pageSize,
              this.pageIndex,
              this.categoryId
          ).then(e => {
            for (let i = 0; i < e.result.length; i++) {
              // e.result.data[i].content = marked(e.result.data()[i].content);
              this.articleList.push(e.result[i]);
            }
          });
        }
      } else {
        this.message = "没有更多了";
        this.disabled = true;
      }
    }
  }
};
</script>
