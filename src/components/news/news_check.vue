<template>
  <div class="p-3">
    <div class="mb-2 text-center">{{item.title}}</div>
    <div class="mb-3 text-center">{{item.author}}</div>
    <!-- <div class="t_con">{{item.content}}</div> -->
    <div class="t_con mb-3 position-relative">
      <div class="position-absolute t_upFace"></div>
      <Wangeditor :editorCon.sync="item.content"></Wangeditor>
    </div>
  </div>
</template>

<script>
import Wangeditor from "../common/wangeditor.vue";

export default {
  name: "xinwen_check",
  data() {
    return {
      id: null,
      item: {
        title: "加载中...",
        content: "加载中...",
        author: "加载中..."
      }
    };
  },
  components: {
    Wangeditor
  },
  created: function() {
    this.id = document.querySelector("#h_id").value;
    if (this.id) {
      var that = this;
      this.$axios({
        url: that.GLOBAL.m_mainUrl + "/webnews/webnews" + "/" + that.id,
        method: "get",
        headers: { auth: sessionStorage.getItem("auth") }
      })
        .then(function(response) {
            // console.log(response);
          if (response.data.code == 100) {
            that.item = response.data.data;
          }
        })
        .catch(() => {
          // console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.t_con {
  max-height: 400px;
  max-width: 660px;
  overflow-y: auto;
}
.t_upFace {
  left: 0;
  right: 10px;
  top: 0;
  bottom: 0;
  opacity: 0;
  z-index: 10005;
}
</style>