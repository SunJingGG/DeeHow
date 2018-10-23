<template>
  <div class="clientContainer">
    <div class="clientBox">
         <el-form label-width="110px" :inline="true" class="demo-form-inline">
            <el-form-item label="企业名称:" class="words">
               <span>{{message.unitName}}</span>
            </el-form-item>
            <el-form-item label="客户专员姓名:" class="words">
               <span>{{message.userName}}</span>
            </el-form-item>
            <br>
            <el-form-item label="客户专员电话:" class="words">
              <span>{{message.phone}}</span>
            </el-form-item>
            <br>
            <el-form-item label="用户手机号:">
              <el-input v-model="phone"></el-input>
            </el-form-item>
            <br>
             <el-form-item  label-width="120px" label="成员名额：">
                  <div class="block">
                    <el-slider v-model="users"
                    show-input>
                    </el-slider>
                </div>
            </el-form-item>
            <br>
            <el-form-item  label-width="120px" label="购买年限：">
                  <el-radio-group v-model="years">
                        <el-radio  :label="1">1年</el-radio>
                        <el-radio  :label="2">2年</el-radio>
                        <el-radio  :label="3">3年</el-radio>
                        <el-radio  :label="4">4年</el-radio>
                        <el-radio  :label="5">5年</el-radio>
                        <el-radio  :label="6">6年</el-radio>
                  </el-radio-group>
            </el-form-item>
         </el-form>
          <div class="orderBtn">
                <el-button round type="primary" @click="AddClient">确认</el-button>
                <el-button round type="primary">取消</el-button>
            </div>
    </div>
  </div>
</template>
<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #fff;
$light_gray: #eee;
.clientContainer {
  .clientBox {
     .el-form {
       margin-top: 40px;
       margin-left:30px;
      //  width:74%;
      .el-form-item {
        span{
          display: inline-block;
          float:left;
          width:300px;
          border:1px solid #ccc;
          border-radius: 5px;
          padding-left: 10px;
        }
      }
       .el-input{
         width:300px;
       }
       .el-slider{
        width:550px;
       }
       .el-select{
        width:300px;
       }
       .el-radio-group{
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
import {addClient,getClient} from "@/api/base";
export default {
  data() {
    return {
       phone:'',   
       users:0,
       years:0, 
       List:[],
       message:{},
       modelIdList:[],
    };
  },
  methods: {
    AddClient() {
      let formdata=new Object();
      formdata.phone=this.phone;
      formdata.personNum=this.users;
      formdata.validityTime=this.years;
      this.modelIdList.push(this.$route.query.modelId);
      formdata.modelIdList=this.modelIdList;
      addClient(formdata).then(res => {
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
    GetClient(){
       getClient({}).then(res => {
         console.log(res);
         this.message=res.data;
       })
    }
  },
  mounted() {
    this.GetClient();
    console.log(this.$route.query.modelId);
  }
};
</script>
