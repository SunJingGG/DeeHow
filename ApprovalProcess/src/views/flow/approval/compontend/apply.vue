<template>
  <div>
     <div class="title">
       <span>元器件新建申请表</span>
     </div>
     <div class="formbox">
        <el-form :inline="true" :model="form" :rules="rules" ref="ruleForm" label-width="100px">
          <h4><i class="fa fa-plug" aria-hidden="true"></i>&nbsp;器件信息</h4>
          <div style="clear:both"></div>
          <el-form-item label="器件名称：" prop="partName">
            <el-input v-model="form.partName" :disabled="sDisable" placeholder="请输入器件名称"></el-input>
          </el-form-item>
          <br>
          <el-form-item label="封装形式：">
            <el-input v-model="form.packageType" :disabled="sDisable" placeholder="请输入封装形式"></el-input>
          </el-form-item>
          <br>
          <el-form-item label="器件描述：">
            <el-input style="width:300px;" :disabled="sDisable" v-model="form.remark" type="textarea" placeholder="请输入器件描述">
            </el-input>
          </el-form-item>
        </el-form>
        <el-form :inline="true" :model="form" label-width="100px">
          <h4><i class="fa fa-id-badge" aria-hidden="true"></i>&nbsp;客户信息</h4>
          <div style="clear:both"></div>
          <el-form-item label="客户名称：">
            <el-input v-model="form.userName" :disabled="sDisable" placeholder="请输入客户名称"></el-input>
          </el-form-item>
          <br>
          <el-form-item label="电话：">
            <el-input v-model="form.phone" :disabled="sDisable" placeholder="请输入电话"></el-input>
          </el-form-item>
          <br>
          <el-form-item label="邮箱：">
            <el-input v-model="form.email" :disabled="sDisable" type="text" placeholder="请输入邮箱">
            </el-input>
          </el-form-item>
        </el-form>
        <div style="clear:both"></div>
     </div>
      <div class="upload"><el-upload
            class="upload-demo"
            drag
            action="123"
            multiple
             :before-remove="beforeRemove"
             :on-change="handleChange"
             :auto-upload="false"
              accept=".pdf"
             :on-preview="handlePreview"
             :on-remove="handleRemove" 
             :limit="1" 
             :on-exceed="handleExceed" 
             :file-list="fileList"
             :model="form" :rules="rules"
             prop="upload">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传pdf文件，且不超过500kb</div>
          </el-upload></div>
           <div style="float:right;margin-right:20px">
          <el-button type="danger" @click="readdata()">确 认</el-button>
          <el-button type="danger" plain="">取 消</el-button>
      </div>
  </div>
</template>

<script>
import {
  ApplyPart,
  startflow
} from "@/api/flow";
export default {
  props:['sDis'],
  data(){
    return{
      sDisable:false,
      form:{
       partName: "",
       packageType: "",
       remark:"",
       userName:"",
       phone:"",
       email:"",
       applyProcessKey:'',
     },
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
       startflow({processKey:"partApply"}).then(res =>{
         console.log(res);
           this.form.applyProcessKey=res.processInstanceId;
             this.applypart();
             this.form={};
       })
    },
     handleChange(file, fileList) {
      this.dataFile = file.raw;
    },
    applypart() {
      let param = new FormData();
      for (let x in this.form) {
        param.append(x, this.form[x]);
      }
      param.append("file", this.dataFile);
      ApplyPart(param).then(res => {
        console.log(res);
        if (res.httpCode == 200) {
          this.show = false;
          this.param = {};
          this.$message({
            type: "success",
            message: "申请成功"
          });
        } else {
        }
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
  },
  mounted(){
    console.log(this.sDis)
    // if(this.sDis=='1'){
    //   this.sDisable = false;
    // }else{
    //   this.sDisable = true;
    // }
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
  text-align: center;
  h4{
    float: left;
    margin:10px 6%;
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
