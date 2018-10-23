<template>
	<div class="LoginMain">
		<div class="LoginBox">
			<div class="LoginBoxHeader">
				<div>
					<a class="CodeLogin">扫码登录</a>
				</div>
				<div>
					<a class="NumberLogin">账号登录</a>
				</div>
			</div>
			<!-- <el-form ref="form" :model="form">
				<div class="First">
					<el-select v-model="value" placeholder="+86">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
					<el-input class="Phone" v-model="form.phone" placeholder="请输入手机号" @blur="getUserTented"></el-input>
				</div>
				<div class="Second">
					<div class="PasswordPng"><img src="../../assets/login/password.png" alt=""></div>
					<el-input class="Password" placeholder="请输入密码"></el-input>
				</div>
				<div class="PasswordMessage">
					<a>动态登录密码</a>
				</div>
				<el-button class="LoginBtn">登录</el-button>
				<el-checkbox label="记住登录状态" name="type"></el-checkbox>
				<div>
					<a class="ForgetPassword">忘记密码？</a>
				</div>
			</el-form> -->
			<div class="login-container">
				<!-- <el-form ref="loginFrom" :model="loginFrom" label-width="80px">
					<el-form-item label="">
						<el-input v-model="loginFrom.account"></el-input>
					</el-form-item>
					<el-form-item label="">
						<el-select v-model="loginFrom.region" placeholder="请选择活动区域">
							<el-option label="区域一" value="shanghai"></el-option>
							<el-option label="区域二" value="beijing"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="onSubmit">立即创建</el-button>
						<el-button>取消</el-button>
					</el-form-item>
				</el-form> -->
				<el-form  autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px" class="card-box login-form">
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
							<el-form-item prop="verify">
								<!-- <i class="fa fa-pencil posicon" aria-hidden="true"></i> -->
									<el-input name="checkCode" type="text" @keyup.enter.native="handleLogin" v-model.trim="loginForm.checkCode" autoComplete="on" placeholder="验证码"></el-input>
									<img ref="checkImg" class="login-img" src='/deehow-CMS-Web/public/anon/get/check_code' @click="imgReload" />
							</el-form-item>
							<el-form-item>
									<el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">登录</el-button>
							</el-form-item>
							<el-form-item>
									<el-button type="danger" style="width:100%;" @click.native.prevent="handleRegister">注册</el-button>
							</el-form-item>
					</el-form>
			</div>

		</div>
	</div>
</template>

<script>
import { getTenant} from "@/api/login";
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
			isShowTenant:false,
			timer: null,
      loginForm: {
        phone: null,
        password: "",
        checkCode: "",
        tenantId: null
      },
      loginRules: {
        email: [{ required: true, trigger: "blur" }],
        password: [{ required: true, trigger: "blur" }]
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
              this.$router.push({ path: "/" });
            })
            .catch(res => {
              this.loading = false;
              this.imgReload();
            });
        } else {
          return false;
        }
      });
    },
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
  height: 80vh;
  background: url("../../assets/login/loginBackground.png") center center
    no-repeat;
  background-size: cover;
  position: relative;
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
        width: 50%;
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
}

.login-container{
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
	.posicon{
		position: absolute;
		z-index: 1;
		top: 16px;
    left: 14px;
	}
}
</style>

