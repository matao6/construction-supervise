<template>
  <div id="app" class="h-100">
    <div class="main-layout">
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
              <a class="nav-link" href="javascript:;">个人中心</a>
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
      navs:null,
      tag: false,
      parentTab: "index",
      key: 1
    };
  },
  components: {
    // HelloWorld
    // check
    Message
  },
  methods: {
    change: function(){
      this.tag=!this.tag
    },
    showmsg: function(event){
      // console.log(event.target.getAttribute('mid'))
      const h = this.$createElement;
      this.$msgbox({
        title: '消息',
        message: h(Message,{key: this.key++}),
        showCancelButton: false,
        showConfirmButton: false
      }).then(action=>{
        this.$message({
          type: 'info',
          message: 'action: ' + action
        })
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // })
      })
    }
  },
  created: function(){
    var that = this;
    this.axios
    .get('/json/test.json')
    .then(function(response) {
      that.navs = response.data.navs
    })
    .catch(function(error) {
      console.log(error)
    });
  }
};



// const app = new Vue({
//   router
// }).$mount('#app')
</script>

<style>
</style>
