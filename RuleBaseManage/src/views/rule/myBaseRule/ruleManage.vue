<template>
  <div style="display: flex;flex: 1">
    <div class="rulestree" ref="rulestree">
      <!-- <el-scrollbar style="height:100%"> -->
      <el-tree style="width:250px;" :data="treeData" ref="tree" :props="props" node-key="id" default-expand-all :expand-on-click-node="false" @node-click="handleNodeClick">
        <span class="custom-tree-node" slot-scope="{ node, data }" @mouseenter="enter(node)" @mouseleave="leave(node)">
          <span>{{ node.label }}</span>&nbsp;&nbsp;
          <i class="el-icon-setting logo" @click="showBtns(node)" v-show="seen&&node.id==current"></i>
          <span v-show="seen&&node.id==current&&ruleswork==true">
            <el-button type="text" size="mini" @click="() => appendRule(data)">
              添加
            </el-button>
          </span>
          <span v-show="seen&&node.id==current&&modelswork==true">
            <el-button type="text" size="mini" @click="() => appendModel(data)">
              添加
            </el-button>
            <el-button v-show="seen&&node.id==current&&rulesworkdelete==true" type="text" size="mini" @click="() => deleteRule(data, node)">
              删除
            </el-button>
          </span>
          <span v-show="seen&&node.id==current&&modelsedit==true">
            <el-button type="text" size="mini" @click="() => editModel(data,node)">
              修改
            </el-button>
            <el-button type="text" size="mini" @click="() => deleteModel(data,node)">
              删除
            </el-button>
          </span>
        </span>
      </el-tree>
    </div>
    <!-- 右侧部分 -->
    <div v-show="!isShow" style="display: flex;flex:1;width: 100%;justify-content: center;align-items:center;font-size: 20px">暂无内容</div>
    <div ref="tableRight" v-show="isShow">
      <div class="rightTop">
        <el-table :header-cell-style="rowClass" :data="tableData" border @current-change="showpngfile" style="width: 100%;" highlight-current-row stripe>
          <el-table-column prop="entryName" label="条目名称">
          </el-table-column>
          <el-table-column prop="entryIdentification" label="条目标识">
          </el-table-column>
          <!--<el-table-column prop="gategoryOne" label="器件种类1">-->
          <!--</el-table-column>-->
          <!--<el-table-column prop="gategoryTwo" label="器件种类2">-->
          <!--</el-table-column>-->
          <!--<el-table-column prop="onLineValue" label="线上检测值" width="90px">-->
          <!--</el-table-column>-->
          <!--<el-table-column prop="edgeOne" label="边1">-->
          <!--</el-table-column>-->
          <!--<el-table-column prop="edgeTwo" label="边2">-->
          <!--</el-table-column>-->
          <el-table-column prop="collectionValueName" label="类型">
          </el-table-column>
          <el-table-column prop="value" label="值">
          </el-table-column>
          <el-table-column prop="level" label="级别">
          </el-table-column>
          <el-table-column prop="mode" label="方式">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <router-link :to="{path:'/RULEBASES/singles/addEntry', query:{id:scope.row.id,editdata:JSON.stringify(scope.row)}}">
                <el-button type="primary" icon="el-icon-edit" circle size="small"></el-button>
              </router-link>
              <el-button type="danger" icon="el-icon-delete" circle size="small" @click="delEntry(scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="btns">
          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="transferAddentry" style="width: 100%;height: 35px;margin-left: 10px">增加条目
          </el-button>
          <el-button type="primary" icon="el-icon-download" style="width: 100%;height: 35px;margin-top: 8px;">导入
          </el-button>
          <el-button type="primary" icon="el-icon-upload2" style="width: 100%;height: 35px;margin-top: 8px;">导出
          </el-button>
        </div>

      </div>

      <!-- 右侧下面部分 -->
      <div class="rightBottom">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="search.pageNum" :page-sizes="[10, 20, 30, 120]" :page-size="search.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
        <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
          <el-tab-pane label="工艺参数" name="first">
            <div class="discrib">
              <img v-for="(item,index) in imgLists" :key="index" :src="DEEHOWBASEURL+'/deehow-CMS-Web/public/file/view?filePath='+item" alt="">
            </div>
            <div class="word">{{explain}}{{this.currentRow.remark}}</div>
          </el-tab-pane>
          <el-tab-pane label="工艺文档" name="second">
            <div class="pdfshow" v-for="(item,index) in pdfLists" :key="index">
              <a :href="DEEHOWBASEURL+'/deehow-CMS-Web/public/file/download?filePath='+item">文档{{index+1}}(点击下载)</a>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <el-dialog title="规则页面" :visible.sync="dialogFormVisible" width="40%">
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="规则名称：" prop="roleName">
          <el-input v-model="form.roleName" maxlength="50" placeholder="请输入规则名称，最多不超过50字"></el-input>
        </el-form-item>
        <el-form-item label="规则版本：" prop="roleRevise">
          <el-input v-model="form.roleRevise" placeholder="请输入规则的版本号" onkeyup="value=value.replace((/^\d*(\.?\d{0,2})/g)[0],'')"></el-input>
        </el-form-item>
        <el-form-item label="规则编码：" prop="roleNumber">
          <el-input v-model="form.roleNumber" placeholder="请输入规则编码"></el-input>
        </el-form-item>
        <el-form-item label="备注：" prop="remark">
          <el-input v-model="form.remark" type="textarea" maxlength="100" placeholder="请输入规则描述，最多不超过100字"></el-input>
          <span style="float:right">还可输入
            <b v-text="msg"></b>字</span>
        </el-form-item>
      </el-form>
      <div style="clear:both"></div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="ruleAddBtn">确 定</el-button>
        <el-button type="primary" plain @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="添加/修改模型" :visible.sync="dialogForm1Visible" width="40%">
      <el-form :model="form1" :rules="rules" ref="modelForm" label-width="100px">
        <el-form-item label="模型名称：" prop="modelName">
          <el-input v-model="form1.modelName" maxlength="50" placeholder="请输入模型名称，最多不超过50字"></el-input>
        </el-form-item>
        <el-form-item label="模型编码：" prop="modelNumber">
          <el-input v-model="form1.modelNumber" placeholder="请输入模型编码"></el-input>
        </el-form-item>
        <!-- <el-form-item label="版本：" prop="ruleId">
          <el-input v-model="form1.ruleId"></el-input>
        </el-form-item> -->
        <el-form-item label="备注：" prop="remark">
          <el-input v-model="form1.remark" type="textarea" maxlength="100" placeholder="请输入模型描述，最多不超过100字"></el-input>
          <span style="float:right">还可输入
            <b v-text="msg1"></b>字</span>
        </el-form-item>
      </el-form>
      <div style="clear:both"></div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="modelAddBtn">确 定</el-button>
        <el-button type="primary" plain @click="dialogForm1Visible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  addRules,
  addModels,
  rulesList,
  deleteModel,
  rulesTable,
  deleteRules,
  deleteEntry
} from "@/api/rules";

