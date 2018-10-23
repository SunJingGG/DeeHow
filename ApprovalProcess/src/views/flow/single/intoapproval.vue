<template>
  <div>
    <div class="title">
      <span>审批</span>
      <router-link :to="{path:'/FLOW/approval/waitDo'}">
        <b>
          <i class="fa fa-times"></i>
        </b>
      </router-link>
      <ul>
        <li @click="pass">
          <i class="fa fa-check-circle"></i>&nbsp;通过</li>
        <li @click="returnBack">
          <i class="fa fa-reply"></i>&nbsp;打回</li>
        <li @click="turn">
          <i class="fa fa-share"></i>&nbsp;转办</li>
        <li @click="send">
          <i class="fa fa-paper-plane"></i>&nbsp;抄送</li>
        <li @click="flowimg">
          <i class="fa fa-line-chart"></i>&nbsp;流程图</li>
        <li @click="history">
          <i class="fa fa-history"></i>&nbsp;审批历史</li>
      </ul>
    </div>
    <div class="message">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="任务名称：">
          <el-input v-model="name" disabled></el-input>
        </el-form-item>
        <el-form-item label="申请人:">
          <el-input v-model="owner" disabled></el-input>
        </el-form-item>
        <el-form-item label="申请日期：">
          <el-date-picker v-model="createTime" disabled>
          </el-date-picker>
        </el-form-item>
      </el-form>
    </div>
    <div v-if="showForm==0">
      <com-apply v-on:childByValue="childByValue"></com-apply>
    </div>
    <div v-else-if="showForm==1">
      <edit-apply v-on:childByValue="childByValue"></edit-apply>
    </div>
    <div v-else-if="showForm==2">
      <look-build v-on:childByValue="childByValue"></look-build>
    </div>
      <div v-else-if="showForm==3">
      <edit-build v-on:childByValue="childByValue"></edit-build>
    </div>
    
    <el-dialog title="通过审批" :visible.sync="dialogPassVisible" width="45%">
      <el-form :model="form" label-width="120px">
        <el-form-item label="通过审批意见：">
          <el-input type="textarea" v-model="message" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="agreeBtn()">确 定</el-button>
        <el-button type="danger" plain @click="dialogPassVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="打回" :visible.sync="dialogReturnBackVisible" width="30%">
      <span class="back">确定打回么？</span>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="disagreeBtn()">确 定</el-button>
        <el-button type="danger" plain @click="dialogReturnBackVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="转办" :visible.sync="dialogTurnVisible" width="45%">
      <el-form :model="form" label-width="120px">
        <el-form-item label="选择执行人：">
          <el-button mini type="danger" @click="chooseUser">点击选择</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer btns">
        <el-button type="danger" @click="dialogTurnVisible = false">确 定</el-button>
        <el-button type="danger" plain @click="dialogTurnVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="选择执行人" :visible.sync="dialogchooseUserVisible" width="60%">
      <div class="users">
        <div class="tree">
          <el-tree :data="data" :default-expand-all="true" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
        </div>
        <div class="table">
          <el-table :data="userTableData" border style="width: 100%" highlight-current-row ref="singleTable" @current-change="handleCurrentChange1">
            <el-table-column type="index" label="序号" width="80px">
            </el-table-column>
            <el-table-column prop="userName" label="姓名">
            </el-table-column>
            <el-table-column prop="account" label="电话">
            </el-table-column>
            <el-table-column prop="email" label="邮箱" width="200px">
            </el-table-column>
          </el-table>
           <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="search.pageNum" :page-sizes="[10, 20, 30, 120]" :page-size="search.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <!-- <router-link :to="{path:'/FLOW/approval/waitDo'}"> -->
        <el-button type="danger" @click="userSure">确 定</el-button>
        <!-- </router-link> -->
        <el-button type="danger" plain @click="dialogchooseUserVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- <el-dialog title="抄送" :visible.sync="dialogSendVisible" width="45%">
               <el-form :model="form" label-width="120px" >
                  <el-form-item label="选择执行人：">
                    <el-button mini type="primary">点击选择</el-button>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="dialogSendVisible = false">确 定</el-button>
                  <el-button @click="dialogSendVisible = false">取 消</el-button>
                </div>
         </el-dialog> -->
    <el-dialog title="流程图" :visible.sync="dialogFlowImgVisible" width="45%">
      <div class="IMG"><img :src="DEEHOWBASEURL+'/deehow-BPM-Web/elib/process_approve/select_process_diagram?taskId='+taskId" alt=""></div>    
    </el-dialog>
    <el-dialog title="审批历史" :visible.sync="dialogHistoryVisible" width="70%">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="taskName" label="任务名称" width="180">
        </el-table-column>
        <el-table-column prop="processAssignees" label="审批人" width="180">
        </el-table-column>
        <el-table-column prop="createTime" label="审批开始时间">
        </el-table-column>
        <el-table-column prop="endTime" label="审批结束时间">
        </el-table-column>
        <el-table-column prop="processAproveAdvice" label="审批意见">
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import comApply from "../approval/compontend/applyDetail";
import editApply from "../approval/compontend/editDetail";
import lookBuild from "../approval/compontend/lookBuild";
import editBuild from "../approval/compontend/editBuild";
import {
  AgreeProcess,
  UpdateApply,
  DisAgreeProcess,
  ProcessHis,
  readDeptTree,
  readUserPage,
  TurnProcess,
  ProcessImg,
  AgreeEditProcess,
  DisAgreeEditProcess,
  agreeDatebase,
  editagreeDatebase
} from "@/api/flow";

