<template>
  <div>
    <div>
      <div>
            <el-input v-model="search.roleName" style="width:240px;" placeholder="角色名称"></el-input>
            <el-input v-model="search.phone" style="width:240px;" placeholder="联系电话"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="readData">查询</el-button>
        <el-button type="primary" style="float:right;" icon="el-icon-plus" @click="addData">添加</el-button>
      </div>
      <div>
        <el-table :header-cell-style="rowClass" style="margin-top:20px;" :data="listData" v-loading="fullscreenLoading" element-loading-text="拼命加载中" border>
          <el-table-column type="index" label="序号" width="80"> </el-table-column>
          <el-table-column prop="roleName" label="角色名称" min-width="250"> </el-table-column>
          <el-table-column prop="remark" label="简介" min-width="100"></el-table-column>
          <!-- <el-table-column prop="sort" label="排序" min-width="150"></el-table-column> -->
          <el-table-column prop="roleType" label="类型" :formatter="stateFormat" min-width="150"></el-table-column>
          <el-table-column fixed="right" label="操作" width="180">
            <template slot-scope="scope">
              <el-button type="text" @click="lookDetail( scope.$index)" size="small">查看</el-button>
              <el-button type="text" @click="auditRole( scope.$index)" size="small">权限</el-button>
              <el-button type="text" @click="removeData( scope.$index)" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block" style="margin-top:20px;">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="search.pageNum" :page-sizes="[10, 20, 30, 120]" :page-size="search.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
    <el-dialog title="角色" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="角色名称：" prop="roleName">
          <el-input v-model="form.roleName"></el-input>
        </el-form-item>
        <el-form-item label="类型：" prop="roleType">
          <el-select v-model="form.roleType" style="width:100%" placeholder="类型">
            <el-option label="业务角色" value="1"></el-option>
            <el-option label="管理角色" value="2"></el-option>
            <el-option label="系统内置角色" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="简介：" prop="remark">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
        <!-- <el-form-item label="排序" prop="sortNo">
          <el-input v-model="form.sortNo"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="即时配送" prop="delivery">
          <el-switch v-model="form.delivery"></el-switch>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 认</el-button>
      </div>
    </el-dialog>
    <el-dialog title="分配菜单" :visible.sync="dialogMenuVisible" width="30%">
      <el-row>
        <el-col :span="24">
          <el-tree :data="menuTree" show-checkbox node-key="id" ref="tree" highlight-current :props="defaultProps2">
          </el-tree>
        </el-col>
        <!-- <el-col :span="12">温馨提示</el-col> -->
      </el-row>
      <div style="margin-top:20px">
        <el-collapse v-model="activeNames">
          <el-collapse-item title="温情提示" name="1">
            <div class="alert alert-danger">我们已近默认为您设置为全部的功能 , 您可以手动取消 , 这样的话可能使您的员工得不到更好的用户体检 , 三思而后行</div>
            <div>
              <el-checkbox-group v-model="checkList">
                <el-checkbox v-for="item in dicList" :key="item.code" :label="item.code">{{item.codeText}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogMenuVisible = false">取 消</el-button>
        <el-button type="primary" :loading="loading" @click="onMenuSubmit">确 认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  readRolePage,
  updateRole,
  updateUseDeptOpen,
  updateUseDeptStop,
  deleteRole,
  readDeptList,
  readDicList,
  readRoleMenu,
  updateRoleMenu,
  updateRoleMenuPermission
} from "@/api/base";
import { getMenu } from "@/api/login";

