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
        <div class="main-body p-2">
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

export default {
  name: "app",
  data: function() {
    return {
      navs:null,
      tag: false,
      parentTab: "index"
    };
  },
  methods: {
    change: function(){
      this.tag=!this.tag
    }
  },
  components: {
    // HelloWorld
    // check
  },
  created(){
    var that = this;
    this.$http
    .get('/json/test.json')
    .then(response => that.navs = response.data.navs)
    .cache(function(error){
      conssole.log(error)
    });
  }
};



// const app = new Vue({
//   router
// }).$mount('#app')
</script>

<style>
</style>
