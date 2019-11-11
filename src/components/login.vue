<template>
  <div class="main-container">
    <div class="main-right">
      <div class="right-top-bar">
        <nav class="navbar navbar-expand-lg navbar-light">
          <a class="navbar-brand" href="#">控制台</a>
        </nav>
      </div>
      <div class="right-middle-container">
        <div class="card card-middle w-25">
          <div class="card-body">
            <h5 class="card-title text-primary">登录到控制台</h5>
            <div class="card-text">
              <form>
                <div class="form-group">
                  <el-input v-model.trim="username" placeholder="Enter account" />
                </div>
                <div class="form-group">
                  <el-input v-model.trim="password" placeholder="Password" show-password />
                </div>
                <div class="form-group" @mouseover="onMouseover" @mouseout="onMouseout">
                  <slide-verify
                    :l="52"
                    :r="10"
                    :w="339"
                    :h="155"
                    slider-text="向右滑动验证"
                    @success="onSuccess"
                    @fail="onFail"
                    @refresh="onRefresh"
                  ></slide-verify>
                </div>
                <div class="text-center">
                  <el-button type="primary" :loading="isLoading" @click="mLogin">确认登录</el-button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="right-footer">
        <blockquote class="blockquote text-center">
          <p
            class="mb-0"
          >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
          <footer class="blockquote-footer">
            Someone famous in
            <cite title="Source Title">Source Title</cite>
          </footer>
        </blockquote>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data: function() {
    return {
      username: "",
      password: "",
      // 按钮加载
      isLoading: false,
      // 滑动验证
      slideVerify: false
    };
  },
  methods: {
    mLogin: function() {
      if (this.username == "") {
        this.$message({
          message: "请填写用户名!",
          duration: 2000,
          type: "error"
        });
        return false;
      }
      if (this.password == "") {
        this.$message({
          message: "请填写密码!",
          duration: 2000,
          type: "error"
        });
        return false;
      }
      if (this.slideVerify == false) {
        this.$message({
          message: "请滑动验证!",
          duration: 2000,
          type: "error"
        });
        return false;
      }
      this.isLoading = true;
      let that = this;
      this.$axios({
        url: that.GLOBAL.m_mainUrl + "/login",
        method: "post",
        // headers: { 'auth': "XMLHttpRequest" },
        params: {
          username: that.username,
          password: that.password
        }
      })
        .then(function(response) {
          // console.log(response);
          that.isLoading = false;
          if (response.data.code == 200) {
            that.$message({
              message: response.data.message,
              duration: 2000,
              type: "success"
            });
            sessionStorage.setItem("showIndex", true);
            sessionStorage.setItem("auth", response.data.data.token);
            location.href="http://localhost:8080/xinwen/xinset";
          } else {
            sessionStorage.setItem("showIndex", false);
            that.$message({
              message: response.data.message,
              duration: 2000,
              type: "error"
            });
          }
        })
        .catch(function(error) {
          sessionStorage.setItem("showIndex", false);
          that.isLoading = false;
          console.log(error);
        });
    },
    onSuccess: function() {
      this.slideVerify = true;
      this.$message({
        message: "验证成功!",
        duration: 2000,
        type: "success"
      });
    },
    onFail: function() {
      this.slideVerify = false;
      this.$message({
        message: "验证失败!",
        duration: 2000,
        type: "error"
      });
    },
    onRefresh: function() {},
    onMouseover: () => {
      document.querySelectorAll("canvas")[0].style.display = "block";
      document.querySelectorAll("canvas")[1].style.display = "block";
      document.querySelector(".slide-verify-refresh-icon").style.display =
        "block";
    },
    onMouseout: () => {
      document.querySelectorAll("canvas")[0].style.display = "none";
      document.querySelectorAll("canvas")[1].style.display = "none";
      document.querySelector(".slide-verify-refresh-icon").style.display =
        "none";
    }
  },
  mounted: function() {
    document.querySelector(".slide-verify-slider").style.width = 339 + "px";
    document.querySelector(".slide-verify").style.width = 339 + "px";
    document.querySelectorAll("canvas")[0].style.display = "none";
    document.querySelectorAll("canvas")[0].style.position = "absolute";
    document.querySelectorAll("canvas")[0].style.top = -155 + "px";
    document.querySelectorAll("canvas")[1].style.display = "none";
    document.querySelectorAll("canvas")[1].style.position = "absolute";
    document.querySelectorAll("canvas")[1].style.top = -155 + "px";
    document.querySelector(".slide-verify-refresh-icon").style.top =
      -155 + "px";
    document.querySelector(".slide-verify-refresh-icon").style.display = "none";
  }
};
</script>

<style>
.card-middle {
  margin: 10% auto;
}
</style>