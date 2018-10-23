<template>
  <div class="snavbar">
    <!-- <el-row>
      <el-col :span="3">
        <img :src="`/qingqiu/staticResource/iconImg/logo.png`">
      </el-col>
    </el-row> -->
    <div class="row">
      <div class="col-md-3">
        <img :src="`/qingqiu/staticResource/iconImg/logo.png`" style="width:70px;" class="pointer" @click="toUrl">
        <i @click="toggleSideBar" v-if="isCollapse" class="el-icon-more toggleSidebar" style=""></i>
        <i @click="toggleSideBar" v-else class="el-icon-more-outline toggleSidebar" style=""></i>
      </div>
      <div class="col-md-5">

      </div>
      <div class="col-md-1">
        <!-- <a href="">返回主页</a> -->
        <!-- <h3 class="pointer" @click="toUrl">{{project.modelName}}</h3> -->
        <input class="inputbox" type="text" placeholder="搜索">
      </div>
      <div class="col-md-3">

        <div class="fr">
          <el-dropdown @command="scomand" :hide-on-click="false" style="display: table-cell;vertical-align:middle">

            <span class="el-dropdown-link" style="line-height: 33px;">

              <i class="icon icon-align-justify" style="font-size:22px"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="1">修改密码</el-dropdown-item>
              <el-dropdown-item command="2">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="fr">
          <div class="fl" style="line-height: 28px;margin-right: 20px;color:#fff;">
            {{userDetail.userName}}
          </div>
          <div class="fl">
            <img style="height:28px;margin-right: 20px;" src="../../assets/Application/user.png" alt="" srcset="">
          </div>
        </div>
      </div>
    </div>
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
.snavbar {
  padding: 10px 10px 0px;
  -moz-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  position: fixed;
  width: 100%;
  height: 44px;
  z-index: 100;
  background: #32323a;
}
.el-dropdown-link {
  cursor: pointer;
  line-height: 40px;
}
.toggleSidebar {
  font-size: 20px;
  margin-left: 20px;
  cursor: pointer;
  color: #fff;
}
.inputbox {
  background: #606266;
  border: none;
  outline: none;
  padding-left: 10px;
  margin-top: 2px;
  font-size: 12px;
  color: #ccc;
}
.inputbox::-webkit-input-placeholder {
  color: #ccc;
}
.inputbox::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #ccc;
}
.inputbox:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #ccc;
}
.inputbox:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #ccc;
}
</style>

