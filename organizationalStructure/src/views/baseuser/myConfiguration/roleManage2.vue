<template>
  <div>
    <div>
      <div class="treeBox">
        <el-button type="warning" @click="addData">新增角色</el-button>
        <el-button type="warning" @click="remove(index)">删除</el-button>
        <!-- <el-tree :data="roleListdata" :props="defaultProps" @node-click="handleNodeClick"></el-tree> -->
        <ul>
          <li v-for="(item,index) in roleListdata" :key="index">
            <a @click="liclick(index)" v-bind:class="{listyle:changecolor==index}">{{item.roleName}}</a>
          </li>
        </ul>
      </div>
      <!-- <div class="Tab">
        <el-table :data="listData" v-loading="fullscreenLoading" element-loading-text="拼命加载中" border>
          <el-table-column type="index" label="序号" width="80"> </el-table-column>
          <el-table-column prop="roleName" label="角色名称" min-width="250"> </el-table-column>
          <el-table-column prop="remark" label="简介" min-width="100"></el-table-column>
          <el-table-column prop="roleType" label="类型" :formatter="stateFormat" min-width="150"></el-table-column>
          <el-table-column fixed="right" label="操作" width="180">
            <template slot-scope="scope">
              <el-button type="text" @click="lookDetail( scope.$index)" size="small">查看</el-button>
              <el-button type="text" @click="auditRole( scope.$index)" size="small">权限</el-button>
              <el-button type="text" @click="removeData( scope.$index)" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="search.pageNum" :page-sizes="[10, 20, 30, 120]" :page-size="search.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </div> -->
      <div class="Tab">
        <div class="title">
          <b>管理员</b>
          <span>系统默认角色，可在此添加成员为管理员，并设置其功能权限和数据可见范围</span>
        </div>
        <el-tabs v-model="activeName">
          <el-tab-pane label="角色成员" name="first">
            <el-button type="warning" @click="auditRole">选择角色成员</el-button>
            <div class="roleuserbox">
              <ul>
                <li v-for="(item,index) in roleUser" :key="index">{{item.userName}}</li>
              </ul>
            </div>
          </el-tab-pane>
          <el-tab-pane label="功能权限" name="second">
            <p>设置角色对应的功能操作、应用管理、后台管理权限
              <span>
                <el-checkbox label="全选" name="type"></el-checkbox>
              </span>
            </p>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="date" label="模块" width="180">
                <template slot-scope="scope">
                  <el-checkbox label="eLibM" name="type"></el-checkbox>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="权限">
                <template slot-scope="scope">
                  <el-checkbox label="类目管理" name="type"></el-checkbox>
                  <el-checkbox label="属性管理" name="type"></el-checkbox>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <el-dialog title="角色" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="form.roleName"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="roleType">
          <el-select v-model="form.roleType" placeholder="类型">
            <el-option label="业务角色" value="1"></el-option>
            <el-option label="管理角色" value="2"></el-option>
            <el-option label="系统内置角色" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="简介" prop="remark">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
        <!-- <el-form-item label="排序" prop="sortNo">
          <el-input v-model="form.sortNo"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="即时配送" prop="delivery">
          <el-switch v-model="form.delivery"></el-switch>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="warning" @click="onSubmit">确 认</el-button>
        <el-button type="warning" plain class="reset" @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- <el-dialog title="分配菜单" :visible.sync="dialogMenuVisible" width="30%">
      <el-row>
        <el-col :span="24">
          <el-tree :data="menuTree" show-checkbox node-key="id" ref="tree" highlight-current :props="defaultProps2">
          </el-tree>
        </el-col>
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
    </el-dialog> -->
    <el-dialog title="选择成员" :visible.sync="dialogMenuVisible" width="40%">
      <el-transfer filterable :filter-method="filterMethod" filter-placeholder="请输入城市拼音" v-model="value2" :titles="['组织架构', '已选择成员']" :data="data2">
      </el-transfer>
      <div slot="footer" class="dialog-footer line">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 认</el-button>
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
  readRoleList,
  readRoleMenu,
  readUserRoleList,
  updateRoleMenu,
  updateRoleMenuPermission,
  RoleUser,
  RoleUserDo
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
      changecolor:-1,
      listData: [],
      deptList: [],
      dicList: [],
      menuTree: [],
      menuLists: [],
      activeNames: [],
      checkList: [],
      detailIO: false,
      imageUrl: "",
      activeName: "first",
      search: {
        roleName: ""
      },
      defaultProps: {
        children: "children",
        label: "id"
      },
      id:"",
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
      },
      roleUser:[],
      roleListdata: [],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎"
        },
        {
          date: "2016-05-04",
          name: "王小虎"
        }
      ]
    };
  },
  methods: {
    addData() {
      this.form = Object.assign({}, this.formcus);
      this.dialogFormVisible = true;
    },
    remove(index) {
      let id = this.id;
       deleteRole({ id }).then(res => {
        this.$message.success("操作成功");
        this.getRoleList();
        for (var i = 0; i < sroleListdata.length; i++) {
          if (id == roleListdata[i].id) {
            roleListdata.splice(i, 1);
            break;
          }
        }
      });
    },
    liclick(index){
       this.changecolor=index;
       this.id=this.roleListdata[index].id;
       this.roleuser();
    },
    roleuser(index){
       let id = this.id;
      // console.log(id);
       RoleUser({roleId:id}).then(res =>{
          this.roleUser=res.data;
          console.log(this.roleUser);
       })       
    },
    lookDetail(index) {
      this.form = Object.assign({}, this.listData[index]);
      this.dialogFormVisible = true;
    },
    // removeData(index) {
    //   let arr = this.listData;
    //   let sdeptList = this.deptList;
    //   let id = arr[index].id;
    //   deleteRole({ id }).then(res => {
    //     this.$message.success("操作成功");
    //     this.readData();
    //     for (var i = 0; i < sdeptList.length; i++) {
    //       if (id == sdeptList[i].id) {
    //         sdeptList.splice(i, 1);
    //         break;
    //       }
    //     }
    //   });
    // },
    auditRole(index) {
      this.dialogMenuVisible = true;
      this.auditObj.id = this.listData[index].id;
      readRoleMenu({ roleId: this.listData[index].id })
        .then(res => {
          //console.log(res);
          let arr = [];
          this.menuLists.forEach((v, i) => {
            if (res.data.indexOf(v.id) !== -1 && v.children.length == 0) {
              //console.log(v.id);
              arr.push(v);
            }
          });
          //console.log(arr);
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
              this.getRoleList();
            })
            .catch(err => {});
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getRoleList() {
      readRoleList({}).then(res => {
        this.roleListdata = res.data;
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
        //console.log(key);
        let menuObj = this.menuLists.find((value, index, arr) => {
          //console.log(value.id == val);
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
          //console.log(res);
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
          //console.log(res);
          this.total = res.total;
          this.fullscreenLoading = false;
          this.listData = res.data;
          console.log(this.listData);
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
          //console.log(res);
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
    this.getRoleList();
    this.readData();
    this.getSelectOption();
  }
};
</script>
<style lang="scss" scoped>
.treeBox {
  float: left;
  width: 18%;
  text-align: center;
  margin-right: 10px;
  ul {
    margin-top: 20px;
    li {
      a{
        display: inline-block;
        width: 100%;
        height: 26px;
        line-height: 28px;
        cursor: pointer;
      }
      .listyle{
        background:#e6a23c;
        color: #fff;
      }
    }
  }
}
.Tab {
  width: 80%;
  float: left;
  border: 1px solid #ccc;
  .title {
    padding: 10px 15px;
    width: 100%;
    height: 40px;
    background: #f2f2f2;
    color: #666;
    b {
      font-size: 16px;
      margin-right: 30px;
    }
  }
  .el-tabs {
    padding-left: 10px;
    .el-tab-pane:first-child {
      width: 100%;
      height: 450px;
    }
    p {
      span {
        float: right;
        margin-right: 30px;
      }
    }
    .roleuserbox{
      ul{
        margin-top: 20px;
        li{
          width: 120px;
          height:30px;
          line-height: 30px;
          text-align: center;
          float: left;
          border: 1px solid #ccc;
        }
      }
    }
  }
}
.el-form {
  width: 100%;
  margin-top: -26px;
  padding-top: 20px;
  border-top: 1px solid #ccc;
  .el-input {
    width: 85%;
  }
  .el-select {
    width: 85%;
  }
}
.el-transfer {
  margin-top: -26px;
  padding-top: 20px;
  border-top: 1px solid #ccc;
}
.line {
  height: 50px;
  line-height: 50px;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}
.reset:hover{
       color:#e6a23c;
       background: #fef8ec;
    }
</style>
