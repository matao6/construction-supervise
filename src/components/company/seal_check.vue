<template>
  <div class style="width: 800px;">
    <el-row class="my-3">
      <el-col :span="3" class="text-right">印章名称：</el-col>
      <el-col :span="9">{{item.title}}</el-col>
      <el-col :span="3" class="text-right">企业名称：</el-col>
      <el-col :span="9">{{item.org_name}}</el-col>
    </el-row>
    <el-row class="my-3">
      <el-col :span="3" class="text-right">承诺书：</el-col>
      <el-col :span="9">
        <el-image :src="item.undertaking" fit="contain" style="height: 200px;"></el-image>
      </el-col>
      <el-col :span="3" class="text-right">印章：</el-col>
      <el-col :span="9">
        <el-image :src="item.img" fit="contain" style="height: 200px;"></el-image>
      </el-col>
    </el-row>
    <el-row class="my-3">
      <el-col :span="3" class="text-right">状态：</el-col>
      <el-col :span="9">
        <el-tag effect="dark" v-if="item.status==1" type size="small">企业上报</el-tag>
        <el-tag effect="dark" v-if="item.status==2" type="warning" size="small">生成中</el-tag>
        <el-tag effect="dark" v-if="item.status==3" type="danger" size="small">退回</el-tag>
        <el-tag effect="dark" v-if="item.status==4" type="success" size="small">已生成</el-tag>
      </el-col>
      <el-col :span="3" class="text-right">备注：</el-col>
      <el-col :span="9">{{item.remark}}</el-col>
    </el-row>
    <el-row class="my-3">
      <el-col :span="3" class="text-right">印章类型：</el-col>
      <el-col :span="9">{{item.name}}</el-col>
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
        remark: "加载中...",
        name: "加载中..."
      }
    };
  },
  mounted() {
    this.id = document.querySelector("#s_id").value;
    if (this.id) {
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
            that.item = response.data.data[0];
          }
        })
        .catch(() => {
          // console.log(error);
        });
    }
  }
};
</script>

<style>
</style>