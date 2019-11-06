<template>
  <div class="p-3">
    <div class="mb-2 h5 text-center">
      <input type="text" class="form-control" v-model="title" />
    </div>
    <div class="mb-3 h6 text-center">
      <input type="text" class="form-control" v-model="author" />
    </div>
    <div class="t_con mb-3">
      <div id="wangeditor">
        <div ref="editorElem"></div>
      </div>
    </div>
    <div class="text-center">
      <a href="javascript:;" class="btn btn-primary btn-sm" @click="m_submit">提交</a>
    </div>
  </div>
</template>

<script>
import E from "wangeditor";

export default {
  name: "xinwen_edit",
  data() {
    return {
      id: null,
      title: "加载中...",
      content: "加载中...",
      author: "加载中...",
      createId: null
    };
  },
  created: function() {
    this.id = document.querySelector("#h_id").value;
    if (this.id) {
      var that = this;
      this.$axios
        .get(that.GLOBAL.m_mainUrl + "/webnews/webnews/" + that.id)
        .then(function(response) {
          // console.log(response);
          that.title = response.data.data.title;
          that.author = response.data.data.author;
          that.content = response.data.data.content;
          that.createId = response.data.data.createId;
          // wangeditor 富文本编辑器
          that.editor = new E(that.$refs.editorElem);
          that.editor.customConfig.onchange = html => {
            that.content = html;
          };
          that.editor.customConfig.menus = [
            // 菜单配置
            "head", // 标题
            "bold", // 粗体
            "fontSize", // 字号
            "fontName", // 字体
            "italic", // 斜体
            "underline", // 下划线
            "strikeThrough", // 删除线
            "foreColor", // 文字颜色
            "backColor", // 背景颜色
            "link", // 插入链接
            "list", // 列表
            "justify", // 对齐方式
            "quote", // 引用
            "emoticon", // 表情
            "image", // 插入图片
            "table", // 表格
            "code", // 插入代码
            "undo", // 撤销
            "redo" // 重复
          ];
          that.editor.create();
          that.editor.txt.html(that.content);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  methods: {
    m_submit(event) {
      this.id = document.querySelector("#h_id").value;
      if (this.id) {
        // 加载浮层
        const loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        // 传值
        var that = this;
        this.$axios({
          url: that.GLOBAL.m_mainUrl + "/webnews/webnews/" + that.id,
          method: "put",
          params: {
            id: that.id,
            title: that.title,
            author: that.author,
            content: that.content,
            createId: that.createId
          }
        })
          .then(function(response) {
            loading.close();
            if (response) {
              if (response.status == 200) {
                // console.log(response);
                that.$message({
                  message: response.data.message,
                  duration: 2000,
                  type: "success"
                });
                setTimeout(() => {
                  // 刷新祖父级组件
                  // window.location.reload();
                  document.querySelector("#h_refresh").value=false;
                  document.querySelector("#h_refresh").dispatchEvent(new Event('input'));
                }, 800);
              } else {
                that.$message({
                  message: response.data.message,
                  type: "success"
                });
              }
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }
};
</script>

<style scoped>
.t_con {
  max-height: 400px;
  width: 660px;
  overflow-y: auto;
}
</style>