<template>
  <div>
     <div class="title">
       <span>元器件新建申请表</span>
     </div>
     <div class="formbox">
        <el-form :inline="true"  :rules="rules" ref="ruleForm" label-width="100px">
          <h4><i class="fa fa-plug" aria-hidden="true"></i>&nbsp;器件信息</h4>
          <el-form-item label="器件名称：" prop="partName">
            <el-input v-model="applyData.partName" :disabled="sDisable" ></el-input>
          </el-form-item>
          <br>
          <el-form-item label="封装形式：">
            <el-input v-model="applyData.packageType" :disabled="sDisable" ></el-input>
          </el-form-item>
          <br>
          <el-form-item label="器件描述：">
            <el-input style="width:300px;" :disabled="sDisable" v-model="applyData.remark" type="textarea" >
            </el-input>
          </el-form-item>
        </el-form>
        <el-form :inline="true"  label-width="100px">
          <h4><i class="fa fa-id-badge" aria-hidden="true"></i>&nbsp;客户信息</h4>
          <el-form-item label="客户名称：">
            <el-input v-model="applyData.userName" :disabled="sDisable"></el-input>
          </el-form-item>
          <br>
          <el-form-item label="电话：">
            <el-input v-model="applyData.phone" :disabled="sDisable" ></el-input>
          </el-form-item>
          <br>
          <el-form-item label="邮箱：">
            <el-input v-model="applyData.email" :disabled="sDisable" type="text" >
            </el-input>
          </el-form-item>
        </el-form>
        <div style="clear:both"></div>
     </div>
      <div class="pdf" @click="lookAttachment()" ><el-button>预览附件</el-button></div>
  </div>
</template>

<script>
import {
  ApplyDetail
} from "@/api/flow";
export default {
  props:['sDis'],
  data(){
    return{
     sDisable:true,
     processInstanceId:"",
     applyData:{},
     rules: {
        partName: [
          { required: true, message: "请输入器件名称", trigger: "blur" }
        ],
        upload: [
          { required: true, message: "请选择上传文件", trigger: "change" }
        ]
      },
     processKey:'',
     dataFile:'',
     fileList: [],
    }
  },
  methods:{
    readdata(){
       ApplyDetail({applyProcessKey:this.processInstanceId}).then(res =>{
         console.log(res);
         this.applyData=res.data;
         console.log(res.data.id);
         this.$emit('childByValue',res.data.id);
       })
    },
    lookAttachment(){
      window.open("http://"+window.location.host+'/deehow-CMS-Web/public/file/view?filePath='+this.applyData.dataSheet,"_blank",'PDF');
    },
    
  },
  mounted(){
    this.processInstanceId=this.$route.query.processInstanceId;
    this.readdata();
    // console.log(this.$route.query.processInstanceId)
    
  }
}
</script>

<style lang="scss" scoped>
.title{
  width:100%;
  height:50px;
  line-height: 34px;
  border-bottom:1px solid #ccc;
  font-size: 16px;
}
.el-form{
  width:50%;
  float: left;
  h4{
    margin:10px 0;
    i{
      color:#f8524f;
    }
  }
  .el-input,.textarea{
    width:300px;
  }
}
.formbox{
  padding:10px 100px;
  border-bottom: 1px solid #ccc;
}
.upload{
  margin: 30px 0 0 100px;
}
.pdf{
  margin-top:30px;
  font-size: 16px;
  cursor: pointer;
}
</style>
