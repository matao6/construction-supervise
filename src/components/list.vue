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
            <button class="btn btn-sm btn-primary mr-2" v-bind:murl="'?id='+item.id" v-bind:mid="item.id">查看</button>
            <button class="btn btn-sm btn-warning mr-2" v-bind:murl="'?id='+item.id" v-bind:mid="item.id">编辑</button>
            <button class="btn btn-sm btn-danger mr-2" v-bind:murl="'?id='+item.id" v-bind:mid="item.id">删除</button>
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
export default {
  name: "list",
  data: function() {
    return listData;
  }
};

var listData = {
  items: [
    {
      id: 1,
      name: "n",
      email: '11@163.com',
      companyType: '有限',
      companyStatus: '1',
      registerTime: '219-08-06'
    },
    {
      id: 2,
      name: "a",
      email: '22@163.com',
      companyType: '有限',
      companyStatus: '2',
      registerTime: '219-08-06'
    },
    {
      id: 3,
      name: "m",
      email: '33@163.com',
      companyType: '有限',
      companyStatus: '1',
      registerTime: '219-08-06'
    },
    {
      id: 4,
      name: "e",
      email: '44@163.com',
      companyType: '有限',
      companyStatus: '2',
      registerTime: '219-08-06'
    }
  ]
};
</script>

<style>
</style>