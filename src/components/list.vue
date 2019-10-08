<template>
  <div class="table-responsive">
    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">企业名称</th>
          <th scope="col">登录账号</th>
          <th scope="col">类型</th>
          <th scope="col">企业状态</th>
          <th scope="col">注册时间</th>
          <th scope="col">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" v-bind:key="item.id">
          <th>{{item.id}}</th>
          <td>{{item.name}}</td>
          <td>{{item.email}}</td>
          <td>{{item.companyType}}</td>
          <td>{{item.companyStatus}}</td>
          <td>{{item.registerTime}}</td>
          <td>
            <!-- <router-link v-bind:to="'./check?id='+item.id">
              <button class="btn btn-sm btn-primary mr-2 text-white" v-bind:mid="item.id">查看</button>
            </router-link>-->
            <!-- show('/check?id'+item.id,'查看','100%','90%') -->
            <a
              class="btn btn-sm btn-primary mr-2 text-white"
              v-bind:href="'./check?id='+item.id"
              v-bind:mid="item.id"
            >查看</a>
            <a
              class="btn btn-sm btn-warning mr-2"
              v-bind:murl="'?id='+item.id"
              v-bind:href="'./edit?id='+item.id"
              v-bind:mid="item.id"
            >编辑</a>
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
    </table>
  </div>
</template>

<script>
import "../assets/js/layer.js";

export default {
  name: "list",
  data() {
    return {
      items: null,
      nowRouter: location.href
    };
  },
  props:{
    tag: Boolean
  },
  methods: {
    show: function(url, title, w, h) {
      layer.open({
        type: 2,
        content: url,
        title: title,
        shadeClose: true,
        shade: 0.6,
        area: [w, h]
      });
    }
  },
  created() {
    var that = this;
    this.$http
      .get("/json/test.json")
      .then(function(response) {
        // console.log(response.data.items)
        // console.log(that.items)
        that.items = response.data.items;
      })
      .catch(function(error) {
        // 请求失败处理
        console.log(error);
      });
  }
};
// function getData(){
// var items;
//   $.ajax({
//     url: ,
//     data: '',
//     type: 'post',
//     dataType: 'json',
//     success: function(data){
//       items= data.items;
//     },
//     error: function(data){
//       items=''
//     }
//   });
//   return items;
// }
// getData();
</script>

<style>
@import "../assets/js/theme/default/layer.css";
</style>