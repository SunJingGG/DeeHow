<template>
    <div class="LoginBox">
      <div class="LoginBoxHeader">
        <!-- <div>
          <router-link to="/login/logUser">
            <a class="CodeLogin">扫码登录</a>
          </router-link>
        </div> -->
        <div>
          <router-link to="/login/logHome">
            <a class="NumberLogin">账号登录</a>
          </router-link>
        </div>
      </div>
      <template v-if="loginType == 0">
        <div class="login-container">
          <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px" class="card-box login-form">
            <el-form-item prop="account">
              <!-- <i class="fa fa-user posicon fa-lg" aria-hidden="true"></i> -->
              <el-input name="account" type="text" v-model.trim="loginForm.account" @blur="showTenant" autoComplete="on" placeholder="手机号"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <!-- <i class="fa fa-key posicon" aria-hidden="true"></i> -->
              <el-input name="password" type="password" v-model.trim="loginForm.password" autoComplete="on" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item v-if="isShowTenant" prop="tenantId" style="width:100%">
              <!-- <i class="fa fa-google posicon" aria-hidden="true"></i> -->
              <el-select v-model="loginForm.tenantId" placeholder="请选择单位" style="width:100%">
                <el-option v-for="item in tenants" :key="item.id" :label="item.unitName" :value="item.id"> </el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item prop="checkCode">
              <i class="fa fa-pencil posicon" aria-hidden="true"></i>
              <el-input name="checkCode" type="text" @keyup.enter.native="handleLogin" v-model.trim="loginForm.checkCode" autoComplete="on" placeholder="验证码"></el-input>
              <img ref="checkImg" class="login-img" src='/deehow-CMS-Web/public/anon/get/check_code' @click="imgReload" />
            </el-form-item> -->
            <el-form-item>
              <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">登录</el-button>
            </el-form-item>
            <el-form-item>

            </el-form-item>
            <!-- <el-form-item>
              <div>
                <el-button type="text" class="fl" @click="selectlogType(1)">手机验证码登陆</el-button>
              </div>
            </el-form-item> -->
          </el-form>
        </div>
      </template>
      <template v-else-if="1">
        <div class="login-container">
          <el-form :model="loginForms" ref="loginForms" label-width="0px" v-if="regSteps == 0">
            <el-form-item prop="phone">
              <el-input name="phone" type="text" :disabled="verification" v-model.trim="loginForms.phone" autoComplete="on" placeholder="手机号"></el-input>
            </el-form-item>
            <el-form-item prop="remark">
              <el-input name="remark" type="remark" v-model.trim="loginForms.remark" placeholder="动态码"></el-input>
              <el-button class="GetMessage" type="danger" size="mini" @click="getCheckCode" :disabled="verification">{{setTime}}</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" style="width:100%;" @click.native.prevent="nextStep">下一步</el-button>
            </el-form-item>
            <el-form-item>
              <div>
                <el-button type="text" class="fl" @click="selectlogType(0)">账号密码登录</el-button>
                <router-link to="/login/findPassword">
                  <el-button type="text" class="fr">忘记密码</el-button>
                </router-link>
              </div>
            </el-form-item>
          </el-form>
          <div v-else-if="regSteps == 1" style="padding:10px">
            <div v-for="(item,index) in companyList" style="cursor: pointer;padding:10px" :key="index" @click="loginApp({id:item.userId})">
              <el-card shadow="hover">
                {{item.unitName}}
              </el-card>
            </div>
            <div style="margin-top:20px">
              <el-button type="primary" style="width:100%;" @click.native.prevent="prevStep">返回上一步</el-button>
            </div>
          </div>
        </div>
      </template>
    </div>
</template>

