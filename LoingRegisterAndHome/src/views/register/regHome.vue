<template>
  <div class="register-main">
    <div class="registerBox">
      <img src="../../assets/register/register.png" alt="">
      <br>
      <router-link to="/register/newUser">
        <el-button class="firstBtn">注册一个新企业</el-button>
      </router-link>
      <br>
      <el-button class="secondBtn">收到邀请短信去登录</el-button>
      <p>温馨提示：如果您已收到邀请加入的短信，请直接登录，无需注册新企业账号</p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #fff;
$light_gray: #eee;
p,
h1,
h2 {
  padding: 0;
  margin: 0;
}
.register-main {
  text-align: center;
  padding-top: 4vh;
  .registerBox {
    width: 480px;
    height: 430px;
    margin: 0 auto;
  }
  img {
    display: inline;
    margin: 0 auto;
  }
  .firstBtn {
    width: 70%;
    background: #ee4239;
    color: #fff;
    margin-top: 4vh;
  }
  .secondBtn {
    width: 70%;
    background: #fff;
    color: #ee4239;
    border: 1px solid #ee4239;
    margin-top: 3vh;
  }
  p {
    text-align: center;
    font-size: 14px;
    color: #888;
    margin-top: 2vh;
  }
}
</style>

