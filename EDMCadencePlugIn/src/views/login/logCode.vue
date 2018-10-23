<template>
  <div class="LoginMain">
    <div class="LoginBox">
      <div class="LoginBoxHeader">
        <div>
          <router-link to="/">
            <a class="CodeLogin">扫码登录</a>
          </router-link>
        </div>
        <div>
          <router-link to="/">
            <a class="CodeLogin">账号登录</a>
          </router-link>
        </div>
        <div>
          <router-link to="/">
            <a class="NumberLogin">验证码登录</a>
          </router-link>
        </div>
      </div>
      <div class="login-container">
        <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-width="0px" v-if="regSteps == 0">
          <el-form-item prop="phone">
            <el-input name="phone" type="text" :disabled="verification" v-model.trim="loginForm.phone" autoComplete="on"
              placeholder="手机号"></el-input>
          </el-form-item>
          <el-form-item prop="remark">
            <el-input name="remark" type="remark" v-model.trim="loginForm.remark" placeholder="动态码"></el-input>
            <el-button class="GetMessage" type="danger" size="mini" @click="getCheckCode" :disabled="verification">{{setTime}}</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width:100%;" @click.native.prevent="nextStep">下一步</el-button>
          </el-form-item>
        </el-form>
        <div v-else-if="regSteps == 1">
          <div v-for="(item,index) in companyList" :key="index" @click="loginApp({id:item.id})">
            <el-card shadow="hover">
              {{item.unitName}}
            </el-card>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import { getTenant, getDynamicCode, dynLoginValidation } from "@/api/login";
  import { validatePhone } from "@/utils/validate";
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
        isShowTenant: false,
        timer: null,
        loginForm: {
          phone: null,
          remark: "",
        },
        loginRules: {
          // password: [{ required: true, trigger: "blur" }]
        },
        companyList: [
          { unitName: 'qwe', id: 123 }
        ],
        loading: false,
        verification: false,
        setTime: "获取动态码",
        intervalVerfication: null,
        regSteps: 1,
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
      getCheckCode() {
        if (validatePhone(this.loginForm.phone)) {
          getDynamicCode({ phone: this.loginForm.phone })
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
      nextStep() {
        dynLoginValidation(this.loginForm).then(res => {
          console.log(res);
          this.companyList = res.data;
          this.regSteps = 1;
          clearInterval(this.intervalVerfication);
          this.setTime = "获取验证码";
          this.verification = false;
        }).catch(err => {
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
            this.loading = false;
          });
      }
    },
    mounted() { },
    destroyed() {
      if (this.intervalVerfication) {
        clearInterval(this.intervalVerfication);
      }
    }
  };
</script>

<style lang="scss" scoped>


 .LoginBox {
      width: 360px;
      height: 430px;
      background: #fff;
      border-radius: 10px;
      position: absolute;
      top: 50%;
      left: 56%;
      transform: translateY(-50%);
      padding-top: 12px;

      .LoginBoxHeader {
        width: 100%;
        height: 50px;
        border-bottom: 2px solid #ccc;

        div {
          width: 33%;
          float: left;
          text-align: center;

          a {
            display: inline-block;
            line-height: 42px;
            width: 100px;
            height: 50px;
          }

          .NumberLogin {
            border-bottom: 3px solid #ee4239;
            color: #ee4239;
          }
        }
      }

      .el-form {
        width: 80%;
        margin: 0 auto;
        margin-top: 30px;
        text-align: center;

        .First,.Second {
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