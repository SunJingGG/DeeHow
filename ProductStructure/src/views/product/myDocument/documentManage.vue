<template>
  <div @click="hideRMenu">
    <el-row>
      <el-col :span="4" style="border-right:1px solid #e5e5e5;overflow:auto" :style="{'height':leftHeight}">
        <el-tree ref="tree" :data="treeData" highlight-current @node-click="handleNodeClick" :props="defaultProps" @node-contextmenu="contextMenuClick">
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <i class="fa fa-folder-o" aria-hidden="true"></i>
            <span>{{ node.label }}</span>
          </span>
        </el-tree>
        <div style="text-align:center">
          <el-button v-if="treeData.length<1" type="text" @click="addTopClass">新建分类</el-button>
        </div>
        <div id="rMenu" class="list-group" @click.stop.prevent :style="treeMenu">
          <a class="list-group-item" @mousedown.stop.prevent="addTopClass">新建一级</a>
          <a class="list-group-item" @mousedown.stop.prevent="setRole">设置权限</a>
          <a class="list-group-item" @mousedown.stop.prevent="addNextClass">新建下级</a>
          <a class="list-group-item" @mousedown.stop.prevent="auditSelfClass">修改本级</a>
          <a class="list-group-item" @mousedown.stop.prevent="removeSelfClass">删除本级</a>
        </div>
      </el-col>
      <el-col :span="20" style="padding-left:20px;padding-top:10px;">
        <div class="preBefore clearfix" v-show="clickCompanyData.dName">
          <p>当前目录 :{{clickCompanyData.dName}}</p>
          <p>创建人：{{clickCompanyData.createName}}</p>
          <p>创建时间：{{clickCompanyData.createTime}}</p>
        </div>
        <div style="margin-top:10px">
          <div class="scard" v-for="(item,index) in preData" :key="index">
            <a class="card">
              <div class="card-img">
                <template v-if="item.dName.includes('.doc') || item.dName.includes('.docx')">
                  <img src="../../../assets/document/wrod.png" alt="">
                </template>
                <template v-else-if="item.dName.includes('.txt')">
                  <img src="../../../assets/document/txt.png" alt="">
                </template>
                <template v-else-if="item.dName.includes('.rar')">
                  <img src="../../../assets/document/rar.png" alt="">
                </template>
                <template v-else-if="item.dName.includes('.pdf')">
                  <img src="../../../assets/document/pdf.png" alt="">
                </template>
                <template v-else-if="item.dName.includes('.xls')">
                  <img src="../../../assets/document/excel.png" alt="">
                </template>
                <template v-else-if="item.dName.includes('.png') || item.dName.includes('.jpg')">
                  <img :src="DEEHOWBASEURL+'/getView'+item.dAddress" alt="">
                </template>
              </div>
              <!-- <div class="caption">{{item.createTime}}</div> -->
              <div class="card-heading"><strong>{{item.dName}}</strong></div>
              <div class="card-content text-muted">{{item.createName}} - {{item.createTime}}</div>
              <div class="card-actions">
                <span class="label label-warning" @click="downLoadFile(item)">下载</span>
                <div class="pull-right" @click="removeFile(item)"><i class="icon icon-times"></i> 删除</div>
              </div>
            </a>
          </div>
        </div>
        <div style="margin-top:20px;width: 411px;" v-if="clickCompanyData.dAddress">
          <el-upload class="upload-demo" drag :action="DEEHOWBASEURL+'/deehow-ELIBM-Web/document/upload/document'" :on-success="onSuccess" multiple :data="upLoadData">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
          <el-button style="margin-top: 10px;" v-show="uploadFileMultipleArray.length > 0" size="small" type="success" @click="submitUpload">保存文件</el-button>
        </div>
      </el-col>
      <el-dialog :visible.sync="dialogVisible" title="类目">
        <p v-if="contextNode">所属类目: <b>{{contextNode.data.dName}}</b></p>
        <el-input v-model="form.dName" style="margin-top:20px;" placeholder="类目名称"></el-input>
        <el-button type="success" style="width:100%;margin-top:30px;margin-bottom:30px;" @click="submitData">确认</el-button>
      </el-dialog>
      <el-dialog :visible.sync="dialogRoleVisible" title="设置权限">
        <div>
          <el-checkbox-group v-model="checkList">
            <el-checkbox :label="item.id" v-for="(item,index) in listRole" :key="index" style="width:20%;padding:0;margin:0;margin-bottom:20px;">{{item.roleName}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <el-button type="success" style="width:100%;margin-top:30px;margin-bottom:30px;" @click="submitRoleList">确认</el-button>
      </el-dialog>
    </el-row>
  </div>
</template>
<script>
import {
  deviceDocumentUpateFolder,
  deviceDocumentReadTree,
  deviceDocumentDeleteFolder,
  deviceDocumentUpdate,
  deviceDocumentReadList,
  deviceDocumentUpdateDocument,
  apiDeptReadList,
  deviceDocumentDownloadUpdate,

} from "@/api/flm";
export default {
  data() {
    return {
      clickCompanyData: {},
      leftHeight: null,
      dialogVisible: false,
      dialogRoleVisible: false,
      treeData: [],
      defaultProps: {
        children: "children",
        label: "dName"
      },
      treeMenu: {
        top: 0 + "px",
        left: 0 + "px",
        display: "none"
      },
      form: {
        dName: "",
        dClass: "1",
        dAddress: "",
        dParentIs: "1",
        dSeries: "1",
        dParent: ""
      },
      formcus: {
        dName: "",
        dClass: "1",
        dAddress: "",
        dParentIs: "1",
        dSeries: "1",
        dParent: ""
      },
      contextNode: null,
      upLoadData: {
        pathDir: null
      },
      preData: [],
      uploadFileMultipleArray: [],
      listRole: [],
      checkList: []
    };
  },
  mounted() {
    this.readerData();
    this.leftHeight = $(document).height() - 50 + "px";
    $(window).resize(v => {
      this.leftHeight = $(document).height() - 50 + "px";
    });
    this.getSelectOption();
  },
  methods: {
    readerData() {
      let obj = {};
      obj.dClass = "1";
      obj.all = "1";
      deviceDocumentReadTree(obj).then(response => {
        if (response.httpCode == 200) {
          this.treeData = response.data;
        } else {
          this.$message.info(response.msg);
        }
      });
    },
    contextMenuClick(a, b, c) {
      this.treeMenu.left = a.clientX + "px";
      this.treeMenu.top = a.clientY + "px";
      this.treeMenu.display = "block";
      console.log(a);
      console.log(b);
      console.log(c);
      this.contextNode = c;
    },
    auditSelfClass() {
      this.form = Object.assign({}, this.contextNode.data);
      this.form.audit = true;
      this.dialogVisible = true;
    },
    removeSelfClass() {
      let obg = {};
      obg.dSeries = this.contextNode.data.dSeries;
      obg.DAddressLike = this.data.dAddress;
      deviceDocumentDeleteFolder(obg).then(response => {
        this.$message.success("操作成功");
        this.$refs.tree.remove(this.contextNode);
        this.form = Object.assign({}, this.formcus);
      });
      this.hideRMenu();
    },
    addTopClass() {
      this.dParent = null;
      this.contextNode = null;
      this.dialogVisible = true;
    },
    addNextClass() {
      this.form.dParent = this.contextNode.data.id;
      this.dialogVisible = true;
    },
    submitData() {
      if (!this.form.dName) {
        this.$message.info("请填写类目名称");
        return false;
      }
      if (this.form.dParent) {
        if (this.form.audit) {
          this.form.dAddress =
            this.contextNode.data.dParentAddress + "/" + this.form.dName;
        } else {
          this.form.dAddress =
            this.contextNode.data.dAddress + "/" + this.form.dName;
          this.form.dParentAddress = this.contextNode.data.dAddress;
          this.form.dParentIs = "2";
          this.form.dSeries = Number(this.contextNode.data.dSeries) + 1;
        }
        console.log(this.form);
        // return false;
        this.sureAddOne(this.form);
      } else {
        this.form.dAddress = "/home/data/file/document/" + this.form.dName;
        this.form.dParentAddress = "/home/data/file/document/";
        this.sureAddOne(this.form);
      }
    },
    submitUpload() {
      let List = [];
      this.uploadFileMultipleArray.forEach((v, i) => {
        let obj = new Object();
        obj.dName = v.text;
        obj.dClass = "2";
        obj.dParent = this.clickCompanyData.id;
        obj.dParentAddress = this.clickCompanyData.dAddress;
        obj.dAddress = v.value;
        obj.dParentIs = "2";
        obj.dSeries = (Number(this.clickCompanyData.dSeries) + 1).toString();
        List.push(obj);
      });
      deviceDocumentUpdateDocument(List).then(response => {
        if (response.httpCode == 200) {
          this.$message.success("操作成功!!");
          this.uploadFileMultipleArray = [];
          this.readFileList(this.clickCompanyData);
        } else {
          this.$message.info(response.msg);
        }
      });
    },
    sureAddOne(obj) {
      deviceDocumentUpateFolder(obj).then(res => {
        this.$message.success("操作成功");
        this.dialogVisible = false;
        this.form = Object.assign({}, this.formcus);
        if (obj.audit) {
          this.contextNode.data = res.data;
        } else {
          if (obj.dParent) {
            this.$refs.tree.append(res.data, this.contextNode);
          } else {
            this.$refs.tree.append(res.data);
          }
        }
      });
    },
    handleNodeClick(data) {
      this.clickCompanyData = data;
      this.upLoadData.pathDir = data.dAddress + "/";
      this.readFileList(data);
    },
    readFileList(data) {
      let obj = {};
      obj.dParent = data.id;
      obj.dClass = "2";
      deviceDocumentReadList(obj).then(response => {
        if (response.httpCode == 200) {
          this.preData = response.data;
        } else {
          this.$message.info(response.msg);
        }
      });
    },
    onSuccess(response, file, fileList) {
      console.log(1);
      if (response.httpCode == "200") {
        this.uploadFileMultipleArray.push(response.data[0]);
      } else {
        this.$message({
          type: "error",
          message: response.msg
        });
      }
    },
    downLoadFile(item) {
      window.location.href =
        this.DEEHOWBASEURL +
        "/deehow-ELIBM-Web/document/download/document?id=" +
        item.id;
    },
    removeFile(item, index) {
      let obg = {};
      obg.dSeries = item.dSeries;
      obg.DAddressLike = item.dAddress;
      deviceDocumentDeleteFolder(obg).then(response => {
        if (response.httpCode == 200) {
          this.$message.success("操作成功");
          this.preData.splice(index, 1);
          this.readerData();
        } else {
          this.$message.info(response.msg);
        }
      });
    },
    hideRMenu() {
      this.treeMenu.display = "none";
    },
    setRole() {
      this.checkList = this.contextNode.data.dPower.split(',');

      this.dialogRoleVisible = true;
    },
    submitRoleList() {
      let objj = {};
      let menuIds = this.checkList.join(',');
      if (this.checkList.length == 0) {
        objj.dPower = null;
      } else {
        objj.dPower = menuIds;
      }
      objj.id = this.contextNode.data.id;
      objj.dAddress = this.contextNode.data.dAddress;
      console.log(objj)
      deviceDocumentDownloadUpdate(objj)
        .then(response => {
          this.$message({
            message: "成功",
            type: "success"
          });
          this.contextNode.data.dPower = menuIds;
          this.dialogRoleVisible = false;
          this.checkList = [];
        })
        .catch(error => {
          this.dialogVisible = false;
        });
    },
    getSelectOption() {
      apiDeptReadList({}).then(response => {
        if (response.httpCode == 200) {
          this.listRole = response.data;
        } else {
          this.$message.info(response.msg);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.center {
  text-align: center;
}

.el-tree {
  border: none;
}
#rMenu {
  width: 119px;
  font-size: 10px;
  position: fixed;
  display: none;
}
.preBefore {
  height: 36px;
  border: 1px solid #e5e5e5;
  margin-top: 10px;
  line-height: 36px;
  background: rgb(250, 248, 248);
  p {
    float: left;
    margin-left: 20px;
    color: #666;
  }
}
.scard {
  float: left;
  margin: 5px;
  .card {
    width: 230px;
    height: 200px;
    overflow: hidden;
  }
  .card-img {
    text-align: center;
    img {
      margin-top: 10px;
      width: 61px;
      height: 71px;
    }
  }
}
</style>