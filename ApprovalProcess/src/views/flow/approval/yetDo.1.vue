<template>
  <div>
    <div class="title">
      <span>已办审批</span>
    </div>
    <div>
      <el-form :inline="true" :model="search" class="demo-form-inline">
        <el-form-item label="任务名称：">
          <el-input v-model="search.taskName" placeholder="请输入任务名称"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="danger" icon="el-icon-search" @click="showhavedolist()">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="tableData" style="width: 100%" border v-loading="fullscreenLoading" element-loading-text="拼命加载中">
      <el-table-column prop="formName" label="主题">
      </el-table-column>
      <el-table-column prop="name" label="任务名称">
      </el-table-column>
       <el-table-column prop="createTime" label="任务创建时间">
      </el-table-column>
       <el-table-column prop="owner" label="流程发起人">
      </el-table-column>
       <el-table-column prop="ownTime" label="流程发起时间">
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="120">
        <template slot-scope="scope"> 
          <router-link :to="{path:'/FlOWS/single/detailMessage',query:{processInstanceId:scope.row.processInstanceId,taskId:scope.row.taskId,processKey:scope.row.processKey}}"> 
          <el-button type="danger" icon="el-icon-star-on">详情</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
          <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="search.current" :page-sizes="[10, 20, 30, 120]" :page-size="search.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
          </div>
  </div>
</template>

<script>
import {
  HaveDone
} from "@/api/flow";
export default {
  data() {
    return {
      fullscreenLoading: false,
      dialogFormVisible:false,
      total: 0,
      search: {
        taskName: "",
        size: 10,
        current:1,
      },
       form: {
        formUrl: "",
      },
      tableData: [],
      formList:[],
    };
  },
  methods: {
    showhavedolist(){
       HaveDone(this.search).then(res =>{
         console.log(res);
          this.tableData=res.data;
          this.total = res.total
          console.log(this.tableData);
       })
    },
    detailMessage(index, row){
       this.dialogFormVisible=true;

    },
     handleSizeChange(val) {
      this.search.size = val;
      this.showhavedolist();
    },
    handleCurrentChange(val) {
      this.search.current = val;
      this.showhavedolist();
    }
  },
  mounted() {
     this.showhavedolist();
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

