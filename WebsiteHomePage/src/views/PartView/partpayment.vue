<template>
  <div class="paymentcontainer">
     <div v-show="regSteps==0" class="payment">
            <img src="../../assets/PartView/partlogo.png" alt="">
            <h3>请选择支付方式</h3>
          <div class="middle">
              <span>支付宝</span>
              <span>微信</span>
              <span>银行卡</span>
          </div>
          <el-button @click="todownload()">完成</el-button>
     </div>
     <div v-show="regSteps==1" class="free">
       <img src="../../assets/PartView/partlogo.png" alt="">
            <h3>请选择支付方式</h3>
          <div class="middlefree">
              <span>免费</span>
          </div>
          <el-button @click="todownload()">完成</el-button>
     </div>
     <div v-show="regSteps==2" class="download">
        <img src="../../assets/PartView/partlogo2.png" alt="">
            <h3>请选择下载格式</h3>
          <div class="middleload">
              <ul @click="todownloadfinish()">
                <li><a>Orcad/Allegro</a></li>
                <li><a>Orcad/Allegro</a></li>
                <li><a>Orcad/Allegro</a></li>
                <li><a>Orcad/Allegro</a></li>
                <li><a>Orcad/Allegro</a></li>
              </ul>
          </div>
     </div>
     <div v-show="regSteps==3" class="loadfinish">
       <img src="../../assets/PartView/partlogo2.png" alt="">
            <h3>下载完成！</h3>
          <div class="middlefinish">
          <el-button class="Btns">学习如何建库</el-button>            
          </div>
          <img src="../../assets/PartView/product.png" alt="">
          <br>
          <el-button class="Btns">询价</el-button> 
     </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      regSteps:0,
      aceptid:'',
    }
  },
  methods:{
    todownload(){
      this.regSteps=2;
    },
     todownloadfinish(){
      this.regSteps=3;
    }
  },
  mounted(){
     this.aceptid=this.$route.query.id;
     console.log(this.aceptid);
     if(this.aceptid==0){
        this.regSteps=0;
     }else{
       this.regSteps=1;
     }
  }
}
</script>

<style lang="scss" scoped>
   .paymentcontainer{
     position: absolute;
     width:100%;
     height: 100%;
     >div{
       width:700px;
       height:400px;
       background: #f7f7f7;
       position: absolute;
       top:50%;
       left:50%;
       margin-left: -350px;
       margin-top: -200px;
       text-align: center;
      //  transform: translate(-50%, -50%);
     }
     .payment,.free,.download,.loadfinish{     
       padding-top: 10px;  
        img{
          width:280px;
        }
        h3{
          color: #666;
          }
        .middle,.middlefree{
        width:100%;
        padding: 10px 20px 0 20px;
         span{
          display: inline-block;
          width:180px;
          height:150px;
          line-height: 150px;
          font-size: 18px;
          background: #fff;
        }
      }
      .middle span{
        float: left;
        margin-left: 30px;
      }
      .middleload{
       text-align:center;
       ul{
         width:200px;
         margin:0 auto;
         padding-top: 15px;
       li{
        width:100%;
        height:34px;
        line-height: 34px;
        background: #ff791b;
        color:#fff;
        margin-top: 10px;
        border-radius:6px;
        }
       }
      }
      .middlefinish{
          width:100%;
          height:100px;
          line-height: 100px;
          border-bottom: 1px solid #ccc;
          text-align: center;        
      }
      .el-button{
        width:200px;
        height:50px;
        background: #ff791b;
        color: #fff;
        margin-top: 30px;
        font-size: 16px;
      }
      .Btns{
        height:40px;
        margin-top: 10px;
      }
      }     
   }
</style>