<template>
  <div class="back-img" :style="headerStyle">
    <div class="container" :style="contentStyle">
      <h1 v-if="title">{{title}}</h1>
      <p v-if="description">{{description}}</p>
    </div>
  </div>
</template>

<script>
  import {
    getIllustrationConfig
  } from "../api/common.api"
  export default {
    props: {
      title: {
        type: String
      },
      description: {
        type: String
      },
      coverHeight: {
        type: String
      },
      coverWidth: {
        type: String
      }
    },
    data() {
      return {
        headerStyle: {
          backgroundImage: "",
          height: 0,
          width: 0
        },
        contentStyle: {
          height: 0,
          width: 0
        }
      }
    },
    created() {
      this.initBackgroundImage();
    },
    methods: {
      initBackgroundImage() {
        let index = Math.floor(Math.random() * (0 - 4) + 4);
        getIllustrationConfig().then((res) => {
          this.headerStyle.backgroundImage = "url(" + res.result[index].src + ")";
          this.headerStyle.height = this.coverHeight + "px";
          this.contentStyle.height = this.coverHeight + "px";
          if (this.coverWidth) {
            this.headerStyle.width = this.coverWidth + "%";
            this.contentStyle.width = this.coverWidth + "%";
            this.headerStyle.margin = "margin 0 auto";
            this.contentStyle.margin = "margin 0 auto";
          }
        })
      }
    }
  };
</script>

<style scoped>
  .back-img {
    background-size: 100% 100%;
    background-repeat: no-repeat;
    z-index: -999;
  }

  .container {
    display: block;
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
    font-size: 50px;
    color: white;
    font-family: "Hiragino Sans GB";
    font-weight: normal;
    z-index: 9;
  }

  p {
    position: absolute;
    width: 600px;
    left: 50%;
    margin-left: -300px;
    top: 40%;
    font-size: 38px;
    line-height: 44px;
    color: white;
    font-family: "Hiragino Sans GB";
    z-index: 9;
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