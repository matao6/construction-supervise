<template>
  <div class="table-responsive">
    <div class style="padding: 15px;">
      <el-input
        v-model="input"
        clearable
        size="medium"
        placeholder="请输入机构账号、名称或联系方式"
        style="width: 275px; display: inline-block;"
      >
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-button type="primary" size="medium" style="margin-left: 15px;" @click="searchInfo">搜索</el-button>
      <el-button type="info" size="medium" style="margin-left: 15px;" @click="showAdd">添加机构</el-button>
    </div>
    <el-table :data="items" border style="width: 100%">
      <el-table-column prop="companyId" label="ID" width="80"></el-table-column>
      <el-table-column prop="companyName" label="机构名称"></el-table-column>
      <el-table-column prop="companyEmail" label="账号"></el-table-column>
      <el-table-column prop="companyPass" label="密码"></el-table-column>
      <el-table-column prop="contact" label="联系方式"></el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column label="操作" width="210">
        <template slot-scope="scope">
          <button
            class="btn btn-sm btn-primary mr-2 text-white"
            v-bind:mid="scope.row.companyId"
            @click="showCheck"
          >查看</button>
          <button class="btn btn-sm btn-warning mr-2" v-bind:mid="scope.row.companyId" @click="showEdit">编辑</button>
          <button
            class="btn btn-sm btn-danger mr-2"
            v-bind:mid="scope.row.companyId"
            v-on:click="showDel"
          >删除</button>
        </template>
      </el-table-column>
    </el-table>
    <input type="hidden" name id="o_id" />
    <input type="hidden" v-model="refresh" id="o_refresh" />
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
import Pagination from "../common/pagination.vue";
import Check from "./organization_check.vue"
import { showLoading, hideLoading } from "../../assets/js/loading.js";

export default {
  name: "organization_list",
  data() {
    return {
      // 列表数据
      items: [],
      // 分页数据
      currentPage: 0,
      total: 0,
      size: 5,
      // 本地href
      nowRouter: location.href,
      // el-input
      input: "",
      // key
      key: 1,
      // 刷新tag
      refresh: true
    };
  },
  components: {
    Pagination
  },
  mounted() {
    // 加载浮层
    showLoading();
    var that = this;
    this.axios({
      url: that.GLOBAL.m_mainUrl + "/supervise/pagelists",
      method: "get",
      headers: { auth: sessionStorage.getItem("auth") }
    })
      .then(function(response) {
        hideLoading();
        // console.log(response);
        if (response.status == 200) {
          let mData = response.data.data;
          that.items = mData.content;
          that.currentPage = mData.pageable.pageNumber + 1;
          that.total = mData.totalElements;
          that.size = mData.size;
        }
      })
      .catch(function(error) {
        // 请求失败处理
        hideLoading();
        console.log(JSON.stringify(error));
      });
  },
  methods: {
    searchInfo() {
      showLoading();
      var that = this;
      this.axios({
        url: that.GLOBAL.m_mainUrl + "/supervise/pagelists",
        method: "get",
        headers: { auth: sessionStorage.getItem("auth") },
        params: {
          key: that.input,
          size: that.size
        }
      })
        .then(function(response) {
          hideLoading();
          if (response) {
            if (response.status == 200) {
              let mData = response.data.data;
              that.items = mData.content;
              that.currentPage = mData.pageable.pageNumber + 1;
              that.total = mData.totalElements;
              that.size = mData.size;
            }
          }
        })
        .catch(function(error) {
          // 请求失败处理
          console.log(error);
        });
    },
    showAdd() {},
    showDel() {},
    showCheck(event) {
      document.querySelector("#o_id").value = event.target.getAttribute("mid");
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
    changePage(page) {
      var that = this;
      // 加载浮层
      showLoading();
      this.axios({
        url: that.GLOBAL.m_mainUrl + "/supervise/pagelists",
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
    }
  }
};
</script>

<style>
</style>