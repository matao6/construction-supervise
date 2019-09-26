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
        <tr>
          <th>accountId</th>
          <td>getCompanyName</td>
          <td>getCompanyEmail</td>
          <td>companyType</td>
          <td>companyStatus</td>
          <td></td>
          <td>
            <button class="btn btn-sm btn-primary mr-2">查看</button>
            <button class="btn btn-sm btn-warning mr-2">编辑</button>
            <button class="btn btn-sm btn-danger mr-2">删除</button>
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
                  <a class="page-link" href="">尾页</a>
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
  name: 'list',
  data: function(){
    
  }
}
</script>

<style>

</style>