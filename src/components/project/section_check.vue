<template>
  <div class>
    <el-row class="my-3">
      <el-col :span="8" class="text-right">标段名称：</el-col>
      <el-col :span="16">{{item.projectName}}</el-col>
    </el-row>
    <el-row class="my-3">
      <el-col :span="8" class="text-right">标段图片：</el-col>
      <el-col :span="16">
        <el-image :src="item.projectImg" fit="contain"  style="width: 100px; height: 100px"></el-image>
        </el-col>
    </el-row>
    <el-row class="my-3">
      <el-col :span="8" class="text-right">服务器ID：</el-col>
      <el-col :span="16">{{item.guid}}</el-col>
    </el-row>
    <el-row class="my-3">
      <el-col :span="8" class="text-right">状态：</el-col>
      <el-col :span="16">
        <el-tag effect="dark" v-if="item.status==1" type="success" size="small">{{item.status}}</el-tag>
        <el-tag effect="dark" v-if="item.status==2" type="info" size="small">{{item.status}}</el-tag>
        <el-tag effect="dark" v-if="item.status==3" type="danger" size="small">{{item.status}}</el-tag>
        <el-tag effect="dark" v-if="item.status==4" type="warning" size="small">{{item.status}}</el-tag>
      </el-col>
    </el-row>
    <el-row class="my-3">
      <el-col :span="8" class="text-right">标段地址：</el-col>
      <el-col :span="16">{{item.address}}</el-col>
    </el-row>
    <el-row class="my-3">
      <el-col :span="8" class="text-right">标段事故数量：</el-col>
      <el-col :span="16">{{item.accidentNum}}</el-col>
    </el-row>
    <el-row class="my-3">
      <el-col :span="8" class="text-right">标段面积：</el-col>
      <el-col :span="16">{{item.area}}</el-col>
    </el-row>
    <el-row class="my-3">
      <el-col :span="8" class="text-right">标段造价：</el-col>
      <el-col :span="16">{{item.price}}</el-col>
    </el-row>
    <el-row class="my-3">
      <el-col :span="8" class="text-right">公司名称：</el-col>
      <el-col :span="16">{{item.cname}}</el-col>
    </el-row>
    <el-row class="my-3">
      <el-col :span="8" class="text-right">备注：</el-col>
      <el-col :span="16">{{item.remark}}</el-col>
    </el-row>
    <el-row class="my-3">
      <el-col :span="8" class="text-right">开始时间：</el-col>
      <el-col :span="16">{{item.createTime}}</el-col>
    </el-row>
    <el-row class="my-3">
      <el-col :span="8" class="text-right">结束时间：</el-col>
      <el-col :span="16">{{item.endtime}}</el-col>
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
        projectName: "加载中...",
        guid: "加载中...",
        status: "加载中...",
        cname: "加载中...",
        createTime: "加载中...",
        endtime: "加载中...",
        address: "加载中...",
        area: "加载中...",
        price: "加载中...",
        projectImg: "加载中...",
        remark: "加载中...",
        accidentNum: "加载中..."
      }
    };
  },
  mounted() {
    this.id = document.querySelector("#h_id").value;
    // console.log(this.id)
    if (this.id) {
      const that = this;
      this.$axios({
        url: that.GLOBAL.m_mainUrl + "/project/projectInfo/" + that.id,
        method: "get",
        headers: { auth: sessionStorage.getItem("auth") }
      })
        .then(function(response) {
            // console.log(response);
          if (response.data.code == 200) {
            that.item = response.data.data;
            that.item.cname=response.data.data.aqProjectCompans[0].cname;
          }
        })
        .catch(() => {
          //   console.log(error);
        });
    }
  }
};
</script>

<style>
</style>