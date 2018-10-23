<template>
  <div>
    <div style="padding-left:10px">
      <div class="clearfix">
        <h2 class="pull-left">工程数据管理</h2>
        <div class="pull-right welecome">
          <span>欢迎 {{userDetail.userName}}</span>
          <button class="btn btn-sm" style="margin-top:-3px;margin-left:10px" @click="scomand(2)">退出</button>
        </div>
      </div>

    </div>
    <nav class="navbar navbar-inverse" role="navigation">
      <div class="container-fluid">
        <!-- 导航头部 -->
        <div class="navbar-header">
          <!-- 移动设备上的导航切换按钮 -->
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse-example">
            <span class="sr-only">切换导航</span>
            <span class="icon-bar">1</span>
          </button>
          <!-- 品牌名称或logo -->
          <a class="navbar-brand">

            <span class="dropdown">
              <a class="dropdown-toggle" data-toggle="dropdown">{{userDetail.userName}} <b class="caret"></b></a>
              <ul class="dropdown-menu" role="menu">
                <li><a href="your/nice/url">配置</a></li>
              </ul>
            </span>
          </a>
        </div>
        <!-- 导航项目 -->
        <div class="collapse navbar-collapse navbar-collapse-example">
          <!-- 一般导航项目 -->
          <ul class="nav navbar-nav">
            <li class="active"><a href="your/nice/url">工程</a></li>
            <li><a href="your/nice/url">项目</a></li>
            <!-- 导航中的下拉菜单 -->
            <!-- <li class="dropdown">
                <a class="dropdown-toggle" data-toggle="dropdown">管理 <b class="caret"></b></a>
                <ul class="dropdown-menu" role="menu">
                  <li><a href="your/nice/url">任务</a></li>
                </ul>
              </li> -->
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { getToken, setToken, removeToken, exitApp } from "@/utils/auth";
import { getUserInfo } from "@/api/login";
export default {
  data() {
    return {
      project: {},
      loginUser: {}
    };
  },
  computed: {
    ...mapGetters(["permission_routers", "sidebar", "userDetail"]),
    isCollapse() {
      return !this.sidebar.opened;
    }
  },
  mounted() {
    this.project = this.$store.getters.userRuls[0];
    this.getUserDetail();
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("toggleSideBar");
    },
    scomand(a) {
      if (a == 2) {
        // window.localStorage.clear();
        // removeToken();
        // window.location.href = "http://" +location.host
        console.log(2);
        exitApp();
      }
    },
    getUserDetail() {
      // getUserInfo({}).then(res=>{
      //   this.loginUser=res.data;
      //   console.log(res)
      // }).catch(err=>{
      //   console.log(err)
      // })
      this.$store.dispatch("GetUserInfo", {}).then(res => {
        console.log(res);
      });
    },
    toUrl() {
      console.log(process.env.NODE_ENV);
      if (process.env.NODE_ENV != "development") {
        window.location.href =
          "http://" + location.host + "/LoingRegisterAndHome/index.html";
      }
      // window.location.href = "http://" +location.host +'/LoingRegisterAndHome/index.html'
    }
  }
};
</script>
<style lang="scss" scoped>
.welecome {
  margin-top: 20px;
  margin-bottom: 10px;
  margin-right: 10px;
}
.navbar-inverse {
    background-color: rgb(252, 69, 69);
    border-color: rgb(252, 69, 69);
}
.navbar-inverse .navbar-nav>.active>a, .navbar-inverse .navbar-nav>.active>a:focus, .navbar-inverse .navbar-nav>.active>a:hover {
    color: #fff;
    background-color: rgb(253, 42, 42);
}
.navbar-inverse .navbar-nav>li>a:focus, .navbar-inverse .navbar-nav>li>a:hover {
    color: #fff;
    background-color: rgb(253, 42, 42);
}
</style>


