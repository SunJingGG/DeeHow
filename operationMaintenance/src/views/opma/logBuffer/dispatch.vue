<template>
  <div>
    <div v-if="dialogFormVisibleLog">
      <el-row>
        <el-col :span="24">
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
              <el-button type="success" @click="addData" icon="plus">新增</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="24">
          <el-table :data="dataList" :fit="true" :resizable="true" v-loading="fullscreenLoading" element-loading-text="拼命加载中" border style="width: 100%">
            <el-table-column type="index" label="序号" width="120">
            </el-table-column>
            <el-table-column prop="taskGroup" label="taskGroup">
            </el-table-column>
            <el-table-column prop="taskName" label="taskName">
            </el-table-column>
            <el-table-column prop="taskType" label="taskType">
            </el-table-column>
            <el-table-column prop="taskDesc" label="taskDesc">
            </el-table-column>
            <el-table-column prop="nextFireTime" label="nextFireTime">
            </el-table-column>
            <el-table-column prop="previousFireTime" label="previousFireTime">
            </el-table-column>
            <el-table-column prop="status" label="status">
              <template slot-scope="scope">
                <el-tag :type="statusType(scope.row.status)" close-transition>{{scope.row.status | statusFilter}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="250">
              <template slot-scope="scope">
                <el-dropdown size="small" split-button type="primary" @command="handleCommand">
                  <span class="el-dropdown-link">
                    请选择
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item :command="getCommand('run',scope.$index)">立即执行</el-dropdown-item>
                    <el-dropdown-item :command="getCommand('open',scope.$index)">启动任务</el-dropdown-item>
                    <el-dropdown-item :command="getCommand('close',scope.$index)">暂停任务</el-dropdown-item>
                    <el-dropdown-item :command="getCommand('update',scope.$index)">修改任务</el-dropdown-item>
                    <el-dropdown-item :command="getCommand('delete',scope.$index)">删除任务</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <el-button @click="getLog(scope.$index)" type="primary" size="small">执行日志</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-dialog title="task" :visible.sync="dialogFormVisible">
        <el-form ref="form" :model="form" label-width="150px" :rules="rules">
          <table style="width:100%">
            <tr>
              <td>
                <el-form-item label="taskGroup" prop="taskGroup">
                  <el-input v-model="form.taskGroup" auto-complete="off" :disabled="groupDisabled"></el-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item label="taskName" prop="taskName">
                  <el-input v-model="form.taskName" auto-complete="off" :disabled="groupDisabled"></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>
                <el-form-item label="jobType" prop="jobType">
                  <el-radio-group v-model="form.jobType">
                    <el-radio-button label="job">job</el-radio-button>
                    <el-radio-button label="statefulJob">statefulJob</el-radio-button>
                  </el-radio-group>
                </el-form-item>
              </td>
              <td>
                <el-form-item label="taskType" prop="taskType">
                  <!--<el-input v-model="form.taskType" auto-complete="off"></el-input>-->
                  <el-radio-group v-model="form.taskType">
                    <el-radio-button label="LOCAL">LOCAL</el-radio-button>
                    <el-radio-button label="DUBBO">DUBBO</el-radio-button>
                  </el-radio-group>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>
                <el-form-item label="targetObject" prop="targetObject">
                  <el-input v-model="form.targetObject" auto-complete="off"></el-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item label="targetMethod" prop="targetMethod">
                  <el-input v-model="form.targetMethod" auto-complete="off"></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>
                <el-form-item label="taskCron" prop="taskCron">
                  <el-input v-model="form.taskCron" auto-complete="off"></el-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item label="taskDesc" prop="taskDesc">
                  <el-input v-model="form.taskDesc" auto-complete="off"></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>
                <el-form-item label="targetSystem" prop="targetSystem">
                  <el-input v-model="form.targetSystem" auto-complete="off"></el-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item label="contactEmail">
                  <el-input v-model="form.contactEmail" auto-complete="off"></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>
                <el-form-item label="contactName">
                  <el-input v-model="form.contactName" auto-complete="off"></el-input>
                </el-form-item>
              </td>
            </tr>
          </table>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align:right">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div v-else>
      <el-row>
        <el-col :span="24">
          <el-button @click="dialogFormVisibleLog = true" type="primary">返回任务列表</el-button>
          <el-table :data="logDataList" :fit="true" :resizable="true" v-loading="fullscreenLoadingLog" element-loading-text="拼命加载中" border style="width: 100%;margin-top: 30px">
            <el-table-column type="index" label="序号" width="50">
            </el-table-column>
            <el-table-column prop="groupName" label="groupName">
            </el-table-column>
            <el-table-column prop="taskName" label="taskName">
            </el-table-column>
            <el-table-column prop="serverDuid" label="serverDuid">
            </el-table-column>
            <el-table-column prop="serverHost" label="serverHost">
            </el-table-column>
            <el-table-column prop="startTime" label="startTime">
            </el-table-column>
            <el-table-column prop="endTime" label="endTime">
            </el-table-column>
            <el-table-column prop="status" label="status" width="100">
            </el-table-column>
            <el-table-column prop="fireInfo" label="fireInfo">
            </el-table-column>
          </el-table>
          <div class="block">
            <el-pagination @size-change="handleSizeChangeLog" @current-change="handleCurrentChangeLog" :current-page="searchLog.pageNum" :page-sizes="[10, 20, 30, 100]" :page-size="searchLog.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalLog">
            </el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {
  scheduledList,
  scheduledLogList,
  scheduledUpdate,
  scheduledDelete,
  scheduledRun,
  scheduledClose,
  scheduledOpen
} from "@/api/opma";

export default {
  data() {
    return {
      searchLog: {
        pageNum: 1,
        pageSize: 10,
        groupName: "",
        taskName: ""
      },
      form: {
        id: null,
        taskGroup: "",
        taskName: "",
        jobType: "",
        taskType: "",
        targetObject: "",
        targetMethod: "",
        taskCron: "",
        taskDesc: "",
        targetSystem: "",
        contactEmail: "",
        contactName: ""
      },
      rules: {
        taskGroup: [
          { required: true, message: "这是必填项！", trigger: "blur" }
        ],
        taskName: [
          { required: true, message: "这是必填项！", trigger: "blur" }
        ],
        jobType: [{ required: true, message: "这是必填项！", trigger: "blur" }],
        taskType: [
          { required: true, message: "这是必填项！", trigger: "blur" }
        ],
        targetObject: [
          { required: true, message: "这是必填项！", trigger: "blur" }
        ],
        targetMethod: [
          { required: true, message: "这是必填项！", trigger: "blur" }
        ],
        taskCron: [
          { required: true, message: "这是必填项！", trigger: "blur" }
        ],
        taskDesc: [
          { required: true, message: "这是必填项！", trigger: "blur" }
        ],
        targetSystem: [
          { required: true, message: "这是必填项！", trigger: "blur" }
        ]
      },
      dataList: [],
      logDataList: [],
      totalLog: 0,
      fullscreenLoading: true,
      fullscreenLoadingLog: true,
      dialogFormVisible: false,
      dialogFormVisibleLog: true,
      groupDisabled: false
    };
  },
  methods: {
    statusType(val) {
      switch (val) {
        case "PAUSED":
          val = "danger";
          break;
        case "NORMAL":
          val = "primary";
          break;
        case "COMPLETE":
          val = "success";
          break;
        default:
          val = "";
      }
      return val;
    },
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          scheduledUpdate(this.form)
            .then(res => {
              if (res.httpCode == 200) {
                this.$message({
                  type: "success",
                  message: "成功!"
                });
                this.readData();
                this.dialogFormVisible = false;
              } else {
                this.$message({
                  type: "info",
                  message: res.msg
                });
              }
            })
            .catch(err => {
              this.$message({
                type: "info",
                message: "服务器繁忙，请稍后再试！！"
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //删除任务
    deleteTask(ob) {
      this.$confirm("此操作将会永久删除此任务, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          scheduledDelete({ taskGroup: ob.taskGroup, taskName: ob.taskName })
            .then(res => {
              if (res.httpCode == 200) {
                this.$message({
                  type: "success",
                  message: "成功!"
                });
                this.readData();
              } else {
                this.$message({
                  type: "info",
                  message: res.msg
                });
              }
            })
            .catch(err => {
              this.$message({
                type: "info",
                message: "服务器繁忙，请稍后再试！！"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    //修改任务
    updateTask(index) {
      this.groupDisabled = true;
      this.lookDetil(index);
    },
    //暂停任务
    closeTask(ob) {
      this.$confirm("此操作将会暂停此任务, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          scheduledClose({ taskGroup: ob.taskGroup, taskName: ob.taskName })
            .then(res => {
              if (res.httpCode == 200) {
                this.$message({
                  type: "success",
                  message: "成功!"
                });
                this.readData();
              } else {
                this.$message({
                  type: "info",
                  message: res.msg
                });
              }
            })
            .catch(err => {
              this.$message({
                type: "info",
                message: "服务器繁忙，请稍后再试！！"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    //立即执行任务
    runTask(ob) {
      this.$confirm("此操作将会立即执行一次此任务, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          scheduledRun({ taskGroup: ob.taskGroup, taskName: ob.taskName })
            .then(res => {
              if (res.httpCode == 200) {
                this.$message({
                  type: "success",
                  message: "成功!"
                });
                //this.readData();
                //立即执行后会新增一条记录，执行完毕后删除
              } else {
                this.$message({
                  type: "info",
                  message: res.msg
                });
              }
            })
            .catch(err => {
              this.$message({
                type: "info",
                message: "服务器繁忙，请稍后再试！！"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    //启动任务
    openTask(ob) {
      this.$confirm("此操作将会启动此任务, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          scheduledOpen({ taskGroup: ob.taskGroup, taskName: ob.taskName })
            .then(res => {
              if (res.httpCode == 200) {
                this.$message({
                  type: "success",
                  message: "成功!"
                });
                this.readData();
              } else {
                this.$message({
                  type: "info",
                  message: res.msg
                });
              }
            })
            .catch(err => {
              this.$message({
                type: "info",
                message: "服务器繁忙，请稍后再试！！"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    getCommand(method, index) {
      return method + "_" + index;
    },
    handleCommand(command) {
      var method = command.substring(0, command.lastIndexOf("_"));
      var index = command.substring(
        command.lastIndexOf("_") + 1,
        command.length
      );
      var ob = this.dataList[index];
      switch (method) {
        case "run":
          this.runTask(ob);
          break;
        case "open":
          this.openTask(ob);
          break;
        case "close":
          this.closeTask(ob);
          break;
        case "update":
          this.updateTask(index);
          break;
        case "delete":
          this.deleteTask(ob);
          break;
        default:
          this.$message("参数错误！！！");
      }
    },
    addData() {
      this.form = {
        id: null,
        taskGroup: "",
        taskName: "",
        jobType: "",
        taskType: "",
        targetObject: "",
        targetMethod: "",
        taskCron: "",
        taskDesc: "",
        targetSystem: "",
        contactEmail: "",
        contactName: ""
      };
      this.groupDisabled = false;
      this.dialogFormVisible = true;
    },
    lookDetil(index) {
      let newObj = new Object();
      $.extend(true, newObj, this.dataList[index]);

      this.form.id = newObj.id;
      this.form.taskGroup = newObj.taskGroup;
      this.form.taskName = newObj.taskName;
      if (!newObj.jobType) {
        //返回null,默认是job
        this.form.jobType = "job";
      } else {
        this.form.jobType = newObj.jobType;
      }
      this.form.taskType = newObj.taskType;
      this.form.targetObject = newObj.targetObject;
      this.form.targetMethod = newObj.targetMethod;
      this.form.taskCron = newObj.taskCron;
      this.form.taskDesc = newObj.taskDesc;
      this.form.targetSystem = newObj.targetSystem;
      this.form.contactEmail = newObj.contactEmail;
      this.form.contactName = newObj.contactName;

      this.dialogFormVisible = true;
    },
    getLog(index) {
      var ob = this.dataList[index];
      this.searchLog.groupName = ob.targetObject;
      this.searchLog.taskName = ob.targetMethod;
      this.readLogData();
      this.dialogFormVisibleLog = false;
    },
    handleSizeChangeLog(val) {
      this.searchLog.pageSize = val;
      this.readLogData();
    },
    handleCurrentChangeLog(val) {
      this.searchLog.pageNum = val;
      this.readLogData();
    },
    searchData() {
      this.readData();
    },
    readData() {
      this.fullscreenLoading = true;
      scheduledList(this.search)
        .then(response => {
          this.dataList = response.data;
          this.total = response.total;
          this.fullscreenLoading = false;
        })
        .catch(error => {
          this.$message.error(error.msg);
        });
    },
    readLogData() {
      this.fullscreenLoadingLog = true;
      scheduledLogList(this.searchLog)
        .then(response => {
          this.logDataList = response.data;
          this.totalLog = response.total;
          this.fullscreenLoadingLog = false;
        })
        .catch(error => {
          this.$message.error(error.msg);
        });
    }
  },
  mounted() {
    this.readData();
  },
  filters: {
    statusFilter(val) {
      switch (val) {
        case "PAUSED":
          val = "暂停";
          break;
        case "NORMAL":
          val = "正常";
          break;
        case "COMPLETE":
          val = "完成";
          break;
        default:
          val = val;
      }
      return val;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-table th > .cell {
  word-wrap: normal;
  text-overflow: ellipsis;
  line-height: 30px;
  width: 100%;
  padding-left: 29px;
  box-sizing: border-box;
}
</style>
