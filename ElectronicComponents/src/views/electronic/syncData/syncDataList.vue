<template>
  <div>
    <div class="topClass">
      <div style="display: flex;flex-direction: row;align-items: center;margin-bottom: 10px">
        <el-popover
          placement="top-start"
          width="300"
          trigger="hover">
          <el-table :data="allTableNamesList">
            <el-table-column property="tableName" label="表名称"></el-table-column>
            <el-table-column property="tableComment" label="说明"></el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button @click="existTableNameUpdateClick(scope.row)" type="text" size="mini">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="margin-top: 8px;display: flex;justify-content: center">
            <el-button @click="createTable">生成表</el-button>
          </div>
          <el-button style="height: 35px;" slot="reference">查看现有表</el-button>
        </el-popover>
        <el-button style="height: 35px;width: 90px;margin-left: 10px" type="primary"
                   @click="createPlan">新建方案
        </el-button>
        <el-button style="height: 35px;width: 90px;" type="danger" :loading="syncDataStatue" @click="syncData">同步数据
        </el-button>
        <el-button style="height: 35px;width: 120px;" type="danger" :loading="syncAllDataStatue" @click="syncAllData">
          同步所有数据
        </el-button>
      </div>
      <div style="display: flex;flex-direction: row">

        <el-table
          :data="tableData"
          stripe
          :header-cell-style="rowClass" v-loading="loading"
          element-loading-text="拼命加载中"
          @current-change="handleCurrentChange" highlight-current-row
          style="width: 100%">
          <el-table-column
            prop="name"
            label="方案名称"
          >
          </el-table-column>
          <el-table-column
            prop="tableName"
            label="表名"
          >
          </el-table-column>
          <el-table-column
            prop="odbcName"
            label="ODBC连接名">
          </el-table-column>
          <el-table-column
            prop="dataSourceName"
            label="数据源名称">
          </el-table-column>
          <el-table-column
            prop="dataAddress"
            label="地址">
          </el-table-column>
          <el-table-column
            prop="serviceName"
            label="服务名">
          </el-table-column>
          <el-table-column
            prop="dataBase"
            label="数据库">
          </el-table-column>
          <el-table-column
            prop="username"
            label="用户名">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间">
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button @click="handleUpdateClick(scope.row)" type="text" size="small">修改</el-button>
              <el-button @click="handleDeleteClick(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--<div class="block">-->
      <!--<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="search.pageNum" :page-sizes="[10, 20, 30, 120]" :page-size="search.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">-->
      <!--</el-pagination>-->
      <!--</div>-->
    </div>
    <!--<div class="pageClass">-->
    <!--<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="search.pageNum" :page-sizes="[10, 20, 30, 120]" :page-size="search.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">-->
    <!--</el-pagination>-->
    <!--</div>-->
    <el-dialog title="新建方案" :visible.sync="dialogPlanVisible">
      <el-form :model="plan" ref="plan" :rules="rules" label-width="120px">
        <el-form-item label="地址" prop="dataAddress">
          <span>{{this.currentAddress}}</span>
        </el-form-item>
        <el-form-item label="方案名称" prop="name">
          <el-input v-model="plan.name" placeholder="请输入方案名称"></el-input>
        </el-form-item>
        <el-form-item label="ODBC连接名" prop="odbcName">
          <el-input v-model="plan.odbcName" placeholder="请输入ODBC连接名"></el-input>
        </el-form-item>
        <el-form-item label="数据源名称" prop="dataSourceName">
          <el-input v-model="plan.dataSourceName" placeholder="请输入数据源名称"></el-input>
        </el-form-item>
        <el-form-item label="服务名" prop="serviceName">
          <el-input v-model="plan.serviceName" placeholder="请输入服务名"></el-input>
        </el-form-item>
        <el-form-item label="数据库" prop="dataBase">
          <el-input v-model="plan.dataBase" placeholder="请输入数据库名"
                    onkeyup="value=value.replace(/[\u4E00-\u9FA5]/g,'')"></el-input>
        </el-form-item>
        <el-form-item label="表名" prop="tableName">
          <el-select v-model="plan.tableName" placeholder="请选择表名">
            <el-option v-for="(item,index) in allTableNamesList" :key="index" :label="item.tableComment"
                       :value="item.tableName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="plan.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="plan.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
      </el-form>
      <div class="optionClass">
        <span></span>
        <div>
          <el-button @click="dialogPlanVisible = false">取 消</el-button>
          <el-button type="primary" @click="onSubmit">确 定</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog title="修改方案" :visible.sync="dialogUpdatePlanVisible">
      <el-form :model="updatePlan" ref="updatePlanRef" :rules="rules" label-width="120px">
        <el-form-item label="方案名称" prop="name">
          <el-input v-model="updatePlan.name" placeholder="请输入方案名称"></el-input>
        </el-form-item>
        <el-form-item label="ODBC连接名" prop="odbcName">
          <el-input v-model="updatePlan.odbcName" placeholder="请输入ODBC连接名"></el-input>
        </el-form-item>
        <el-form-item label="数据源名称" prop="dataSourceName">
          <el-input v-model="updatePlan.dataSourceName" placeholder="请输入数据源名称"></el-input>
        </el-form-item>
        <el-form-item label="服务名" prop="serviceName">
          <el-input v-model="updatePlan.serviceName" placeholder="请输入服务名"></el-input>
        </el-form-item>
      </el-form>
      <div class="optionClass">
        <span></span>
        <div>
          <el-button @click="dialogUpdatePlanVisible = false">取 消</el-button>
          <el-button type="primary" :loading="updateSubmitStatue" @click="updateOnSubmit">确 定</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog title="修改表名称" :visible.sync="updateTableNameVisible">
      <el-form :model="updateTableName" label-width="150px">
        <el-form-item :label="updateTableName.tableComment">
          <div style="display: flex;align-items: center;">
            <el-tooltip effect="light" placement="right">
              <div slot="content">·只能以小写字母、下划线命名<br/>·20个字符以内</div>
              <el-input v-model="updateTableName.tableName" placeholder="请输入新的表名称" maxlength="20"
                        style="margin-left: 25px; width: 200px" @input="updateChangeValue(updateTableName.tableName)"
                        onkeyup="this.value=this.value.replace(/[^a-z_]/g,'');"></el-input>
            </el-tooltip>
            <div class="flagClass"
                 v-if="updateFlagState && updateTableName.tableName != null && updateTableName.tableName.length > 0">
              {{updateTableName.tableName}}已经被创建过了
            </div>
            <img style="margin-left: 8px;width: 20px;height: 20px;"
                 v-else-if="updateTableName.tableName != null && updateTableName.tableName.length > 0"
                 src="../../../assets/correct.png">
          </div>
        </el-form-item>
      </el-form>
      <div class="optionClass">
        <span></span>
        <div>
          <el-button @click="updateTableNameVisible = false">取 消</el-button>
          <el-button type="primary" :loading="updateTableNameSubmitStatue" @click="updateTableNameOnSubmit">确 定
          </el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog title="定义表名称" :visible.sync="dialogTableNameVisible">
      <el-form :model="updatePlan" ref="updatePlanRef" :rules="rules" label-width="120px">
        <!-- 表名输入框 -->
        <ul style="margin-left: 20px;display: flex;flex-direction: column;">
          <li v-for="(param,index) in generateNameList" :key="index" class="paramClass">
            <div style="width: 150px;text-align: right;">{{index+1}}、{{param.name}}</div>
            <el-tooltip effect="light" placement="right">
              <div slot="content">·只能以小写字母、下划线命名<br/>·20个字符以内</div>
              <el-input v-model="param.value" placeholder="请输入表名" maxlength="20"
                        style="margin-left: 25px; width: 200px" @input="changeValue(param,index)"
                        onkeyup="this.value=this.value.replace(/[^a-z_]/g,'');"></el-input>
            </el-tooltip>
            <div class="flagClass" v-if="param.statue && param.value.length > 0">{{param.value}}已经被创建过了</div>
            <img style="margin-left: 8px;width: 20px;height: 20px;" v-else-if="param.value.length > 0"
                 src="../../../assets/correct.png">
          </li>
        </ul>
      </el-form>
      <div class="optionClass">
        <span></span>
        <div>
          <el-button @click="dialogTableNameVisible = false">取 消</el-button>
          <el-button type="primary" :loading="generateSubmitStatue" @click="onGenerateSubmit">生 成</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog title="生成表" :visible.sync="dialogTableVisible" width="800px">
      <div style="width:540px;margin:0 auto;">
        <el-transfer style="text-align: left; display: inline-block;" v-model="generateList" filterable :props="{
      key: 'id',
      label: 'categoryName',
      disabled:'disabled'
    }" :titles="['待生成列表', '生成列表']" @change="handleChange" :data="categaryList">
          <span slot-scope="{ option }">{{ option.categoryName }}</span>
        </el-transfer>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="setTableNameSubmit">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {
    planList,
    createPlan,
    getHeadCategory,
    createTable,
    deleteData,
    isUse,
    getAllTables,
    syncData,
    syncAllData,
    updateTableName
  } from "@/api/cis";

  export default {
    data() {
      return {
        dialogVisible: false,
        updateTableNameVisible: false,
        dialogTableNameVisible: false,
        generateSubmitStatue: false,
        updateSubmitStatue: false,
        dialogPlanVisible: false,
        dialogTableVisible: false,
        dialogUpdatePlanVisible: false,
        updateTableNameSubmitStatue: false,
        loading: false,
        syncDataStatue: false,
        syncAllDataStatue: false,
        nowIndex: 0,
        tableData: [],
        categaryList: [],
        generateList: [],
        updateFlagState: false,
        allTableNamesList: [],
        generateNameList: [],
        updateTableName: {},
        tableNameBackup: {},
        rowClass: {
          background: "#F2F2F2",
          fontSize: "13px"
        },
        currentAddress: null,
        currentRow: null,
        currentSelectTableName: '',
        currentCategaryId: null,
        plan: {
          name: "",
          odbcName: "",
          dataSourceName: "",
          dataAddress: "",
          serviceName: "",
          dataBase: "",
          tableName: "",
          username: "",
          password: ""
        },
        updatePlan: {
          id: "",
          name: "",
          odbcName: "",
          dataSourceName: "",
          dataAddress: "",
          serviceName: "",
          dataBase: "",
          username: "",
          password: ""
        },
        rules: {
          name: [
            {required: true, message: "请输入方案名称", trigger: "blur"}
          ],
          odbcName: [
            {required: true, message: "请输入ODBC连接名", trigger: "blur"}
          ],
          dataSourceName: [
            {required: true, message: "请输入数据源名称", trigger: "blur"}
          ],
          serviceName: [
            {required: true, message: "请输入服务名", trigger: "blur"}
          ],
          dataBase: [
            {required: true, message: "请输入数据库名", trigger: "blur"}
          ],
          username: [
            {required: true, message: "请输入用户名", trigger: "blur"}
          ],
          password: [
            {required: true, message: "请输入密码", trigger: "blur"}
          ],
          tableName: [
            {required: true, message: "请选择表名", trigger: "change"}
          ]
        }
        // search: {
        //   componentName: "",
        //   pageNum: 1,
        //   pageSize: 10
        // },
        // total: 0,

      }
    },
    methods: {
      handleUpdateClick(data) {
        this.updatePlan.name = data.name;
        this.updatePlan.odbcName = data.odbcName;
        this.updatePlan.dataSourceName = data.dataSourceName;
        this.updatePlan.dataAddress = this.currentAddress;
        this.updatePlan.serviceName = data.serviceName;
        this.updatePlan.dataBase = data.dataBase;
        this.updatePlan.username = data.username;
        this.updatePlan.password = data.password;
        this.updatePlan.id = data.id;
        this.dialogUpdatePlanVisible = true;
        // if (this.$refs["updatePlanRef"] !== undefined) {
        //   this.$refs["updatePlanRef"].resetFields(); // 清除表单验证
        // }
      },
      handleDeleteClick(data) {
        this.loading = true;
        deleteData({"id": data.id}).then(res => {
          if (res.httpCode == 200) {
            this.$message.success("删除成功");
            this.loading = false;
            this.readData();
          }
        });
      },
      // 获取方案列表
      readData() {
        this.loading = true;
        planList({}).then(res => {
          this.tableData = res.data;
          this.loading = false;
        });
      },
      createPlan() {
        if (this.$refs["plan"] !== undefined) {
          this.$refs["plan"].resetFields(); // 清除表单验证
        }
        this.dialogPlanVisible = true;
      },
      createTable() {
        this.dialogTableVisible = true;
        this.categaryList.forEach((v, i) => {
          this.allTableNamesList.forEach((value, index) => {
            if (v.categoryName == value.tableComment) {
              v.disabled = true;
            }
          })

        })
        // this.categaryList
        // this.allTableNamesList
      },
      // 修改表名称
      existTableNameUpdateClick(data) {
        // console.log(data)
        this.tableNameBackup = Object.assign({}, data);
        this.updateTableName = Object.assign({}, data);
        this.updateTableNameVisible = true;
      },
      onSubmit() {
        this.plan.dataAddress = this.currentAddress;
        if (this.plan.name.length == 0 || this.plan.odbcName.length == 0 || this.plan.dataSourceName.length == 0
          || this.plan.serviceName.length == 0 || this.plan.tableName.length == 0 || this.plan.dataBase.length == 0 || this.plan.username.length == 0 || this.plan.password.length == 0) {
          this.$message.error('请先完善好信息')
          return;
        }
        createPlan(this.plan).then(res => {
          if (res.httpCode == 200) {
            this.$message.success("新建成功");
            this.dialogPlanVisible = false;
            this.readData();
          }
        });
      },
      updateOnSubmit() {
        if (this.updatePlan.name.length == 0 || this.updatePlan.odbcName.length == 0 || this.updatePlan.dataSourceName.length == 0
          || this.updatePlan.serviceName.length == 0) {
          this.$message.error('请先完善好信息!')
          return;
        }
        // console.log(this.updatePlan);
        this.updateSubmitStatue = true;
        createPlan(this.updatePlan).then(res => {
          if (res.httpCode == 200) {
            this.$message.success("修改成功");
            this.updateSubmitStatue = false;
            this.dialogUpdatePlanVisible = false;
            this.readData();
          }
        });
      },
      getCategaryData() {
        getHeadCategory({"parentId": "-1"}).then(res => {
          if (res.httpCode == 200) {
            this.categaryList = res.data;
            // console.log('类目');
            // console.log(this.categaryList);

          }
        });
      },
      // 同步数据
      syncData() {
        if (this.currentCategaryId == null) {
          this.$message("请先选择一条方案");
        } else {
          this.open2();

        }
      },
      // 同步所有数据
      syncAllData() {
        if (this.allTableNamesList.length == 0) {
          this.$message("还没有创建表噢");
          return;
        }
        let names = [];
        let tables = [];
        let ids = [];
        this.categaryList.forEach((value, index) => {
          this.allTableNamesList.forEach((v, i) => {
            if (value.categoryName == v.tableComment) {
              names.push(v.tableComment)
              tables.push(v.tableName)
              ids.push(value.id)
            }
          })
        })
        // console.log(names);
        // console.log(tables);
        // console.log(ids);
        let message = "即将把'" + names + "'" + "中数据同步到对应的'" + tables + "'表中";
        this.$confirm(message, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.syncAllDataStatue = true;
          let p = {};
          p.tableNames = tables;
          p.ids = ids
          syncAllData(p).then(res => {
            if (res.httpCode == 200) {
              this.$message.success("同步成功");
              this.syncAllDataStatue = false;
            }
          });
        }).catch(() => {
        });
      },
      handleChange() {
      },
      setTableNameSubmit() {
        if (this.generateList.length == 0) {
          this.$message.error("生成列表不可为空");
          return;
        }
        this.generateNameList = [];
        this.categaryList.forEach((value, index) => {
          this.generateList.forEach((v, i) => {
            if (value.id == v) {
              let p = {};
              p.name = value.categoryName
              p.value = ""
              p.statue = false
              this.generateNameList.push(p)
            }
          })
        })
        // console.log(this.generateList)
        // 让其去输入表名称
        this.dialogTableNameVisible = true;
      },
      changeValue(data, index) {
        if (data.value.length == 0) {
          return;
        }
        let param = {};
        param.tableName = data.value;
        isUse(param).then(res => {
          if (res.httpCode == 200) {
            let isUse = res.isUse;
            this.generateNameList[index].statue = isUse;
          }
        });
      },
      // 修改表名称时
      updateChangeValue(data) {
        // console.log(data);
        if (data.length == 0) {
          return;
        }
        let param = {};
        param.tableName = data;
        isUse(param).then(res => {
          if (res.httpCode == 200) {
            let isUse = res.isUse;
            this.updateFlagState = isUse;
            // this.updateTableName.statue = isUse;
            // console.log(this.updateTableName)
          }
        });
      },
      updateTableNameOnSubmit() {
        if (this.updateTableName.tableName.length == 0) {
          this.$message.error("表名称不可为空");
          return;
        }
        if (this.updateFlagState) {
          this.$message.error("此表名已被使用");
          return;
        }
        this.updateTableNameSubmitStatue = true;
        let param = {};
        param.oldTableName = this.tableNameBackup.tableName
        param.newTableName = this.updateTableName.tableName
        // console.log(param);
        updateTableName(param).then(res => {
          if (res.httpCode == 200) {
            this.$message.success("修改成功");
            this.updateTableNameSubmitStatue = false;
            this.updateTableNameVisible = false;
            // 去获取表
            this.getAllTables();
          }
        }).catch(error => {
          this.updateTableNameSubmitStatue = false;
        });
      },
      onGenerateSubmit() {
        for (let i = 0; i < this.generateNameList.length; i++) {
          let p = this.generateNameList[i];
          if (p.value.length == 0) {
            this.$message.error("表名称不可为空");
            return;
          }
          if (p.statue) {
            this.$message.error("已经创建过的没必要再次创建");
            return;
          }
        }
        this.generateSubmitStatue = true;
        let param = {};
        param.tableNames = this.generateNameList
        createTable(param).then(res => {
          this.generateSubmitStatue = false;
          if (res.httpCode == 200) {
            this.$message.success("成功生成");
            this.dialogTableVisible = false;
            this.dialogTableNameVisible = false;
            this.generateList = [];
            // 去获取表
            this.getAllTables();
          }
        }).catch(error => {
          this.generateSubmitStatue = false;
        });
      },
      getAllTables() {
        getAllTables({}).then(res => {
          if (res.httpCode == 200) {
            this.allTableNamesList = res.data;
            // console.log(this.allTableNamesList);
            if (this.allTableNamesList.length == 0) {
              this.open();
            } else {
              this.readData();
            }
          }
        });
      },
      open2() {
        let message = "即将把'" + this.currentSelectTableName + "'中数据同步到表'" + this.currentRow.tableName + "'中"
        this.$confirm(message, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.syncDataStatue = true;
          let p = {};
          p.id = this.currentCategaryId;
          p.tableName = this.currentRow.tableName;
          syncData(p).then(res => {
            if (res.httpCode == 200) {
              this.syncDataStatue = false
              this.$message.success("同步成功");
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消同步'
          });
        });
      },
      open() {
        this.$alert('此时数据库中没有表', '去初始化表', {
          confirmButtonText: '确定',
          showClose: false,
          callback: (action) => {
            if (action == 'confirm') {
              this.createTable();
            }
          }
        });
      },
      handleCurrentChange(val) {
        if (val == null) {
          return;
        }
        this.currentRow = val;
        this.allTableNamesList.forEach((value, index) => {
          if (this.currentRow.tableName == value.tableName) {
            // console.log(value.tableComment);
            this.currentSelectTableName = value.tableComment;
          }
        })
        this.categaryList.forEach((value, index) => {
          if (value.categoryName == this.currentSelectTableName) {
            // console.log(value.id);
            this.currentCategaryId = value.id
          }
        })
      },
    },
    mounted() {
      this.currentAddress = "39.105.43.10"
      // 去获取表
      this.getAllTables();
      this.getCategaryData();
    }
  }
</script>

<style scoped>
  .topClass {
    display: flex;
    flex-direction: column;
  }

  .btnClass {
    display: flex;
    flex-direction: column;
  }

  .optionClass {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .paramClass {
    margin-top: 8px;
    display: flex;
    align-items: center;
  }

  .flagClass {
    color: red;
    margin-left: 8px;
  }

  .chooser-list li {
    display: inline-block;
    border: 1px solid #e3e3e3;
    height: 33px;
    line-height: 33px;
    padding: 0 8px;
    margin-right: 30px;
    border-radius: 3px;
    text-align: center;
    cursor: pointer;
  }

  .chooser-list li.active {
    border-color: #409EFF;
    background: #409EFF;
    color: #fff;
  }
</style>