<script>
import { getTenant, getDynamicCode, dynLoginValidation } from "@/api/login";
import { validatePhone } from "@/utils/validate";
import { exitApp } from "@/utils/auth";
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
      tenants: [],
      companyList: [{unitName:'qwe',id:123}],
      isShowTenant: false,
      timer: null,
      loginForm: {
        phone: null,
        password: "",
        checkCode: "",
        tenantId: null
      },
      loginForms: {
        phone: null,
        remark: ""
      },
      loginRules: {
        email: [{ required: true, trigger: "blur" ,message: '请输入用户名'}],
        password: [{ required: true, trigger: "blur",message: '请输入密码' }],
        checkCode: [{ required: true, trigger: "blur",message: '请输入验证码' }],
      },
      loading: false,
      verification: false,
      setTime: "获取动态码",
      intervalVerfication: null,
      regSteps: 0,
      loginType: 0,
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
    selectlogType(num){
      this.regSteps = 0;
      this.loginType = num;
      if(this.intervalVerfication){

        clearInterval(this.intervalVerfication);
      }
      this.setTime = "获取验证码";
      this.verification = false;
    },
    prevStep(){
      this.regSteps = 0;
      if(this.intervalVerfication){

        clearInterval(this.intervalVerfication);
      }
      this.setTime = "获取验证码";
      this.verification = false;
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
              this.$router.push({ path: "/" });
            })
            .catch(res => {
              console.log(res)
              if(res == "未获取到菜单"){
                this.$message.error('您暂无权限,请联系管理员为您分配菜单');
                setInterval(()=>{
                  exitApp();
                },2000)
              }
              if(res.msg.includes('已经登陆')){
                this.$message.error(res.msg);
                setInterval(()=>{
                  exitApp();
                },2000)
              }
              this.loading = false;
              this.imgReload();
            });
        } else {
          return false;
        }
      });
    },
    getCheckCode() {
      if (validatePhone(this.loginForms.phone)) {
        getDynamicCode({ phone: this.loginForms.phone })
          .then(res => {
            if (res.httpCode == 200) {
              this.verification = true;
              this.interval();
            } else {
              this.$message({
                type: "info",
                message: "操作失败"
              });
            }
          })
          .catch(err => {
            console.log(err);
            this.$message({
              type: "info",
              message: "操作失败"
            });
          });
      } else {
        this.$message({
          type: "info",
          message: "请输入正确的手机号"
        });
      }
    },
    interval() {
      let keepTime = 60;

      this.intervalVerfication = setInterval(v => {
        keepTime--;
        this.setTime = keepTime + "秒后重新获取";
        console.log(this.setTime);
        if (keepTime <= 0) {
          clearInterval(this.intervalVerfication);
          this.setTime = "获取验证码";
          this.verification = false;
        }
      }, 1000);
    },
    nextStep(){
      if(!this.loginForms.phone){
        return false;
      }
      dynLoginValidation(this.loginForms).then(res=>{
        console.log(res);
        this.companyList = res.data;
        this.regSteps = 1;
        clearInterval(this.intervalVerfication);
        this.setTime = "获取验证码";
        this.verification = false;
      }).catch(err=>{
        console.log(err)
      })
    },
    loginApp(obj) {
      this.loading = true;
      console.log(obj)
      this.$store
        .dispatch("DynLog", obj)
        .then((res) => {
          console.log(res)
          this.loading = false;
          this.$router.push({ path: "/" });
        })
        .catch(res => {
          console.log(res)
          this.$message.error('您暂无权限,请联系管理员为您分配菜单');
          setInterval(()=>{
            exitApp();
          },2000)
          this.loading = false;
        });
    }
  },
  mounted() {},
  destroyed() {
    if (this.intervalVerfication) {
      clearInterval(this.intervalVerfication);
    }
  }
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
.LoginBox {
    width: 360px;
    // height: 460px;
    background: #fff;
    border-radius: 10px;
    position: absolute;
    top: 20%;
    left: 56%;
    padding-top: 12px;
    .LoginBoxHeader {
      width: 100%;
      height: 50px;
      border-bottom: 2px solid #ccc;
      div {
        width: 100%;
        float: left;
        text-align: center;
        a {
          display: inline-block;
          line-height: 42px;
          width: 100%;
          height: 50px;
        }
        .NumberLogin {
          border-bottom: 3px solid #ee4239;
          color: #ee4239;
          font-size: 17px;
        }
      }
    }
    .el-form {
      width: 80%;
      margin: 0 auto;
      margin-top: 30px;
      text-align: center;
      .First,
      .Second {
        width: 100%;
        height: 38px;
        border-bottom: 1px solid #ccc;
        margin-top: 2vh;
      }
      .Second .PasswordPng {
        width: 24%;
        float: left;
        img {
          margin-right: 6px;
        }
      }
      .Password {
        float: left;
        width: 72%;
      }
      .Phone {
        float: left;
        width: 72%;
        border: none;
        outline: none;
      }
      .LoginBtn {
        width: 100%;
        border-radius: 30px;
        background: #ee4239;
        color: #fff;
        margin-top: 50px;
        font-weight: bold;
      }
      .el-checkbox {
        margin: 0 auto;
        margin-top: 4vh;
      }
      .el-checkbox__label {
        font-size: 13px;
      }
      .PasswordMessage,
      .ForgetPassword {
        float: right;
        font-size: 13px;
        color: #ee4239;
        margin-top: 20px;
      }
    }
  }

.login-container {
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

.GetMessage {
  margin-top: 4px;
  padding: 5px 10px;
  position: absolute;
  top: 0;
  right: 10px;
  
}
</style>

