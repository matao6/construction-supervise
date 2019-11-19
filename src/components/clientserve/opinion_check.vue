<template>
  <div class style="max-width: 550px;">
    <el-row class="my-3 h6">
      <el-col :span="8" class="text-right">标题：</el-col>
      <el-col :span="16">{{item.fbTitle}}</el-col>
    </el-row>
    <el-row class="my-3 h6">
      <el-col :span="8" class="text-right">联系方式：</el-col>
      <el-col :span="16">{{item.createMobile}}</el-col>
    </el-row>
    <el-row class="my-3 h6">
      <el-col :span="8" class="text-right">截图：</el-col>
      <el-col :span="16">
          <el-image :src="item.fbImg" fit="contain" style="max-width: 300px;"></el-image>
      </el-col>
    </el-row>
    <el-row class="my-3 h6">
      <el-col :span="8" class="text-right">反馈内容：</el-col>
      <el-col :span="16">{{item.fbContent}}</el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "opinion_check",
  data() {
    return {
      id: null,
      item: {
        fbTitle: "加载中...",
        createMobile: "加载中...",
        fbImg: "加载中...",
        fbContent: "加载中..."
      }
    };
  },
  mounted() {
    const that = this;
    this.id = document.querySelector("#o_id").value;
    if (this.id) {
      this.$axios({
        url: that.GLOBAL.m_mainUrl + "/feedback/details/" + that.id,
        method: "get",
        headers: { auth: sessionStorage.getItem("auth") }
      }).then(response => {
        // console.log(response);
        if (response.data.code == 200) {
          that.item = response.data.data;
        }
      });
    }
  }
};
</script>

<style>
</style>