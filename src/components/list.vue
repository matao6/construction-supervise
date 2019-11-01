<template>
  <div class="table-responsive">
    <div class="" style="padding: 15px;">
      <el-input v-model="input" clearable size="medium" placeholder="请输入企业名称" style="width: 180px; display: inline-block;">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-button type="primary" size="medium" style="margin-left: 15px;" @click="searchInfo">搜索</el-button>
    </div>
    <el-table :data="items" border style="width: 100%">
      <el-table-column prop="companyId" label="ID" width="160"></el-table-column>
      <el-table-column prop="companyName" label="企业名称" width="300"></el-table-column>
      <el-table-column prop="contact" label="联系方式" width="180"></el-table-column>
      <el-table-column prop="legalMan" label="法人" width="180"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <button
            class="btn btn-sm btn-primary mr-2 text-white"
            v-bind:mid="scope.row.companyId"
            @click="showCheck"
          >
            查看
          </button>
          <button
            class="btn btn-sm btn-warning mr-2"
            v-bind:mid="scope.row.companyId"
          >
            编辑
          </button>
          <button
            class="btn btn-sm btn-danger mr-2"
            v-on:click="open"
          >
            删除
          </button>
        </template>
      </el-table-column>
    </el-table>
    <input type="hidden" name id="h_id" />
    <Pagination v-show="currentPage" :currentPage="currentPage" :total="total" :size="size" @changePage="changePage"></Pagination>
    <!-- <table class="table table-bordered">
      <thead>
        <tr>
          <th>ID</th>
          <th>企业名称</th>
          <th>联系方式</th>
          <th>法人</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" v-bind:key="item.id">
          <td>{{item.companyId}}</td>
          <td>{{item.companyName}}</td>
          <td>{{item.contact}}</td>
          <td>{{item.legalMan}}</td>
          <td>
            <a
              class="btn btn-sm btn-primary mr-2 text-white"
              v-bind:href="'./check?id='+item.id"
              v-bind:mid="item.id"
            >
              <i class="el-icon-view mr-1"></i>查看
            </a>
            <a
              class="btn btn-sm btn-warning mr-2"
              v-bind:murl="'?id='+item.id"
              v-bind:href="'./edit?id='+item.id"
              v-bind:mid="item.id"
            >
              <i class="el-icon-edit mr-1"></i>编辑
            </a>
            <button
              class="btn btn-sm btn-danger mr-2"
              v-bind:murl="'?id='+item.id"
              v-bind:mid="item.id"
              v-on:click="open"
            >
              <i class="el-icon-delete mr-1"></i>删除
            </button>
            <button
              class="btn btn-sm btn-danger mr-2"
              v-bind:murl="'?id='+item.id"
              v-bind:mid="item.id"
              v-on:click="$emit('changeTag')"
            >删除{{tag}}</button>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="10">
            <nav aria-label="Page navigation example">
              <ul class="pagination">
                <li class="page-item">
                  <a class="page-link" href="?page=1">首页</a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="?page=1">1</a>
                </li>
                <li class="page-item">
                  <a class="page-link" href>尾页</a>
                </li>
              </ul>
            </nav>
          </td>
        </tr>
        
      </tfoot>
    </table> -->
  </div>
</template>

<script>
import Pagination from "./pagination.vue";
import Check from "./check.vue";

const m_mainUrl='http://192.168.0.192:8080';

export default {
  name: "list",
  data() {
    return {
      // 列表数据
      items: [],
      // 分页数据
      currentPage: 0,
      total: 0,
      size: 15,
      // 本地href
      nowRouter: location.href,
      // el-input
      input: '',
      // key
      key: 1
    };
  },
  props: {
    tag: Boolean
  },
  components: {
    Pagination,
    Check
  },
  methods: {
    showCheck(event){
      document.querySelector('#h_id').value=event.target.getAttribute('mid');
      const h = this.$createElement;
      this.$msgbox({
        title: '查看',
        message: h(Check, {key: this.key++}),
        showCancelButton: false,
        showConfirmButton: false
      })
      .then(action=>{
        this.$message({
          type: 'info',
          message: 'action: '+action
        })
      })
      .catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // })
      })
    },
    open() {
      this.$confirm("确定删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {})
        .catch(() => {});
    },
    changePage(page) {
      var that = this;
      // console.log(page);
      this.axios
        .get(m_mainUrl+"/company/list", {
          params: {
            page: page
          }
        })
        .then(function(response) {
          let mData = response.data.data;
          that.items = mData.content;
          that.currentPage = mData.pageable.pageNumber + 1;
          that.total = mData.totalElements;
          that.size = mData.size;
        })
        .catch(function(error) {
          // 请求失败处理
          console.log(error);
        });
    },
    searchInfo() {
      var that = this;
      // console.log(page);
      this.axios
        .get(m_mainUrl+"/company/list", {
          params: {
            companyName: that.input
          }
        })
        .then(function(response) {
          let mData = response.data.data;
          that.items = mData.content;
          that.currentPage = mData.pageable.pageNumber + 1;
          that.total = mData.totalElements;
          that.size = mData.size;
        })
        .catch(function(error) {
          // 请求失败处理
          console.log(error);
        });
    }
  },
  created: function() {
    var that = this;
    this.axios
      // .get("/json/test.json")
      .get(m_mainUrl+"/company/list")
      .then(function(response) {
        let mData = response.data.data;
        that.items = mData.content;
        that.currentPage = mData.pageable.pageNumber + 1;
        that.total = mData.totalElements;
        that.size = mData.size;
        // console.log(response.pageable.pageNumber);
      })
      .catch(function(error) {
        // 请求失败处理
        console.log(error);
      });
  }
};
</script>

<style>
</style>