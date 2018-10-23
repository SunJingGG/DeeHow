<template>
  <div>
    <div class="title">
      <span>流程设计</span>
      <el-button type="primary" @click="designonline()" icon="el-icon-plus">在线流程设计</el-button>
    </div>
    <div>
      <el-form :inline="true" :model="search" class="demo-form-inline">
        <el-form-item label="流程名称：">
          <el-input v-model="search.name" placeholder="请输入流程名称"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" icon="el-icon-search" @click="showflowdesignlist()">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="tableData" style="width: 100%" border v-loading="fullscreenLoading" element-loading-text="拼命加载中">
      <!-- <el-table-column type="index" label="序号">
      </el-table-column> -->
      <el-table-column prop="name" label="流程名称">
      </el-table-column>
      <el-table-column prop="formName" label="表单名称">
      </el-table-column>
       <el-table-column prop="createTime" label="创建时间">
      </el-table-column>
       <el-table-column prop="version" label="版本号">
      </el-table-column>
       <el-table-column prop="createUser" label="描述">
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="120">
        <template slot-scope="scope"> 
          <router-link :to="{path:'/FlOWS/single/userSet',query:{procDefId:scope.row.procDefId}}">
            <el-button type="primary"><i class="fa fa-gg" aria-hidden="true"></i>&nbsp;设计</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
          <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="search.current" :page-sizes="[10, 20, 30, 120]" :page-size="search.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
          </div>
          <el-dialog title="新建流程" :visible.sync="dialogFormVisible" width="500px">
             <el-form :model="form" :rules="rules">
                  <el-form-item label="流程名称：" label-width="120px" prop="workFlowModelName">
                    <el-input v-model="form.workFlowModelName" placeholder="请选择流程名称">
                    </el-input>
                  </el-form-item>
                  <el-form-item label="类别：" label-width="120px" prop="key">
                    <el-select v-model="form.key" placeholder="请选择流程类别">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.formName"
                          :value="item.formSign">
                        </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="流程描述：" label-width="120px" prop="workFlowDescription">
                    <el-input v-model="form.workFlowDescription" class="word" type="textarea"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="submitForm">确 定</el-button>
                  <el-button type="primary" plain @click="nosubmit">取 消</el-button>
                </div>
         </el-dialog>
  </div>
</template>

<script>
import {
  flowDesignPage,
  flowCreate,
  flowFormListAll,
} from "@/api/flow";
export default {
  data() {
    return {
      fullscreenLoading: false,
      dialogFormVisible:false,
      total: 0,
      procDefId:'',
      search: {
        name: "",
        size: 10,
        current:1,
      },
       rules: {
        workFlowModelName: [
          { required: true, message: "请输入流程名称", trigger: "blur" }
        ],
        key: [
          { required: true, message: "请选择表单类型", trigger: "change" }
        ],
         workFlowDescription: [
          { required: true, message: "请输入流程描述", trigger: "blur" }
        ],
      },
       form: {
         workFlowModelName:'',
         key:'',
         workFlowDescription:'',
       },
      tableData: [],
      options:[],
      sends:{}
    };
  },
  methods: {
    showflowdesignlist(){
       flowDesignPage(this.search).then(res =>{
          this.tableData=res.data;
          this.total = res.total
          console.log(this.tableData);
       })
    },
    designonline(){
      this.dialogFormVisible=true;
    },
     showLists(){
      flowFormListAll({}).then(res =>{
        this.options=res.data;
        console.log(this.options);
      })
    },
    submitForm(){
      if(this.form.workFlowModelName!=''&&this.form.key!=''&&this.form.workFlowDescription!=''){
          flowCreate(this.form).then(res =>{
         this.sends=res.data;
          //window.location.href="/deehow-BPM-Web/deehow-BPM-Web/modeler.html?modelId=32505&formType=partProcess&presName=bW1tbW1tbW1tbW1tbW0"
          //window.location.href="/deehow-BPM-Web/deehow-BPM-Web/modeler.html?modelId=\''this.sends.modelId'\'&formType=\''this.sends.formType'\'&presName=\''this.sends.presName'\'";
          window.location.href=this.sends.url;
        this.dialogFormVisible=false;   
      })
      }else{
        this.$message.error('请填写信息');
      }
    },
    nosubmit(){
      this.form={};
      this.dialogFormVisible = false
    },
     handleSizeChange(val) {
      this.search.size = val;
      this.showflowdesignlist();
    },
    handleCurrentChange(val) {
      this.search.current = val;
      this.showflowdesignlist();
    }
  },
  mounted() {
     this.showflowdesignlist();
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
  .el-button{
    float: right;
    margin-right: 50px;
    margin-top: 8px;
  }
}
.el-form {
  margin-top: 30px;
}
.block{
  margin-top: 20px;
}
.el-dialog{
  .listbox{
    border-top: 1px solid #ccc;
    margin-top: -20px;
    padding: 20px 30px;
  }
  img{
    width: 50px;
  }
  .el-form{
    padding-top: 20px;
    margin-top: -20px;
    border-top: 1px solid #ccc;
    .word{
      width:300px;
    }
    .el-select,.el-input{
      width: 300px;
    }
  }
  .list{
  width:45%;
  height:80px;
  float: left;
  margin:0 0 20px 20px;
  padding-top: 14px;
  background: #f2f2f2;
  border: 1px solid #ccc;
  img{
    width:50px;
  }
  >div:first-child{
    float: left;
  }
  >div:last-child{
    padding-top: 8px;
    width:150px;
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
}
</style>

