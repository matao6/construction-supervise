<template>
  <div class="table-responsive">
    <div style="padding: 15px;">
      <el-input
        v-model="input"
        clearable
        size="medium"
        placeholder="请输入事故名称"
        style="width: 180px; display: inline-block;"
      >
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-button type="primary" size="medium" @click="searchInfo" style="margin-left: 15px;">搜索</el-button>
      <el-button type="info" size="medium" @click="showAdd" style="margin-left: 15px;">添加事故信息</el-button>
    </div>
    <el-table :data="items" border style="width:100%;">
      <el-table-column prop="id" label="ID" width="80"></el-table-column>
      <el-table-column prop="title" label="事故名称"></el-table-column>
      <el-table-column prop="projectName" label="项目名称"></el-table-column>
      <el-table-column prop="lx" label="事故类型"></el-table-column>
      <el-table-column prop="dieNumber" label="死亡人数"></el-table-column>
      <el-table-column prop="zsNumber" label="重伤人数"></el-table-column>
      <el-table-column prop="fsTime" label="事故发生时间"></el-table-column>
      <el-table-column prop="ssPrice" label="经济损失(万元)"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column label="操作" width="210">
        <template slot-scope="scope">
          <button class="btn btn-sm btn-primary mr-2" :mid="scope.row.id" @click="showCheck">查看</button>
          <button class="btn btn-sm btn-warning mr-2" :mid="scope.row.id" @click="showEdit">编辑</button>
          <button class="btn btn-sm btn-danger mr-2" :mid="scope.row.id" @click="showDel">删除</button>
        </template>
      </el-table-column>
    </el-table>
    <input type="hidden" name id="h_id" />
    <input type="hidden" v-model="refresh" id="h_refresh" />
    <Pagination
      v-show="currentPage"
      :currentPage="currentPage"
      :total="total"
      :size="size"
      @changePage="changePage"
    ></Pagination>
  </div>
</template>

<script>
import Check from "./accident_check.vue"
import Pagination from "../common/pagination.vue";
import { showLoading, hideLoading } from "../../assets/js/loading.js";

export default {
  name: "accident",
  data() {
    return {
      // el-input
      input: "",
      // 列表数据
      items: [],
      // 分页数据
      currentPage: 0,
      total: 0,
      size: 5,
      //
      refresh: true
    };
  },
  components: {
    Pagination
  },
  watch: {
    // 从子组件中，监控refresh tag无刷新获取获取数据
    refresh: function(newval, oldval) {
      var now = this.refresh;
      // console.log("watch1", now);
      if (now == "false") {
        // console.log("watch2", now);
        var getPage = document.querySelector(".el-pager .number.active")
          .innerText;
        // 刷新当前列表
        this.changePage(getPage);
        // 关闭弹框
        $(".v-modal").click();
        // 重置refresh tag
        this.refresh = true;
      }

      // this.$nextTick(() => {
      //   this.refresh = true;
      // });
    }
  },
  methods: {
    searchInfo() {
      // 加载浮层
      showLoading();
      var that = this;
      this.axios({
        url: that.GLOBAL.m_mainUrl + "/accident/lists",
        method: "get",
        params: {
          title: that.input,
          size: that.size
        },
        headers: { auth: sessionStorage.getItem("auth") }
      })
        .then(function(response) {
          hideLoading();
          // console.log(response);
          if (response.data.code == 200) {
            let con = response.data.data;
            that.items = con.content;
            that.currentPage = con.pageable.pageNumber + 1;
            that.total = con.totalElements;
            that.size = con.size;
          }
        })
        .catch(function(error) {
          hideLoading();
          console.log(error);
        });
    },
    // 跳转分页
    changePage(page) {
      var that = this;
      // 加载浮层
      showLoading();
      this.axios({
        url: that.GLOBAL.m_mainUrl + "/accident/lists",
        method: "get",
        headers: { auth: sessionStorage.getItem("auth") },
        params: {
          page: page,
          title: that.input,
          size: that.size
        }
      })
        .then(function(response) {
          // console.log(response);
          hideLoading();
          if (response.status == 200) {
            let mData = response.data.data;
            that.items = mData.content;
            that.currentPage = mData.pageable.pageNumber + 1;
            that.total = mData.totalElements;
            that.size = mData.size;
            if (mData.totalPages < page) {
              that.changePage(mData.totalPages);
            }
          }
        })
        .catch(function(error) {
          hideLoading();
          // 请求失败处理
          console.log(error);
        });
    },
    showAdd() {},
    showCheck() {
      document.querySelector("#h_id").value = event.target.getAttribute("mid");
      const h = this.$createElement;
      var that = this;
      this.$msgbox({
        title: "查看",
        message: h(Check, { key: that.key++ }),
        showCancelButton: false,
        showConfirmButton: false
      })
        .then(action => {})
        .catch(() => {});
    },
    showEdit() {},
    showDel() {
      var that = this;
      var m_id = event.target.getAttribute("mid");
      // console.log(m_id);
      this.$confirm("确定删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 加载浮层
          showLoading();
          // 删除接口
          this.axios({
            url: that.GLOBAL.m_mainUrl + "/accident/del/" + m_id,
            headers: { auth: sessionStorage.getItem("auth") },
            method: "delete"
          })
            .then(function(response) {
              hideLoading();
              if (response.status == 200) {
                that.$message({
                  message: response.data.message,
                  duration: 2000,
                  type: "success"
                });
                // 根据refresh tag刷新祖父级组件
                document.querySelector("#h_refresh").value = false;
                document
                  .querySelector("#h_refresh")
                  .dispatchEvent(new Event("input"));
              }
            })
            .catch(function(error) {
              hideLoading();
              console.log(error);
            });
        })
        .catch(() => {});
    }
  },
  mounted() {
    // 加载浮层
    showLoading();
    var that = this;
    this.axios({
      url: that.GLOBAL.m_mainUrl + "/accident/lists",
      method: "get",
      params: {
        page: that.currentPage + 1,
        size: that.size
      },
      headers: { auth: sessionStorage.getItem("auth") }
    })
      .then(function(response) {
        hideLoading();
        // console.log(response);
        if (response.data.code == 200) {
          let con = response.data.data;
          that.items = con.content;
          that.currentPage = con.pageable.pageNumber + 1;
          that.total = con.totalElements;
          that.size = con.size;
        }
      })
      .catch(function(error) {
        hideLoading();
        console.log(error);
      });
  }
};
</script>

<style>
</style>