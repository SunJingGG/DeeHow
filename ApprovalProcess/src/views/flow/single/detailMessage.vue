<template>
  <div>
    <!-- <div class="title">
      <span>表单详情</span>
      <router-link :to="{path:'/FLOW/approval/waitDo'}">
        <b>
          <i class="fa fa-times"></i>
        </b>
      </router-link>
    </div> -->
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
    toUrl(){
        this.$router.push({ path: "/FlOWS/single/lookBuild",query:{processInstanceId:this.processInstanceId} });
    }
  },
  mounted() {
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
  b {
    float: right;
  }
}
</style>