function toArr(obj, arr) {
  obj.forEach((val, key) => {
    arr.push(val);
    if (val.children.length > 0) {
      toArr(val.children, arr);
    } else {
      return;
    }
  });
  return arr;
}
export default {
  data() {
    return {
      fullscreenLoading: false,
      dialogFormVisible: false,
      dialogMenuVisible: false,
      loading: false,
      listData: [],
      deptList: [],
      dicList: [],
      menuTree: [],
      menuLists: [],
      activeNames: [],
      checkList: [],
      rowClass: {
          background: '#F2F2F2',
          fontSize: '13px',
        },
      detailIO: false,
      imageUrl: "",
      search: {
        roleName: ""
      },
      defaultProps2: {
        children: "children",
        label: "menuName"
      },
      rules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { min: 2, max: 15, message: "长度在 2 到 15 个字符", trigger: "blur" }
        ]
      },
      form: {
        roleName: "",
        sortNo: "",
        roleType: "",
        remark: ""
      },
      formcus: {
        roleName: "",
        roleType: "",
        sortNo: "",
        remark: ""
      },
      total: 0,
      auditObj: {
        id: ""
      }
    };
  },
  methods: {
    addData() {
      this.form = Object.assign({}, this.formcus);
      this.dialogFormVisible = true;
    },
    lookDetail(index) {
      this.form = Object.assign({}, this.listData[index]);
      this.dialogFormVisible = true;
    },
    removeData(index) {
      let arr = this.listData;
      let sdeptList = this.deptList;
      let id = arr[index].id;
      deleteRole({ id }).then(res => {
        this.$message.success("操作成功");
        this.readData();
        for (var i = 0; i < sdeptList.length; i++) {
          if (id == sdeptList[i].id) {
            sdeptList.splice(i, 1);
            break;
          }
        }
      });
    },
    auditRole(index) {
      this.auditObj.id = this.listData[index].id;
      readRoleMenu({ roleId: this.listData[index].id })
        .then(res => {
          console.log(res);
          let arr = [];
          this.menuLists.forEach((v, i) => {
            if (res.data.indexOf(v.id) !== -1 && v.children.length == 0) {
              console.log(v.id);
              arr.push(v);
            }
          });
          console.log(arr);
          this.dialogMenuVisible = true;
          this.$nextTick(() => {
            this.$refs.tree.setCheckedNodes(arr);
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    onSubmit() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          updateRole(this.form)
            .then(res => {
              this.$message.success("操作成功");
              this.readData();
              // this.getSelectOption();
              this.dialogFormVisible = false;
            })
            .catch(err => {});
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    onMenuSubmit() {
      let arr = this.$refs.tree.getCheckedNodes();
      if (arr.length < 1) {
        this.$alert("如果用户没有一个菜单是无法进入本系统的", "系统提示", {
          type: "warning"
        });
        return false;
      }
      this.loading = true;
      let str = [];
      arr.forEach((val, key) => {
        str.push(val.id);
        str.push(val.parentId);
      });
      let setArr = new Set(str);
      let newArr = Array.from(setArr);
      let parentMenu = new Array();
      newArr.forEach((val, key) => {
        console.log(key);
        let menuObj = this.menuLists.find((value, index, arr) => {
          console.log(value.id == val);
          return value.id == val;
        });
        if (menuObj != undefined) {
          if (menuObj.parentId != 0) {
            parentMenu.push(menuObj.parentId);
          }
        }
      });
      parentMenu.forEach((val, ind) => {
        str.push(val);
      });
      let sstr = [...str, ...parentMenu];
      let setArrTwo = new Set(sstr);
      let newArrTwo = Array.from(setArrTwo);

      // ----\
      let sysRoleMenuList = [];

      newArrTwo.forEach((v, i) => {
        let sobj = {
          menuId: v,
          permission: "read",
          roleId: this.auditObj.id
        };
        sysRoleMenuList.push(sobj);
      });
      let submitDate = {
        roleId: this.auditObj.id,
        sysRoleMenuList
      };

      updateRoleMenu(submitDate)
        .then(res => {
          this.submitPermission(newArrTwo);
        })
        .catch(err => {
          this.loading = false;
          console.log(err);
        });
    },
    submitPermission(arr) {
      let sysRoleMenuList = [];

      arr.forEach((v, i) => {
        this.checkList.forEach((item, index) => {
          let sobj = {
            menuId: v,
            permission: item,
            roleId: this.auditObj.id
          };
          sysRoleMenuList.push(sobj);
        });
      });
      let submitDate = {
        roleId: this.auditObj.id,
        sysRoleMenuList
      };
      updateRoleMenuPermission(submitDate)
        .then(res => {
          console.log(res);
          this.loading = false;
          this.$message.success("修改成功");
          this.dialogMenuVisible = false;
        })
        .catch(err => {
          this.loading = false;
          console.log(err);
        });
    },
    readData() {
      this.fullscreenLoading = true;
      readRolePage({})
        .then(res => {
          console.log(res);
          this.total = res.total;
          this.fullscreenLoading = false;
          this.listData = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    stateFormat(row, column) {
      let state = row[column.property];

      if (state == 1) {
        return "业务角色";
      } else if (state == 2) {
        return "管理角色";
      } else if (state == 3) {
        return "系统内置角色";
      } else {
        return "--";
      }
    },
    getSelectOption() {
      readDeptList({})
        .then(res => {
          this.deptList = res.data;
        })
        .then(err => {
          console.log(err);
        });
      readDicList({ type: "CRUD" })
        .then(res => {
          this.dicList = res.data;
          this.dicList.forEach((v, i) => {
            this.checkList.push(v.code);
          });
        })
        .catch(err => {
          console.log(err);
        });
      getMenu({})
        .then(res => {
          console.log(res);
          this.menuTree = res.data;
          let totalMenuList = [];
          this.menuLists = toArr(res.data, totalMenuList);
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSizeChange(val) {
      this.search.pageSize = val;
      this.readData();
    },
    handleCurrentChange(val) {
      this.search.pageNum = val;
      this.readData();
    }
  },
  mounted() {
    this.readData();
    this.getSelectOption();
  }
};
</script>
<style lang="scss" scoped>
  .el-dialog{
    .el-form,.el-row{
      margin-top: -20px;
      padding-top: 20px;
      border-top: 1px solid #ccc;
    }
    .footer{
      border-top: 1px solid #ccc;
      padding-top: 20px;
    }
  }
</style>
