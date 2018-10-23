<template>
  <div class="register-container">
    <div class="register-header">
      <div class="logo">
        <div><img src="../../assets/register/logonew.png" alt="logo"></div>
        <router-link to="/">
          <span>首页</span>
        </router-link>
      </div>
      <div style="clear:both"></div>
      <div class="title">
        <div>
          <h2>欢迎注册CMS</h2>
          <p>立即登录后台管理系统，访问更多元器件设计库</p>
        </div>
      </div>
    </div>
    <transition  name="fade-transform" mode="out-in">
      <router-view></router-view>
    </transition>
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
.register-container {
  width: 100%;
  .register-header {
    .logo {
      height: 80px;
      div {
        width: 110px;
        height: 60px;
        display: inline-block;
        margin-left: 5vw;
        line-height: 120px;
        cursor: pointer;
        img {
          width: 100%;
        }
      }
    }
    .logo span {
      display: inline-block;
      float: right;
      margin-right: 7vw;
      line-height: 80px;
      cursor: pointer;
    }
    .title {
      color: #666;
      text-align: center;
      height: 16vh;
      background: #f2f2f2;
      p {
        margin-top: 2vh;
      }
      h2 {
        padding-top: 4vh;
      }
    }
  }
}
</style>

