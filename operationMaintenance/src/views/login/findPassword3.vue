<template>
  <div class="LoginContainer">
     <div class="LoginHeader">
          <div class="LogoPng"><img src="../../assets/register/logonew.png" alt="logo"></div>
          <div class="CodePng"><img src="../../assets/login/codesmall.jpg" alt="code"><span>扫描下载APP</span></div>
     </div> 
     <div class="LoginMain"> 
        <div class="LoginBox">
            <div class="LoginBoxHeader">
               找回密码
            </div>
            <p>您的企业已设置：密码为6位以上字母+数字组合</p>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
           <el-form-item prop="newPassword">
               <el-input placeholder="新密码" v-model="ruleForm.name"></el-input>
           </el-form-item>
           <el-form-item prop="SurePassword">
               <el-input placeholder="确认密码" v-model="ruleForm.name"></el-input>
           </el-form-item>
           <el-button class="NextBtn">提交</el-button>     
            <p class="Prev"><a href="">立即登录></a></p>
        </el-form>
        </div>
     </div>
     <div class="LoginFoot">
         <p>-北京迪浩永辉技术有限公司-</p>
     </div>
  </div>
</template>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#fff;
$light_gray:#eee;
h1,h2{
    padding:0;
    margin:0;
}
.LoginContainer{
    width:100%;
        .LoginHeader{
          height:80px;
          .LogoPng{
          width:110px;  
          height:60px;   
          display: inline-block;
          margin-left: 5vw;
          line-height: 80px;
          cursor: pointer;
          img{
              width:100%;
             }
           }
          .CodePng{
              width:160px;
              height:60px;
              line-height: 80px;
              float: right;
              margin-right: 18vw;
              img{
                  width:38%;
              }
              span{
                  display: inline;
                  float:right;
                  margin-right:8px;
                  margin-top: 20px;
                  font-size: 14px;
                  color:#666;
              }
          }
        }
        .LoginMain{
            width:100%;
            height:80vh;
            background: #f2f2f2;
            background: url("../../assets/login/loginBackground.png") center center no-repeat;
            background-size:cover; 
           position: relative;
           .LoginBox{
               width:360px;
               height:430px;
               background:#fff;
               border-radius: 10px;
               position:absolute;
               top:50%;
               left:56%;
               transform:translateY(-50%);
               padding-top: 12px;
               .LoginBoxHeader{
                   width:100%;
                   height:70px;
                   line-height: 70px;
                   text-align: center;
                   color:#ee4239;
                   font-size: 20px;
                   font-weight: bold;
               }
               .el-form{
                   width:80%;
                   margin:0 auto;
                   margin-top: 20px;
                   
              .NextBtn{
                   width:100%;
                   background: #ee4239;
                   color:#fff;
                   margin-top: 24px;
                   font-weight: bold;
                }
              .Prev{
                margin-top: 40px;
                color: #ee4239;
                font-size: 13px;
                a{
                  float:right;
                }              
              }
             .PasswordMessage{
                 text-align: left;
                 color:#bbb;
                 font-size:13px;
                 margin-bottom:10px;
             }
            .el-form-item{
               margin-bottom: 16px;
            }
             }
           }
            p{
               font-size: 13px;
               color:#888;
               width:80%;
               margin:0 auto;
               margin-top: 30px;
             }
        } 
        .LoginFoot{
           text-align: center;
           padding-top: 20px;
        }
    }

</style>


<script>
export default {
    data() {
      return {
        ruleForm: {
          newPassword: '',
          surePassword: '',       
        },
        rules: {
          newPassword: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          surePassword: [
            { required: true, message: '请确认密码', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
