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
    <div class="nav_followme">      
      <h5 class="other-item-title">关注我</h5>
      <div class="aside-list">
            <div class="aside-list-item"><a href="/messageboard/" class="thumbnail" ><img
                  src="../../assets/img/about-me.jpg" alt="haha"></a>
              <div class="content">
                <ul class="follow">
                  <li>
                    <a class="comment" target="blank" href="https://www.zhihu.com/people/ben-jiu-yi-yang" >
                      <img src="../../assets/img/detail/zhihu.png">
                    </a>
                  </li>
                  <li>
                    <a class="comment" target="blank" href="https://space.bilibili.com/12014895" >
                      <img src="../../assets/img/detail/bilibili.png">
                    </a>
                  </li>
                  <li>
                    <a class="comment" target="blank" href="https://weibo.com/5060565838/profile?rightmod=1&amp;wvr=6&amp;mod=personinfo&amp;is_all=1" >
                      <img src="../../assets/img/detail/weibo.png">
                    </a>
                  </li>
                  <li>
                    <a class="comment" target="blank" href="https://twitter.com/DnUJoG07tYOs99p" >
                      <img src="../../assets/img/detail/tuite.png">
                    </a>
                  </li>
                  <li>
                    <a class="comment" target="blank" href="https://github.com/Sandaman2015" >
                      <img src="../../assets/img/detail/github.png">
                    </a>
                  </li>
                </ul>
                <div class="name"><time>追求自我，成为更完美</time></div>
              </div>
            </div>            
      </div> 
    </div>
    <div class="nav_category">
      <h5 class="other-item-title">所有文章分类</h5>
      <div class="inner">
        <ul class="widget">
          <a class="category-a" href="/web/category">全部分类</a>
          <a class="category-a" :href="'/web/category-details/'+category.id" v-for="(category,index) in categoryList" :key="index">{{category.name}}</a>
        </ul>
      </div>
    </div>
    <!-- 热门点赞文章 -->
    <div class="nav_top5 wow bounceInUp">
      <h5 class="other-item-title">热门点赞文章</h5>
      <div class="inner">
        <ul class="hot-list-article">
          <li v-for="(item,index) in hotLikeArticleList" class="wow slideInLeft" :key="index">
            <a :href="'/web/article-details/'+item.id">{{item.title}}</a>
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
            <a :href="'/web/article-details/'+item.id">{{item.title}}</a>
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
      }
    }
  };
</script>