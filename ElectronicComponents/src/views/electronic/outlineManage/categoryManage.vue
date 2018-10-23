<template>
  <div>
    <div class="tree" ref="rulestree">
      <el-button type="text" @click="addTopData">创建一级类目</el-button>
      <el-tree style="width:400px" :data="threeList" ref="tree" default-expand-all :props="defaultProps" @node-click="getCurrentNode" node-key="id"></el-tree>
    </div>
    <div class="message" ref="tableRight">
      <p>
        <span></span> 分类管理</p>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="详情信息" name="first">
          <div class="btnBox">
            <div class="btns">
              <el-button type="primary" v-if="!ShowMessage" @click="addDate" icon="el-icon-plus">添加分类</el-button>
              <el-button type="primary" @click="updateDate" icon="el-icon-edit">修改</el-button>
              <el-button type="danger" @click="removeDate" icon="el-icon-delete">删除</el-button>
            </div>
          </div>
          <el-form ref="form" :inline="true" label-width="130px">
            <el-form-item label="分类名称：">
              <el-input v-model="form.categoryName"></el-input>
            </el-form-item>
            <el-form-item label="分类编码：">
              <el-input v-model="form.categoryNo"></el-input>
            </el-form-item>
            <el-form-item label="排序：">
              <el-input v-model="form.sortNo"></el-input>
            </el-form-item>
            <el-form-item label="分类描述：">
              <el-input type="textarea" v-model="form.remark"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="是否为最小分类：">
              <el-radio-group v-model="form.isShow">
                <el-radio label="1">是</el-radio>
                <el-radio label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <br>
            <el-form-item label="示意图" v-if="form.id">
              <div>
                <el-upload class="avatar-uploader" :action="DEEHOWBASEURL+'/deehow-ELIBM-Web/elib/category/upload'" :show-file-list="false" :on-success="handleAvatarSuccess">
                  <img v-if="imageUrl" :src="imageUrl" class="" style="width:100px;height:100px">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件</div>
                </el-upload>
              </div>
            </el-form-item>
          </el-form>
          <el-dialog title="分类" :visible.sync="dialogForm1Visible" width="64%">
            <el-form :model="form" :inline="true" label-width="130px">
              <el-form-item label="分类名称：">
                <el-input v-model="form.categoryName" style="width:130px"></el-input>
              </el-form-item>
              <el-form-item label="分类编码：">
                <el-input v-model="form.categoryNo" style="width:130px"></el-input>
              </el-form-item>
              <el-form-item label="排序：">
                <el-input v-model="form.sortNo" style="width:130px"></el-input>
              </el-form-item>
              <br>
              <el-form-item label="分类描述：">
                <el-input type="textarea" v-model="form.remark" style="width:680px"></el-input>
              </el-form-item>
              <br>
              <el-form-item label="是否为最小分类：">
                <el-radio-group v-model="form.isShow">
                  <el-radio label="1">是</el-radio>
                  <el-radio label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <br>
              <el-form-item label="示意图：">
                <div>
                  <el-upload class="avatar-uploader" :action="DEEHOWBASEURL+'/deehow-ELIBM-Web/elib/category/upload'" :show-file-list="false" :on-success="handleAvatarSuccess">
                    <img v-if="imageUrl" :src="imageUrl" class="" style="width:100px;height:100px">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件</div>
                  </el-upload>
                </div>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogForm1Visible = false">取 消</el-button>
              <el-button type="primary" @click="onSubmit">确 定</el-button>
            </div>
          </el-dialog>
        </el-tab-pane>
        <el-tab-pane label="属性信息" name="second" class="second" v-if="ShowMessage">
          <div class="btnBox">
            <div class="btns">
              <el-button type="primary" icon="el-icon-plus" @click="addPropty">新增属性</el-button>
            </div>
          </div>
          <el-table :header-cell-style="{background:'#f5f6fa'}" :data="haveList" border style="width: 100%;">
            <el-table-column prop="componentSpecialProperty.name" label="属性">
            </el-table-column>
            <el-table-column prop="componentSpecialProperty.showName" label="显示名称">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="120">
              <template slot-scope="scope">
                <el-button type="text" @click="deleteDate( scope.$index)" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="block" style="margin-top:20px;">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="search.pageNum" :page-sizes="[10, 20, 30, 120]" :page-size="search.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
          </div>
          <el-dialog title="选择模板" :visible.sync="dialogForm2Visible">
            <el-form :model="caForm" label-width="120px">
              <el-form-item label="属性：">
                <el-select v-model="classId" filterable placeholder="请选择" style="width:100%" @change="getProptyList">
                  <el-option v-for="item in propertyClassList" :key="item.id" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <el-table :data="submitClassList" border style="width: 100%">
              <el-table-column prop="name" label="属性名称" width="180">
              </el-table-column>
              <el-table-column prop="number" label="属性编号" width="180">
              </el-table-column>
              <el-table-column prop="showName" label="显示名称">
              </el-table-column>
              <el-table-column prop="englishName" label="英文名称">
              </el-table-column>
              <el-table-column prop="category" label="所属类别">
              </el-table-column>
              <el-table-column prop="dataType" label="数据类型">
              </el-table-column>
              <el-table-column prop="remark" label="备注">
              </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="caSubmit">确 定</el-button>
              <el-button @click="dialogForm2Visible = false">取 消</el-button>
            </div>
          </el-dialog>
        </el-tab-pane>
      </el-tabs>

      <div></div>
    </div>
  </div>
