<template>
    <div>
      <div>
        <div class="main animated zoomIn">
          <img src="../../assets/img/icon.jpg" alt="图标" class="favicon animated rotateIn" />
          <h1>ZswBlog</h1>
          <h2>一名正在追求理想追求自我的程序员</h2>
        </div>
        <hr />
        <div class="location">
          <p id="main-site">
            <i class="fa fa-hourglass-end" aria-hidden="true"></i>
            <a href="http://www.zswblog.xyz">
              <span>www.zswblog.xyz</span>
            </a>
          </p>
        </div>
        <div class="date">
          <p id="main-date">
            <i class="fa fa-clock-o" aria-hidden="true"></i>
            <span id="showtime"></span>
          </p>
        </div>
        <div class="about">
          <p class="about-site">
            本站为张晟玮博客2.0版本，目前已开源至Github和Gitee，欢迎大家给我点一个star！
            <br />后端：
            <span>
              该博客由原先的.Net MVC+EF+SqlServer2008作为后端支持,
              但是由于前端设计的太烂，而且正好服务器到期，所以我放弃了维护
              并重新设计并且将后端服务改为了.Net Core WebApi+Mysql,
              服务器也从原来的腾讯云转到了阿里云,并不是服务器不好只是我想尝试新挑战！
              况且过度依赖IIS也是不好,想尝试一下Linux所以我迈出了舒适圈,
              此次选用服务器采用标准的Centos 7+Nginx反向代理作为支持。
              运用到的框架：Autofac,AutoMapper,EFCore,第三方登录,DDD领域驱动,Redis。
              相关技术我会有时间分享的，
              目前SpringBoot版本已经在准备中而且我准备将前端转换为有利于SEO优化的大型静态化HTML页面
              因为前后端分离的缺点，导致了该站点的SEO并未很好的被百度收录！
            </span>
            <br />前端：
            <span>
              前端在1.0的时候设计就是like shit！,称它为我写过最恶心的代码一点都不为过。
              强行拼凑jquery+vue+layui,而且有的直接复制的js我自己都没看懂直接先跑再说。。。
              所以这次我吸取教训，提前做好了Vue的功课和笔记，也做了不少小例子，
              而且我利用webpack+node工具使我一下子对前端有了崭新的认识,
              模块化的开发思想很棒，也很符合未来软件设计，其实不止前端，后端也是！
              运用到的技术：Node,Webpack,VueCli3.0,Element-Ui,还有一些网上百度的自认为很漂亮的组件
            </span>
          </p>
          <p class="about-thanks animated swing">
            以下是为本站做过贡献的人:
            <br />
            <span>隆重介绍我的同学---"🐒胖童鞋",感谢她为我设计的博客图标！</span>
            <br />
            <span>
              感谢燕十三的博客开源分享,让我一些组件可以借鉴
              感谢尤雨溪这个闪闪发光的大佬！Vue是我用的最快速上手的一门前端框架,
              同时也要感谢Layui平台、Element-UI开发组,他们推动了行业的进步，让我能快速成长！
            </span>
          </p>
          <p>
            <el-calendar v-model="value"></el-calendar>
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { setInterval, clearInterval } from "timers";
  
  export default {
    name: "web-site",
    data() {
      return {
        timer: "",
        value: new Date()
      };
    },
    mounted() {
      clearInterval(this.timer);
      this.timer = setInterval(this.showDateTime, 1000);
    },
    methods: {
      showDateTime() {
        let BirthDay = new Date("10/08/2019 00:00:00");
        let today = new Date();
        let timeold = today.getTime() - BirthDay.getTime();
        let sectimeold = timeold / 1000;
        let secondsold = Math.floor(sectimeold);
        let msPerDay = 24 * 60 * 60 * 1000;
        let e_daysold = timeold / msPerDay;
        let daysold = Math.floor(e_daysold);
        let e_hrsold = (e_daysold - daysold) * 24;
        let hrsold = Math.floor(e_hrsold);
        let e_minsold = (e_hrsold - hrsold) * 60;
        let minsold = Math.floor((e_hrsold - hrsold) * 60);
        let seconds = Math.floor((e_minsold - minsold) * 60);
        showtime.innerHTML =
          "网站运行了：" +
          daysold +
          "天" +
          hrsold +
          "小时" +
          minsold +
          "分" +
          seconds +
          "秒";
      }
    },
    beforeDestroy() {
      clearInterval(this.timer);
    }
  };
  </script>
  
  <style scoped>
  h1,
  h2,
  h4,
  p,
  a {
    font-weight: normal;
    font-family: "Microsoft YaHei";
  }
  .favicon {
    height: 130px;
    width: 130px;
    border-radius: 50%;
  }
  .main,
  .location,
  .date {
    text-align: center;
    display: block;
  }
  .location,
  .date {
    width: 500px;
    margin: 0 auto;
    line-height: 30px;
    margin-top: 15px;
  }
  .location span,
  .date span {
    font-size: 22px;
  }
  h4 {
    float: left;
    width: 100%;
  }
  i {
    line-height: 30px;
  }
  .about-site {
    font-size: 24px;
  }
  .about-site > span {
    text-indent: 2em;
    float: left;
    margin-bottom: 15px;
    font-size: 18px;
  }
  .about-thanks {
    font-size: 24px;
  }
  .about-thanks > span {
    text-indent: 2em;
    float: left;
    margin-bottom: 25px;
    font-size: 18px;
  }
  a {
    text-decoration: none;
    color: #f25b67;
  }
  @media screen and (max-width: 475px) {
    .about-site,
    .about-thanks {
      margin-left: 1em !important;
    }
    .location,
    .date {
      width: 97% !important;
    }
  }
  </style>