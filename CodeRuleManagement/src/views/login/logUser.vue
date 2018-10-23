<template>
    <div class="LoginMain"> 
        <div class="LoginBox">
            <div class="LoginBoxHeader">
                <div><a class="CodeLogin"  :class="logSteps==0?'active':''">扫码登录</a></div>
                <div><a class="NumberLogin"  :class="logSteps==1?'active':''">账号登录</a></div>
            </div>
        <div v-show="logSteps == 0">
            <el-form ref="form" :model="form">
             <div class="First">
             <el-select v-model="value" placeholder="+86">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
             </el-select>
             <el-input class="Phone1" placeholder="请输入手机号"></el-input>
             </div>                      
             <div class="Second"> 
              <div class="PasswordPng"><img src="../../assets/login/password.png" alt=""></div>
              <el-input class="Password" placeholder="请输入密码"></el-input> 
             </div> 
             <div class="PasswordMessage"><a  :class="logSteps==2?'active':''">动态登录密码</a></div>
             <el-button class="LoginBtn">登录</el-button>     
             <el-checkbox label="记住登录状态" name="type"></el-checkbox> 
             <div><a class="ForgetPassword">忘记密码？</a></div>
            </el-form>
         </div>
         <div v-show="logSteps == 1">
             <el-form ref="form" :model="form">
             <div class="First">
             <el-select v-model="value" placeholder="+86">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
             </el-select>
             <el-input class="Phone" placeholder="请输入手机号"></el-input>
             <el-button class="GetMessage">获取验证码</el-button> 
             </div>                      
             <div class="Second"> 
              <div class="PasswordPng"><img src="../../assets/login/password.png" alt=""></div>
              <el-input class="Password" placeholder="请输入验证"></el-input> 
             </div> 
             <div class="PasswordMessage"><a>个人密码登录</a></div>
             <el-button class="LoginBtn">登录</el-button>     
             <el-checkbox label="记住登录状态" name="type"></el-checkbox> 
             <div><a class="ForgetPassword">忘记密码？</a></div>
            </el-form>
        </div>
        <div>
             <div class="CodePng">
                <img src="../../assets/login/code.png" alt="">
                <p>请使用<span>CMS手机端</span>进行扫码</p>
            </div>
        </div>
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
                   height:50px;
                   border-bottom: 2px solid #ccc;
                   div{
                       width:50%;
                       float: left;
                       text-align: center;
                       a{
                           display: inline-block;
                           line-height: 42px;
                           width:100px;
                           height:50px;
                       }
                       .NumberLogin{
                           border-bottom: 3px solid #ee4239;
                           color:#ee4239;
                       }
                   }
               }
               .el-form{
                   width:80%;
                   margin:0 auto;
                   margin-top: 30px;
                   text-align: center;
                   .First,.Second{
                       width:100%;
                       height:38px;
                       border-bottom:1px solid #ccc;
                       margin-top: 2vh;           
                      }
                    .Second .PasswordPng{
                          width:24%;
                          float: left;
                          img{
                              margin-right:6px;
                          }
                      }
                    .Password{
                          float: left;
                          width:72%;
                      }
                    .el-select{
                        float: left;
                        width:24%;
                    }
                    .Phone,.Phone1{
                        float: left;
                        width:42%;
                        border: none;
                        outline: none;
                   }
                   .Phone1{
                       width:72%;
                   }
                   .GetMessage{
                       float:right;
                       width:28%;
                       height:24px;
                       background:#ee4239;
                       color:#fff;
                       border:none;
                       font-size: 12px;
                       text-align: center;
                       margin-top: 8px;
                       padding:5px 10px;
                    }
                   .el-input__inner{
                        border:1px solid #fff;
                   }
                    .LoginBtn{
                        width:100%;
                        border-radius: 30px;
                        background: #ee4239;
                        color:#fff;
                        margin-top: 50px;
                        font-weight: bold;
                   }
                   .el-checkbox{
                       margin:0 auto;
                       margin-top: 4vh;                      
                   }
                   .el-checkbox__label{
                       font-size: 13px;
                   }
                   .PasswordMessage,.ForgetPassword{
                       float:right;
                       font-size: 13px;
                       color:#ee4239;
                       margin-top: 20px;
                   }
               }
               .CodePng{
                   width:60%;
                   margin:0 auto;
                   margin-top: 6vh;
                   text-align: center;
               }
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
        options: [{
          value: '选项1',
          label: '中国+86'
        }, {
          value: '选项2',
          label: '中国香港+852'
        }, {
          value: '选项3',
          label: '中国澳门+853'
        }, {
          value: '选项4',
          label: '中国台湾+886'
        }, {
          value: '选项5',
          label: '美国+1'
        }],
        value: '',
        form:{},
      }
    }
  }
</script>
