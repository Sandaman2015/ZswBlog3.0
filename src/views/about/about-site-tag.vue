<template>
    <div>
      <el-form
        :inline="true"
        ref="tagApplyForm"
        :model="formInline"
        :rules="rules"
        class="demo-form-inline"
      >
        <el-form-item label="插入标签" prop="tagTitle">
          <el-input v-model="formInline.tagTitle" placeholder="请输入标签"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="beforeSubmit">插入</el-button>
        </el-form-item>
      </el-form>
      <tag-cloud :data="hotTag" @clickTag="clickTagItem" :config="option"></tag-cloud>
    </div>
  </template>
  
  <script>
  import { getAllSiteTag, addSiteTag } from "../../api/about.api";
  export default {
    data() {
      return {
        rules: {
          tagTitle: [{ required: true, message: "请填写标签", trigger: "blur" }]
        },
        option: {
          radius: 300, // 滚动半径，单位px
          maxFont: 30, // 最大字体大小
          color: null, // 字体颜色。为空时随机
          rotateAngleXbase: 1000, // 默认旋转速度基数，数越小速度越快
          rotateAngleYbase: 1000,
          hover: true // 是否开启悬浮联动
        },
        formInline: {
          tagTitle: ""
        },
        hotTag: [],
        userId: 0
      };
    },
    mounted() {
      const h = this.$createElement;
      this.$notify({
        title: "温馨提示",
        message: h(
          "i",
          { style: "color: #296fc7" },
          "记得登录才可以添加标签哦！\r\n添加标签请注意文明用语哦！"
        )
      });
      this.getSiteTags();
    },
    methods: {
      async getSiteTags() {
        await getAllSiteTag().then(e => {
            console.log(e);
          this.hotTag = e.result;
        });
      },
      clickTagItem(tag) {
        let str = "成功为" + tag.name + "添加一次点击率，点击率越高显示时间越长";
        this.$message({ message: str, type: "success" });
      },
      onSubmit(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            let sitetag = {
              SitetagTitle: this.formInline.tagTitle,
              UserId: this.userId
            };
            addSiteTag(sitetag).then(e => {
              if (e.code == 200) {
                this.$message({
                  message: "提交成功,请耐心等待管理员审核查看！",
                  type: "success"
                });
              } else {
                this.$message({
                  message: "提交失败,请刷新重试",
                  type: "error"
                });
              }
            });
          } else {
            this.$message({
              message: "提交失败,请仔细审核",
              type: "error"
            });
          }
        });
      },
      beforeSubmit() {
        let userId = document.getElementById("userId").innerText;
        if (userId !== "0" && userId !== 0) {
          this.userId = userId;
          this.onSubmit("tagApplyForm");
        } else {
          this.$message({
            message: "请先登录哦！",
            type: "error"
          });
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .el-form {
    text-align: center;
    margin: 20px 0;
  }
  .tag-cloud {
    width: 700px !important;
    height: 700px !important;
  }
  .tag-cloud > p:hover {
    cursor: pointer;
    border: #45aaa4 solid 1px;
    color: black;
    transition: 0.5s;
  }
  </style>