<template>
  <div class="table-responsive">
    <div class style="padding: 15px;">
      <el-input
        v-model="input"
        clearable
        size="medium"
        placeholder="请输入标题"
        style="width: 180px; display: inline-block;"
      >
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-button type="primary" size="medium" style="margin-left: 15px;" @click="searchInfo">搜索</el-button>
      <el-button type="info" size="medium" style="margin-left: 15px;" @click="showAdd">添加新闻</el-button>
    </div>
    <el-table :data="items" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="80"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="author" label="作者"></el-table-column>
      <el-table-column label="内容">
        <template slot-scope="scope">
          <div>{{scope.row.content}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column prop="updateTime" label="更新时间"></el-table-column>
      <el-table-column label="操作" width="210">
        <template slot-scope="scope">
          <button
            class="btn btn-sm btn-primary mr-2 text-white"
            v-bind:mid="scope.row.id"
            @click="showCheck"
          >查看</button>
          <button class="btn btn-sm btn-warning mr-2" v-bind:mid="scope.row.id" @click="showEdit">编辑</button>
          <button class="btn btn-sm btn-danger mr-2" v-bind:mid="scope.row.id" v-on:click="open">删除</button>
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
import Pagination from "../common/pagination.vue";
import Check from "./news_check.vue";
import Editor from "./news_edit.vue";
import Add from "./news_add.vue";
import {showLoading,hideLoading} from "../../assets/js/loading.js"
// import Vue from 'vue'

export default {
  name: "list",
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
  props: {
    // 测试tag
    tag: Boolean
  },
  components: {
    Pagination,
    Check,
    Editor
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
    // 显示查看
    showCheck(event) {
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
        .catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // })
        });
    },
    // 显示编辑
    showEdit(event) {
      document.querySelector("#h_id").value = event.target.getAttribute("mid");
      const h = this.$createElement;
      var that = this;
      this.$msgbox({
        title: "编辑",
        message: h(Editor, { key: that.key++ }),
        showCancelButton: false,
        showConfirmButton: false
      })
        .then(action => {})
        .catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // })
        });
    },
    // 显示添加新闻
    showAdd(event) {
      document.querySelector("#h_id").value = event.target.getAttribute("mid");
      const h = this.$createElement;
      var that = this;
      this.$msgbox({
        title: "新增",
        message: h(Add, { key: that.key++ }),
        showCancelButton: false,
        showConfirmButton: false
      })
        .then(action => {})
        .catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // })
        });
    },
    // 删除新闻
    open(event) {
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
            url: that.GLOBAL.m_mainUrl + "/webnews/webnews/" + m_id,
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
    },
    // 跳转分页
    changePage(page) {
      var that = this;
      // console.log(page);
      // 加载浮层
      showLoading();
      this.axios({
        url: that.GLOBAL.m_mainUrl + "/webnews/searchLists",
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
            if(mData.totalPages<page){
              that.changePage(mData.totalPages);
            }
          }
        })
        .catch(function(error) {
          hideLoading()
          // 请求失败处理
          console.log(error);
        });
    },
    // 搜索标题
    searchInfo() {
      showLoading();
      var that = this;
      this.axios({
        url: that.GLOBAL.m_mainUrl + "/webnews/searchLists",
        method: "get",
        headers: { auth: sessionStorage.getItem("auth") },
        params: {
          title: that.input,
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
    }
  },
  created: function() {
    // console.log('this',this)
    // 加载浮层
    showLoading();
    var that = this;
    this.axios({
      url: that.GLOBAL.m_mainUrl + "/webnews/lists",
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
  }
};
</script>

<style>
.el-table .cell {
  max-height: 70px;
}
</style>