<template>
  <div>
     <div class="banner">
        <img class="img1" src="../../assets/build/build2.png" alt="">
        <h1>通过简单地计算机视觉更快的构建电路板</h1>
        <img class="img2" src="../../assets/build/build.png" alt="">
     </div>
     <div class="main">
        <p>通过使用简单的计算机视觉和OCR在几分钟内完成构建，可以节省数小时创建原理图符号和PCB封装。<span>全部免费。</span> </p>
        <h1>怎么运行的</h1>
     </div>
  </div>
</template>

<script>
export default {
   data(){
     return{

     }
   },
   methods:{

   },
   mounted(){

   }
}
</script>

<style lang="scss" scoped>
   .banner{
     text-align: center;
     width:100%;
     height:380px;
     padding-top: 70px;
     background: url(../../assets/build/buildbanner.png) no-repeat center center;
     background-size: cover;
     .img1{
       width:300px;
     }
     .img2{
       width:500px;
       margin-top: 10px;
     }
     h1{
       color: #fff;
     }
   }
   .main{
     text-align: center;
     p{
       font-size: 18px;
       width:600px;
       margin:0 auto;
       margin-top: 10px;
       span{
         color: #ff791b;
       }
     }
     h1{
       margin-top: 50px;
       color: #666;
     }
   }
</style>
