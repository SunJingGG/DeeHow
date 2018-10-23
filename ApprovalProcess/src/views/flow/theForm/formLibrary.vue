<template>
  <div>
    <div class="title">
      <span>表单库</span>
      <div>
      <!-- <el-button type="primary" @click="addform">添加表单</el-button> -->
      <span>查看全部》</span>
      </div>
    </div>
    <div class="listbox">
      <div class="list hvr-glow" v-for="(item,index) in formList" :key="index" @click="toUrl(item)">
        <div>
          <img :src="DEEHOWBASEURL+'/deehow-CMS-Web/public/file/view?filePath='+item.formLogo" alt="">
          <!-- this.form.rootUrl+this.form.formUrl -->
        </div>
        <div>
          <span>{{item.formName}}</span>
          <!-- <span>{{item.formSign}}</span> -->
          <a>详情></a>
        </div>
      </div>
    </div>
    <!-- <el-dialog title="添加表单" :visible.sync="dialogFormVisible" width="45%">
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="表单名称：" prop="formName">
          <el-input v-model="form.formName"></el-input>
        </el-form-item>
        <el-form-item label="表单key：" prop="formSign">
          <el-input v-model="form.formSign"></el-input>
        </el-form-item>
        <el-form-item label="表单URL：" prop="formUrl">
          <el-input v-model="form.formUrl"></el-input>
        </el-form-item>
        <el-form-item label="表单Logo：" prop="formLogo">
          <el-upload
                class="upload-demo"
                action="123"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :on-change="handleChange" 
                :auto-upload="false"
                 accept=".png,.jpg"
                :limit="1"
                :on-exceed="handleExceed"
                :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
        </el-form-item>
         <el-form-item label="备注：" prop="remark">
          <el-input v-model="form.remark" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onSubmit">确 认</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog> -->
    <div>
     
    </div>
    
  </div>
</template>

<script>
import {
  flowAddForm,
  flowFormList
} from "@/api/flow";
export default {
  data() {
    return {
      fullscreenLoading: false,
      dialogFormVisible: false,
      fileList:[],
      dataFile:'',
      formList:[],
      search: {
        unitName: "",
        phone: ""
      },
      rules: {
        formName: [
          { required: true, message: "请输入表单名称", trigger: "blur" }
        ],
        formSign: [
          { required: true, message: "请输入表单key", trigger: "change" }
        ],
         formLogo: [
          { required: true, message: "请输入表单url", trigger: "change" }
        ],
         formUrl: [
          { required: true, message: "请上传logo", trigger: "change" }
        ]
      },
      form: {
        formName: "",
        formSign: "",
        formLogo: "",
        formUrl: "",
        remark: "",
        ootUrl:'',
      },
    };
  },
  methods: {
    addform(){
      this.dialogFormVisible = true;
    },
    onSubmit(){
      let param = new FormData();
      for (let x in this.form) {
        param.append(x, this.form[x]);
      }
      param.append("file", this.dataFile);//传文件
      flowAddForm(param).then(res=>{
        console.log(res);
        if (res.httpCode == 200){
           this.$message.success("操作成功");
           this.dialogFormVisible = false;
           this.showLists();
        }else{

        }           
      })
    },
    toUrl(item){
      this.$router.push({ name: '被打回',params:item})
    },
    showLists(){
      flowFormList({id:this.form.formUrl}).then(res =>{
        this.formList=res.data;
        console.log(this.form.formUrl);
      })
    },
     handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
       handleChange(file, fileList) {
        this.dataFile = file.raw;
      },
  },
  mounted() {
    this.showLists();
  }
};
</script>

<style lang="scss" scoped>
.title {
  width: 100%;
  height: 50px;
  line-height: 50px;
  margin-top: -20px;
  border-bottom: 1px solid #ccc;
  font-size: 14px;
  >div{
    float: right;
    margin-right: 50px;
    span{
      margin-left: 20px;
    }
  }
}
.el-dialog{
  .el-form{
    border-top: 1px solid #ccc;
    margin-top: -20px;
    padding: 30px 50px;
  }
}
.listbox{
  padding:20px 30px;
}
.list{
  height:80px;
  width:210px;
  padding-top:14px;
  float: left;
  margin:30px 10px 30px 40px;
  background: #f2f2f2;
  img{
    width:50px;
  }
  >div:first-child{
    float: left;
  }
  >div:last-child{
    padding-top: 8px;
    width:110px;
    float: left;
    margin-left: 10px;
    span:first-child{
      display: block;
    }
    a{
      color:#48a2ff;
      float: right;
      font-size: 12px;
    }
  }
}
</style>

