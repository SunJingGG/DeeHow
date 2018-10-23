<template>
  <div>
    <el-row>
      <el-col :span="4">
        <div class="zTreeDemoBackground left">
          <ul id="treeDemo" class="ztree"></ul>
          <div id="rMenu" class="list-group" @click.stop.prevent :style="treeMenu">
            <a class="list-group-item" @mousedown.stop.prevent="addData">新建下级</a>
            <a class="list-group-item" @mousedown.stop.prevent="addPingData">新建平级</a>
            <a class="list-group-item" @mousedown.stop.prevent="lookDetail">编辑</a>
            <a class="list-group-item">停用</a>
            <a class="list-group-item" @mousedown.stop.prevent="removeData">删除</a>
          </div>
          <div style="padding-left:10px" v-if="sdeptList.length<1">
            <el-button type="text" icon="search" @click="addStart">暂无部门请点击添加..</el-button>
          </div>
        </div>
      </el-col>
      <el-col :span="20">
        <div v-if="editUser.belongTO.deptName"  class="rightContent">

          <com-user :dept="editUser.belongTO" ref="RefComUser"></com-user>
        </div>

      </el-col>
    </el-row>
    <el-dialog title="部门" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="部门名称" prop="deptName">
          <el-input v-model="form.deptName"></el-input>
        </el-form-item>
        <el-form-item label="上级部门" prop="parentId">
          <el-select v-model="form.parentId" style="width:100%" placeholder="上级部门" :disabled="true">
            <el-option v-for="(item,index) in sdeptList" :key="index" :label="item.deptName" :value="item.id"></el-option>
            <el-option label="无" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门编号" prop="remark">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
        <el-form-item label="部门排序" prop="sortNo">
          <el-input v-model="form.sortNo"></el-input>
        </el-form-item>
        <!-- <el-form-item label="即时配送" prop="delivery">
          <el-switch v-model="form.delivery"></el-switch>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  readDeptPage,
  readDeptTree,
  updateDept,
  updateUseDeptOpen,
  updateUseDeptStop,
  deleteDept,
  readDeptList
} from "@/api/base";

import comUser from './compontend/user'

import "ztree/css/zTreeStyle/zTreeStyle.css";
import "ztree/js/jquery.ztree.all";

