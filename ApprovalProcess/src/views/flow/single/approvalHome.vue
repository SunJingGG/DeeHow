<template>
  <div>
    <div class="clearfix">
      <p class="pull-left">
        <i class="graph graph-flow"></i>流程审批</p>
      <ul class="pull-right btnlist" v-if="sparams.flag=='审批'">
        <li class="btnlist" v-if="sparams.taskState!=2" @click="show2 = !show2;back=true">
          <i class="icon icon-check"></i>
          审批
        </li>
        <li class="btnlist"  v-if="sparams.taskState!=2" @click="show2 = !show2;back=false">
          <i class="icon icon-reply"></i>
          退回
        </li>
        <li class="btnlist" v-if="sparams.taskState!=2" @click="dialogTurnVisible = true">
          <i class="icon icon-external-link"></i>
          转办
        </li>
        <li class="btnlist" v-if="sparams.taskState!=2" @click="lookFlow">
          <i class="icon icon-sitemap"></i>
          流程
        </li>
      </ul>
      <ul class="pull-right btnlist" v-if="sparams1=='申请'">
        <li class="btnlist" v-if="sparams.taskState!=2" @click="ApplyNew">
          <i class="icon icon-sitemap"></i>
          保存
        </li>
      </ul>
    </div>
    <hr>
    <div>
      <transition name="el-zoom-in-top">
        <div v-show="show2" class="transition-box" style="margin-top:15px">
          <el-input type="textarea" v-model="form.remark" placeholder="请输入意见"></el-input>
          <div style="margin-top:15px;">
            <button class="pan-btn green-btn" v-if="back" @click="agreeBtn()">确 &nbsp; 认</button>
            <button class="pan-btn pink-btn" v-else @click="disagreeBtn()">打 &nbsp; 回</button>
          </div>
        </div>
      </transition>
    </div>
    <div style="margin-top:15px">
      <div>
        <table class="table table-bordered">
          <tr>
            <td colspan="3">
              <h4 class="pull-left">申请表</h4>
              <span class="pull-right label label-badge label-primary">{{sparams.name}}</span>
            </td>
          </tr>
          <tr>
            <td>
              <span class="text-muted">任务名称</span> : {{sparams.formName}}</td>
            <td>
              <span class="text-muted">申请时间</span> : {{sparams.procStsrtTime}}</td>
            <td>
              <span class="text-muted">申请人</span> : {{sparams.procStsrtName}}</td>
          </tr>
        </table>
      </div>
      <template v-if="processKey == 'partApply'">
        <form-one v-if="sparams.taskId" :sparams='sparams' @childByValue="childByValue"></form-one>
      </template>
      <template v-if="processKey == 'libraryApply'">
        <form-two v-if="sparams.taskId" :sparams='sparams' :processId="sparams.ProcInstId" @childByValue="childByValue"></form-two>
      </template>
       <template v-if="processKey == 'materialCodeApply'">
        <form-three v-if="sparams.taskId" :sparams='sparams' :processId="sparams.ProcInstId" @childByValue="childByValue"></form-three>
      </template>
      <!-- <template v-if="processKey == 'materialCodeApply'">
        <form-threer v-if="sparams.taskId" :sparams='sparams' :processId="sparams.ProcInstId" @childByValue="childByValue"></form-threer>
      </template> -->
    </div>
    <div style="padding:10px;border:1px solid #e7e7e7;margin-top:15px">
      <el-tabs tab-position="top" @tab-click="handleClick">
        <el-tab-pane label="审批意见">
          <ul class="comments">
            <li v-for="(item,index) in evaluation" :key="index" v-if="item.comment">
              <p class="text-primary">{{item.nodeType}}
                <span class="text-muted"> [
                  <span>{{item.commentName}}</span>]</span>
              </p>
              <p class="opinion clearfix">{{item.comment}}</p>
              <p class="text-muted">{{item.commentTime}}</p>
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="查阅情况">
          <ul class="comments">
            <li v-for="(item,index) in lookList" :key="index">
              <span class="com_name text-primary">{{item.lookPerson}}
                <!-- <span class="text-muted">[一级审批]</span> -->
              </span>
              <span class="com_name opinion">{{item.lookState==2?'已阅':'未阅'}}</span>
              <span class="text-muted">2018-08-29 15:23:23</span>
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="审批历史">
          <ul class="comments">
            <li v-for="(item,index) in historyProcess" :key="index">
              <span class="com_name text-primary">
                <span class="text-muted">{{item.taskName}}</span>
              </span>
              <span class="com_name opinion">{{item.type}}</span>
              <span class="text-muted">{{item.createTime}}</span>
            </li>
          </ul>
        </el-tab-pane>
      </el-tabs>
    </div>

    <el-dialog title="流程图" :visible.sync="dialogFlowImgVisible" width="45%">
      <div class="IMG"><img :src="DEEHOWBASEURL+'/deehow-BPM-Web/elib/process_approve/select_process_diagram?taskId='+sparams.taskId" alt=""></div>
    </el-dialog>
    <el-dialog title="选择转办人" :visible.sync="dialogTurnVisible" width="45%">
      <el-select v-model="userId" filterable placeholder="请选择" style="width:100%">
        <el-option v-for="item in userList" :key="item.id" :label="item.userName" :value="item.id">
        </el-option>
      </el-select>
      <div slot="footer" class="dialog-footer btns">
        <el-button type="danger" @click="userSure">确 定</el-button>
        <el-button type="danger" plain @click="dialogTurnVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { formOne,formTwo,formThree,formThreer} from "../approval/compontend/index.js";
