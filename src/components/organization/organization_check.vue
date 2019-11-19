<template>
  <div class>
    <el-row class="my-3">
      <el-col :span="8" class="text-right">机构名称：</el-col>
      <el-col :span="16">{{item.companyName}}</el-col>
    </el-row>
    <el-row class="my-3">
      <el-col :span="8" class="text-right">账号：</el-col>
      <el-col :span="16">{{item.companyEmail}}</el-col>
    </el-row>
    <el-row class="my-3">
      <el-col :span="8" class="text-right">密码：</el-col>
      <el-col :span="16">{{item.companyPass}}</el-col>
    </el-row>
    <el-row class="my-3">
      <el-col :span="8" class="text-right">联系方式：</el-col>
      <el-col :span="16">{{item.contact}}</el-col>
    </el-row>
    <el-row class="my-3">
      <el-col :span="8" class="text-right">创建时间：</el-col>
      <el-col :span="16">{{item.createTime}}</el-col>
    </el-row>
    <el-row class="my-3">
      <el-col :span="8" class="text-right">更新时间：</el-col>
      <el-col :span="16">{{item.updateTime}}</el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "seal_check",
  data() {
    return {
      id: null,
      item: {
        companyName: "加载中...",
        companyEmail: "加载中...",
        companyPass: "加载中...",
        contact: "加载中...",
        createTime: "加载中...",
        updateTime: "加载中..."
      }
    };
  },
  mounted() {
    this.id = document.querySelector("#o_id").value;
    // console.log(this.id)
    if (this.id) {
      const that = this;
      this.$axios({
        url: that.GLOBAL.m_mainUrl + "/supervise/supaccount",
        method: "get",
        params: {
            id: that.id
        },
        headers: { auth: sessionStorage.getItem("auth") }
      })
        .then(function(response) {
          console.log(response);
          if (response.data.code == 1) {
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