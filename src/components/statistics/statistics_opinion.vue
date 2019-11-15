<template>
  <div class="table-responsive">
    <div style="padding: 15px;">
      <el-input
        v-model="input"
        clearable
        size="medium"
        placeholder="请输入标题"
        style="width: 180px; display: inline-block;"
      >
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-button type="primary" size="medium" @click="searchInfo" style="margin-left: 15px;">搜索</el-button>
      <!-- <el-button type="info" size="medium" @click="showAdd" style="margin-left: 15px;">添加事故信息</el-button> -->
    </div>
    <el-table :data="items" border style="width:100%;">
      <el-table-column prop="fbId" label="ID" width="80"></el-table-column>
      <el-table-column prop="fbTitle" label="标题"></el-table-column>
      <el-table-column label="截图" width="220">
        <template slot-scope="scope">
          <el-image
            :src="scope.row.fbImg"
            fit="contain"
            :preview-src-list="srcList[scope.$index]"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="fbContent" label="反馈内容"></el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column prop="updateTime" label="更新时间"></el-table-column>
      <el-table-column label="操作" width="210">
        <template slot-scope="scope">
          <button class="btn btn-sm btn-primary mr-2" :mid="scope.row.id" @click="showCheck">查看</button>
          <button class="btn btn-sm btn-warning mr-2" :mid="scope.row.id" @click="showEdit">编辑</button>
          <button class="btn btn-sm btn-danger mr-2" :mid="scope.row.id" @click="showDel">删除</button>
        </template>
      </el-table-column>
    </el-table>
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
      srcList: []
    };
  },
  components: {
    Pagination
  },
  methods: {
    searchInfo() {
      // 加载浮层
      showLoading();
      var that = this;
      this.axios({
        url: that.GLOBAL.m_mainUrl + "/feedback/lists",
        method: "get",
        params: {
          fb_title: that.input,
          size: that.size
        },
        headers: { auth: sessionStorage.getItem("auth") }
      })
        .then(function(response) {
          hideLoading();
          //   console.log(response);
          if (response.data.code == 200) {
            let con = response.data.data;
            that.items = con.content;
            for (let x in con.content) {
              that.srcList[x] = [];
              that.srcList[x].push = con.content[x].fbImg;
            }
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
    changePage(page) {
      // 加载浮层
      showLoading();
      var that = this;
      this.axios({
        url: that.GLOBAL.m_mainUrl + "/feedback/lists",
        method: "get",
        params: {
          fb_title: that.input,
          page: page,
          size: that.size
        },
        headers: { auth: sessionStorage.getItem("auth") }
      })
        .then(function(response) {
          hideLoading();
          // console.log(response);
          if (response.data.code == 200) {
            let mData = response.data.data;
            that.items = mData.content;
            for (let x in mData.content) {
              that.srcList[x] = [];
              that.srcList[x].push = mData.content[x].fbImg;
            }
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
          console.log(error);
        });
    },
    showAdd() {},
    showCheck() {},
    showEdit() {},
    showDel() {}
  },
  mounted() {
    // 加载浮层
    showLoading();
    var that = this;
    this.axios({
      url: that.GLOBAL.m_mainUrl + "/feedback/lists",
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
          for (let x in con.content) {
            that.srcList[x] = [];
            that.srcList[x].push = con.content[x].fbImg;
          }
          //   for (let index = 0; index < 5; index++) {
          //     that.srcList[index] = [];
          //     that.srcList[index] =
          //       "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg";
          //   }
          //   console.log(that.srcList);
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