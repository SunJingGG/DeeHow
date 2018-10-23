<template>
  <div class="LoginContainer">
     <div class="SuitBox">
         <div class="Suit" v-for="item in list" :key='item.index'>
             <div class="SuitTop">{{item.preferentialTitle}}</div>
             <div class="SuitMiddle">
                 <div class="price price4"><span>￥{{item.price}}</span>/人/月</div>
                 <router-link :to="{path:'/subOrder', query:{id:item.id,price:item.price,preferentialTitle:item.preferentialTitle,name:name,code:code}}">
                    <el-button round >当前版本</el-button>
                 </router-link>
             </div>
             <div class="SuitBottom">
                <ul v-for="mode in item.modelList" :key='mode.index'>
                    <li>{{mode.modelName}}</li>
                    <li>{{mode.desc}}</li>
                </ul>
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
    padding-top:40px;
    .SuitBox{
        width:800px;
        margin:0 auto;
        .Suit{
            width:180px;
            background: #fff;
            border:1px solid #000;
            float: left;
            margin:10px;
            text-align: center;
            .SuitTop{
                height:50px;
                line-height: 50px;
                color:#aaa;
                font-size: 18px;
                border-bottom: 1px solid #ccc;
            }
            .SuitMiddle{
                height:130px;
                border-bottom: 1px solid #ccc;
                .price{
                    font-size: 16px;
                    margin-top: 40px;
                }
                .price1{
                   color:#3fbad7;
                }
                .price2{
                   color:#23d6bc;
                }
                .price3{
                   color:#ee4239;
                }
                .price4{
                   color:#3873a5;
                }
                .el-button{
                    width:120px;
                    height:30px;
                    background: #ffc92b;
                    color:#fff;
                    margin-top: 20px;
                    border: 1px solid #ffc92b;
                }
            }
            .SuitBottom{
                height:300px;
                padding-top: 20px;
                color:#aaa;
                li{
                    margin-top: 5px;
                }
            }
        }     
    }
}

</style>


<script>
import {
    getOrderMessage
} from "@/api/order";
export default {
     data() {
      return {
            list:[],
            name:'',
            code:'',
      }
    },
    methods:{
       OrderMessage(){
         getOrderMessage({}).then(res => {
           console.log(res);
           if(res.data.length>0){
                this.list=res.data;
                this.name=res.unitName;
                this.code=res.unitCode;
           }else{
              
           }
         })
       },    
    },
    mounted(){
          this.OrderMessage();
       },
  }
</script>