</template>

<script>
import {
  readCategoryTree,
  deleteCategory,
  updateCategory,
  readPropertyList,
  readHavePropertyList,
  updateAllHaveProperty,
  deleteHaveProperty,
  readPropertyTree,
  readPropertyClassList
} from "@/api/ele.js";
export default {
  data() {
    return {
      threeList: [],
      propertyList: [],
      propertyClassList: [],
      submitClassList: [],
      haveList: [],
      clientHeight: "",
      clientWidth: "",
      search: {
        pageNum: 1,
        pageSize: 10,
        categoryId: ""
      },
      total: 0,
      tableData: [
        {
          date: "1234",
          name: "PartNumber",
          address: "物料编码"
        },
        {
          date: "1234",
          name: "PartNumber",
          address: "物料编码"
        },
        {
          date: "1234",
          name: "PartNumber",
          address: "物料编码"
        },
        {
          date: "1234",
          name: "PartNumber",
          address: "物料编码"
        }
      ],
      form: {
        categoryNo: "",
        categoryName: "",
        categoryLogo: "",
        sortNo: "",
        isShow: "0",
        parentId: "",
        remark: ""
      },
      formcus: {
        categoryNo: "",
        categoryName: "",
        categoryLogo: "",
        sortNo: "",
        isShow: "0",
        parentId: "",
        remark: ""
      },
      caForm: {
        categoryId: "",
        propertyId: "",
        name: ""
      },
      caFormcus: {
        categoryId: "",
        propertyId: "",
        name: ""
      },
      ShowMessage: false,
      dialogForm1Visible: false,
      dialogForm2Visible: false,
      dialogForm3Visible: false,
      activeName: "first",
      defaultProps: {
        children: "childrenList",
        label: "categoryName"
      },
      auditObj: {},
      auditTreeObj: {},
      imageUrl: "",
      classId: null
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(this.imageUrl);
      this.form.categoryLogo = res.filePath;
      console.log(res);
      console.log(file);
    },
    handleNodeClick(data) {
      console.log(data);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    addPropty() {
      this.caForm = Object.assign({}, this.caFormcus);
      this.caForm.categoryId = this.auditTreeObj.id;
      this.dialogForm2Visible = true;
    },
    getCurrentNode(a, b, c) {
      console.log(a);
      console.log(b);
      console.log(c);
      this.auditObj = b;
      this.auditTreeObj = a;
      this.form = Object.assign({}, a);
      if (this.form.categoryLogo) {
        this.imageUrl =
          this.DEEHOWBASEURL +
          "/deehow-CMS-Web/public/file/view?filePath=" +
          this.form.categoryLogo;
      } else {
        this.imageUrl = "";
      }
      if (a.isShow == 0) {
        this.ShowMessage = false;
        if (this.activeName != "first") {
          this.activeName = "first";
        }
      } else {
        this.ShowMessage = true;
        this.caForm.categoryId = a.id;
        this.getHavePropertyList(a);
      }
    },
    getHavePropertyList(obj) {
      this.search.categoryId = obj.id;
      readHavePropertyList(this.search)
        .then(res => {
          console.log(res);
          if (res.data && res.data.length < 1 && this.search.pageNum != 1) {
            this.search.pageNum--;
            this.getHavePropertyList(this.form);
          }
          console.log(this.search.pageNum);
          this.total = res.total;
          this.haveList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    addDate() {
      this.form = Object.assign({}, this.formcus);
      this.imageUrl = "";
      this.form.parentId = this.auditObj.data ? this.auditObj.data.id : "-1";
      this.dialogForm1Visible = true;
    },
    readData() {
      readCategoryTree({})
        .then(res => {
          this.threeList = res.data;
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    onSubmit() {
      updateCategory(this.form)
        .then(res => {
          // this.auditObj.push(res.data)
          // this.$refs[''].append
          console.log(this.$refs.tree);
          if (this.form.parentId == -1) {
            // this.readData();
            this.$refs.tree.append(res.data, this.$refs.tree.root);
          } else {
            this.$refs.tree.append(res.data, this.auditObj);
          }
          //
          this.$message({
            type: "success",
            message: "操作成功"
          });
          this.dialogForm1Visible = false;
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    caSubmit() {
      console.log(this.caForm);
      let list = [];
      this.submitClassList.forEach((v, i) => {
        let obj = {
          categoryId: this.caForm.categoryId,
          propertyId: v.id
        };
        list.push(obj)
      });

      updateAllHaveProperty({id:this.classId,list:list})
        .then(res => {
          this.$message({
            type: "success",
            message: "操作成功"
          });
          this.dialogForm2Visible = false;
          this.getHavePropertyList(this.form);
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateDate() {
      updateCategory(this.form)
        .then(res => {
          console.log(this.auditObj);
          // let arr = (this.auditObj.data.childrenList);
          // this.auditObj.data.categoryName = res.data.categoryName;
          // $.extend(true,{},this.auditObj.data,res.data)
          this.auditObj.data = $.extend(true, {}, this.auditObj.data, res.data);
          // this.$refs.tree.updateKeyChildren(this.auditObj.key,res.data);
          this.$message({
            type: "success",
            message: "操作成功"
          });
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    lookDetail(index) {
      this.caForm = Object.assign({}, this.haveList[index]);
      this.dialogForm2Visible = true;
    },
    deleteDate(index) {
      deleteHaveProperty({ id: this.haveList[index].id }).then(res => {
        this.$message({
          type: "success",
          message: "操作成功"
        });
        this.getHavePropertyList(this.form);
      });
    },
    handleSizeChange(val) {
      this.search.pageSize = val;
      this.getHavePropertyList(this.form);
    },
    handleCurrentChange(val) {
      this.search.pageNum = val;
      this.getHavePropertyList(this.form);
    },
    addTopData() {
      this.form = Object.assign({}, this.formcus);
      this.form.parentId = "-1";
      this.dialogForm1Visible = true;
    },
    removeDate() {
      deleteCategory({ id: this.form.id })
        .then(res => {
          // remove
          this.$refs.tree.remove(this.auditObj);
          this.form = Object.assign({}, this.formcus);
          this.auditObj = {};
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getSelectOption() {
      readPropertyTree({ parentId: "-1" })
        .then(res => {
          console.log(res);
          this.propertyClassList = res.data;
        })
        .then(err => {
          console.log(err);
        });
    },
    changeFixed(clientHeight) {
      //动态修改可视区域高度
      console.log(clientHeight);
      this.$refs.rulestree.style.height = clientHeight - 60 + "px";
    },
    changeFixed1(clientWidth) {
      //动态修改可视区域宽度
      console.log(clientWidth);
      this.$refs.tableRight.style.width = clientWidth - 480 + "px";
    },
    getProptyList() {
      readPropertyClassList({ id: this.classId })
        .then(res => {
          console.log(res);
          this.submitClassList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  watch: {
    // 如果 `clientHeight` 发生改变，这个函数就会运行
    clientHeight: function() {
      this.changeFixed(this.clientHeight);
    },
    clientWidth: function() {
      this.changeFixed1(this.clientWidth);
    }
  },
  mounted() {
    this.readData();
    this.getSelectOption();
    // 获取浏览器可视区域高度
    this.clientHeight = `${document.documentElement.clientHeight}`; //document.body.clientWidth;
    // 获取浏览器可视区域宽度
    this.clientWidth = `${document.documentElement.clientWidth}`;
    //console.log(this.clientHeight);
    //console.log(self.clientHeight);
    window.onresize = function temp() {
      this.clientHeight = `${document.documentElement.clientHeight}`;
      this.clientWidth = `${document.documentElement.clientWidth}`;
    };
  }
};
</script>

<style lang="scss" scoped>
.tree {
  float: left;
  width: 230px;
  overflow-x: scroll;
  background: #ccc;
}
.message {
  float: left;
  margin-left: 10px;
  p {
    width: 100%;
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
    border-bottom: 1px solid #ccc;
    span {
      display: inline-block;
      float: left;
      width: 3px;
      height: 20px;
      margin-top: 9px;
      margin-right: 6px;
      background: #40aaff;
    }
  }
  .btnBox {
    height: 30px;
  }
  .btns {
    float: right;
    margin: 0px 30px 0 0;
  }
  .el-tabs {
    margin: 20px;
    .second {
      padding-left: 10px;
      .el-breadcrumb {
        padding-top: 10px;
      }
      .el-table {
        margin-top: 20px;
      }
    }
  }
  .el-form {
    padding-top: 20px;
    // .des {
    //   width: 380px;
    // }
    .el-textarea {
      width: 680px;
    }
  }
  .el-dialog {
    .el-form {
      margin-top: -20px;
      padding-top: 20px;
      border-top: 1px solid #ccc;
    }
    .dialog-footer {
      border-top: 1px solid #ccc;
      padding-top: 20px;
    }
  }
}
</style>
