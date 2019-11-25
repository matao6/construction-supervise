<template>
  <div class style="width: 800px;">
    <el-row class="my-3">
      <el-col :span="3" class="text-right">企业名称：</el-col>
      <el-col :span="9">{{item.org_name}}</el-col>
      <el-col :span="3" class="text-right">印章类型：</el-col>
      <el-col :span="9">{{item.name}}</el-col>
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
        <el-radio v-model="radio" label="2">通过</el-radio>
        <el-radio v-model="radio" label="3">退回</el-radio>
      </el-col>
    </el-row>
    <el-row class="my-3">
      <el-col :span="3" class="text-right">意见：</el-col>
      <el-col :span="9">
        <el-input type="textarea" v-model="desc" placeholder="请填写意见"></el-input>
      </el-col>
    </el-row>
    <el-row class="my-3">
      <el-col class="text-center">
        <el-button type="primary" size="medium" @click="msubmit" :loading="loading">提交</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "seal_check",
  data() {
    return {
      id: null,
      radio: "2",
      desc: "",
      loading: false,
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
          //   console.log(response);
          if (response.data.code == 1) {
            that.item = response.data.data[0];
          }
        })
        .catch(() => {
          // console.log(error);
        });
    }
  },
  methods: {
    msubmit() {
        this.loading=true;
      const that = this;
      this.$axios({
        url: that.GLOBAL.m_mainUrl + "/seal/check",
        method: "post",
        params: {
          id: that.id,
          status: that.radio,
          remark: that.desc
        }
      })
        .then(response => {
          //   console.log(response)
          if (response.data.code == 1) {
            that.$message({
              message: response.data.message,
              duration: 2000,
              type: "success"
            });
            
            setTimeout(() => {
                document.querySelector("#s_refresh").value=false;
                document.querySelector("#s_refresh").dispatchEvent(new Event("input"));
            }, 800);
          }
        })
        .catch(() => {});
    }
  }
};
</script>

<style>
</style>