import {
  AgreeProcess,
  UpdateApply,
  DisAgreeProcess,
  ProcessHis,
  readDeptTree,
  readUserList,
  TurnProcess,
  ProcessImg,
  AgreeEditProcess,
  DisAgreeEditProcess,
  agreeDatebase,
  editagreeDatebase,
  selectApproveComment,
  readProcessHistory,
  readLookTask,
  updateReadState,
  ApplyNewNum
} from "@/api/flow";
export default {
  components: {
    formOne,formTwo,formThree,formThreer
  },
  name: "approvalHome",
  data() {
    return {
      show2: false,
      dialogFlowImgVisible: false,
      dialogTurnVisible: false,
      sparams: {},
      sparams1:{},
      aparams:{},
      applyId: "",
      back: "",
      form: {
        remark: ""
      },
      form1:{},
      evaluation: [],
      historyProcess: [],
      lookList: [],
      processKey: "",
      userId:'',
      userList:[],
    };
  },
  methods: {
    lookFlow() {
      this.dialogFlowImgVisible = true;
    },
    childByValue(childByValue) {
      this.applyId = childByValue;
      console.log(this.applyId);
    },
    agreeBtn() {
      this.form.processInstanceId = this.sparams.ProcInstId;
      this.form.taskId = this.sparams.taskId;
      this.form.procMonitorId = this.sparams.processMonitorId;
      AgreeProcess(this.form).then(res => {
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
          } else if (this.processKey == "partModifyApply") {
            let applyEdit = new Object();
            applyEdit.id = this.applyId;
            applyEdit.status = "1";
            AgreeEditProcess(applyEdit).then(r => {
              console.log(r);
            });
          } else if (this.processKey == "libraryApply") {
            //申请入库
            let applybuild = new Object();
            applybuild.id = this.applyId;
            applybuild.status = "6";
            agreeDatebase(applybuild).then(r => {
              console.log(r);
            });
          } else if (this.processKey == "libraryModifyApply") {
            //修改入库
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
      this.form.processInstanceId = this.sparams.ProcInstId;
      this.form.taskId = this.sparams.taskId;
      DisAgreeProcess(this.form).then(res => {
        console.log(res);

        if (res.httpCode == "200") {
          if (this.processKey == "partApply") {
            let applyAdd = new Object();
            applyAdd.id = this.applyId;
            applyAdd.status = "4";
            UpdateApply(applyAdd).then(r => {
              console.log(r);
            });
          } else if (this.processKey == "partModifyApply") {
            let applyEdit = new Object();
            applyEdit.id = this.applyId;
            applyEdit.status = "2";
            DisAgreeEditProcess(applyEdit).then(r => {
              console.log(r);
            });
          } else if (this.processKey == "libraryApply") {
            let applybuild = new Object();
            applybuild.id = this.applyId;
            applybuild.status = "7";
            agreeDatebase(applybuild).then(r => {
              //申请入库同意打回是一个接口
              console.log(r);
            });
          } else if (this.processKey == "libraryModifyApply") {
            let editbuild = new Object();
            editbuild.id = this.applyId;
            editbuild.status = "6";
            editagreeDatebase(editbuild).then(r => {
              //同意打回是一个接口
              console.log(r);
            });
          }
        }
        this.$router.replace({ path: "/FLOW/approval/waitDo" });
      });
    },
    readProcessData() {},
    handleClick() {
      this.readHistory();
    },
    userSure(){
        TurnProcess({taskId:this.sparams.taskId,userId:this.userId}).then(res =>{
          console.log(res);
          if(res.httpCode == "200"){
           this.$message.success("转办成功");
           this.dialogTurnVisible = false;            
          }
          this.$router.replace({ path: "/FLOW/approval/waitDo" });
        })
     },
    readHistory() {
      readProcessHistory({ processMonitorId: this.sparams.processMonitorId })
        .then(res => {
          console.log(res);
          this.historyProcess = res.data;
        })
        .catch(err => {
          console.log(err);
        });
      selectApproveComment({ procMonitorId: this.sparams.processMonitorId })
        .then(res => {
          console.log(res);
          this.evaluation = res.data;
        })
        .catch(err => {
          console.log(err);
        });
      readLookTask({ procInstId: this.sparams.ProcInstId })
        .then(res => {
          console.log(res);
          this.lookList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
      updateReadState({ id: this.sparams.id })
        .then(res => {
          console.log(res);
        })
        .catch(err => {});
    },
    getSelectOption(){
      readUserList({}).then(res=>{
        this.userList = res.data
      }).catch(err=>{
        console.log(err)
      })
    },
    ApplyNew(){
      ApplyNewNum({}).then(res=>{

      })
    }
  },
  mounted() {
    console.log(this.$route.params);
    this.sparams = this.$route.params;
    this.sparams1 = this.$route.query;
    this.processKey = this.$route.params.formKey;
    console.log(this.processKey);
    this.readHistory();
    this.getSelectOption();
  }
};
</script>

<style lang="scss" scoped>
.graph-flow {
  margin-right: 12px;
  height: 36px;
  width: 36px;
  background-position: -180px -120px;
}
.btnlist {
  li {
    float: left;
    // width:50px;
    padding: 0 20px;
    cursor: pointer;
    background: #fff;
    color: #454545;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1);
    line-height: 34px;
    border-radius: 4px;
    &:hover {
      background-color: #dedede;
      box-shadow: 0 2px 1px rgba(0, 0, 0, 0.1);
    }
  }
}
.comments {
  li {
    border-bottom: 1px dashed #dedede;
    padding: 10px;
    .com_name {
      width: 200px;
      display: inline-block;
    }
  }
}
// .opinion{
//   height:34px;
//   line-height: 34px;
// }
</style>
