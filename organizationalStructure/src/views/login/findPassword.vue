<template>
     <div class="LoginMain"> 
        <div class="LoginBox">
            <div class="LoginBoxHeader">
               找回密码
            </div>
            <div v-show="findPasswordSteps == 0">
           <el-form ref="form" :model="form">
             <div class="First">
             <el-select v-model="value" placeholder="+86">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
             </el-select>
             <el-input class="Phone" placeholder="请输入手机号"></el-input>
             <el-button class="GetMessage">获取验证码</el-button> 
             </div>                      
             <div class="Second"> 
              <el-input class="Password" placeholder="请输入验证"></el-input> 
             </div> 
             <el-button class="LoginBtn">下一步</el-button>     
             <div class="Return"><a class="ForgetPassword">返回登录</a></div>
         </el-form>
         </div>
         <div class="Company" v-show="findPasswordSteps == 1">
             <el-table :data="tableData" :show-header="false" style="width: 100%">
               <el-table-column prop="company" width="200px"></el-table-column>
               <el-table-column prop="symble"></el-table-column>
             </el-table>
            </div>
         <div v-show="findPasswordSteps == 2">
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
     </div>
</template>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#fff;
$light_gray:#eee;
h1,h2{
    padding:0;
    margin:0;
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
                   text-align: center;
                   .First,.Second{
                       width:100%;
                       height:38px;
                       border-bottom:1px solid #ccc;
                       margin-top: 2vh;           
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
                    .Password{
                          float: left;
                          width:80%;
                          padding-left: 30px;
                    }
                    .el-select{
                         float: left;
                        width:24%;
                    }
                    .Phone{
                        float: left;
                        width:44%;
                        border: none;
                        outline: none;
                   }
                   .el-input__inner{
                        border:1px solid #fff;
                   }
                    .LoginBtn{
                        width:100%;
                        border-radius: 30px;
                        background: #ee4239;
                        color:#fff;
                        margin-top: 60px;
                        font-weight: bold;
                   }
                   .el-checkbox__label{
                       font-size: 13px;
                   }
                   .ForgetPassword{
                       font-size: 13px;
                       color:#ee4239;
                   }
                   .Return{
                       margin-top: 80px;
                   }
               }
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
