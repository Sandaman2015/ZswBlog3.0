<template>
  <div id="goTop">
    <div class="icons" v-show="visiable" @click="handleScrollTop">
      <i class="icons-top"></i>
    </div>
    <div @click="onCopy" class="icons" v-show="visiable">
      <i class="icon el-icon-message"></i>
    </div>
    <div @click="goToGithub" v-show="visiable" class="icons">
      <i class="icon fa fa-github" aria-hidden="true"></i>
    </div>
    <div @click="playTour" v-show="visiable" class="icons">
      <i class="icon el-icon-present"></i>
    </div>
    <div @click="playLoading" v-show="visiable" class="icons">
      <i :class="icon"></i>
    </div>
  </div>
</template>
<script>
import "../assets/js/scroll";
import { saveEmail } from "../api/user.api";
import { get } from "../utils/storage";
export default {
  name: "goTop",
  data() {
    return {
      icon: "icon fa fa-spin fa-firefox",
      broswer: "",
      copyText: "欢迎访问zswblog博客!",
      scrollTop: null, // 初始化scrollTop
      visiable: false, // 默认不显示
      aliPayImg: require("../assets/img/alipay.jpg"),
      webchatPayImg: require("../assets/img/wxpay.jpg"),
    };
  },
  created() {
    let userAgent = navigator.userAgent; // 取得浏览器的userAgent字符串
    let isOpera = userAgent.indexOf("Opera") > -1;
    if (isOpera) {
      this.icon = "icon fa fa-spin fa-opera";
      this.broswer = "Opera";
    } else if (userAgent.indexOf("Firefox") > -1) {
      this.icon = "icon fa fa-spin fa-firefox";
      this.broswer = "火狐";
    } else if (userAgent.indexOf("Chrome") > -1) {
      this.icon = "icon fa fa-spin fa-chrome";
      this.broswer = "谷歌";
    } else if (userAgent.indexOf("Safari") > -1) {
      this.icon = "icon fa fa-spin fa-safari";
      this.broswer = "Safari";
    } else if (
      userAgent.indexOf("compatible") > -1 &&
      userAgent.indexOf("MSIE") > -1 &&
      !isOpera
    ) {
      this.icon = "icon fa fa-spin fa-internet-explorer";
      this.broswer = "IE";
    } else if (userAgent.indexOf("Trident") > -1) {
      this.icon = "icon fa fa-spin fa-edge";
      this.broswer = "Edge";
    } else {
      this.icon = "icon fa fa-chain-broken";
      this.broswer = "不推荐的";
    }
  },
  methods: {
    handleScroll() {
      this.scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (this.scrollTop > 50) {
        this.visiable = true;
      } else {
        this.visiable = false;
      }
    },
    handleScrollTop() {
      let timer = null,
        that = this;
      cancelAnimationFrame(timer);
      timer = requestAnimationFrame(function fn() {
        if (that.scrollTop > 0) {
          that.scrollTop -= 200;
          document.body.scrollTop = document.documentElement.scrollTop =
            that.scrollTop;
          timer = requestAnimationFrame(fn);
        } else {
          cancelAnimationFrame(timer);
          that.visiable = false;
        }
      });
    },
    onCopy() {
      this.$prompt("添加或修改您的回复邮箱", "邮箱添加", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: "邮箱格式不正确",
      }).then(({ value }) => {
        let userId = get("userId");
        if (userId != null) {
          let user = {
            email: value,
            id: userId,
          };
          saveEmail(user).then((e) => {
            if (e.result) {
              this.$message({
                type: "success",
                message: "保存成功",
              });
            }
          });
        } else {
          this.$message({
            type: "warning",
            message: "请先登录哦",
          });
        }
      });
    },
    onError() {
      this.$message.error("复制失败！");
    },
    playTour() {
      this.$notify({
        title: "感谢您的支持！",
        dangerouslyUseHTMLString: true,
        message:
          "<img src=" +
          this.aliPayImg +
          " alt='支付宝' ><img src=" +
          this.webchatPayImg +
          " alt='微信' ><br/><span>本站获得的所有打赏均用于服务器的维护以及内容的添加,感谢您的支持!</span>",
        duration: 0,
        showClose: true,
      });
    },
    playLoading() {
      this.$notify({
        title: "浏览器提醒",
        message:
          "您正在使用" + this.broswer + "内核的浏览器!欢迎访问张晟玮博客！",
        type: "success",
      });
    },
    goToGithub() {
      this.$notify({
        title: "提醒",
        message:
          "芜湖航班，即将起飞！目的地：博客Github地址!点击Star！祝你快乐百分百！！",
        type: "success",
      });
      window.location.href =
        "https://github.com/Sandaman2015/ZswBlog3.0";
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style scoped>
/* .icons */
#goTop {
  position: fixed;
  right: 1.4rem;
  bottom: 12rem;
  width: 36px;
  height: 36px;
  z-index: 214748367;
}

.icons {
  display: block;
  float: left;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.65);
}

.icons:hover {
  background: rgba(0, 0, 0, 0.85);
}

.icons-top {
  display: block;
  width: 36px;
  height: 36px;
  background-size: 1.4rem;
  background-repeat: no-repeat;
  background-position: center center;
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABaUlEQVRYR+2W7U3DQBBE31QAJaQDUkJSAXQA6QAqACqADggVBCoAKoAOCBWEDgatZEcHyeX8AYqQvD/P59t3s7tjiz2H9pyfAWBQ4H8rYPtQ0mefSeqlgO0HYCVp1hWiM4DtOXACHADzrhCdAGxfAZdAffM74ELSbVslWgPYPgMi4UxSqMC2taYgrQCSRNeSQoV1VCU5BaaSnn8dwPYYeAIeJYUKG1FBHFcQb00gGimQJH+RFI2XDdtx+6OmEEWAmHXgHfgAJqW5r/YHhCuInT6xE6A6LGSPfcXktSzVe1GCVQmiBBCHjICxpGWTmiYQ0TOhxKukae7dLEBiNHHzRg31M0nVOwGxyBnVVoCuI5WZjGjaRc4tNwBsnwM3qdG0kT4DsWFe9b5vAH0crQSZu9gawHYt1X3OaEpJSs+3lTYFiGZZ/lXyZDri+zGSNIm1FKD3z0VJgdQnakMrOmHTQ7vuGwAGBQYFvgCufKAhUkYyWwAAAABJRU5ErkJggg==");
}

.icon {
  font-size: 22px;
  margin: 7px 7px;
  color: white;
  background-size: 1.4rem;
  background-repeat: no-repeat;
  background-position: center center;
  z-index: 9999;
}

.fa-github {
  margin: 7px 8.5px;
}
</style>