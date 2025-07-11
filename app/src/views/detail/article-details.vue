<template>
  <div id="content">
    <ipAddress/>
    <el-col
        :xs="{span:24,offset:0}" :sm="{span:24,offset:0}" :md="{span:24,offset:0}" :lg="{span:24,offset:0}"
        :xl="{span:24,offset:0}"
        class="content-header" :style="headerStyle">
      <!-- 文章信息 -->
      <div class="warp-content wow slideInRight" v-if="article">
        <h1 class="title">{{ article.title }}</h1>
        <div class="info" v-highlight>
          <p>
            <span>
              <i class="fa fa-user-circle-o" aria-hidden="true"></i>
              Sandman
            </span>
            &nbsp;
            <span v-if="article.category">
              <i class="fa fa-keyboard-o" aria-hidden="true"></i>
              文章类型:
              {{ article.category.name }}
            </span>
            &nbsp;
            <span>
              <i class="fa fa-heart-o" aria-hidden="true"></i>
              满意度:
              {{ article.like }}
            </span>
          </p>
        </div>
        <div class="info">
          <p>
            <span v-if="article.createDate">
              <i class="fa fa-calendar" aria-hidden="true"></i>
              发布日期:
              {{ article.createDate|filterDate }}日
            </span>&nbsp;
            &nbsp;
            <span>
              <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
              字数:
              {{ article.textCount }}字
            </span>
            &nbsp;
            <span>
              <i class="fa fa-clock-o" aria-hidden="true"></i>
              阅读时间:
              {{ article.readTime }}分钟
            </span>
            &nbsp;
            <span>
              <i class="fa fa-eye" aria-hidden="true"></i>
              浏览次数:
              {{ article.visits }}次
            </span>
          </p>
        </div>
      </div>
    </el-col>
    <el-row :spam="16" class="warp">
      <el-col :xs="{span:21,offset:1}" :sm="{span:21,offset:1}" :md="{span:12,offset:4}" :lg="{span:12,offset:4}"
              :xl="{span:12,offset:4}">
        <!-- 内容区域 -->
        <viewer :images="article.content">
          <div id="write" ref="articleContent" class="article-detail" v-html="article.content"
               v-highlight></div>
        </viewer>
        <!-- 分享 -->
        <div class="share-info">
          <blockquote class="elem-quote quote-nm share">
            <div class="op-list" style="margin-bottom: 10px;">
              <a href="javascript:void(0)" @click="likeAdd">
                <p style="font-size: 18px;color:rgba(0,0,0,0.8)">
                  觉得不错,点个赞吧！👉
                  <i :class="likeClass" aria-hidden="true" class="like" style="font-size: 20px; line-height: 20px;"></i>
                </p>
              </a>
            </div>
            <div style="margin-bottom: 20px;">
              <h4>
                <strong>本文标题：</strong>
                <span>{{ article.title }}</span>
              </h4>
              <h4>
                <strong>本文网址：</strong>
                <span>http://zswblog.site/article-details/{{ article.id }}</span>
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
          <editor ref="baseTextarea"/>
          <el-row class="btn-up">
            <el-button @click="commentsSubmit">提交留言</el-button>
          </el-row>
        </div>
        <!-- 评论列表 -->
        <div class="comments">
          <h3>评论列表</h3>
          <comments v-if="commentList" :commentsList="commentList" :articleId="articleId" @changeList="loadMoreComments"
                    :disabledBtn="disabled"/>
          <div class="load-more">
            <el-pagination layout="prev, pager, next" :total="total" :disabled="disabled"
                           @current-change="loadMoreComments" :current-page="pageIndex" :page-size="pageSize"
                           @prev-click="prev"
                           @next-click="next"></el-pagination>
          </div>
        </div>
      </el-col>
      <!-- 侧边区域 -->
      <el-col :xs="5" :sm="5" :md="4" :lg="4" :xl="4" class="ad">
        <div class="whitebg cloud about-me box-details">
          <div class="item-headline"><i class="fa fa-bolt"></i><span>关注我</span></div>
          <div class="aside-list">
            <div class="aside-list-item"><a href="/web/index" class="thumbnail"><img
                src="http://thirdqq.qlogo.cn/g?b=oidb&k=G9TRERmssnfaKEE3OKxVicA&s=40&t=1591118864" alt="haha"></a>
              <div class="content">
                <ul class="follow">
                  <li>
                    <a class="comment" target="blank" href="https://www.zhihu.com/people/ben-jiu-yi-yang">
                      <img src="../../assets/img/detail/zhihu.png">
                    </a>
                  </li>
                  <li>
                    <a class="comment" target="blank" href="https://space.bilibili.com/12014895">
                      <img src="../../assets/img/detail/bilibili.png">
                    </a>
                  </li>
                  <li>
                    <a class="comment" target="blank"
                       href="https://weibo.com/5060565838/profile?rightmod=1&amp;wvr=6&amp;mod=personinfo&amp;is_all=1">
                      <img src="../../assets/img/detail/weibo.png">
                    </a>
                  </li>
                  <li>
                    <a class="comment" target="blank" href="https://twitter.com/DnUJoG07tYOs99p">
                      <img src="../../assets/img/detail/tuite.png">
                    </a>
                  </li>
                  <li>
                    <a class="comment" target="blank" href="https://github.com/Sandaman2015">
                      <img src="../../assets/img/detail/github.png">
                    </a>
                  </li>
                </ul>
                <div class="name">
                  <time>追求自我，成为更完美</time>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="whitebg cloud menu box-details"
             v-if="navList.length > 0">
          <div>
            <div class="item-headline"><i class="fa fa-bars" aria-hidden="true"></i>
              <span>目录</span></div>
            <ul>
              <li
                  v-for="(nav, index) in navList"
                  :key="index"
                  :class="{ on: activeIndex === index }"
                  @click="currentClick(index)"
                  class="menu-item parent"
              >
                <a href="javascript:void(0);" @click="pageJump(nav.title)">{{
                    nav.title
                  }}</a>
                <div
                    v-if="nav.children.length > 0"
                    class="menu-children-list"
                >
                  <ul class="nav-list">
                    <li
                        v-for="(item, idx) in nav.children"
                        :key="idx"
                        :class="{ on: childrenActiveIndex === idx }"
                        @click.stop="childrenCurrentClick(idx)"
                        class="menu-item child"
                    >
                      <a href="javascript:void(0);" @click="pageJump(item.title)">{{
                          item.title
                        }}</a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="whitebg cloud">
          <div class="item-headline">
            <svg t="1604745508647" class="icon card-announcement-animation" viewBox="0 0 1024 1024" version="1.1"
                 xmlns="http://www.w3.org/2000/svg" p-id="5701" width="32" height="32">
              <path
                  d="M347.904 764.672a213.418667 213.418667 0 0 1-275.541333-122.752c-42.197333-109.952 12.8-233.386667 122.624-275.584l346.538666-133.034667 107.946667-182.954666c30.293333-50.816 92.416-45.44 113.578667 9.685333l75.392 196.437333a85.333333 85.333333 0 1 1 61.184 159.317334l75.690666 197.205333c21.162667 55.168-21.333333 100.778667-77.824 83.2l-205.184-63.744-54.442666 20.906667 120.021333 172.202666c29.354667 42.069333 12.928 96.128-35.114667 114.56l-119.466666 45.866667c-40.32 15.488-89.898667 0.213333-114.56-35.157333l-132.096-189.525334-8.746667 3.370667z m210.816 137.344c2.261333 3.2 10.325333 5.717333 14.165333 4.821333l108.586667-41.685333-125.653333-180.266667-117.12 44.928 120.021333 172.202667z m-212.053333-319.658667a42.666667 42.666667 0 1 1-30.592-79.658666l139.349333-53.504-30.592-79.658667-199.253333 76.458667a128.042667 128.042667 0 0 0-73.514667 165.333333 128.085333 128.085333 0 0 0 165.248 73.685333l199.253333-76.501333-30.549333-79.658667-139.392 53.504z m353.237333-448.725333l-94.378667 156.757333a42.666667 42.666667 0 0 1-21.333333 17.962667l-79.701333 30.592 91.733333 238.976 79.701333-30.549333a42.666667 42.666667 0 0 1 27.989334-0.896l175.573333 54.698666-89.088-231.893333a86.912 86.912 0 0 1-1.962667-5.162667l-88.533333-230.485333z"
                  p-id="5702" fill="#d81e06"></path>
            </svg>
            <span>公告</span></div>
          <ul v-if="announcementList">
            <li v-for="(item,index) in announcementList" :key="index">
              <p class="wow fadeInLeft announcement-p">
                <p>{{ index + 1 }}、<span class="announcement-span" v-html="item.content"></span></p>
              </p>
            </li>
          </ul>
        </div>
        <div class="whitebg cloud">
          <div class="item-headline"><i class="fa fa-bars"></i><span>所有分类</span></div>
          <ul class="category-list" v-if="categoryList">
            <a :href="'/web/category-details/'+item.id" v-for="(item,index) in categoryList"
               :key="index" class="wow fadeInLeft">{{ item.name }}</a>
          </ul>
        </div>
        <div class="whitebg cloud">
          <div class="item-headline"><i class="fa fa-commenting"></i><span>最新留言</span></div>
          <div class="aside-list" v-if="messageList" v-for="(item,index) in messageList" :key="index">
            <div class="aside-list-item">
              <a href="/web/message" class="thumbnail">
                <img :src="item.userPortrait" alt="haha">
              </a>
              <div class="content">
                <p class="comment" v-html="item.content">
                </p>
                <div class="name">
                  <span>{{ item.userName }}</span>
                  <br/>
                  <time>{{ item.createDate|filterDateTime }}</time>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import editorBar from "../../components/wang-editor";
