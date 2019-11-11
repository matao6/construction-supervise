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
        <div ref="editorEle"></div>
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
      title: "",
      content: "",
      author: ""
    };
  },
  mounted: function() {
    // wangeditor 富文本编辑器
    this.editor = new E(this.$refs.editorEle);
    this.editor.customConfig.onchange = html => {
      this.content = html;
    };
    this.editor.customConfig.menus = [
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
    this.editor.create();
    this.editor.txt.html(this.content);
  },
  methods: {
    m_submit(event) {
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
        url: that.GLOBAL.m_mainUrl + "/webnews/webnewsAdd/",
        method: "post",
        params: {
          title: that.title,
          author: that.author,
          content: that.content,
          createId: 1
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
                // 根据refresh tag刷新祖父级组件
                document.querySelector("#h_refresh").value = false;
                document
                  .querySelector("#h_refresh")
                  .dispatchEvent(new Event("input"));
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
};
</script>

<style scoped>
.t_con {
  max-height: 400px;
  width: 660px;
  overflow-y: auto;
}
</style>