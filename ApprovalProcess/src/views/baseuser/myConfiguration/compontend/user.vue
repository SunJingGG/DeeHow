<template>
  <div>
    <div class="rightContent">
      <ul class="clearfix">
        <li>{{dept.deptName}}</li>
        <li>
          <el-select v-model="search.modelName" clearable placeholder="请选择" size="mini" style="width:100px">
            <el-option label="全部员工" value="全部员工">
            </el-option>
          </el-select>
        </li>
        <li>
          <el-input placeholder="请输入员工姓名" v-model="search.modelName" size="mini" style="width:170px" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click.native.prevent="readData"></el-button>
          </el-input>
        </li>
        <li class="pull-right">
          <el-dropdown split-button type="primary" @click="handleClick" @command="handleCommand" size="mini">
            更多
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="1">导出员工信息</el-dropdown-item>
              <el-dropdown-item command="2">导入员工信息</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
        <li class="pull-right">
          <el-button type="primary" size="mini" @click="addData">添加员工</el-button>
        </li>
        <li class="pull-right" v-show="multipleSelection.length>0">
          <el-button type="primary" size="mini" @click="dialogDeptVisible = true">换部门</el-button>
        </li>
      </ul>
    </div>
    <div>
      <el-table :data="listData" v-loading="fullscreenLoading" element-loading-text="拼命加载中" @selection-change="handleSelectionChange" border>
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column type="index" label="序号" width="80"> </el-table-column>

        <el-table-column prop="userName" label="姓名" min-width="150"> </el-table-column>
        <el-table-column prop="account" label="登录账号" min-width="150"> </el-table-column>
        <el-table-column prop="sex" label="性别" min-width="100" :formatter="stateFormat1"></el-table-column>
        <el-table-column prop="staffNo" label="工号" min-width="150"></el-table-column>
        <el-table-column prop="otherDeptName" label="附属部门" min-width="150"></el-table-column>
        <el-table-column prop="position" label="职位" min-width="150"></el-table-column>
        <el-table-column prop="entryTime" label="入职日期" min-width="150"></el-table-column>
        <el-table-column prop="phone" label="联系方式" min-width="150"></el-table-column>
        <el-table-column prop="address" label="住址" min-width="150"></el-table-column>
        <el-table-column prop="email" label="邮箱地址" min-width="150"></el-table-column>
        <el-table-column prop="idCard" label="身份证" min-width="150"></el-table-column>
        <el-table-column prop="enable" label="是否启用" :formatter="stateFormat" min-width="150"></el-table-column>
        <el-table-column fixed="right" label="操作" width="260">
          <template slot-scope="scope">
            <el-button type="text" @click="lookDetail( scope.$index)" size="small">编辑</el-button>
            <el-button type="text" @click="auditRole( scope.$index)" size="small">角色</el-button>
            <el-button type="text" @click="resetPassWord( scope.$index)" size="small">重置密码</el-button>
            <el-button type="text" v-if="scope.row.login == 1" @click="prohibitLogin( scope.$index , 'notlanding')" size="small">禁止登录</el-button>
            <el-button type="text" v-if="scope.row.login == 2" @click="prohibitLogin( scope.$index, 'landing')" size="small">允许登录</el-button>
            <el-button type="text" v-if="scope.row.enable == 1" @click="removeData( scope.$index,'disable')" size="small">停用</el-button>
            <el-button type="text" v-if="scope.row.enable == 2" @click="removeData( scope.$index,'enable')" size="small">启用</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="search.pageNum" :page-sizes="[10, 20, 30, 120]" :page-size="search.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>

    <el-dialog title="员工" :visible.sync="dialogFormVisible">
      <el-form :model="form" :inline="false" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="姓名" prop="userName">
          <el-input v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item label="登录账号" prop="account">
          <el-input v-model="form.account"></el-input>
        </el-form-item>
        <el-form-item label="工号" prop="staffNo">
          <el-input v-model="form.staffNo"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" type="email"></el-input>
        </el-form-item>
        <el-form-item label="身份证号码" prop="idCard">
          <el-input v-model="form.idCard"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="form.sex">
            <el-radio label="1">男</el-radio>
            <el-radio label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- <el-form-item label="附属部门" prop="otherDeptId">
          <el-select v-model="form.otherDeptId" style="width:100%" placeholder="附属部门">
            <el-option v-for="(item,index) in sdeptList" :key="index" :label="item.deptName" :value="item.id"></el-option>
            <el-option label="无" value="0"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="附属部门" prop="otherDeptId">
          <el-cascader placeholder="试试搜索：指南" :options="sdeptList" :props="{
              value:'id',
              label:'deptName',
              children:'children',
            }" filterable change-on-select @change="lookSelect" v-model="auditUserObj.otherDeptIds"></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 认</el-button>
      </div>
    </el-dialog>

    <el-dialog title="导入员工信息" :visible.sync="dialogExportVisible">
      <div>
        <h3>操作步骤：</h3>
        <p>
          1、下载《用户批量导入模板》
          <br>
          <br> 2、打开下载表，将对应字段信息输入或粘贴进本表。为保障粘贴信息被有效导入，请使用纯文本或数字

          <br>
          <br> 3、信息输入完毕，点击 “浏览” 按钮， 选择excel文档
          <br>
          <br> 4、点击 “开始导入” ，导入中如有任何疑问，请致电400 186 9000
          <br>
          <br>
        </p>
        <p>
          <a :href="DEEHOWBASEURL+'/deehow-CMS-Web/user/download_import_template'">
            <el-button type="text">立即下载《用户批量导入模板》</el-button>
          </a>
        </p>
      </div>
      <div>
        <el-upload class="upload-demo" drag :action="DEEHOWBASEURL+'/deehow-CMS-Web/public/excel/analysis'" :on-success="uploadSuccess">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或
            <em>点击上传</em>
          </div>
        </el-upload>
      </div>
    </el-dialog>

    <el-dialog title="导入员工信息" :visible.sync="dialogExcelVisible" width="80%">
      <div>
        <table class="table">
          <tr v-for="(item,index) in excelList" :key="index">
            <td v-for="(val,i) in item" :key="i">{{val}}</td>
          </tr>
        </table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogExcelVisible = false">取 消</el-button>
        <el-button type="primary" @click="onExcelSubmit">确 认</el-button>
      </div>
    </el-dialog>
    <el-dialog title="设置角色" :visible.sync="dialogRoleVisible" width="800px">
      <div style="width:540px;margin:0 auto;">
        <el-transfer style="text-align: left; display: inline-block;" v-model="userRoleList" filterable :props="{
      key: 'id',
      label: 'roleName'
    }" :titles="['角色', '拥有']" @change="handleChange" :data="roleList">
          <span slot-scope="{ option }">{{ option.roleName }} {{ option.deptName }}</span>
          <!-- <el-button class="transfer-footer" slot="left-footer" size="small">操作</el-button>
          <el-button class="transfer-footer" slot="right-footer" size="small">操作</el-button> -->
        </el-transfer>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogRoleVisible = false">取 消</el-button>
        <el-button type="primary" @click="onRoleSubmit">确 认</el-button>
      </div>
    </el-dialog>
    <el-dialog title="移动部门" :visible.sync="dialogDeptVisible" width="800px">
      <div style="width:540px;margin:0 auto;">
        <el-cascader placeholder="试试搜索：指南" :options="sdeptList" :props="{
              value:'id',
              label:'deptName',
              children:'children',
            }" filterable change-on-select v-model="auditUserObj.moveDeptIds"></el-cascader>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogDeptVisible = false">取 消</el-button>
        <el-button type="primary" @click="onMoveDeptSubmit">确 认</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