import comment from "./article-comment";
import "../../assets/js/scroll-details";
import marked from 'marked';

let rendererMD = new marked.Renderer();
marked.setOptions({
  renderer: rendererMD,
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
});
import {
  getAllComment,
  addComment
} from "../../api/comment.api";
import {
  getDetailsConfig
} from "../../api/common.api"
import {
  getArticleById,
  addArticleLike
} from "../../api/article.api";
import {
  getAllCategory
} from "../../api/category.api";
import {
  getPushAnnouncement
} from "../../api/annocement.api";
import {
  getNearSaveMessage
} from "../../api/message.api"
import {
  get
} from "../../utils/storage";
import ipAddress from "../../components/ipaddress";

export default {
  components: {
    editor: editorBar,
    comments: comment,
    "ipAddress": ipAddress
  },
  data() {
    return {
      //文章内容
      html: "",
      navList: [],
      activeIndex: 0,
      docsFirstLevels: [],
      docsSecondLevels: [],
      childrenActiveIndex: 0,
      article: {},
      articleId: "",
      tagsList: [],
      pageIndex: 1,
      pageSize: 5,
      total: 1,
      disabled: false,
      commentList: [],
      categoryList: [],
      messageList: [],
      announcementList: [],
      likeClass: "fa fa-heart",
      headerStyle: {
        backgroundImage: ""
      },
      alreadyLike: false
    }
  },
  filters: {
    filterDate(date) {
      return date.toString().substring(0, 10);
    },
    filterDateTime(date) {
      return date.toString().replace("T", " ").substring(0, date.toString().length);
    }
  },
  mounted() {
    this.articleId = this.$route.params.id;
    this.article = {};
    this.initBackgroundImage();
    this.loadInitData();
    this.getArticleDetailAndCategoryList();
  },
  methods: {
    initBackgroundImage() {
      let index = Math.floor(Math.random() * (0 - 4) + 4);
      getDetailsConfig().then((res) => {
        this.headerStyle.backgroundImage = "url(" + res.result[index].src + ")";
      });
    },
    async getArticleDetailAndCategoryList() {
      if (this.articleId === undefined || this.articleId === null || this.articleId === '' || this.articleId <= 0) {
        await this.$router.push({
          path: `/web/404`,
        })
      }
      await getArticleById(this.articleId).then(e => {
        if (e.code === 404) {
          this.$router.push({
            path: `/web/404`,
          })
        }
        if (e.returnStatus == null && !e.success) {
          this.$message({
            message: e.msg,
            type: "error"
          });
        }
        this.article = e.result;
        this.html = e.result.content;
        document.getElementsByTagName("title")[0].innerText = e.result.title;
        this.navList = this.handleNavTree();
        this.getDocsFirstLevels(0);
        this.article.content = marked(this.article.content);
      })
      await getAllCategory().then(e => {
        this.categoryList = e.result;
      });
    },
    loadInitData() {
      getNearSaveMessage(5).then(e => {
        this.messageList = e.result;
      })
      getPushAnnouncement().then(e => {
        this.announcementList = e.result;
      })
      getAllComment(this.articleId, this.pageSize, this.pageIndex).then(e => {
        this.commentList = e.result.data;
      });
    },
    loadMoreComments(p) {
      if (p == null) {
        p = this.pageIndex;
      }
      getAllComment(this.articleId, this.pageSize, p).then(e => {
        this.commentList = e.result.data;
      });
    },
    prev(p) {
      getAllComment(this.articleId, this.pageSize, p).then(e => {
        this.commentList = e.result.data;
      });
    },
    next(p) {
      getAllComment(this.articleId, this.pageSize, p).then(e => {
        this.commentList = e.result.data;
      });
    },
    // 文章点赞
    likeAdd() {
      if (!this.alreadyLike) {
        addArticleLike(this.articleId).then(e => {
          if (e.result) {
            this.alreadyLike = true;
            this.$message({
              message: "添加成功",
              type: "success"
            });
          } else {
            this.$message({
              message: e.msg,
              type: "error"
            });
          }
        })
      }
    },
    getBrowser() {
      let userAgent = navigator.userAgent; // 取得浏览器的userAgent字符串
      let broswer = "";
      let isOpera = userAgent.indexOf("Opera") > -1;
      if (isOpera) {
        broswer = "Opera";
      } else if (userAgent.indexOf("Firefox") > -1) {
        broswer = userAgent.substring(66, 78);
      } else if (userAgent.indexOf("Chrome") > -1) {
        broswer = userAgent.substring(81, 92);
      } else if (userAgent.indexOf("Safari") > -1) {
        broswer = "Safari";
      } else if (
          userAgent.indexOf("compatible") > -1 &&
          userAgent.indexOf("MSIE") > -1 &&
          !isOpera
      ) {
        broswer = "IE";
      } else if (userAgent.indexOf("Trident") > -1) {
        broswer = "Edge";
      }
      return broswer;
    },
    // 文章提交评论
    commentsSubmit() {
      this.comment = this.$refs.baseTextarea.getContent();
      let that = this;
      if (this.comment !== "" && this.comment !== "<p><br></p>") {
        let userId = get("userId");
        if (userId != null) {
          if (get("userEmail") !== null) {
            let param = {
              browser: this.getBrowser(),
              userId: parseInt(userId),
              articleId: this.articleId,
              content: this.comment,
              // location: returnCitySN["cip"]
            };
            addComment(param).then(e => {
              if (e.result) {
                this.$message({
                  message: "添加成功",
                  type: "success"
                });
                that.total += 1;
                that.loadMoreComments(that.pageIndex);
              } else if (!e.success) {
                this.$message({
                  message: e.msg,
                  type: "error"
                });
              }
            });
          } else {
            this.$message({
              message: "请注册邮箱后再填写哦!",
              type: "error"
            });
          }
        } else {
          this.$message({
            message: "请先登录哦！",
            type: "error"
          });
        }
      } else {
        this.$message({
          message: "再多写点字吧,我相信你的文笔！",
          type: "error"
        });
      }
    },
    childrenCurrentClick(index) {
      this.childrenActiveIndex = index;
    },
    getDocsFirstLevels(times) {
      // 解决图片加载会影响高度问题
      setTimeout(() => {
        let firstLevels = [];
        Array.from(document.querySelectorAll("h3"), (element) => {
          firstLevels.push(element.offsetTop - 60);
        });
        this.docsFirstLevels = firstLevels;

        if (times < 8) {
          this.getDocsFirstLevels(times + 1);
        }
      }, 500);
    },
    getDocsSecondLevels(parentActiveIndex) {
      let idx = parentActiveIndex;
      let secondLevels = [];
      let navChildren = this.navList[idx].children;

      if (navChildren.length > 0) {
        secondLevels = navChildren.map((item) => {
          setTimeout(() => {
            this.$nextTick(() => {
              document.body.scrollTop = document.documentElement.scrollTop =
                  this.$el.querySelector(`#${item.title.trim().replaceAll(".", "")}`).offsetTop - 120;
              return document.body.scrollTop;
            });
          }, 200);
        });
        this.docsSecondLevels = secondLevels;
      }
    },
    getLevelActiveIndex(scrollTop, docsLevels) {
      let currentIdx = null;
      let nowActive = docsLevels.some((currentValue, index) => {
        if (currentValue >= scrollTop) {
          currentIdx = index;
          return true;
        }
      });

      currentIdx = currentIdx - 1;

      if (nowActive && currentIdx === -1) {
        currentIdx = 0;
      } else if (!nowActive && currentIdx === -1) {
        currentIdx = docsLevels.length - 1;
      }
      return currentIdx;
    },
    pageJump(id) {
      setTimeout(() => {
        this.$nextTick(() => {
          document.body.scrollTop = document.documentElement.scrollTop =
              this.$el.querySelector(`#${id.trim().replaceAll(".", "")}`).offsetTop - 120;
          console.log(document.body.scrollTop);
        });
      }, 200);
    },
    currentClick(index) {
      this.activeIndex = index;
      this.getDocsSecondLevels(index);
    }
    ,
    getTitle(content) {
      let nav = [];

      let tempArr = [];
      content.replace(/(#+)[^#][^\n]*?(?:\n)/g, function (match, m1) {
        let title = match.replace("\n", "");
        let level = m1.length;
        tempArr.push({
          title: title.replace(/^#+/, "").replace(/\([^)]*?\)/, ""),
          level: level,
          children: [],
        });
      });

      // 只处理二级到四级标题，以及添加与id对应的index值，这里还是有点bug,因为某些code里面的注释可能有多个井号
      nav = tempArr.filter((item) => item.level >= 2 && item.level <= 4);
      global.console.log(nav);
      let index = 0;
      return (nav = nav.map((item) => {
        item.index = index++;
        return item;
      }));
    }
    ,
// 将一级二级标题数据处理成树结构
    handleNavTree() {
      let navs = this.getTitle(this.content);
      let navLevel = [1, 2, 3, 4];
      let retNavs = [];
      let toAppendNavList;

      navLevel.forEach((level) => {
        // 遍历一级二级标题，将同一级的标题组成新数组
        toAppendNavList = this.find(navs, {
          level: level,
        });

        if (retNavs.length === 0) {
          // 处理一级标题
          retNavs = retNavs.concat(toAppendNavList);
        } else {
          // 处理二级标题，并将二级标题添加到对应的父级标题的children中
          toAppendNavList.forEach((item) => {
            item = Object.assign(item);
            let parentNavIndex = this.getParentIndex(navs, item.index);
            return this.appendToParentNav(retNavs, parentNavIndex, item);
          });
        }
      });
      return retNavs;
    }
    ,
    find(arr, condition) {
      return arr.filter((item) => {
        for (let key in condition) {
          if (condition.hasOwnProperty(key) && condition[key] !== item[key]) {
            return false;
          }
        }
        return true;
      });
    }
    ,
    getParentIndex(nav, endIndex) {
      for (var i = endIndex - 1; i >= 0; i--) {
        if (nav[endIndex].level > nav[i].level) {
          return nav[i].index;
        }
      }
    }
    ,
    appendToParentNav(nav, parentIndex, newNav) {
      let index = this.findIndex(nav, {
        index: parentIndex,
      });
      nav[index].children = nav[index].children.concat(newNav);
    }
    ,
    findIndex(arr, condition) {
      let ret = -1;
      arr.forEach((item, index) => {
        for (var key in condition) {
          if (condition.hasOwnProperty(key) && condition[key] !== item[key]) {
            return false;
          }
        }
        ret = index;
      });
      return ret;
    }
    ,
  },
  computed: {
    content() {
      return this.html;
    }
    ,
    //此函数将markdown内容进一步的转换
    compiledMarkdown: function () {
      let index = 0;
      rendererMD.heading = function (text, level) {
        //我比较习惯三级和四级目录，这里看你喜欢
        if (level <= 4) {
          return `<h${level} id="data-${index++}">${text}</h${level}>`;
        } else {
          return `<h${level}>${text}</h${level}>`;
        }
      };

      return marked(this.content);
    }
  }
}
</script>

<style scoped>
@import "../../assets/css/detail/article-details.css";
@import "../../assets/css/detail/article-details-markdown.css";
</style>
