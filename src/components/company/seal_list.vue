<template>
  <div class="table-responsive">
    <div class style="padding: 15px;">
      <el-select v-model="mstatus" clearable placeholder="请选择状态" size="medium">
        <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
      </el-select>
      <el-input
        v-model="input"
        clearable
        size="medium"
        placeholder="请输入印章名称"
        style="width: 180px; display: inline-block;margin-left:15px;"
      >
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-button type="primary" size="medium" style="margin-left: 15px;" @click="searchInfo">搜索</el-button>
      <el-button type="info" size="medium" style="margin-left: 15px;" @click="showAdd">新增印章</el-button>
    </div>
    <el-table :data="items" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="80"></el-table-column>
      <el-table-column prop="title" label="印章名称"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag effect="dark" v-if="scope.row.status==1" type="" size="small">企业上报</el-tag>
          <el-tag effect="dark" v-if="scope.row.status==2" type="warning" size="small">生成中</el-tag>
          <el-tag effect="dark" v-if="scope.row.status==3" type="danger" size="small">退回</el-tag>
          <el-tag effect="dark" v-if="scope.row.status==4" type="success" size="small">已生成</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="undertaking" label="承诺书" width="200">
        <template slot-scope="scope">
          <el-image
            :src="scope.row.undertaking"
            fit="contain"
            :preview-src-list="srcList[scope.$index]"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="印章" width="200">
        <template slot-scope="scope">
          <el-image :src="scope.row.img" fit="contain" :preview-src-list="imgList[scope.$index]"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="pids" label="使用人员"></el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <button
            class="btn btn-sm btn-primary mr-2 text-white"
            v-bind:mid="scope.row.id"
            @click="showCheck"
          >查看</button>
          <button class="btn btn-sm btn-warning mr-2" v-bind:mid="scope.row.id" @click="showEdit">编辑</button>
          <button class="btn btn-sm btn-warning my-2 mr-2" v-if="scope.row.status==1||scope.row.status==3" v-bind:mid="scope.row.id" @click="showAudit">审核</button>
          <button class="btn btn-sm btn-warning my-2 mr-2" v-if="scope.row.status==2" v-bind:mid="scope.row.id" @click="showUpload">上传</button>
          <button class="btn btn-sm btn-warning my-2 mr-2" v-if="scope.row.status==4" v-bind:mid="scope.row.id" >重新上传</button>
          <button
            class="btn btn-sm btn-danger my-2"
            v-bind:mid="scope.row.id"
            v-on:click="showDel"
          >删除</button>
        </template>
      </el-table-column>
    </el-table>
    <input type="hidden" name id="s_id" />
    <input type="hidden" name id="s_refresh" v-model="refresh"/>
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
import Upload from "./seal_upload.vue";
import Audit from "./seal_audit.vue";
import Check from "./seal_check.vue";
import Pagination from "../common/pagination.vue";
import { showLoading, hideLoading } from "../../assets/js/loading.js";

