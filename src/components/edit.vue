<template>
  <div>
    <div class="card mb-2">
      <div class="card-header">账户信息</div>
      <div class="card-body p-0">
        <table class="table table-bordered mb-0 border-0">
          <tbody>
            <tr>
              <th class="table-secondary">账号ID</th>
              <td th:text="${account.getAccountId()}"></td>
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
            <tr th:each="auth : ${authes}">
              <td th:text="${auth.getClass_name()}"></td>
              <td th:text="${auth.getStatus()}"></td>
              <td>
                <img th:attr="src=@{${auth.getAptitudeImgUrl()}}" />
              </td>
              <td th:text="${#dates.format(auth.getCreate_time(),'yyyy-MM-dd')}">-</td>
              <td th:text="${#dates.format(auth.getUpdate_time(),'yyyy-MM-dd')}">-</td>
              <td>-</td>
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
              <td></td>
              <th class="table-secondary">统一信用代码</th>
              <td></td>
              <th class="table-secondary">企业负责人</th>
              <td th:text="${companyInfo.getResponsible_person_name()}"></td>
            </tr>
            <tr>
              <th class="table-secondary">联系方式</th>
              <td th:text="${companyInfo.getContact()}"></td>
              <th class="table-secondary">经济类型</th>
              <td th:text="${companyInfo.getEconomy_type()}"></td>
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
export default {
  
};
</script>

<style>
</style>