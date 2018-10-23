<template>
<div class="LoginMain">
  <div class="container">
    <div class="login-container clearfix">
      <h3 style="margin-bottom:40px">登录...</h3>
      <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px" class="card-box login-form">
        <el-form-item prop="account">
          <i class="fa fa-user posicon fa-lg" aria-hidden="true"></i>
          <el-input name="account" type="text" v-model.trim="loginForm.account" @blur="showTenant" autoComplete="on" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <i class="fa fa-key posicon" aria-hidden="true"></i>
          <el-input name="password" type="password" v-model.trim="loginForm.password" autoComplete="on" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item v-if="isShowTenant" prop="tenantId" style="width:100%">
          <i class="fa fa-google posicon" aria-hidden="true"></i>
          <el-select v-model="loginForm.tenantId" placeholder="请选择单位" style="width:100%">
            <el-option v-for="item in tenants" :key="item.id" :label="item.unitName" :value="item.id"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="checkCode">
          <i class="fa fa-pencil posicon" aria-hidden="true"></i>
          <el-input name="checkCode" type="text" @keyup.enter.native="handleLogin" v-model.trim="loginForm.checkCode" autoComplete="on" placeholder="验证码"></el-input>
          <img ref="checkImg" class="login-img" src='/deehow-CMS-Web/public/anon/get/check_code' @click="imgReload" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" style="width:100%;" @click.native.prevent="handleRegister">注册</el-button>
        </el-form-item>
        <el-form-item>
          <router-link to="/login/findPassword">
            <el-button type="text" style="width:100%;text-align:right">忘记密码</el-button>
          </router-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</div>
</template>

<script>
import { getTenant } from "@/api/login";
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value.length < 0) {
        callback(new Error("密码不能小于0位"));
      } else {
        callback();
      }
    };
    return {
      value: "",
      form: {
        phone: ""
      },
      loginForm: {
        phone: null,
        password: "",
        checkCode: "",
        tenantId: null
      },
      tenants: [],
      isShowTenant: false,
      timer: null,
      loginForm: {
        phone: null,
        password: "",
        checkCode: "",
        tenantId: null
      },
      loginRules: {
        email: [{ required: true, trigger: "blur" ,message: '请输入用户名'}],
        password: [{ required: true, trigger: "blur",message: '请输入密码' }],
        tenantId: [{ required: true, trigger: "change",message: '请选择单位' }],
        checkCode: [{ required: true, trigger: "blur",message: '请输入验证码' }],
      },
      loading: false
    };
  },
  methods: {
    getUserTented() {
      if (this.form.phone) {
        getPhoneGetCode(this.form.phone).then(res => {
          this.tentList = res.data;
        });
      }
    },
    handleRegister() {
      this.$router.push({ path: "/register" });
    },
    showTenant() {
      if (this.loginForm.account) {
        getTenant(this.loginForm.account)
          .then(response => {
            if (response.httpCode == 200) {
              this.tenants = response.data;
              if (this.tenants.length > 0) {
                this.loginForm.tenantId = this.tenants[0].id;
              }
              this.isShowTenant = true;
            } else {
              this.tenants = [];
              this.isShowTenant = false;
              this.$notify.error({
                title: "错误",
                message: "没有找到用户对应的单位信息"
              });
            }
          })
          .catch();
      }
    },
    imgReload() {
      let checkImg = this.$refs.checkImg;
      checkImg.setAttribute(
        "src",
        "/deehow-CMS-Web/public/anon/get/check_code" + "?" + new Date()
      );
    },
    LoginImgReload() {
      let loginImg = this.$refs.loginImg;
      this.string = "charger-login:" + uuid(8, 2);
      loginImg.setAttribute(
        "src",
        "/deehow-CMS-Web/public/anon/get/check_code" + "?uid=" + this.string
      );
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          // console.log(this.$store)
          
          this.$store
            .dispatch("Login", this.loginForm)
            .then(() => {
              this.loading = false;
              this.$store.dispatch('GetUserInfo').then(res=>{
                // console.log(res)
              })
              this.$router.push({ path: "/" });
              this.imgReload();
            })
            .catch(err => {
              console.log(err)
              this.imgReload();
              this.loading = false;
              if(err.msg == "未获取到菜单"){
                  this.$store.dispatch('GetUserInfo').then(res=>{
                  // console.log(res)
                })
                this.$router.push({ path: "/" });
              }else{
                // this.$message.info(err.msg)
              }
            });
          
        } else {
          return false;
        }
      });
    }
  },
  mounted() {}
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #fff;
$light_gray: #eee;
h1,
h2 {
  padding: 0;
  margin: 0;
}
.LoginMain {
  width: 100%;
  // height: 80vh;
  // background: url("../../assets/login/loginBackground.png") center center no-repeat;
  background: #f7f7f7;
    
  background-size: cover;
  position: relative;
 
}

.login-container {
  width: 300px;
  margin:0 auto;
  padding: 100px 0px;
  input {
    // padding: 22px 40px;
    padding: 10px 5px 12px 45px;
    height: 46px;
  }
  .login-img {
    float: left;
    position: absolute;
    right: 2px;
    top: 3px;
    width: 65px;
  }
  .posicon {
    position: absolute;
    z-index: 1;
    top: 16px;
    left: 14px;
  }
}
</style>

