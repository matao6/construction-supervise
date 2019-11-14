<template>
  <div id="wangeditor">
    <div ref="editorElem"></div>
  </div>
</template>

<script>
import E from "wangeditor";

export default {
  name: "editor",
  data() {
    return {
      editor: ""
    };
  },
  props: {
    editorCon: String
  },
  watch: {
    editorCon: function() {
        this.editor.txt.html(this.editorCon);
    }
  },
  mounted() {
    var that = this;
    this.editor = new E(this.$refs.editorElem);
    this.editor.customConfig.onblur = function(html) {
      that.$emit("update:editorCon", html);
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
    this.editor.txt.html(this.editorCon);
  }
};
</script>

<style>
</style>