export default {
  components: {
    comApply,editApply,lookBuild,editBuild
  },
  data() {
    return {
      showForm:0,
      applyId: "",
      message: "",
      processInstanceId: "",
      taskId: "",
      processKey: "",
      dialogPassVisible: false,
      dialogReturnBackVisible: false,
      dialogTurnVisible: false,
      dialogSendVisible: false,
      dialogFlowImgVisible: false,
      dialogHistoryVisible: false,
      dialogchooseUserVisible: false,
      name: "",
      owner: "",
      createTime: "",
      form: {},
      tableData: [],
      userTableData:[],
      data: [],
      deptId:'',
      userId:'',
      defaultProps: {
        children: "children",
        label: "deptName"
      },
      search: {
        deptId:'',
        pageNum:1,
        pageSize:10,
      },
      userTableData: [],
      currentRow: null,
      total: 0
    };
  },
  methods: {
    childByValue(childByValue) {
      this.applyId = childByValue;
      console.log(this.applyId);
    },
    agreeBtn() {
      let process = new Object();
      process.remark = this.message;
      console.log(this.message);
      process.processInstanceId = this.processInstanceId;
      process.taskId = this.taskId;
      AgreeProcess(process).then(res => {
        //console.log(res);
        if (res.data.processState == "1") {
          //流程审批完成，修改业务数据状态
          if (this.processKey == "partApply") {
            //元器件申请审批流程
            let applyAdd = new Object();
            applyAdd.id = this.applyId;
            applyAdd.status = "3";
            UpdateApply(applyAdd).then(r => {
              console.log(r);
            });
          }else if(this.processKey == "partModifyApply"){
             let applyEdit = new Object();
            applyEdit.id = this.applyId;
            applyEdit.status = "1";
            AgreeEditProcess(applyEdit).then(r => {
              console.log(r);
            });
          }else if(this.processKey == "libraryApply"){//申请入库
             let applybuild = new Object();
            applybuild.id = this.applyId;
            applybuild.status = "6";
            agreeDatebase(applybuild).then(r => {
              console.log(r);
            });
          } else if(this.processKey == "libraryModifyApply"){//修改入库
             let editbuild = new Object();
            editbuild.id = this.applyId;
            editbuild.status = "5";
            console.log(this.applyId);
            editagreeDatebase(editbuild).then(r => {
              console.log(r);
            });
          }
        }
        this.$router.replace({ path: "/FLOW/approval/waitDo" });
      });
    },
    disagreeBtn() {
      let process = new Object();
      process.processInstanceId = this.processInstanceId;
      
      DisAgreeProcess(process).then(res => {
        console.log(res);
        
        if (res.httpCode == "200") {
          if(this.processKey == "partApply"){
             let applyAdd = new Object();
              applyAdd.id = this.applyId;
              applyAdd.status = "4";
              UpdateApply(applyAdd).then(r => {
                console.log(r);
              });
          }else if(this.processKey == "partModifyApply"){
             let applyEdit = new Object();
            applyEdit.id = this.applyId;
            applyEdit.status = "2";
            DisAgreeEditProcess(applyEdit).then(r => {
              console.log(r);
            });
          }else if(this.processKey == "libraryApply"){
             let applybuild = new Object();
            applybuild.id = this.applyId;
            applybuild.status = "7";
            agreeDatebase(applybuild).then(r => {//申请入库同意打回是一个接口
              console.log(r);
            });
          }else if(this.processKey == "libraryModifyApply"){
             let editbuild = new Object();
            editbuild.id = this.applyId;
            editbuild.status = "6";
            editagreeDatebase(editbuild).then(r => {//同意打回是一个接口
              console.log(r);
            });
          }
        }
        this.$router.replace({ path: "/FLOW/approval/waitDo" });
      });
    },

    pass() {
      this.dialogPassVisible = true;
    },
    returnBack() {
      this.dialogReturnBackVisible = true;
    },
    turn() {
      this.dialogTurnVisible = true;
    },
    send() {
      this.dialogSendVisible = true;
    },
    flowimg() {
      this.dialogFlowImgVisible = true;
      // ProcessImg({taskId:this.taskId}).then(res =>{
      //   console.log(res);
      // })
    },
    chooseUser() {
      this.dialogchooseUserVisible = true;
      this.readData();
      this.readUser();
    },
    history() {
      let process = new Object();
      process.processInstanceId = this.processInstanceId;
      ProcessHis(process).then(res => {
        console.log(res);
        this.tableData = res.data;
        this.dialogHistoryVisible = true;
      });
    },
    readData() {
      readDeptTree({}).then(res => {
        this.data = res.data;
      });
    },
    handleNodeClick(data) {
         this.search.deptId=data.id;
         this.readUser();
    },
    readUser(){
      readUserPage(this.search).then(res =>{
         //console.log(res);
         this.userTableData=res.data;
         this.total = res.total;
         //console.log(this.userTableData);
      })
    },
    handleSizeChange(val) {
      this.search.pageSize = val;
      this.readUser();
    },
    handleCurrentChange(val) {
      this.search.pageNum = val;
      this.readUser();
    },
      setCurrent(row) {
       this.$refs.singleTable.setCurrentRow(row);
      },
      handleCurrentChange1(val) {
        this.currentRow = val;
        console.log(this.currentRow);
        this.userId=this.currentRow.id;
        console.log(this.userId);
      },
     userSure(){
        TurnProcess({taskId:this.taskId,userId:this.userId}).then(res =>{
          console.log(res);
          if(res.httpCode == "200"){
           this.$message.success("转办成功");
           this.dialogchooseUserVisible=false;
           this.dialogTurnVisible = false;            
          }
          this.$router.replace({ path: "/FLOW/approval/waitDo" });
        })
     },
    toUrl(){
        this.$router.push({ path: "/FlOWS/single/lookBuild",query:{processInstanceId:this.processInstanceId} });
    }
  },
  mounted() {
    this.name = this.$route.query.name;
    this.createTime = this.$route.query.createTime;
    this.owner = this.$route.query.owner;
    this.processInstanceId = this.$route.query.processInstanceId;
    this.taskId = this.$route.query.taskId;
    this.processKey = this.$route.query.processKey;
    console.log(this.processKey);
    if(this.processKey=='partApply'){
          this.showForm=0;
       }else if(this.processKey=='partModifyApply'){
          this.showForm=1;
       }else if(this.processKey=='libraryApply'){
           this.showForm=2;
        }else if(this.processKey=='libraryModifyApply'){
          this.showForm=3;
        }
    //console.log(this.applyData);
    this.readData();

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
  ul,
  b {
    float: right;
    li {
      margin: 0 26px;
      float: left;
      cursor: pointer;
      i {
        color: #f8524f;
      }
    }
  }
}
.message .el-form {
  margin-top: 30px;
}
.tree {
  width: 26%;
  float: left;
}
.table{
  width:70%;
  float: left;
  margin-left: 20px;
  margin-top: 20px;
}
.block{
  margin-top: 10px;
}
.el-dialog {
  .el-form,
  .users {
    margin-top: -20px;
    padding-top: 20px;
    border-top: 1px solid #ccc;
    .el-textarea {
      width: 400px;
    }
  }
  .IMG {
    text-align: center;
    margin-top: -20px;
    padding-top: 20px;
    border-top: 1px solid #ccc;
  }
  .back {
    width: 100%;
    display: inline-block;
    margin-top: -20px;
    padding: 20px 0 0 10px;
    border-top: 1px solid #ccc;
  }
  .el-table {
    margin-top: -20px;
  }
  .btns {
    border-top: 1px solid #ccc;
    padding-top: 20px;
  }
}
</style>

