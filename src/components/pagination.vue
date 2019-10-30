<template>
  <div class="block my-4">
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="size"
      background
      large
      layout="total,prev, pager, next, jumper"
      :total="total"
      prev-text="首页"
      next-text="尾页"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: Number,
    total: Number,
    size: Number
  },
  methods: {
    handleCurrentChange(val) {
      //   console.log(`当前页: ${val}`,);
      this.nowPage = val;
      this.$emit("changePage", this.nowPage);
    }
  },
  data() {
    return {
      nowPage: 1
    };
  }
};
</script>

<style>
.el-pagination button,
.el-pagination {
  font-size: 16px !important;
  min-width: 51px !important;
}
</style>