export default {
  components:{
    comUser
  },
  data() {
    return {
      fullscreenLoading: false,
      dialogFormVisible: false,
      listData: [],
      sdeptList: [
        {id:'0',deptName:'无'}
      ],
      detailIO: false,
      imageUrl: "",
      search: {
        modelName: ""
      },
      treeMenu: {
        top: 0 + "px",
        left: 0 + "px",
        display: "none"
      },
      rules: {
        deptName: [
          { required: true, message: "请输入部门名称", trigger: "blur" }
        ],
        parentId: [
          { required: true, message: "请选择上级部门", trigger: "change" }
        ]
      },
      form: {
        deptName: "",
        parentId: "",
        sortNo: "",
        remark: ""
      },
      formcus: {
        deptName: "",
        parentId: "",
        sortNo: "",
        remark: ""
      },
      total: 0,
      editObj: {},
      treeList: [],
      sTree: {},
      setting: {
        data: {
          key: {
            name: "deptName"
          },
          simpleData: {
            enable: true
          }
        },
        // check: {
        //   enable: true
        // },
        callback: {
          // beforeClick: this.beforeClick,
          onClick: this.onClick,
          onRightClick: this.OnRightClick
        }
      },
      flag: {
        treeParent: 0 //平级节点与子级节点与是否是编辑的开关
      },
      editUser: {
        belongTO: {}
      }
    };
  },
  methods: {
    addData() {
      this.flag.treeParent = 0;
      this.hideRMenu();
      console.log("阻止默认事件");
      this.form = Object.assign({}, this.formcus);
      this.form.parentId = this.editObj.id;
      this.dialogFormVisible = true;
    },
    addStart() {
      this.flag.treeParent = 4;
      this.form = Object.assign({}, this.formcus);
      this.form.parentId = "0";
      this.dialogFormVisible = true;
    },
    addPingData() {
      this.flag.treeParent = 1;
      this.hideRMenu();
      this.form = Object.assign({}, this.formcus);
      console.log(this.editObj);
      this.form.parentId = this.editObj.parentId;
      this.dialogFormVisible = true;
    },
    OnRightClick(a, b, c) {
      // console.log(a)
      // console.log(b)
      // console.log(c)
      // console.log(c.getParentNode())
      if (!c) {
        return false;
      }
      this.sTree.selectNode(c);
      this.treeMenu.left = a.clientX + "px";
      this.treeMenu.top = a.clientY + "px";
      this.treeMenu.display = "block";
      // $("body").unbind("mousedown", this.onBodyMouseDown);
      $("body").bind("mousedown", this.onBodyMouseDown);
      this.editObj = c;
    },
    onClick(a, b, c) {
      console.log(a);
      console.log(b);
      console.log(c);
      this.editUser.belongTO = c;
      // console.log(this.$refs['RefComUser'].readData)
      if(this.$refs['RefComUser']){
        this.$nextTick(()=>{

          this.$refs['RefComUser'].readData()
        })
      }
    },
    hideRMenu() {
      this.$set(this.treeMenu, "display", "none");
      $("body").unbind("mousedown", this.onBodyMouseDown);
    },
    onBodyMouseDown(a) {
      this.hideRMenu();
    },
    lookDetail() {
      this.flag.treeParent = 3;
      this.hideRMenu();
      this.form = Object.assign({}, this.editObj);
      this.dialogFormVisible = true;
    },
    removeData(index) {
      this.hideRMenu();
      let id = this.editObj.id;
      let sdeptList = this.sdeptList;
      deleteDept({ id }).then(res => {
        for (var i = 0; i < sdeptList.length; i++) {
          if (id == sdeptList[i].id) {
            sdeptList.splice(i, 1);
            break;
          }
        }
        this.$message.success("操作成功");
        this.sTree.removeNode(this.editObj, a => {
          console.log(a);
        });
      });
    },
    onSubmit() {
      updateDept(this.form)
        .then(res => {
          this.$message.success("操作成功");
          let newNode = res.data;
          this.getSelectOption();
          if (this.flag.treeParent == 0) {
            console.log("子");
            if (this.sTree.getSelectedNodes()[0]) {
              newNode.checked = this.sTree.getSelectedNodes()[0].checked;
              this.sTree.addNodes(this.sTree.getSelectedNodes()[0], newNode);
            } else {
              this.sTree.addNodes(null, newNode);
            }
          } else if (this.flag.treeParent == 1) {
            console.log("平");
            if (this.sTree.getSelectedNodes()[0]) {
              newNode.checked = this.sTree.getSelectedNodes()[0].checked;
              this.sTree.addNodes(this.editObj.getParentNode(), newNode);
            } else {
              this.sTree.addNodes(null, newNode);
            }
          } else if (this.flag.treeParent == 3) {
            console.log(res.data);
            $.extend(true, this.editObj, res.data);
            console.log(this.editObj);

            this.sTree.updateNode(this.editObj);
          } else if (this.flag.treeParent == 4) {
            this.readData();
          }
          console.log("改");
          this.dialogFormVisible = false;
        })
        .catch(err => {});
    },
    readData() {
      readDeptTree({}).then(res => {
        // console.log(res)
        this.treeList = res.data;
        if (res.data.length > 0) {
          this.ztreeInit();
        }
      });
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
    getSelectOption() {
      readDeptList({}).then(res => {
        this.sdeptList = res.data;
      });
    },
    documentInit() {
      var stree = $(".zTreeDemoBackground");
      let clHeight = $(window).height();
      stree.height(clHeight - 100);
      $(window).resize(v => {
        stree.height($(window).height() - 100);
        stree.height($(window).height() - 100);
      });
    },
    ztreeInit() {
      $.fn.zTree.init($("#treeDemo"), this.setting, this.treeList);
      this.sTree = $.fn.zTree.getZTreeObj("treeDemo");
    }
  },
  mounted() {
    this.readData();
    this.getSelectOption();
    this.documentInit();
  }
};
</script>
<style lang="scss" scoped>
#rMenu {
  width: 119px;
  font-size: 10px;
  position: fixed;
  display: none;
  
}
.zTreeDemoBackground {
  border: 1px solid #dfdfef;
  overflow: auto;
}
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
      min-width:150px;
      border-right: 1px solid #dedede;
    }
  }
}
</style>