export default {
  data() {
    return {
      isShow: false,
      rowClass: {
        background: "#F2F2F2",
        fontSize: "13px"
      },
      fullscreenLoading: false,
      dialogFormVisible: false,
      dialogForm1Visible: false,
      ruleswork: false,
      rulesworkdelete: false,
      modelswork: false,
      modelsedit: false,
      seen: false,
      current: 0,
      activeName2: "first",
      data: "",
      message: "",
      total: 0,
      msg: 100,
      msg1: 100,
      explain: "",
      ruleId: "",
      clientHeight: "",
      clientWidth: "",
      currentRow: {},
      treeData: [],
      tableData: [],
      imgLists: [],
      pdfLists: [],
      search: {
        pageSize: 10,
        pageNum: 1,
        modelId: ""
      },
      props: {
        children: "ruleModels",
        label: "roleName"
      },
      form: {
        roleName: "",
        roleNumber: "",
        remark: "",
        roleRevise: ""
      },
      form1: {
        ruleId: "",
        modelName: "",
        modelNumber: "",
        remark: ""
      },
      form1cus: {
        ruleId: "",
        modelName: "",
        modelNumber: "",
        remark: ""
      },
      rules: {
        roleName: [
          { required: true, message: "请输入规则名称名称", trigger: "blur" }
        ],
        // roleNumber: [{required: true, message: "请输入规则编码", trigger: "change"}],
        // ruleId: [{required: true, message: "请输入版本", trigger: "blur"}],
        modelName: [
          { required: true, message: "请输入模型名称", trigger: "blur" }
        ],
        // modelNumber: [{required: true, message: "请输入模型编码", trigger: "blur"}],
        roleRevise: [
          { required: true, message: "请输入规则版本", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    handleClick() {},
    handleNodeClick(data, node) {
      this.fullscreenLoading = true;
      this.search.pageNum = 1;
      this.search.pageSize = 10;
      //console.log(data);
      // console.log(node);
      this.message = node;
      //console.log(this.message.data.id);
      this.search.modelId = "";
      this.search.ruleId = "";
      if (node.level == 3) {
        this.search.modelId = this.message.data.id;
        this.showRulesTable();
        this.fullscreenLoading = false;
        this.isShow = true;
      } else {
        this.currentRow.remark = "";
        this.tableData = [];
        this.total = 0;
        this.imgLists = [];
        this.pdfLists = [];
        this.explain = "暂无数据";
        this.isShow = false;
      }
    },
    showRulesTable() {
      rulesTable(this.search).then(res => {
        console.log("首页数据");
        console.log(res);
        let data = res.data;
        let value;
        for (let i = 0; i < data.length; i++) {
          value = data[i].value;
          value = value.replace(/]/g, "");
          value = value.replace(/"/g, "");
          value = value.replace(/\[/g, "");
          value = value.replace(/\\/g, "");
          data[i].value = value;
        }
        this.tableData = data;
        this.total = res.total;
      });
    },
    // 获取树结构的数据
    readData() {
      rulesList({}).then(res => {
        // 刷新树前，先把原来的数据清空
        this.treeData = [];
        this.treeData.push(res.data);
      });
    },
    showBtns(node) {
      console.log(node);
      this.current = node.id;
      if (node.level == 1) {
        this.ruleswork = true;
      } else if (node.level == 2) {
        if (node.childNodes.length == 0) {
          this.modelswork = true;
          this.rulesworkdelete = true;
        } else if (node.childNodes.length > 0) {
          this.modelswork = true;
          this.rulesworkdelete = false;
        }
        this.modelswork = true;
      } else if (node.level == 3) {
        this.modelsedit = true;
      }
      // console.log(node);
    },
    enter(node) {
      console.log(node);
      this.current = node.id;
      this.seen = true;
    },
    leave() {
      this.seen = false;
      this.ruleswork = false;
      this.modelswork = false;
      this.modelsedit = false;
      rulesworkdelete: false, (this.current = null);
    },
    appendRule(data) {
      this.dialogFormVisible = true;
      if (this.$refs["ruleForm"] !== undefined) {
        this.$refs["ruleForm"].resetFields();
      }
    },
    ruleAddBtn() {
      if (this.form.roleName != "" && this.form.roleRevise != "") {
        addRules(this.form).then(res => {
          console.log(res);
          if (res.httpCode == 200) {
            this.readData();
            this.form = {};
            this.dialogFormVisible = false;
            this.$message.success("添加成功");
          }
        });
      } else {
        this.$message.error("请填写规则信息");
      }
    },
    // 添加模型
    appendModel(data) {
      this.form1 = Object.assign({}, this.form1cus);
      this.data = data;
      // console.log(this.data);
      this.dialogForm1Visible = true;
      if (this.$refs["modelForm"] !== undefined) {
        this.$refs["modelForm"].resetFields();
      }
    },
    // 修改模型
    editModel(data, node) {
      this.data = data;
      this.data.modelName = this.data.roleName;
      this.data.modelNumber = this.data.roleNumber;
      this.form1 = Object.assign({}, this.data);
      // console.log(this.form1.id);
      // this.data.id = node.parent.data.id;
      this.ruleId = node.parent.data.id;
      this.dialogForm1Visible = true;
      if (this.$refs["modelForm"] !== undefined) {
        this.$refs["modelForm"].resetFields();
      }
    },
    // 删除模型
    deleteModel(data, node) {
      deleteModel(data).then(res => {
        if (res.httpCode == 200) {
          this.$message.success("删除成功");
          this.$refs.tree.remove(node);
          this.readData();
        }
      });
    },
    // 添加/修改模型 确定按钮
    modelAddBtn() {
      if (this.form1.modelName != "") {
        this.form1.ruleId = this.data.id;
        // this.form1.ruleId = this.ruleId;
        console.log(this.form1);
        addModels(this.form1).then(res => {
          console.log(res);
          if (res.httpCode == 200) {
            this.readData();
            this.form1 = {};
            this.dialogForm1Visible = false;
            this.$message.success("操作成功");
          }
        });
      } else {
        this.$message.error("请填写规则信息");
      }
    },
    deleteRule(data, node) {
      //console.log(this.data.id);
      deleteRules({ id: data.id }).then(res => {
        if (res.httpCode == 200) {
          this.$message.success("删除成功");
          this.$refs.tree.remove(node);
          this.readData();
        }
      });
    },
    handleSizeChange(val) {
      this.search.pageSize = val;
      this.showRulesTable();
    },
    handleCurrentChange(val) {
      console.log(this.search);
      this.search.pageNum = val;
      this.showRulesTable();
    },
    transferAddentry(node) {
      // console.log(this.search.modelId);
      if (this.message.level == 3) {
        this.$router.push({
          path: "/RULEBASES/singles/addEntry",
          name: "添加条目",
          query: {
            modelId: this.search.modelId //传的参数
          }
        });
      } else {
        this.$message.error("请选择第三极模型节点");
      }
    },
    delEntry(data) {
      deleteEntry(data).then(res => {
        console.log(res);
        if (res.httpCode == 200) {
          this.$message.success("删除成功");
        }
        this.showRulesTable();
      });
    },
    showpngfile(val) {
      if (val != null) {
        this.currentRow = val;
        console.log("响应数据");
        console.log(this.currentRow);
        // console.log("".split(","));
        this.imgLists = this.currentRow.img.split(",");
        if (this.currentRow.technologyFiles.length > 0) {
          this.pdfLists = this.currentRow.technologyFiles.split(",");
        } else {
          this.pdfLists = [];
        }
        this.explain = "说明：";
      }
    },
    changeFixed(clientHeight) {
      //动态修改可视区域高度
      console.log(clientHeight);
      this.$refs.rulestree.style.height = clientHeight - 80 + "px";
    },
    changeFixed1(clientWidth) {
      //动态修改可视区域宽度
      console.log(clientWidth);
      this.$refs.tableRight.style.width = clientWidth - 400 + "px";
    }
  },
  computed: {
    newRemark() {
      return this.form1.remark;
    },
    newFromRemark() {
      return this.form.remark;
    }
  },
  watch: {
    // 如果 `clientHeight` 发生改变，这个函数就会运行
    clientHeight: function() {
      this.changeFixed(this.clientHeight);
    },
    clientWidth: function() {
      this.changeFixed1(this.clientWidth);
    },
    newRemark(val) {
      if (val != null) {
        this.msg1 = 100 - val.length;
        if (val.length == 0) {
          this.msg1 = 100;
        } else if (this.msg1 == 0) {
          this.msg1 = 0;
        }
      }
    },
    newFromRemark(val) {
      if (val != null) {
        this.msg = 100 - val.length;
        if (val.length == 0) {
          this.msg = 100;
        } else if (this.msg == 0) {
          this.msg = 0;
        }
      }
    }
  },
  mounted() {
    this.readData();
    // 获取浏览器可视区域高度
    this.clientHeight = `${document.documentElement.clientHeight}`; //document.body.clientWidth;
    // 获取浏览器可视区域宽度
    this.clientWidth = `${document.documentElement.clientWidth}`;
    //console.log(this.clientWidth);
    //console.log(self.clientHeight);
    window.onresize = function temp() {
      this.clientHeight = `${document.documentElement.clientHeight}`;
      this.clientWidth = `${document.documentElement.clientWidth}`;
    };
  }
};
</script>

<style lang="scss" scoped>
.rulestree {
  width: 180px;
  float: left;
  overflow-x: scroll;
  display: inline-block;
}

.custom-tree-node {
  width: 100%;
}

#rMenu,
#rMenu1 {
  width: 119px;
  font-size: 10px;
  position: fixed;
  display: none;
}

.el-form {
  margin-top: -20px;
  padding-top: 20px;
  border-top: 1px solid #ccc;
}

.btns {
  width: 100px;
}

.btn {
  width: 100px;
  background-color: transparent;
}

.el-tabs {
  margin-top: 30px;
}

.discrib {
  width: 340px;

  img {
    width: 100px;
    height: 100px;
    margin-right: 10px;
    float: left;
  }
}

.word {
  display: inline-block;
  margin-left: 10px;
  font-size: 15px;
}
.rightTop {
  display: flex;
}
.rightBottom {
  width: 100%;
  flex-direction: column;
  margin-top: 15px;
}

.logo {
  margin-top: 6px;
}

.weihu {
  .el-input,
  .el-select {
    width: 240px;
  }
}

.pdfshow {
  display: inline-block;
  width: 100px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: #409eff;
}
</style>

