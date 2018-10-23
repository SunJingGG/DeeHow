<template>
  <div>
    <div style="border:1px solid #e7e7e7">
      <div class="Logo" style="padding-top:4px">
        <img src="../../assets/home/logo.png" style="width:100px" alt="" srcset="">
      </div>
      <div class="container" style="padding-top:10px">
        <div class="row" style="padding-top:6px">
          <div class="col-md-4" style="padding-top:4px">
            <router-link :to="{path:'/partindex'}">
              <a>浏览元件</a>
            </router-link>
            <el-input style="width:200px;margin:0 8px;" placeholder="请输入元器件名称"></el-input>
            <el-button type="warning" plain icon="el-icon-search" circle></el-button>
          </div>
          <div class="col-md-6 .col-sm-6">
            <nav class="navbar" role="navigation" style="line-height:50px">
              <div class="container-fluid">
                <div class="navbar-header">
                  <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse-example">
                    <span class="sr-only">切换导航</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                  </button>
                  <!-- <a class="navbar-brand" href="your/nice/url">DeeHow</a> -->
                </div>
                <div class="collapse navbar-collapse navbar-collapse-example">
                  <!-- 一般导航项目 -->
                  <ul class="nav navbar-nav nav-justified">
                    <li class="active">
                      <router-link to="/">
                        <a>首页</a>
                      </router-link>
                    </li>
                    <li>
                      <a>方案</a>
                    </li>
                    <li>
                      <a>购买</a>
                    </li>
                    <li>
                      <a>我们</a>
                    </li>
                    <li  v-if="name">
                      <router-link :to="{path:'/buildindex'}">
                        <a>建库</a>
                      </router-link>
                    </li>
                    <li v-if="name">
                      <router-link :to="{path:'/need/applyindex'}">
                        <a>申请</a>
                      </router-link>
                    </li>
                    <li>
                      <a href="../LoingRegisterAndHome/index.html">后台</a>
                    </li>
                  </ul>
                </div>
                <!-- END .navbar-collapse -->
              </div>
            </nav>
          </div>
        </div>
      </div>
      <div class="loginBox">
        <div style="line-height:40px">
          <template v-if="!name">
            <router-link to="/logHome">
              <a class="btn btn-link"> 登录</a>
            </router-link>
          </template>
          <template v-else>
            <!-- <span>{{name}}</span> -->
            <el-dropdown @command="scomand" :hide-on-click="false">

              <span class="el-dropdown-link" style="  cursor: pointer;">
                <!-- <i class="icon icon-align-justify" style="font-size:22px"></i> -->
                {{name}}
              </span>
              <el-dropdown-menu slot="dropdown">
                <!-- <el-dropdown-item command="1">修改密码</el-dropdown-item> -->
                <el-dropdown-item command="2">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
          <a href="../LoingRegisterAndHome/index.html#/register/regHome" class="btn btn-danger" style="margin-left:10px">免费注册</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getToken, setToken, removeToken, exitApp } from "@/utils/auth";
export default {
  computed: {
    ...mapGetters(["name"])
  },
  data() {
    return {};
  },
  methods: {
    scomand(a) {
      console.log(a);
      if (a == 2) {
        exitApp();
      }
    }
  },
  mounted() {
    let token = getToken();
    console.log(token);
    if (token) {
      this.$store.dispatch("GetUserInfo").then(res => {
        // console.log(res)
      });
    }
  }
};
</script>
<style lang="scss" scoped >
.el-button:hover {
}
.Logo {
  float: left;
  margin-left: 50px;
  margin-top: 16px;
}
.loginBox {
  float: right;
  margin-right: 30px;
  margin-top: -62px;
}
</style>

