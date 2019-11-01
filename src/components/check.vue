<template>
  <div>
    <div class="card mb-2">
      <div class="card-header">账户信息</div>
      <div class="card-body p-0">
        <table class="table table-bordered mb-0 border-0">
          <tbody>
            <tr>
              <th class="table-secondary">账号ID</th>
              <td >{{item.companyId}}</td>
              <th class="table-secondary">登录账号</th>
              <td th:text="${account.getCompanyEmail()}"></td>
              <th class="table-secondary">账户状态</th>
              <td>
                <span class="badge badge-primary" th:text="${account.getCompanyStatusTxt()}"></span>
                <div
                  class="btn-group"
                  role="group"
                  aria-label="Basic example"
                  th:if="${account.getCompanyStatus()==1}"
                >
                  <button
                    type="button"
                    class="btn btn-sm btn-outline-primary btn-pass"
                    th:attr="data-accountid=${account.getAccountId()}"
                  >审核通过</button>
                  <button
                    type="button"
                    class="btn btn-sm btn-outline-danger btn-refuse"
                    th:attr="data-accountid=${account.getAccountId()}"
                  >审核驳回</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="card mb-2">
      <div class="card-header">企业认证信息</div>
      <div class="card-body p-0">
        <table class="table table-bordered mb-0 border-0">
          <tbody>
            <tr class="table-secondary">
              <th>认证类型</th>
              <th>认证状态</th>
              <th>附件</th>
              <th>申请时间</th>
              <th>认证时间</th>
              <th>操作</th>
            </tr>
            <tr>
              <td ></td>
              <td></td>
              <td>
                <img/>
              </td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="card">
      <div class="card-header">企业基本信息</div>
      <div class="card-body p-0">
        <table class="table table-bordered mb-0 border-0">
          <tbody>
            <tr>
              <th class="table-secondary">企业名称</th>
              <td>{{item.companyName}}</td>
              <th class="table-secondary">统一信用代码</th>
              <td></td>
              <th class="table-secondary">企业负责人</th>
              <td>{{item.responsiblePersonName}}</td>
            </tr>
            <tr>
              <th class="table-secondary">联系方式</th>
              <td>{{item.contact}}</td>
              <th class="table-secondary">公司地址</th>
              <td>{{item.companyAddress}}</td>
              <th class="table-secondary">-</th>
              <td>@fat</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
const m_mainUrl='http://192.168.0.192:8080';

export default {
  name: 'check',
  data: function() {
    return {
      id: null,
      item: {
        companyId: '加载中...',
        companyName: '加载中...',
        responsiblePersonName: '加载中...',
        contact: '加载中...',
        companyAddress: '加载中...'
      }
    }
  },
  created: function(){
    this.id=document.querySelector('#h_id').value;
    if(this.id){
      var that = this;
      this.$axios
        .get(m_mainUrl+'/company/info',{
          params:{
            companyId: that.id
          }
        })
        .then(function(response){
          that.item = response.data.data;
        })
        .catch((error)=>{
          console.log(error)
        })
    }
  }
};
</script>

<style>
</style>