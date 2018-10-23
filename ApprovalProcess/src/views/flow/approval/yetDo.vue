<template>
  <div>
    <div>
      <el-form :inline="true" :model="search" class="demo-form-inline">
        <el-form-item label="任务名称：">
          <el-input v-model="search.taskName" placeholder="请输入任务名称"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" icon="el-icon-search" @click="showwaitdolist()">搜索</el-button>
        </el-form-item>
        <!-- <el-form-item label="" style="float:right">
          <el-button type="success" @click="submitApply()">
            <i class="fa fa-check-square-o" aria-hidden="true"></i>&nbsp;提交申请</el-button>
        </el-form-item> -->
      </el-form>
    </div>
    <!-- <div class="list-group">
      <a href="#" class="list-group-item">用div >项目</a>
      <a href="#" class="list-group-item">待办</a>
      <a href="#" class="list-group-item">需求</a>
      <a href="#" class="list-group-item active">任务</a>
      <a href="#" class="list-group-item">Bug</a>
      <a href="#" class="list-group-item">用例</a>
    </div> -->
    <ul class="list-group">
      <a class="list-group-item showhide" v-for="(item,index) in tableData" :key="index" @click="toUrl(item)">
        
        <span class="label label-dot label-warning" style="margin-right:20px" v-if="item.lookState == '1'"></span>
        <span class="label label-dot label-success" style="margin-right:20px" v-if="item.lookState == '2'"></span>
        {{item.formName}}
        <div class="pull-right spstatus1" >
          <span class="user ellipsis">{{item.procStsrtName}}</span>
          <span class="date">{{item.procStsrtTime}}</span>
        </div>
        <div class="pull-right spstatus">
          <span class="user ellipsis">[{{item.taskState|taskState}} : {{item.actName}}
             ]
          </span>
        </div>
      </a>
    </ul>
    <div>
      <span class="label label-dot label-warning"></span> 未查看
        <span class="label label-dot label-success" style="margin-left:20px"></span> 已查看
    </div>
    <div class="block" style="margin-top:20px;">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="search.current" :page-sizes="[10, 20, 30, 120]" :page-size="search.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <el-dialog title="选择表单" :visible.sync="dialogFormVisible" width="650px">
      <div class="listbox">
        <div class="list" v-for="(item,index) in formList" :key="index">
          <div>
            <img :src="DEEHOWBASEURL+'/deehow-CMS-Web/public/file/view?filePath='+item.formLogo" alt="">
            <!-- this.form.rootUrl+this.form.formUrl -->
          </div>
          <div>
            <span>{{item.formName}}</span>
            <router-link :to="{path:'/FlOWS/single/addForm'}">
              <a>使用></a>
            </router-link>
          </div>
        </div>
        <div style="clear:both"></div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { waitDoList, flowFormList , readQueryProcessTask} from "@/api/flow";
export default {
  data() {
    return {
      fullscreenLoading: false,
      dialogFormVisible: false,
      total: 0,
      search: {
        taskName: "",
        type:'2',
        taskState:'0',
        size: 10,
        current: 1
      },
      form: {
        formUrl: ""
      },
      tableData: [],
      formList: []
    };
  },
  methods: {
    showwaitdolist() {
      // waitDoList(this.search).then(res => {
      //   this.tableData = res.data;
      //   this.total = res.total;
      //   console.log(this.tableData);
      // });
      readQueryProcessTask(this.search).then(res=>{
        this.tableData = res.data;
        this.total = res.total;
      }).catch(err=>{
        console.log(err)
      })
    },
    submitApply() {
      this.dialogFormVisible = true;
      flowFormList().then(res => {
        this.formList = res.data;
        console.log(this.formList);
      });
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSizeChange(val) {
      this.search.size = val;
      this.showwaitdolist();
    },
    handleCurrentChange(val) {
      this.search.current = val;
      this.showwaitdolist();
    },
    toUrl(item){
      item.flag = '已审'
      this.$router.push({ name: '审批主页',params:item})
    },
    readData(){
      readQueryProcessTask({type:"1"}).then(res=>{
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })
    }
  },
  mounted() {
    this.showwaitdolist();
    // this.readData();
  },
  filters:{
    taskState(state){
      if(state == 0){
        return "待审批"
      }else if(state == '1'){
        return "已办"
      }else if(state == '2'){
        return "已打回"
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.ellipsis,
.date {
  margin-right: 8px;
  color: #999;
  display: inline-block;
  vertical-align: top;
}
.spstatus{
  display: none;
}
.showhide {
  &:hover{
    .spstatus{
      display: inline-block
    }
    .spstatus1{
      display: none
    }
  }
}
</style>

