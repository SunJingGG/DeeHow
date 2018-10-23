<template>
  <div class="addOrderContainer">
    <div class="addOrderBox">
         <el-form label-width="90px" :inline="true" class="demo-form-inline">
            <el-form-item label="企业名称:">
              <el-select placeholder="请选择企业名称" v-model="unitId">
                <el-option 
                v-for="item in unitList"
                  :key="item.id"
                  :label="item.unitName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="优惠方案:">
              <el-select placeholder="请选择优惠方案" v-model="preferentialId" v-on:change="changePreferential">
                <el-option 
                  v-for="item in preferentialList"
                  :key="item.id"
                  :label="item.preferentialTitle"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="手机号:">
              <el-input v-model="phone"></el-input>
            </el-form-item>
            <br>
             <el-form-item  label-width="100px" label="成员名额：">
                  <div class="block">
                    <el-slider v-model="users"
                    show-input>
                    </el-slider>
                </div>
            </el-form-item>
            <br>
            <el-form-item  label-width="100px" label="购买年限：">
                  <el-radio-group v-model="years">
                        <el-radio  :label="1">1年</el-radio>
                        <el-radio  :label="2">2年</el-radio>
                        <el-radio  :label="3">3年</el-radio>
                        <el-radio  :label="4">4年</el-radio>
                        <el-radio  :label="5">5年</el-radio>
                        <el-radio  :label="6">6年</el-radio>
                  </el-radio-group>
            </el-form-item>
            <br>
            <el-form-item  label-width="100px" label="价格：" class="sum">          
                        <b><span>{{price}}</span>/人/月x<span>{{years*12}}</span>个月x<span>{{users}}</span>人=<span>{{price*years*12*users}}</span>元 </b>                            
            </el-form-item>
         </el-form>
         <div class="orderBtn">
                <span>总计：<b>{{price*years*12*users}}</b>元</span>
                <el-button round type="primary" @click="AddOrders">确认</el-button>
                <el-button round type="primary">取消</el-button>
            </div>
    </div>
  </div>
</template>
<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #fff;
$light_gray: #eee;
.addOrderContainer {
  .addOrderBox {
     .el-form {
       margin-top: 40px;
       width:74%;
       .el-input{
         width:300px;
       }
       .el-slider{
        width:600px;
       }
       .el-select{
        width:300px;
       }
       .el-radio-group{
         width:600px;
       }
       .sum{
         width:500px;
       }
     }
     .orderBtn{
       width:96%;
       height:100px;
       line-height: 100px;
       border:1px solid #ccc;
       border-right: 0;
       border-left: 0;
       margin-top: 100px;
       text-align: right;
       b{
         color:#ee4239;
         font-size: 20px;
       }
       span{
         margin-right: 20px;
       }
     }
  } 
}
</style>

<script>
import { addorders,getUnitList,getOrderMessage} from "@/api/order";
export default {
  data() {
    return {
       phone:'',   
       users:0,
       years:0, 
       preferentialList:[],
       preferentialId:'',
       price:0,
       unitList:[],
       unitId:"", 
    };
  },
  methods: {
    AddOrders() {
      let formdata=new Object();
      formdata.phone=this.phone;
      formdata.personNum=this.users;
      formdata.sum=this.price*this.users*this.years*12;
      formdata.validityTime=this.years;
      formdata.unitId=this.unitId;
      formdata.preferentialId=this.preferentialId;
      addorders(formdata).then(res => {
        console.log(res);
        if (res.httpCode == 200) {
             this.$message({
                type: "success",
                message: "添加成功"
              });     
            } else {
          }	
      }).catch(err=>{
        console.log(err)
      });
    },
    OrderMessage(){
         getOrderMessage({}).then(res => {
           console.log(res);
           if(res.data.length>0){
                this.preferentialList=res.data;
           }else{
              
           }
         })
       },   
   changePreferential(val){
        let obj = {};
            obj = this.preferentialList.find(item=>{
                return item.id === val;
            });
            this.price=obj.price;
        console.log(obj);
       },
        getunit(){
         getUnitList({}).then(res => {
           console.log(res);
           if(res.data.length>0){
                this.unitList=res.data;
           }else{
              
           }
         })
       },   
  
  },
  mounted() {
    this.OrderMessage();
    this.getunit();
  }
};
</script>