export default {
  name: "seal_list",
  data() {
    return {
      // 列表数据
      items: [],
      // 分页数据
      currentPage: 0,
      total: 0,
      size: 10,
      // el-input
      input: "",
      mstatus: "",
      options: [
        {label:'企业上报',value:1},
        {label:'生成中',value:2},
        {label:'退回',value:3},
        {label:'已生成',value:4}
      ],
      //
      key: 1,
      refresh: true,
      // 承诺书和印章的放大查看数组
      srcList: [],
      imgList: []
    };
  },
  components: {
    Pagination
  },
  watch: {
    // 从子组件中，监控refresh tag无刷新获取获取数据
    refresh: function() {
      const now = this.refresh;
      // console.log('now',now)
      if (now == "false") {
        var getPage = document.querySelector(".el-pager .number.active")
          .innerText;
        // 刷新当前列表
        this.changePage(getPage);
        // 关闭弹框
        document.querySelector(".v-modal").click();
        // 重置refresh tag
        this.refresh = true;
      }
    }
  },
  mounted() {
    // 加载浮层
    showLoading();
    const that = this;
    this.$axios({
      url: that.GLOBAL.m_mainUrl + "/seal/list",
      method: "post",
      params: {
        page: 1,
        size: that.size
      },
      headers: { auth: sessionStorage.getItem("auth") }
    })
      .then(response => {
        hideLoading();
        // console.log(response);
        if (response.status == 200) {
          let mData = response.data.data;
          that.items = mData.content;
          for (let x in mData.content) {
            that.srcList[x] = [];
            that.srcList[x][0] = mData.content[x].undertaking;
            that.imgList[x] = [];
            that.imgList[x][0] = mData.content[x].img;
          }
          // console.log(that.srcList)
          that.currentPage = mData.pageable.pageNumber + 1;
          that.total = mData.totalElements;
          that.size = mData.size;
        }
      })
      .catch(() => {
        // console.log();
      });
  },
  methods: {
    showAdd() {},
    showUpload(){
      document.querySelector("#s_id").value = event.target.getAttribute("mid");
      const h = this.$createElement;
      const that = this;
      this.$msgbox({
        title: "上传",
        message: h(Upload, { key: that.key++ }),
        showCancelButton: false,
        showConfirmButton: false
      })
        .then(() => {})
        .catch(() => {});
    },
    showAudit(){
      document.querySelector("#s_id").value = event.target.getAttribute("mid");
      const h = this.$createElement;
      const that = this;
      this.$msgbox({
        title: "审核",
        message: h(Audit, { key: that.key++ }),
        showCancelButton: false,
        showConfirmButton: false
      })
        .then(() => {})
        .catch(() => {});
    },
    showCheck(event) {
      document.querySelector("#s_id").value = event.target.getAttribute("mid");
      const h = this.$createElement;
      const that = this;
      this.$msgbox({
        title: "查看",
        message: h(Check, { key: that.key++ }),
        showCancelButton: false,
        showConfirmButton: false
      })
        .then(() => {})
        .catch(() => {});
    },
    showDel(event) {
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
            url: that.GLOBAL.m_mainUrl + "/seal/del",
            params: {
              id: m_id
            },
            headers: { auth: sessionStorage.getItem("auth") },
            method: "get"
          })
            .then(function(response) {
              hideLoading();
              if (response.code == 1) {
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
            .catch(()=>{
              // hideLoading();
              // console.log(error);
            });
        })
        .catch(() => {});
    },
    showEdit() {},
    searchInfo() {
      showLoading();
      var that = this;
      this.axios({
        url: that.GLOBAL.m_mainUrl + "/seal/list",
        method: "post",
        headers: { auth: sessionStorage.getItem("auth") },
        params: {
          title: that.input,
          status: that.mstatus,
          size: that.size
        }
      })
        .then(function(response) {
          hideLoading();
          if (response) {
            if (response.status == 200) {
              let mData = response.data.data;
              that.items = mData.content;
              for (let x in mData.content) {
                that.srcList[x] = [];
                that.srcList[x][0] = mData.content[x].undertaking;
                that.imgList[x] = [];
                that.imgList[x][0] = mData.content[x].img;
              }
              that.currentPage = mData.pageable.pageNumber + 1;
              that.total = mData.totalElements;
              that.size = mData.size;
            }
          }
        })
        .catch(()=> {
          // 请求失败处理
          // console.log(error);
        });
    },
    changePage(page) {
      const that = this;
      // 加载浮层
      showLoading();
      this.$axios({
        url: that.GLOBAL.m_mainUrl + "/seal/list",
        method: "post",
        headers: { auth: sessionStorage.getItem("auth") },
        params: {
          page: page,
          status: that.mstatus,
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
            for (let x in mData.content) {
              that.srcList[x] = [];
              that.srcList[x][0] = mData.content[x].undertaking;
              that.imgList[x] = [];
              that.imgList[x][0] = mData.content[x].img;
            }
            that.currentPage = mData.pageable.pageNumber + 1;
            that.total = mData.totalElements;
            that.size = mData.size;
            if (mData.totalPages < page) {
              that.changePage(mData.totalPages);
            }
          }
        })
        .catch(()=>{
          // hideLoading();
          // 请求失败处理
          // console.log(error);
        });
    }
  }
};
</script>

<style>
</style>