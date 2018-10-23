<template>
  <div class="LoginContainer">
     <div class="LoginHeader">
          <div class="LogoPng"><img src="../../assets/register/logonew.png" alt="logo"></div>
          <div class="CodePng"><img src="../../assets/login/codesmall.jpg" alt="code"><span>扫描下载APP</span></div>
     </div>
     <div class="LoginMain">
     <transition  name="fade-transform" mode="out-in">
      <router-view></router-view>
    </transition>
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
          height:50px;   
          display: inline-block;
          margin-left: 5vw;
          margin-top: 15px;
          cursor: pointer;
          img{
              width:100%;
             }
           }
          .CodePng{
              width:160px;
              height:60px;
              float: right;
              margin-right: 18vw;
              margin-top: 12px;
              img{
                  width:38%;
              }
              span{
                  display: inline;
                  float:right;
                  margin-right:8px;
                  margin-top: 40px;
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
