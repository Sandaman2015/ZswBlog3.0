<template>
  <div class="container-404">
    <vue-particles
        class="particles" color="#fff" :particleOpacity="0.2" :particlesNumber="60" shapeType="circle"
        :particleSize="4" linesColor="#fff" :linesWidth="0.8" :lineLinked="true" :lineOpacity="0.4"
        :linesDistance="150" :moveSpeed="2" :hoverEffect="true" hoverMode="grab" :clickEffect="true"
        clickMode="push" height="100%">
    </vue-particles>
    <div class="text-sign">
      <h3>登录成功,即将跳转页面!</h3>
      <h3>Login Successfully!</h3>
      <a href="/web/index">如果页面没有跳转请点我返回主页
        <br>
        (If the page does not jump please click me back home)
      </a>
      <p id="showText" v-html="showMsg">{{ showMsg }}</p>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      timer: "",
      value: new Date(),
      msg: `旅行者1号（英语：Voyager 1）是由美国宇航局研制的一艘无人外太阳系空间探测器。重815千克，于1977年9月5日发射，截止到2020年6月仍然正常运作。它曾到访过木星及土星，是提供了其卫星高解像清晰照片的第一艘航天器。它的主要任务在1979年经过木星系统、1980年经过土星系统之后，结束于1980年11月20日。它也是第一个提供了木星、土星以及其卫星详细照片的探测器。距今离地球最远的人造卫星。2012年8月25日，“旅行者1号”成为第一个穿越太阳圈并进入星际介质的宇宙飞船。截至2019年10月23日止，旅行者1号正处于离太阳211亿公里的距离。`,
      showMsg: "",
      index: -1
    };
  },
  mounted() {

  }
};
</script>

<style scoped>
.particles {
  position: fixed;
  height: 100%;
  width: 100%;
}

.particles {
  width: calc(100%) !important;
  height: calc(100vh) !important;
}

.container-404 {
  background-color: black;
  /*background: url("https://zswblog.oss-cn-hangzhou.aliyuncs.com/404/wallhaven-eodvmr.png");*/
  height: calc(100vh);
}

.text-sign {
  position: absolute;
  width: 800px;
  top: 50%;
  left: 50%;
  margin-top: -200px;
  margin-left: -400px;
  text-align: center;
}

.text-sign h3 {
  width: 100%;
  color: #ffffff;
  font-size: 48px;
  font-weight: 300;
}

.text-sign p {
  color: #ffffff;
}

.text-sign a {
  width: 100%;
  color: #ffffff;
}

.text-sign a:hover {
  color: burlywood;
  transition: .2s;
}
</style>
