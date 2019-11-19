<template>
  <div class>
    <el-row class="my-3">
      <el-col :span="8" class="text-right">事故名称：</el-col>
      <el-col :span="16">{{item.title}}</el-col>
    </el-row>
    <el-row class="my-3">
      <el-col :span="8" class="text-right">项目名称：</el-col>
      <el-col :span="16">{{item.projectName}}</el-col>
    </el-row>
    <el-row class="my-3">
      <el-col :span="8" class="text-right">事故类型：</el-col>
      <el-col :span="16">{{item.lx}}</el-col>
    </el-row>
    <el-row class="my-3">
      <el-col :span="8" class="text-right">死亡人数：</el-col>
      <el-col :span="16">{{item.dieNumber}}</el-col>
    </el-row>
    <el-row class="my-3">
      <el-col :span="8" class="text-right">重伤人数：</el-col>
      <el-col :span="16">{{item.zsNumber}}</el-col>
    </el-row>
    <el-row class="my-3">
      <el-col :span="8" class="text-right">事故发生时间：</el-col>
      <el-col :span="16">{{item.fsTime}}</el-col>
    </el-row>
    <el-row class="my-3">
      <el-col :span="8" class="text-right">经济损失(万元)：</el-col>
      <el-col :span="16">{{item.ssPrice}}</el-col>
    </el-row>
    <el-row class="my-3">
      <el-col :span="8" class="text-right">备注：</el-col>
      <el-col :span="16">{{item.remark}}</el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "accident_check",
  data() {
    return {
      id: null,
      item: {
        title: "加载中...",
        projectName: "加载中...",
        lx: "加载中...",
        dieNumber: "加载中...",
        zsNumber: "加载中...",
        fsTime: "加载中...",
        ssPrice: "加载中...",
        remark: "加载中..."
      }
    };
  },
  mounted() {
    this.id = document.querySelector("#h_id").value;
    // console.log(this.id)
    if (this.id) {
      const that = this;
      this.$axios({
        url: that.GLOBAL.m_mainUrl + "/accident/read/"+that.id,
        method: "get",
        headers: { auth: sessionStorage.getItem("auth") }
      })
        .then(function(response) {
        //   console.log(response);
          if (response.data.code == 200) {
            that.item = response.data.data;
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style>
</style>