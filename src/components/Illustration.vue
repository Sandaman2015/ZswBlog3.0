<template>
  <div class="back-img">
    <div class="container">
      <h1>This is ZswBlog</h1>
      <p>坚持追求自我，努力成为完美</p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.back-img {
  height: 300px;
  width: 100%;
  background-image: url("https://singleblog.oss-cn-beijing.aliyuncs.com/images/bg_about.jpg");
  background-attachment: fixed;
  background-repeat: no-repeat;
}
.container {
  display: block;
  width: 600px;
  height: 300px;
  margin: 0 auto;
  text-align: center;
  position: relative;
}
h1 {
  position: absolute;
  line-height: 44px;
  width: 600px;
  left: 50%;
  margin-left: -300px;
  top: 25%;
  font-size: 60px;
  color: white;
  font-family: "Hiragino Sans GB";
  font-weight: normal;
}
p {
  position: absolute;
  width: 600px;
  left: 50%;
  margin-left: -300px;
  top: 58%;
  font-size: 33px;
  line-height: 44px;
  color: white;
  font-family: "Hiragino Sans GB";
}
@media screen and (max-width: 475px) {
  .container {
    width: 100% !important;
    text-align: center;
  }
  h1,
  p {
    width: 100% !important;
    margin: 0;
    left: 0;
  }
}
</style>