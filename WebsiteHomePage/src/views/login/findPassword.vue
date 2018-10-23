<template>
	<div class="LoginMain">
		<div class="LoginBox">
			<div class="LoginBoxHeader">
				找回密码
			</div>
			<div v-show="regSteps == 0">
				<el-form ref="form" :model="form">
					<div class="First">
						<el-input class="Phone" placeholder="请输入手机号" :disabled="verification" v-model="form.phone"></el-input>
						<el-button class="GetMessage" type="danger" size="mini" @click="getCheckCode" :disabled="verification">{{setTime}}</el-button>
					</div>
					<div class="Second">
						<el-input class="Password" v-model="form.remark" placeholder="请输入验证"></el-input>
					</div>
					<el-button class="LoginBtn" @click="regNext">下一步</el-button>
					<div class="Return">
						<router-link to="/logHome">
							<a class="ForgetPassword">返回登录</a>
						</router-link>
					</div>
				</el-form>
			</div>
			<div class="Company" v-show="regSteps == 1">
				<el-table :data="companyList" :show-header="false" style="width: 100%">
					<el-table-column prop="unitName"></el-table-column>
					<el-table-column prop="symble"></el-table-column>
					<el-table-column width="120">
						<template slot-scope="scope">
							<el-button type="text" @click.native.prevent="audit( scope.$index,1)" size="small">重置</el-button>
						</template>
					</el-table-column>
				</el-table>
        <div style="text-align:center">
          <el-button type="text" @click="regSteps = 0">返回上一步</el-button>
        </div>
			</div>
			<div v-show="regSteps == 2">
				<!-- <p>您的企业已设置：密码为6位以上字母+数字组合</p> -->
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
					<el-form-item prop="password">
						<el-input placeholder="新密码" type="password" v-model="ruleForm.password"></el-input>
					</el-form-item>
					<el-form-item prop="pass1">
						<el-input placeholder="确认密码" type="password" v-model="ruleForm.pass1"></el-input>
					</el-form-item>
					<div style="text-align:left">
						<el-button style="width:100%" type="primary" class="NextBtn" @click="resetNewPassword">提交</el-button>
            <el-button style="width:100%" type="text" class="NextBtn" @click="regSteps = 0">上一步</el-button>
					</div>
					<p class="successMsg">{{msg}}</p>
					<p class="Prev" style="text-align:right">
						<router-link to="/logHome">
							<el-button type="text" href="">立即登录></el-button>
						</router-link>
					</p>
				</el-form>
			</div>
		</div>
	</div>
</template>

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
  background: #f2f2f2;
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
    padding: 12px 20px;
    .LoginBoxHeader {
      width: 100%;
      height: 70px;
      line-height: 70px;
      text-align: center;
      color: #ee4239;
      font-size: 20px;
      font-weight: bold;
    }
    .el-form {
      margin: 0 auto;
      text-align: center;
      .First,
      .Second {
        width: 100%;
        height: 38px;
        border-bottom: 1px solid #ccc;
        margin-top: 2vh;
        position: relative;
      }
      .GetMessage {
        margin-top: 4px;
        padding: 5px 10px;
        position: absolute;
        top: 0;
        right: 10px;
      }
      .Password {
      }
      .el-select {
        float: left;
        width: 24%;
      }
      .Phone {
        border: none;
        outline: none;
      }
      .el-input__inner {
        border: 1px solid #fff;
      }
      .LoginBtn {
        width: 100%;
        border-radius: 30px;
        background: #ee4239;
        color: #fff;
        margin-top: 60px;
        font-weight: bold;
      }
      .el-checkbox__label {
        font-size: 13px;
      }
      .ForgetPassword {
        font-size: 13px;
        color: #ee4239;
      }
      .Return {
        margin-top: 80px;
      }
    }
  }
}
.successMsg{
	color:cornflowerblue;
	margin-top:10px;
}
</style>


<script>
import {
  findPasswordCheckCode,
  validatePasswordCheckCode,
  resetPassword
} from "@/api/login";
import { validatePhone } from "@/utils/validate";
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value !== this.ruleForm.password) {
        callback(new Error("确认密码输入错误，请重新输入"));
      } else {
        callback();
      }
    };
    return {
      options: [
        {
          value: "选项1",
          label: "中国+86"
        },
        {
          value: "选项2",
          label: "中国香港+852"
        },
        {
          value: "选项3",
          label: "中国澳门+853"
        },
        {
          value: "选项4",
          label: "中国台湾+886"
        },
        {
          value: "选项5",
          label: "美国+1"
        }
      ],
      rules: {
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        pass1: [
          {
            required: true,
            message: "请确保两次输入的密码一致",
            trigger: "blur",
            validator: validatePass
          }
        ]
      },
      companyList: [],
      value: "",
      form: {
        phone: "",
        remark: ""
      },
      ruleForm: {
        password: "",
        pass1: ""
      },
      verification: false,
      setTime: "获取验证码",
      intervalVerfication: null,
			regSteps: 0,
			msg:"",
    };
  },
  methods: {
    getCheckCode() {
      if (validatePhone(this.form.phone)) {
        findPasswordCheckCode({ phone: this.form.phone })
          .then(res => {
            if (res.httpCode == 200) {
              this.$message({
                type: "success",
                message: "验证码发送成功,请注意查收"
              });
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
    regNext() {
      if(!this.form.phone || !this.form.remark){
        this.$message.error('请输入验证码和手机号')
        return false

      }
      if(!validatePhone(this.form.phone)){
        this.$message.error('请输入正确的手机号')
        return false;

      }
      validatePasswordCheckCode(this.form)
        .then(res => {
          console.log(res);
          // res.data 如果有数据 就证明的是有注册
          if (res.data.length > 0) {
            // this.registerNext = false;
            // this.ruleForm2.account = this.form.phone;
            this.companyList = res.data;
            this.hasCompany = true;
            this.ruleForm.phone = this.form.phone;
            this.regSteps = 1;
          }
          clearInterval(this.intervalVerfication);
          this.setTime = "获取验证码";
          this.verification = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    audit(index) {
      this.ruleForm.id = this.companyList[index].userId;
      console.log(this.companyList[index]);
      this.regSteps = 2;
    },
    resetNewPassword() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          // 数据检验通过进行修改
          resetPassword(this.ruleForm).then(res => {
						console.log(res);
						this.msg = "密码重置成功 , 将自动返回登录页面";
						setTimeout(()=>{

							this.$router.push({ path: "/logHome" });
						},2000)
          });
        }
      });
    }
  },
  destroyed() {
    if (this.intervalVerfication) {
      clearInterval(this.intervalVerfication);
    }
  }
};
</script>