var child = {
  template: `<div><button @click='add2'>我是局部组件:{{m2}}</button>
              <el-input v-model="password" type="password"></el-input></div>
        `,
  data: function() {
    return {
      m2: 1,
      password: ""
    };
  },
  methods: {
    add2: function() {
      this.m2++;
    }
  }
};

import {
  readUserPage,
  updateUser,
  batchUpdateUser,
  updateUserByList,
  modfyUser,
  reseatPassword,
  readRoleList,
  readUserRoleList,
  updateUserRole,
  readDeptList,
  readDeptTree
} from "@/api/base";
export default {
  props: ["dept"],
  data() {
    return {
      fullscreenLoading: false,
      dialogFormVisible: false,
      dialogExportVisible: false,
      dialogExcelVisible: false,
      dialogRoleVisible: false,
      dialogDeptVisible: false,
      editUser: {
        belongTO: {}
      },
      sdeptList: [],

      search: {
        modelName: "",
        type: ""
      },
      rules: {
        userName: [
          { required: true, message: "请输入员工姓名", trigger: "blur" }
        ],
        account: [
          { required: true, message: "请输入登录账号", trigger: "blur" }
          // { type: 'number', message: "是数字", trigger: "change" },
        ],
        email: [
          { type: "email", message: "请输入合法的email", trigger: "blur" }
        ]
      },
      listData: [],
      excelList: [],
      roleList: [],
      userRoleList: [],
      auditUserObj: {
        id: null,
        otherDeptIds: null,
        moveDeptIds: null
      },
      form: {
        userName: "",
        staffNo: "",
        phone: "",
        email: "",
        idCard: "",
        address: "",
        position: "",
        sex: "1",
        deptId: "",
        account: "",
        otherDeptId: ""
        // userName:"",
      },
      formcus: {
        userName: "",
        staffNo: "",
        phone: "",
        email: "",
        idCard: "",
        address: "",
        position: "",
        sex: "1",
        deptId: "",
        account: "",
        otherDeptId: ""
      },
      multipleSelection: [],
      total: 0
    };
  },
  methods: {
    handleChange(value, direction, movedKeys) {
      console.log(value, direction, movedKeys);
    },
    handleClick(a) {
      console.log("-------------");
      console.log(a);
    },
    handleCommand(a) {
      console.log(a);
      if (a == 2) {
        this.dialogExportVisible = true;
      }
    },
    uploadSuccess(response, file, fileList) {
      console.log(response);
      if (response && response.httpCode == 200 && response.data) {
        this.dialogExportVisible = false;
        this.dialogExcelVisible = true;
        this.excelList = response.data;
      }
      console.log(file);
      console.log(fileList);
    },
    handleSizeChange(val) {
      this.search.pageSize = val;
      this.readData();
    },
    handleCurrentChange(val) {
      this.search.pageNum = val;
      this.readData();
    },
    stateFormat(row, column) {
      let state = row[column.property];

      if (state == 0) {
        return "停用";
      } else if (state == 1) {
        return "启用";
      } else {
        return "--";
      }
    },
    stateFormat1(row, column) {
      let state = row[column.property];

      if (state == 0) {
        return "未知";
      } else if (state == 1) {
        return "男";
      } else {
        return "女";
      }
    },
    getSelectOption() {
      readRoleList({})
        .then(res => {
          console.log(res);
          this.roleList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
      readDeptTree({})
        .then(res => {
          function removeTreeChildren(arr) {
            arr.forEach((v, i) => {
              if (v.children && v.children.length > 0) {
                removeTreeChildren(v.children);
              } else {
                delete v.children;
              }
            });
            return arr;
          }
          let srr = removeTreeChildren(res.data);
          console.log(srr);
          this.sdeptList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    readData() {
      this.fullscreenLoading = true;
      this.form.deptId = this.dept.id;
      this.formcus.deptId = this.dept.id;
      readUserPage({ deptId: this.dept.id })
        .then(res => {
          console.log(res);
          this.listData = res.data;
          this.total = res.total;
          this.fullscreenLoading = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    addData() {
      this.form = Object.assign({}, this.formcus);
      console.log(123);
      this.dialogFormVisible = true;
    },
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    },
    lookSelect() {
      console.log(this.auditUserObj.otherDeptIds);
      let arr = this.auditUserObj.otherDeptIds;
      this.form.otherDeptId = arr[arr.length - 1];
      console.log(this.form.otherDeptId);
    },
    onMoveDeptSubmit(){
      let arr = this.multipleSelection;
      let srr = this.auditUserObj.moveDeptIds;
      if(srr.legnth<1){
        this.$message.error("请选择部门");
        return false;
      }
      let deptId = srr[srr.length-1];
      arr.forEach((v,i)=>{
        v.deptId = deptId;
      })
      updateUserByList(arr)
        .then(res => {
          this.$message.success("操作成功");
          this.readData();
          this.dialogDeptVisible = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    onSubmit() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          // alert('submit!');
          updateUser(this.form)
            .then(res => {
              this.$message.success("操作成功");
              this.readData();
              this.dialogFormVisible = false;
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    onRoleSubmit() {
      let obj = new Object();
      let arr = [];
      this.userRoleList.forEach((v, i) => {
        let obj = {
          roleId: v,
          userId: this.auditUserObj.id
        };
        arr.push(obj);
      });
      obj.sysUserRoleList = arr;
      obj.userId = this.auditUserObj.id;
      console.log(obj);

      updateUserRole(obj)
        .then(res => {
          this.$message.success("操作成功");
          this.dialogRoleVisible = false;
          // this.readData();
        })
        .catch(err => {
          console.log(err);
        });
    },
    auditRole(index) {
      this.auditUserObj.id = this.listData[index].id;
      readUserRoleList({ userId: this.listData[index].id })
        .then(res => {
          let arr = [];
          res.data.forEach((v, i) => {
            arr.push(v.roleId);
          });
          this.userRoleList = arr;
          this.dialogRoleVisible = true;
        })
        .catch(err => {
          console.log(err);
        });
    },
    onExcelSubmit() {
      let arr = [];
      this.excelList.forEach((v, i) => {
        if (i == 0) {
          //代表的是表头 , 无用
        } else {
          console.log(v);
          let obj = new Object();
          (obj.account = v[0]),
            (obj.userName = v[1]),
            (obj.sex = v[2] == "男" ? "1" : "2"),
            (obj.phone = v[3]),
            (obj.email = v[4]),
            (obj.idCard = v[5]),
            // obj.birthDay = v[6],
            (obj.address = v[7]),
            (obj.staffNo = v[8]),
            // obj.position = v[0],
            (obj.deptId = this.dept.id);
          arr.push(obj);
        }
      });
      batchUpdateUser(arr)
        .then(res => {
          this.$message.success("操作成功");
          this.readData();
          this.dialogExcelVisible = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    lookDetail(index) {
      this.form = Object.assign(this.listData[index]);
      this.dialogFormVisible = true;
    },
    resetPassWord(index) {
      this.$prompt("", "重置密码", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        showInput: true,
        inputPlaceholder: "重置后的密码",
        inputType: "password"
      })
        .then(({ value }) => {
          reseatPassword({ id: this.listData[index].id, password: value })
            .then(res => {
              console.log(res);
              this.$message.success("密码重置成功");
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
      // const h = this.$createElement;
      // console.log()
      //   this.$msgbox({
      //     title: '消息',
      //     message: h(child, {key: this.key++}),
      //     showCancelButton: true,
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     beforeClose: (action, instance, done) => {
      //       console.log(action)
      //       console.log(instance.$slots.default[0])
      //       console.log(done)
      //       // if (action === 'confirm') {
      //       //   instance.confirmButtonLoading = true;
      //       //   instance.confirmButtonText = '执行中...';
      //       //   setTimeout(() => {
      //       //     done();
      //       //     setTimeout(() => {
      //       //       instance.confirmButtonLoading = false;
      //       //     }, 300);
      //       //   }, 3000);
      //       // } else {
      //       //   done();
      //       // }
      //     },
      //     callback:(a,b,c)=>{
      //       console.log(a)
      //       console.log(b)
      //       console.log(c)
      //     }
      //   }).then(action => {
      //     console.log(action)
      //     this.$message({
      //       type: 'info',
      //       message: 'action: ' + action
      //     });
      //   }).catch(err=>{
      //     console.log(err)
      //   })
    },
    prohibitLogin(index, qt) {
      let msg = "";
      if (qt == "landing") {
        msg = "确定要允许该账号登录吗";
      } else if (qt == "notlanding") {
        msg = "确定要禁止该账号登录吗";
      }
      this.$confirm(msg, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          modfyUser({ id: this.listData[index].id }, qt)
            .then(res => {
              this.$message.success("操作成功");
              this.readData();
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {});
    },
    removeData(index, qt) {
      let msg = "";
      if (qt == "disable") {
        msg = "确定要禁用该账号吗";
      } else if (qt == "enable") {
        msg = "确定要启用该账号吗";
      }
      this.$confirm(msg, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          modfyUser({ id: this.listData[index].id }, qt)
            .then(res => {
              this.$message.success("操作成功");
              this.readData();
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {});
    }
  },
  mounted() {
    console.log(this.dept);
    console.log(this);
    this.readData();
    this.getSelectOption();
  }
};
</script>
<style lang="scss" scoped>
.rightContent {
  border-top: 1px solid #dfdfef;
  ul {
    padding: 5px 0px;
    border-bottom: 1px solid #dfdfef;
    li {
      float: left;
      padding: 0px 15px;
      line-height: 36px;
      text-align: center;
      min-width: 150px;
      border-right: 1px solid #dedede;
    }
  }
}
</style>
