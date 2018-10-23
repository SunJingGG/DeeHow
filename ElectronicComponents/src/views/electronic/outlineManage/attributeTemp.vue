<template>
  <div>
    <div class="tree" ref="rulestree">
      <!-- <el-button type="text" @click="addTopData">创建一级类目</el-button> -->
      <el-tree style="width:300px" :data="threeList" ref="tree" :props="defaultProps" @node-click="getCurrentNode" node-key="id"></el-tree>
    </div>
    <div class="message" ref="tableRight">
      <el-tabs type="border-card">
        <el-tab-pane label="属性管理">
          <div class="btnBox">
            <div class="btns" style="padding-top:10px">
              <el-button type="primary" @click="addDate('3')" icon="el-icon-plus">添加属性</el-button>
            </div>
          </div>
          <el-table :data="tableData" border style="width: 100%" v-loading="fullscreenLoading" element-loading-text="拼命加载中">
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
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <template v-if="scope.row.category != '公共属性'">
                  <el-button @click="editAttribute(scope.$index)" type="text" size="small">编辑</el-button>
                  <el-button type="text" size="small" @click="removeAttribute( scope.$index)">删除</el-button>
                </template>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="模板管理">
          <div class="btnBox">
            <div class="btns" style="padding-top:10px">
              <el-button type="primary" @click="addDate('1')" icon="el-icon-plus">添加模板</el-button>
              <el-button type="primary"  v-if="form.propertyType=='1' && form.id" @click="makeNewTem()" icon="el-icon-plus">复制模板</el-button>
              <el-button type="primary" v-if="form.propertyType=='1' && form.id" @click="updateDate" icon="el-icon-edit">修改模板</el-button>
              <el-button type="danger" v-if="form.propertyType=='1' && form.id" @click="removeDate" icon="el-icon-delete">删除模板</el-button>
            </div>
          </div>
          <div v-if="form.propertyType == 1">
            <el-form :model="form" :inline="true" label-width="130px">
              <el-form-item label="名称" prop="name">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="备注：">
                <el-input v-model="form.remark "></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>

    </div>
    <el-dialog :title="form.propertyType == 1 ? '模板':'属性'" :visible.sync="dialogForm1Visible" width="64%">
      <el-form :model="form" :inline="true" label-width="130px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item v-if="form.propertyType=='3'" label="属性编号：" prop="number">
          <el-input v-model="form.number"></el-input>
        </el-form-item>
        <el-form-item v-if="form.propertyType=='3'" label="显示名称：" prop="showName">
          <el-input v-model="form.showName"></el-input>
        </el-form-item>
        <el-form-item v-if="form.propertyType=='3'" label="英文名称：" prop="englishName">
          <el-input v-model="form.englishName"></el-input>
        </el-form-item>
        <el-form-item v-if="form.propertyType=='3'" label="排序：" prop="sortNo">
          <el-input v-model="form.sortNo"></el-input>
        </el-form-item>
        <el-form-item v-if="form.propertyType=='3'" label="所属类别：" prop="category">
          <el-select v-model="form.category" placeholder="请选择所属类别">
            <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="form.propertyType=='3'" label="数据类型：" prop="dataType">
          <el-select v-model="form.dataType" placeholder="请选择数据类型">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="form.remark "></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogForm1Visible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  readPropertyTree,
  deleteCategory,
  addPropertyTree,
  copyPropertyTree
} from "@/api/ele.js";
import { AddAttribute, GetAttribute, DeleteAttribute , DeleteTempleteAttribute} from "@/api/attribute";
export default {
  data() {
    return {
      threeList: [],
      tableData: [],
      clientHeight: "",
      clientWidth: "",
      fullscreenLoading:false,
      search: {
        pageNum: 1,
        pageSize: 10,
        categoryId: ""
      },
      total: 0,
      options: [
        {
          value: "整型",
          label: "整型"
        },
        {
          value: "字符串",
          label: "字符串"
        },
        {
          value: "浮点型",
          label: "浮点型"
        },
        {
          value: "布尔型",
          label: "布尔型"
        },
        {
          value: "货币型",
          label: "货币型"
        },
        {
          value: "日期型",
          label: "日期型"
        }
      ],
      options1: [
        {
          value: "扩展属性",
          label: "扩展属性"
        }
      ],
      form: {
        name: "",
        number: "",
        showName: "",
        englishName: "",
        category: "",
        dataType: "",
        sortNo: 0,
        remark: "",
        delivery: false,
        propertyType: "1"
      },
      formcus: {
        name: "",
        number: "",
        showName: "",
        englishName: "",
        category: "",
        dataType: "",
        sortNo: 0,
        remark: "",
        enable:'0',
        delivery: false,
        propertyType: "1"
      },
      dialogForm1Visible: false,
      dialogForm2Visible: false,
      defaultProps: {
        children: "specialPropertyList",
        label: "name"
      },
      auditObj: {},
      temObj:{},
      auditTreeObj: {},
      templateObj:[],
    };
  },
  methods: {
    getCurrentNode(a, b, c) {
      console.log(a);
      console.log(b);
      console.log(c);
      if(a.propertyType=='1'){
        this.templateObj = a;
      }else if(a.propertyType == '2') {
        this.auditTreeObj = a;
        this.tableData = a.specialPropertyList;
      }else if(a.propertyType == '3'){
        this.tableData = [];
        this.tableData.push(a)
      }
      this.auditObj = b;
      this.form = Object.assign({}, a);
    },
    addDate(type) {
      this.form = Object.assign({}, this.formcus);
      this.form.propertyType = type;
      if(type == '3'){
        if(this.auditTreeObj.id){
          this.form.parentId = this.auditTreeObj.id;
        }else{
          this.$message.error('请点击左侧的分组再点击添加属性')
          return false
        }
      }else{
        this.form.parentId = "-1";
      }
      console.log(this.form)
      this.dialogForm1Visible = true;
    },
    makeNewTem(){
      console.log(this.form)
      this.$prompt('请输入新模板的名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          // this.$message({
          //   type: 'success',
          //   message: '你的邮箱是: ' + value
          // });
          console.log(this.templateObj);
          this.templateObj.name = value;
          copyPropertyTree(this.templateObj).then(res=>{
            console.log(res);
            // this.$refs.tree.append(res.data, this.$refs.tree.root);
            this.readData();
          }).catch(err=>{
            console.log(err)
          })
        }).catch(() => {       
        });
    },
    readData() {
      readPropertyTree({})
        .then(res => {
          this.threeList = res.data;
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    editAttribute(index){
      this.form = Object.assign({},this.tableData[index]);
      // this.temObj = $.extend(true,{},this.auditObj.childNodes[index]);
      console.log(this.auditObj)
      if(this.auditObj.level==2){

        this.temObj = this.auditObj.childNodes[index];
      }else{
        this.temObj = this.auditObj
      }
      console.log(this.form)
      this.dialogForm1Visible = true;
    },
    removeAttribute(index){
      console.log(this.auditObj);
      // return false
      DeleteAttribute({id:this.tableData[index].id}).then(res=>{
        console.log(res);
        this.tableData.splice(index, 1)
        if(this.auditObj.level == 2){
          this.$refs.tree.remove(this.auditObj.childNodes[index]);
        }else if(this.auditObj.level == 3){
          this.$refs.tree.remove(this.auditObj);
        }
        // this.auditObj = {};
      }).catch(err=>{
        console.log(err)
      })
    },
    removeDate(){
      DeleteTempleteAttribute({id:this.templateObj.id}).then(res=>{
        this.$message.success('操作成功');
        this.readData();
        // this.auditObj = {};
      }).catch(err=>{
        console.log(err)
      })
    },
    onSubmit() {
      console.log(this.form)
      delete this.form.keyword
      if(this.form.parentId!='-1'){
        AddAttribute(this.form)
        .then(res => {
          console.log(res);
          if(this.form.id){
            this.temObj.data =  $.extend(true,{},this.temObj.data,res.data);
            console.log(this.auditObj)
            if(this.auditObj.level == 2){
              this.tableData.forEach((v,i)=>{
                if(v.id == res.data.id){
                  console.log('复制')
                  v = Object.assign({},res.data)
                  console.log(v)
                  this.auditObj.data.specialPropertyList[i] = Object.assign({},res.data);
                  
                }
              })
              this.tableData=[];
              this.$nextTick(()=>{
                this.auditObj.data.specialPropertyList.forEach((v)=>{
                  this.tableData.push(v)
                })
                this.$forceUpdate();
              })
              // this.tableData=this.auditObj.data.specialPropertyList;
            }else{
              this.tableData=[];
              this.tableData.push(res.data)

            }
          }else{
            this.$refs.tree.append(res.data, this.auditObj);
          }
          this.$message({
            type: "success",
            message: "操作成功"
          });
          this.dialogForm1Visible = false;
        })
        .catch(err => {
          console.log(err);
        });
      }else if(this.form.parentId=='-1'){

        addPropertyTree(this.form)
          .then(res => {
            this.$refs.tree.append(res.data, this.$refs.tree.root);
            this.$message({
              type: "success",
              message: "操作成功"
            });
            this.dialogForm1Visible = false;
          })
          .catch(err => {
            console.log(err);
          });
      }
    },

    updateDate() {
      delete this.form.keyword
      AddAttribute(this.form)
        .then(res => {
          console.log(this.auditObj);
          this.readData();
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
    addTopData() {
      this.form = Object.assign({}, this.formcus);
      this.form.parentId = "-1";
      this.dialogForm1Visible = true;
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
    // 获取浏览器可视区域高度
    this.clientHeight = `${document.documentElement.clientHeight}`; //document.body.clientWidth;
    // 获取浏览器可视区域宽度
    this.clientWidth = `${document.documentElement.clientWidth}`;
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
      // float: left;
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
    .el-input,
    .el-select {
      width: 130px;
    }
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
