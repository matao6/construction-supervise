<template>
  <div id="app">
    <div class="main-layout">
      <nav class="navbar navbar-expand-lg navbar-light bg-light d-flex">
        <div class="collapse navbar-collapse">
          <a class="navbar-brand" href="javascript:;">控制中心</a>
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <router-link v-bind:to="'/'+item.parentUrl" v-for="item in items" v-bind:key="item.id">
              <li class="nav-item" v-on:click="parentTab=item.parentUrl">
                <a class="nav-link" href="javascript:;">{{item.parentCon}}</a>
              </li>
            </router-link>
          </ul>
        </div>
        <div>
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item">
              <a class="nav-link" href="javascript:;">消息</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="javascript:;">个人中心</a>
            </li>
          </ul>
        </div>
      </nav>
      <div class="main-inner">
        <div class="main-sidebar-wrapper border-right p-2">
          <ul class="nav flex-column">
            <div v-for="item in items" v-bind:key="item.id" v-show="item.parentUrl === parentTab">
              <router-link v-bind:to="'/'+item.parentUrl+'/'+child.conUrl" v-for="child in item.childCons" v-bind:key="child.id">
                <li class="nav-item border-bottom">
                  <a class="nav-link">{{child.con}}</a>
                </li>
              </router-link>
            </div>
          </ul>
        </div>
        <div class="main-body p-2">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "app",
  data: function() {
    return listJsons;
  },
  components: {
    // HelloWorld
  }
};

var listJsons = {
  items: [
    {
      id: 1,
      parentCon: "首页1",
      parentUrl: "index",
      childCons: [
        
        {
          id: 2,
          con: "页",
          conUrl: "ye"
        },
        {
          id: 3,
          con: "列表",
          conUrl: "list"
        }
      ]
    },
    {
      id: 2,
      parentCon: "系统设置1",
      parentUrl: "xitong",
      childCons: [
        
        {
          id: 2,
          con: "系设置",
          conUrl: "xiset"
        },
        {
          id: 3,
          con: "统设置",
          conUrl: "tongset"
        }
      ]
    },
    {
      id: 3,
      parentCon: "企业管理1",
      parentUrl: "qiye",
      childCons: [
        
        {
          id: 2,
          con: "企管理",
          conUrl: "qimanage"
        },
        {
          id: 3,
          con: "业管理",
          conUrl: "yemanage"
        }
      ]
    },
    {
      id: 4,
      parentCon: "机构管理1",
      parentUrl: "jigou",
      childCons: [
        
        {
          id: 2,
          con: "机管理",
          conUrl: "jimanage"
        },
        {
          id: 3,
          con: "构管理",
          conUrl: "goumanage"
        }
      ]
    }
  ],
  parentTab: 'index'
};

// const app = new Vue({
//   router
// }).$mount('#app')
</script>

<style>
</style>
