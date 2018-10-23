<template>

  <div class="register-main">
    <div class="registerBox">
      <div id="wizard" class="bwizard clearfix">
        <ol class="bwizard-steps clearfix clickable" role="tablist">
          <li role="tab" aria-selected="true" :class="regSteps==0?'active':''" style="z-index: 3;">
            <span class="label badge-inverse">1</span>
            <a class="hidden-phone">填写手机号</a>
          </li>
          <li role="tab" aria-selected="false" :class="regSteps==1?'active':''" style="z-index: 2;">
            <span class="label">2</span>
            <a class="hidden-phone">填写企业信息</a>
          </li>
          <li role="tab" aria-selected="false" :class="regSteps==2?'active':''" style="z-index: 1;">
            <span class="label">3</span>
            <a class="hidden-phone">注册成功</a>
          </li>
        </ol>
      </div>
      <div v-show="regSteps == 0">
        <div v-if="!hasCompany">
          <p>验证手机号（此手机号将作为登录时的个人账号）</p>
          <el-form style="margin-top:20px" ref="form" :model="form">
            <el-form-item label="手机号" label-width="80px">
              <el-input v-model="form.phone" :disabled="verification"></el-input>
            </el-form-item>
            <el-form-item label="验证码" label-width="80px">
              <el-input v-model="form.remark"></el-input>
              <el-button size="mini" class="verificationcode" :disabled="verification" type="info" @click="getVerification">{{setTime}}</el-button>
            </el-form-item>
            <el-form-item label="" label-width="80px">
              <el-button class="nextBtn" @click="regNext">下一步</el-button>
              <p>
                <router-link to="/register/regHome">
                  <span >返回上一步</span>
                </router-link>
              </p>
            </el-form-item>
          </el-form>
        </div>
        <div v-else class="RegisterBox">
          <p class="ToLogin">此手机已绑定以下企业，点击去登录</p>
          <div class="CompanyData" style="cursor: pointer;">
            <el-card v-for="(item,index) in companyList" :key="index" shadow="hover">
              {{item.unitName}}
            </el-card>
          </div>
          <el-button class="NextBtn" @click="regSteps=1">继续创建新账号</el-button>
          <p class="Prev">
            <a @click="regSteps = 0">返回上一步</a>
          </p>
        </div>
      </div>
      <div style="margin-top:20px" v-show="regSteps == 1">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
          <el-form-item prop="userName">
            <el-input placeholder="真实姓名" v-model="ruleForm.userName"></el-input>
          </el-form-item>
          <el-form-item prop="unitName">
            <el-input placeholder="企业名称" v-model="ruleForm.unitName"></el-input>
          </el-form-item>
          <el-form-item prop="email">
            <el-input placeholder="企业邮箱" v-model="ruleForm.email"></el-input>
          </el-form-item>
          <el-form-item prop="passWord">
            <el-input type="password" placeholder="密码" v-model="ruleForm.passWord"></el-input>
          </el-form-item>
          <el-form-item prop="pass1">
            <el-input type="password" placeholder="确认密码" v-model="ruleForm.pass1"></el-input>
          </el-form-item>
          <!-- <el-form-item prop="address">
            <el-input placeholder="企业地址" v-model="ruleForm.address"></el-input>
          </el-form-item>
          <el-form-item prop="unitCode">
            <el-input placeholder="单位编号" v-model="ruleForm.unitCode"></el-input>
          </el-form-item>
          <el-form-item prop="business">
            <el-input placeholder="行业" v-model="ruleForm.business"></el-input>
          </el-form-item>
          <el-form-item prop="companyIntroduction">
            <el-input placeholder="公司介绍" v-model="ruleForm.companyIntroduction"></el-input>
          </el-form-item>
          <el-form-item prop="homePage">
            <el-input placeholder="公司主页" v-model="ruleForm.homePage"></el-input>
          </el-form-item>
          <el-form-item prop="postalCode">
            <el-input placeholder="邮政编码" v-model="ruleForm.postalCode"></el-input>
          </el-form-item> -->
          <el-button class="NextBtn" @click="submitFrom">下一步</el-button>
          <p class="Prev">
            <a @click="regSteps = 0">返回上一步</a>
          </p>
        </el-form>
      </div>
      <div style="margin-top:20px" v-show="regSteps == 2">
        <div class="RegisterBox">
          <div class="success">
          <img src="../../assets/register/registerok.png" alt=""> 
          <p>恭喜注册成功，请等待服务人员为您开通系统账号</p> 
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getPhoneGetCode,
  validationPhoneCode,
  updateReisger
} from "@/api/register";
import { validatePhone } from "@/utils/validate";
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value !== this.ruleForm.passWord) {
        callback(new Error("确认密码输入错误，请重新输入"));
      } else {
        callback();
      }
    };
    return {
      value: "",
      form: {
        phone: "",
        remark: ""
      },
      verification: false,
      setTime: "获取验证码",
      intervalVerfication: null,
      regSteps: 0,
      ruleForm: {
        address: "",
        business: "",
        companyIntroduction: "",
        homePage: "",
        phone: "",
        postalCode: "",
        unitCode: "",
        unitName: "",
        userName: "",
        email: "",
        passWord: "",
        pass1: ""
      },
      rules: {
        unitName: [
          { required: true, message: "请输入企业名称", trigger: "blur" }
        ],
        userName: [
          { required: true, message: "请输入真实姓名", trigger: "blur" }
        ],
        email: [{ required: true, message: "请输入邮箱地址", trigger: "blur" }],
        passWord: [
          { required: true, message: "请输入密码", trigger: "blur" },
        ],
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
      hasCompany: false, //是否有公司
    };
  },
  methods: {
    getVerification() {
      if (validatePhone(this.form.phone)) {
        getPhoneGetCode({ phone: this.form.phone })
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
    regNext() {
      validationPhoneCode(this.form)
        .then(res => {
          console.log(res);
          // res.data 如果有数据 就证明的是有注册
          if (res.data.length > 0) {
            // this.registerNext = false;
            // this.ruleForm2.account = this.form.phone;
            this.companyList = res.data;
            this.hasCompany = true;
            this.ruleForm.phone = this.form.phone;
          } else {
            this.regSteps = 1;
            this.ruleForm.phone = this.form.phone;
            clearInterval(this.intervalVerfication);
            this.setTime = "获取验证码";
            this.verification = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    submitFrom() {
      // updateReisger({this.ruleForm})
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          // 数据检验通过进行修改
          updateReisger(this.ruleForm)
            .then(response => {
              this.regSteps = 2;
            })
            .catch(error => {});
        }
      });
    }
  },
  mounted(){
    
  },
  destroyed() {
    if (this.intervalVerfication) {
      clearInterval(this.intervalVerfication);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
// @import '../../styles/bootstrap.min.css';
$bg: #fff;
$light_gray: #eee;
p,
h1,
h2 {
  padding: 0;
  margin: 0;
}
.verificationcode {
  position: absolute;
  top: 3px;
  right: 0;
}
.register-main {
  text-align: center;
  padding-top: 4vh;
  .registerBox {
    width: 480px;
    height: 430px;
    margin: 0 auto;
  }
  p {
    color: #666;
    margin-top: 4vh;
    font-size: 13px;
  }
  .success{
    margin-top: 60px;
    p{
      margin-top:0;
    }
  }
  .el-form {
    width: 70%;
    margin: 0 auto;
    .first,
    .second {
      width: 100%;
      height: 38px;
      border: 1px solid #ccc;
      border-radius: 4px;
      margin-top: 26px;
    }
    .el-select {
      float: left;
      width: 22%;
    }
    .phone {
      float: left;
      width: 75%;
      border: none;
      outline: none;
    }
    .el-input__inner {
      border: 1px solid #fff;
    }
    .message {
      float: left;
      width: 65%;
    }
    .getmessage {
      float: right;
      width: 32%;
      background: #f2f2f2;
      color: #666;
      border: none;
      margin: 0.2vh;
    }
    .nextBtn {
      width: 100%;
      background: #ee4239;
      color: #fff;
      font-weight: bold;
    }
    p {
      margin-top: 30px;
      color: #ee4239;
      font-size: 13px;
    }
  }
}

.RegisterBox {
  text-align: center;
  width: 348px;
  margin: 0 auto;
}
.Company {
  width: 73%;
  margin: 0 auto;
}
.el-table {
  margin-top: 2vh;
}
.ToLogin {
  font-size: 13px;
  color: #bbb;
  text-align: left;
  padding-left: 10px;
  margin-top: 4vh;
}
.CompanyData{
    margin-top: 2vh;
  }
.NextBtn {
  width: 100%;
  background: #ee4239;
  color: #fff;
  margin-top: 3vh;
  font-weight: bold;
}
.Prev {
  margin-top: 2vh;
  color: #ee4239;
  font-size: 13px;
}
.el-table .cell {
  text-align: left;
}
.bwizard {
  position: relative;
  margin-top: 2vh;
}
.bwizard .well {
  margin: 3px 0;
}
.bwizard-steps {
  margin: 0;
  padding: 0;
  display: inline-block;
  background: #fff;
}
.bwizard-steps li {
  display: inline-block;
  position: relative;
  margin-right: 5px;
  line-height: 18px;
  list-style: none;
  padding: 12px 17px 10px 30px;
  background: #efefef;
  zoom: 1;
  *display: inline;
  *padding-left: 17px;
}
.bwizard-steps li:first-child {
  -moz-border-radius: 4px 0 0 4px;
  -webkit-border-radius: 4px 0 0 4px;
  border-radius: 4px 0 0 4px;
  padding-left: 12px;
}
.bwizard-steps li:first-child:before {
  border: none;
}
// .bwizard-steps li:last-child {
//     -moz-border-radius: 0 4px 4px 0;
//     -webkit-border-radius: 0 4px 4px 0;
//     border-radius: 0 4px 4px 0;
//     margin-right: 0; }
// .bwizard-steps li:last-child:after {
//     border: none; }
.bwizard-steps li:before {
  position: absolute;
  left: 0;
  top: 0;
  height: 0;
  width: 0;
  border-bottom: 20px inset transparent;
  border-left: 20px solid #fff;
  border-top: 20px inset transparent;
  content: "";
}
.bwizard-steps li:after {
  position: absolute;
  right: -20px;
  top: 0;
  height: 0;
  width: 0;
  border-bottom: 20px inset transparent;
  border-left: 20px solid #efefef;
  border-top: 20px inset transparent;
  content: "";
  z-index: 2;
}
.bwizard-steps .label {
  margin: 0 5px 0 0;
  padding: 1px 5px 2px;
  position: relative;
  top: -1px;
}
.bwizard-steps .active {
  color: #fff;
  background: #ee4239;
}
.bwizard-steps .active:after {
  border-left-color: #ee4239;
}

.bwizard-steps a {
  color: #333;
}
.bwizard-steps .active a {
  color: #fff;
  cursor: default;
}
.bwizard-steps a:hover {
  text-decoration: none;
}
.bwizard-steps.clickable li:not(.active) {
  cursor: pointer;
}
.bwizard-steps.clickable li:hover:not(.active) {
  background: #ccc;
}
.bwizard-steps.clickable li:hover:not(.active) a {
  color: #ee4239;
}
.bwizard-steps.clickable li:hover:not(.active):after {
  border-left-color: #ccc;
}
@media (max-width: 480px) {
  /*badges only on small screens*/
  .bwizard-steps li,
  .bwizard-steps li.active,
  .bwizard-steps li:first-child,
  .bwizard-steps li:last-child {
    background-color: transparent;
    padding: 0;
    margin-right: 0;
  }
  .bwizard-steps li:after,
  .bwizard-steps li:before {
    border: none;
  }
}
</style>

