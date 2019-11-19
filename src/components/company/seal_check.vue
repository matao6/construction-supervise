<template>
  <div class>
    <el-row class="my-3">
      <el-col :span="8">印章名称：</el-col>
      <el-col :span="16">{{item.title}}</el-col>
    </el-row>
    <el-row class="my-3">
      <el-col :span="8">印章：</el-col>
      <el-col :span="16">
        <el-image :src="item.img" fit="contain" style="width: 220px;"></el-image>
      </el-col>
    </el-row>
    <el-row class="my-3">
      <el-col :span="8">承诺书：</el-col>
      <el-col :span="16">
        <el-image :src="item.undertaking" fit="contain" style="width: 220px;"></el-image>
      </el-col>
    </el-row>
    <el-row class="my-3">
      <el-col :span="8">状态：</el-col>
      <el-col :span="16">{{item.status}}</el-col>
    </el-row>
    <el-row class="my-3">
      <el-col :span="8">人员：</el-col>
      <el-col :span="16">{{item.pids}}</el-col>
    </el-row>
    <el-row class="my-3">
      <el-col :span="8">备注：</el-col>
      <el-col :span="16">{{item.remark}}</el-col>
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
        title: "加载中...",
        img: "加载中...",
        status: "加载中...",
        undertaking: "加载中...",
        pids: "加载中...",
        remark: "加载中..."
      }
    };
  },
  mounted(){
    this.id=document.querySelector("#s_id").value;
    if(this.id){
      const that = this;
      this.$axios({
        url: that.GLOBAL.m_mainUrl + "/seal/getOne",
        method: "get",
        params: {
          id: that.id
        },
        headers: { auth: sessionStorage.getItem("auth") }
      })
        .then(function(response) {
          // console.log(response);
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