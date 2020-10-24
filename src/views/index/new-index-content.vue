<template>
  <div>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">  
        <div class="grid-content bg-purple-dark">
          <a href="">kallalal</a>
        </div>
      </el-col>
      <el-col >
        <div class="grid-content bg-purple-light">
          <a href="">kallalal</a>
        </div>
      </el-col>
      <el-col >
        <div class="grid-content bg-purple">
          <a href="">kallalal</a></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {};
</script>

<style>
.el-row {
  margin-bottom: 20px;
  /* &:last-child {
    margin-bottom: 0;
  } */
}
.el-col {
  border-radius: 4px;
  float: left;
}
.bg-purple-dark {
  background: red;
}
.bg-purple {
  background: green;
}
.bg-purple-light {
  background: blue;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
  height: 800px;
}
</style>