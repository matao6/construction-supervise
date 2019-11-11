<template>
  <div id="app" class="h-100">
    <router-view name="login" v-if="!showIndex"></router-view>
    <div class="main-layout" v-if="showIndex">
      <nav class="navbar navbar-expand-lg navbar-light bg-light d-flex">
        <div class="collapse navbar-collapse">
          <a class="navbar-brand" href="javascript:;">控制中心</a>
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <router-link v-bind:to="'/'+item.parentUrl" v-for="item in navs" v-bind:key="item.id">
              <li class="nav-item" v-on:click="parentTab=item.parentUrl">
                <a class="nav-link" href="javascript:;">{{item.parentCon}}</a>
              </li>
            </router-link>
          </ul>
        </div>
        <div>
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item">
              <a class="nav-link" href="javascript:;" v-on:click="showmsg" mid="2">消息</a>
            </li>
            <li class="nav-item">
              <el-dropdown>
                <span class="nav-link el-dropdown-link">
                  下拉菜单
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu trigger="click" slot="dropdown">
                  <el-dropdown-item icon="el-icon-plus">黄金糕</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-circle-plus">狮子头</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-circle-plus-outline">螺蛳粉</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-check">双皮奶</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-circle-check">蚵仔煎</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </li>
          </ul>
        </div>
      </nav>
      <div class="main-inner h-100">
        <div class="main-sidebar-wrapper border-right p-2">
          <ul class="nav flex-column">
            <div v-for="item in navs" v-bind:key="item.id" v-show="item.parentUrl === parentTab">
              <router-link
                v-bind:to="'/'+item.parentUrl+'/'+child.conUrl"
                v-for="child in item.childCons"
                v-bind:key="child.id"
              >
                <li class="nav-item border-bottom">
                  <a class="nav-link">{{child.con}}</a>
                </li>
              </router-link>
            </div>
          </ul>
        </div>
        <div class="main-body p-2 h-100 overflow-auto">
          <router-view v-on:changeTag="change" v-bind:tag="tag"></router-view>
        </div>
      </div>
    </div>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
// import check from "./components/check";
import Message from "./components/message";

export default {
  name: "app",
  data: function() {
    return {
      // 导航数据
      navs: null,
      // 测试标记
      tag: false,
      // 父级标记
      parentTab: location.href.split("/")[3],
      key: 1,
      // 是否显示首页
      showIndex: false
    };
  },
  components: {
    // HelloWorld
    // check
    Message
  },
  methods: {
    change: function() {
      this.tag = !this.tag;
    },
    showmsg: function(event) {
      // console.log(event.target.getAttribute('mid'))
      const h = this.$createElement;
      this.$msgbox({
        title: "消息",
        message: h(Message, { key: this.key++ }),
        showCancelButton: false,
        showConfirmButton: false
      })
        .then(action => {
          this.$message({
            type: "info",
            message: "action: " + action
          });
        })
        .catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // })
        });
    }
  },
  created: function() {
    // console.log("created");
    // 别的页面进入之后，如果没有登录，返回登录页
    if (sessionStorage.getItem("showIndex") == "true") {
      this.showIndex = sessionStorage.getItem("showIndex");
    } else {
      if (location.href.split("/")[3] == "login") {
      } else {
        window.location.href = "http://localhost:8080/login";
      }
    }
    //
    var that = this;
    this.axios
      .get("/json/test.json")
      .then(function(response) {
        that.navs = response.data.navs;
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
</script>

<style>
</style>
