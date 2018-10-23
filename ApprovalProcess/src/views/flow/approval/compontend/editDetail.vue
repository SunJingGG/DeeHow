<template>
  <div>
    <div class="title">
      <span>元器件修改申请表</span>
    </div>
    <div class="middle">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="modified" label="修改项" width="180">
        </el-table-column>
        <el-table-column prop="originalValue" label="原值" width="180">
        </el-table-column>
        <el-table-column prop="modifiedValue" label="修改值">
        </el-table-column>
      </el-table>
    </div>
    <div class="pdf" @click="lookAttachment()" ><el-button>预览附件</el-button></div>
  </div>
</template>

<script>
import {
  editDetail
} from "@/api/flow";
export default {
  props:['sDis'],
  data(){
    return{
     sDisable:true,
     processInstanceId:"",
     applyData:{},
     tableData: [],
     processKey:'',
     dataFile:'',
     fileList: [],
    }
  },
  methods:{
    readdata(){
       editDetail({applyProcessKey:this.processInstanceId}).then(res =>{
         //console.log(res);
         this.tableData=res.data.detailList;
         console.log(this.tableData);
         this.$emit('childByValue',res.data.id);
       })
    },
    lookAttachment(){
      window.open("http://"+window.location.host+'/deehow-CMS-Web/public/file/view?filePath='+this.tableData.dataSheet,"_blank",'PDF');
    }, 
  },
  mounted(){
    this.processInstanceId=this.$route.query.processInstanceId;
    this.readdata();
    console.log(this.$route.query.processInstanceId)
    
  }
}
</script>

<style lang="scss" scoped>
.title {
  width: 100%;
  height: 50px;
  line-height: 34px;
  border-bottom: 1px solid #ccc;
  font-size: 16px;
}
.middle {
  padding-top: 20px;
  > .el-button {
    float: right;
    margin-right: 50px;
  }
  .el-form {
    width: 50%;
    float: left;
  }
}
.formbox {
  padding: 10px 100px;
  border-bottom: 1px solid #ccc;
}
.upload {
  margin: 30px 0 0 20px;
}
.pdf {
  margin-top: 30px;
  font-size: 16px;
  cursor: pointer;
}
</style>
