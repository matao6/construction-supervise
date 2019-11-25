<template>
  <div class style="width: 800px;">
    <el-row class="my-4">
      <el-col :span="8" :offset="8" class="text-center">
        <el-upload
          class="upload-demo"
          ref="upload"
          :action="action"
          :limit="1"
          :file-list="fileList"
          :auto-upload="false"
          list-type="picture"
          :before-upload="mbefore"
          :on-success="msuccess"
        >
          <el-button slot="trigger" size="small" type="primary">选取印章</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="msubmit">提交</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { showLoading, hideLoading } from "../../assets/js/loading.js";

export default {
  name: "seal_check",
  data() {
    return {
      id: null,
      loading: false,
      action: "",
      fileList: []
    };
  },
  mounted() {
    this.action = this.GLOBAL.m_mainUrl + "/uploadFile";
    this.id = document.querySelector("#s_id").value;
  },
  methods: {
    msubmit() {
      this.$refs.upload.submit();
    },
    msuccess(response) {
      showLoading();
      if (response.code == 200) {
        const that = this;
        let msg = response.message;
        let img = response.data.filename;
        this.$axios({
          url: that.GLOBAL.m_mainUrl + "/seal/uploadSeal",
          method: "post",
          params: {
            id: that.id,
            img: img
          },
          headers: { auth: sessionStorage.getItem("auth") }
        })
          .then(nextRes => {
            console.log(nextRes);
            if (nextRes.data.code == 1) {
              hideLoading();
              that.$message({
                message: msg,
                duration: 2000,
                type: "success"
              });
            }
          })
          .catch(() => {});
      }
    },
    mbefore(file) {
      let types = ["image/jpeg", "image/png"];
      let isImage = types.includes(file.type);
      let isSize = file.size / 1024 / 1024 < 5;
      if (!isImage) {
        this.$message.error("上传图片只能是 JPG、PNG 格式!");
        return false;
      }
      if (!isSize) {
        this.$message.error("上传图片大小不能超过 5MB!");
        return false;
      }
      return true;
    }
  }
};
</script>

<style>
</style>