<template>
  <div class="main-container">
    <div class="main-right">
      <div class="right-top-bar">
        <nav class="navbar navbar-expand-lg navbar-light">
          <a class="navbar-brand" href="#">控制台</a>
        </nav>
      </div>
      <div class="right-middle-container">
        <div class="card card-middle w-25">
          <div class="card-body">
            <h5 class="card-title text-primary">登录到控制台</h5>
            <div class="card-text">
              <form>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    id="inputAdmin"
                    placeholder="Enter account"
                  />
                </div>
                <div class="form-group">
                  <input type="password" class="form-control" id="inputPass" placeholder="Password" />
                </div>
                <div class="form-group">
                  <input
                    type="tel"
                    class="form-control"
                    id="exampleInputPassword1"
                    placeholder="verify"
                  />
                </div>
                <button type="button" class="btn btn-outline-primary">确认登录</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="right-footer">
        <blockquote class="blockquote text-center">
          <p
            class="mb-0"
          >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
          <footer class="blockquote-footer">
            Someone famous in
            <cite title="Source Title">Source Title</cite>
          </footer>
        </blockquote>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login"
};
$(function() {
  $(".btn-outline-primary").click(function() {
    jxcmain.ajaxcall(
      {
        admin_name: $("#inputAdmin").val(),
        admin_password: $.md5($("#inputPass").val()),
        url: "cpp/operator/login",
        device_id: "192.168.1.150"
      },
      retcallback
    );
  });
});
function retcallback(ret) {
  console.log(ret.success);
  if (ret.success) {
    window.location.href = "/index/index/main";
  }
}
</script>

<style>
.card-middle {
  margin: 10% auto;
}
</style>