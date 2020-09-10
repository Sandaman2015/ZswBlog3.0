<template>
  <div class="footer-wrap">
    <div class="footer">
      <div class="footer-fixed">
        <div class="copyright">
          <div class="info">
            <div class="contact">
              <a href="https://github.com/Sandaman2015" class="github">
                <i class="fa fa-github"></i>
              </a>
              <a
                href="http://wpa.qq.com/msgrd?v=3&uin=1761317983&site=qq&menu=yes"
                class="qq"
                target="_blank"
              >
                <i class="fa fa-qq"></i>
              </a>
              <a
                href="http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=lOL95_D75sv9-dTy__z59f34uvf7_Q"
                class="email"
                target="_blank"
              >
                <i class="fa fa-envelope"></i>
              </a>
              <a href="javascript:void(0)" class="weixin">
                <i class="fa fa-weixin"></i>
              </a>
            </div>
            <p class="mt05">
              {{copyright}}&copy;{{footerText}}
              <a href="http://www.miit.gov.cn/">皖ICP备19012774号</a>
            </p>
            <p class="mt05">
              Powered by .NET Core on Linux
              <i class="fa fa-linux" aria-hidden="true"></i>&nbsp;
              <a href="http://this.zswblog.xyz">后台管理</a>&nbsp;
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      copyright: "Copyright",
      footerText: "2019-2020 张晟玮 All rights reserved"
    };
  },
  mounted() {
    const script = document.createElement("script");
    script.src =
      "https://v1.cnzz.com/z_stat.php?id=1278706390&web_id=1278706390"; //友盟中的代码
    script.language = "JavaScript";
    document.getElementsByClassName("mt05")[1].appendChild(script);

    const a = document.createElement("a");
    a.href =
      "https://web.umeng.com/main.php?c=site&a=frame&siteid=1278706390#!/1584922058639/site/overview/1/1278706390/2020-03-23/2020-03-23"; //友盟中的代码
    a.title = "网站统计";
    a.text = "网站统计";
    a.style = "font-size:13px;color: #212220;";
    document.getElementsByClassName("mt05")[1].appendChild(a);
  },
  watch: {
    $route() {
      if (window._czc) {
        let location = window.location; //路由变化
        let contentUrl = location.hash; //自定义当前url，可带上路由以此区分每个页面
        // console.log(contentUrl);
        let refererUrl = "/";
        window._czc.push(["_setAutoPageview", false]);
        window._czc.push(["_trackPageview", contentUrl, refererUrl]);
      }
    }
  }
};
</script>

<style scoped>
@import "@/assets/css/font-awesome.min.css";
@import "@/assets/css/footer.css";
.footer-wrap {
  background-color: white;
}
.contact a .fa {
  color: #212220;
}
.fa-linux {
  color: #555;
}
</style>
