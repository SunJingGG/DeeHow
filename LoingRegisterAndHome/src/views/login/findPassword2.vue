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
            <div class="Company">
             <el-table :data="tableData" :show-header="false" style="width: 100%">
               <el-table-column prop="company" width="200px"></el-table-column>
               <el-table-column prop="symble"></el-table-column>
             </el-table>
            </div>
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
               .Company{
                   width:80%;
                   margin:0 auto;
               }
               .el-table{
                   margin-top: 2vh;
               }
               .el-table_1_column_2  .cell{
                   color:#ee4239;
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
          tableData: [{
            company: '北京畅哲科技有限公司',
            symble: '重置密码'
          }, {
            company: '北京畅哲科技有限公司',           
            symble: '重置密码'
          }]
        }
      }
    }
</script>
