<template>
  <div>
    <div class="lefttree" ref="producttree">
      <el-tree :data="data" default-expand-all ref="tree" :props="defaultProps" :expand-on-click-node="false" @node-click="handleNodeClick">
        <span class="custom-tree-node" slot-scope="{ node, data }" @mouseenter="enter(node)" @mouseleave="leave(node)">
          <img v-if="node.level == 1" src="../../../assets/product/fkp.png" style="width:12px" alt="">
          <img v-if="node.level == 2" src="../../../assets/product/fkv.png" style="width:12px" alt="">
          <img v-if="node.level == 3" src="../../../assets/product/diyiji.png" style="width:12px" alt="">
          <img v-if="node.level == 4" src="../../../assets/product/fkb.png" style="width:12px" alt="">
          <span>{{ node.label }}</span>&nbsp;&nbsp;
          <i class="el-icon-setting logo" @click="showBtns(node,data)" v-show="seen&&node.id==current"></i>
          <span v-show="seen&&node.id==current&&productwork==true">
            <el-button type="text" size="mini" @click="() => editProduct(data,node)">
              修改
            </el-button>
            <el-button v-show="seen&&node.id==current&&productworkdel==true" type="text" size="mini" @click="() => deleteProduct(data, node)">
              删除
            </el-button>
          </span>
          <span v-show="seen&&node.id==current&&versionwork==true">
            <el-button type="text" size="mini" @click="() => editVersion(data,node)">
              修改
            </el-button>
            <el-button v-show="seen&&node.id==current&&versiontworkdel==true" type="text" size="mini" @click="() => deleteVersion(data,node)">
              删除
            </el-button>
          </span>
        </span>
      </el-tree>
    </div>
    <div class="rightbox" ref="rightbox" style="overflow-x:scroll;">
      <div style="text-align: right;">
        <el-button type="primary" icon="el-icon-plus" @click="addProduct">添加产品</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="addEdition">新增版本</el-button>
      </div>
      <div>
        <div class="group tree-ul" style="overflow:auto">
          <div style="width:2000px">
            <div class="head-menu" style="height:32px">
              <div v-for="(item,index) in titleList" :key="index" :style="index>3?'margin-left:5px':''">{{item}}</div>
            </div>
            <ul class="tree-ul">
              <li v-for="(c,d) in treeList" :key="d">
                <div @click="getOldData(c)" class="head-menu">
                  <div>
                    <img src="../../../assets/bom/fkb.png" style="height:20px;vertical-align:middle;" alt="">
                    <span>{{c.partNumber}}</span>
                  </div>
                  <div>
                    {{c.productModel}}
                  </div>
                  <div>
                    {{c.description}}
                  </div>
                  <div>
                    {{c.preRanking}}
                  </div>
                  <div>
                    {{c.price}}
                  </div>
                  <div>
                    {{c.ratedValue}}
                  </div>
                  <div>
                    {{c.replacePart}}
                  </div>
                  <div>
                    {{c.stock}}
                  </div>
                  <div>
                    {{c.tolerance}}
                  </div>
                  <div>
                    {{c.value}}
                  </div>
                </div>
                <transition name="el-zoom-in-top">
                  <ul v-if="c.childrenCopy&&c.childrenCopy.length>0" v-show="c.open" class="tree-ul">
                    <li v-for="(e,f) in c.childrenCopy" :key="f">
                      <div @click="open2(e)" class="head-menu">
                        <div style="padding-left:20px">
                          <img src="../../../assets/bom/fkm.png" style="height:20px;vertical-align:middle;" alt=""><span> {{e.manufacturerName}}</span>
                        </div>
                        <div>
                          {{e.manufacturerPartNumber}}
                        </div>
                      </div>
                      <transition name="el-zoom-in-top">
                        <div style="padding-left:40px ; width:850px">
                          <table class="table table-hover" v-if="e.children&&e.children.length>0" v-show="e.open">
                            <thead>
                              <tr>
                                <th>供应商名称</th>
                                <th>供应商编号</th>
                                <th>供货周期</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="(g,h) in e.children" :key="h">
                                <td><img src="../../../assets/bom/fks.png" style="height:20px;vertical-align:middle;" alt="">{{g.dealerName}}</td>
                                <td>{{g.dealerPartNumber}}</td>
                                <td>{{g.stockCycle}}</td>
                                <!-- <td>{{g.title}}</td> -->
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </transition>
                    </li>
                  </ul>
                </transition>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="产品管理" :visible.sync="dialogFormVisible" width="40%">
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="产品名称：" prop="productName">
          <el-input v-model="form.productName" maxlength="50" placeholder="请输入产品名称"></el-input>
        </el-form-item>
        <el-form-item label="产品描述：" prop="remark">
          <el-input type="textarea" v-model="form.remark" maxlength="100" placeholder="请输入产品描述"></el-input>
          <span style="float:right">还可输入
            <b v-text="msg"></b>字</span>
        </el-form-item>
      </el-form>
      <div style="clear:both"></div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="productAddBtn">确 定</el-button>
        <el-button type="primary" plain @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="版本管理" :visible.sync="dialogForm1Visible" width="40%">
      <el-form :model="form1" :rules="rules" ref="rule1Form" label-width="100px">
        <el-form-item label="产品名称：" prop="productId">
          <el-select style="width:100%;" :disabled="readonly" v-model="form1.productId" placeholder="请选择产品">
            <el-option v-for="(item,index) in productlist" :key="index" :label="item.productName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="版本名称：" prop="versionName">
          <el-input v-model="form1.versionName" maxlength="50" placeholder="请输入版本名称"></el-input>
        </el-form-item>
        <el-form-item label="版本描述：" prop="remark">
          <el-input type="textarea" v-model="form1.remark" maxlength="100" placeholder="请输入版本描述"></el-input>
          <span style="float:right">还可输入
            <b v-text="msg1"></b>字</span>
        </el-form-item>
      </el-form>
      <div style="clear:both"></div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" :disabled="canclick" @click="editionAddBtn">确 定</el-button>
        <el-button type="primary" plain @click="dialogForm1Visible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  AddProduct,
  Allproductlist,
  AddbomVersion,
  ProductTree,
  deleteProduct,
  deleteVersion,
  readProductInfoData
} from "@/api/product";
// import "vue-orgchart/dist/style.min.css";
// import { VoBasic } from "vue-orgchart";
export default {
  // components: { VoBasic },
  data() {
    return {
      clientHeight: "",
      clientWidth: "",
      dialogFormVisible: false,
      dialogForm1Visible: false,
      productwork: false,
      versionwork: false,
      productworkdel: false,
      versiontworkdel: false,
      readonly: false,
      canclick: false,
      structpng: false,
      msg: 100,
      msg1: 100,
      seen: false,
      current: 0,
      vname: "",
      partNumber: "",
      structpngname: "",
      nodemessage: "",
      classDataList: [],
      partDataList: [],
      productlist: [],
      leftList: [],
      rightList: [],
      chartData: {},
      form: {
        productName: "",
        remark: "",
        parentId: "",
        id: ""
      },
      form1: {
        productName: "",
        versionName: "",
        productId: "",
        remark: "",
        parentId: "",
        sort: "1",
        id: ""
      },
      rules: {
        productName: [
          { required: true, message: "请输入产品名称", trigger: "blur" }
        ],
        productId: [
          { required: true, message: "请输入产品名称", trigger: "blur" }
        ],
        versionName: [
          { required: true, message: "请输入版本名称", trigger: "blur" }
        ]
      },
      data: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      titleList: [
        "Part Number",
        "规格型号",
        "物料描述",
        "质量等级",
        "价格",
        "额定值",
        "替代料",
        "库存",
        "公差",
        "值"
      ],
      titleList1: ["部位", "数量"],
      titleList2: [
        "Part Number",
        "规格型号",
        "物料描述",
        "质量等级",
        "价格",
        "额定值",
        "替代料",
        "库存",
        "公差",
        "值"
      ],
      titleList3: ["制造商名称", "制造商编码"],
      titleList4: ["供应商名称", "供应商编码"],
      treeList: []
    };
  },
  methods: {
    readData() {
      ProductTree({}).then(res => {
        //console.log(res);
        this.data = res.data;
      });
      Allproductlist({}).then(res => {
        //console.log(res);
        this.productlist = res.data;
      });
    },
    addProduct() {
      this.dialogFormVisible = true;
      if (this.$refs["ruleForm"] !== undefined) {
        this.$refs["ruleForm"].resetFields();
      }
    },
    editProduct(data, node) {
      console.log(data);
      this.dialogFormVisible = true;
      this.form.productName = data.data.productName;
      this.form.remark = data.data.remark;
      this.form.id = data.data.id;
    },
    deleteProduct(data, node) {
      let id;
      id = node.data.data.id;
      deleteProduct({ id: id }).then(res => {
        if (res.httpCode == 200) {
          this.$message.success("产品删除成功");
          this.$refs.tree.remove(node);
          this.readData();
        }
      });
    },
    productAddBtn() {
      if (this.form.productName != "") {
        AddProduct(this.form).then(res => {
          console.log(res);
          if (res.httpCode == 200) {
            // if (this.form.parentId == 0) {
            //   this.$refs.tree.append(res.data, this.$refs.tree.root);
            // } else {
            //   this.$refs.tree.append(res.data, this.nodemessage);
            // }
            this.readData();
            this.form = {};
            this.nodemessage = {};
            this.dialogFormVisible = false;
            this.$message.success("操作成功");
          } else {
            this.$message.error("请填写产品信息");
          }
        });
      }
    },
    // 添加版本
    addEdition() {
      this.readonly = false;
      this.vname = "";
      this.form1 = {
        productName: "",
        versionName: "",
        productId: "",
        remark: "",
        parentId: "",
        sort: "1",
        id: ""
      };
      if (this.$refs["rule1Form"] !== undefined) {
        this.$refs["rule1Form"].resetFields();
      }
      if (this.nodemessage.level == 1) {
        this.form1.productId = this.nodemessage.data.data.id;
      } else {
        this.form1.productId = "";
      }
      this.dialogForm1Visible = true;
    },
    editVersion(data, node) {
      console.log(data);
      this.canclick = false;
      this.dialogForm1Visible = true;
      if (node.level == 2) {
        this.readonly = true;
      }
      this.form1.id = data.data.id;
      this.vname = data.data.versionName;
      this.form1.versionName = data.data.versionName;
      this.form1.remark = data.data.remark;
      this.form1.productId = data.parentId;
      console.log(data.parentId);
    },
    deleteVersion(data, node) {
      let id;
      id = node.data.data.id;
      deleteVersion({ id: id }).then(res => {
        if (res.httpCode == 200) {
          this.$message.success("版本删除成功");
          this.$refs.tree.remove(node);
          this.readData();
        }
      });
    },
    editionAddBtn() {
      if (this.form1.productId != "" && this.form1.versionName != "") {
        console.log(this.form1);
        AddbomVersion(this.form1).then(res => {
          console.log(res);
          if (res.httpCode == 200) {
            this.readData();
            this.form1 = {};
            this.nodemessage = {};
            this.dialogForm1Visible = false;
            this.$message.success("操作成功");
          } else {
            this.$message.error("请填写版本信息");
          }
        });
      }
    },
    treeToLable(tree) {
      tree.forEach(a => {
        a.label = a.className;
        if (a.children) {
          a.children.forEach(b => {
            b.label = b.partNumber;
            if (b.children) {
              let arr = b.children.concat([]);
              delete b.children;
              b.childrenCopy = arr;
            }
          });
        }
      });
    },
    handleNodeClick(data, node) {
      this.nodemessage = node;
      console.log(node);
      // readProductInfoData({versionId:node.parent.data.id,classId:node.data.id}).then(res=>{
      if (node.level == 2) {
        readProductInfoData({ versionId: node.data.data.id })
          .then(res => {
            console.log(res);
            let resData = res.data;
            this.treeToLable(resData);
            console.log(resData);
            // console.log();
            this.nodemessage.data.children = resData;
          })
          .catch(err => {
            console.log(err);
          });
      } else if (node.level == 4) {
        console.log(node);
        this.treeList = [];

        this.treeList.push(node.data);
      }
      return false;
    },
    showBtns(node, data) {
      console.log(node);
      console.log(data);
      this.current = node.id;
      if (node.level == 1) {
        if (node.childNodes.length == 0) {
          this.productwork = true;
          this.productworkdel = true;
        } else if (node.childNodes.length > 0) {
          this.productwork = true;
          this.productworkdel = false;
        }
      } else if (node.level == 2) {
        this.versionwork = true;
        this.versiontworkdel = true;
      }
    },
    enter(node) {
      if (node.level == 1 || node.level == 2) {
        this.current = node.id;
        this.seen = true;
      }
    },
    leave() {
      this.seen = false;
      this.productwork = false;
      this.versionwork = false;
      this.productworkdel = false;
      this.versiontworkdel = false;
    },
    changeFixed(clientHeight) {
      //动态修改可视区域高度
      this.$refs.producttree.style.height = clientHeight - 80 + "px";
      this.$refs.rightbox.style.height = clientHeight - 46 + "px";
    },
    changeFixed1(clientWidth) {
      //动态修改可视区域宽度
      this.$refs.rightbox.style.width = clientWidth - 510 + "px";
    },
    open(item) {
      console.log(item);
      item.open = !item.open;
      this.$forceUpdate();
    },
    open1(item) {
      console.log(item);
      this.titleList = this.titleList1;
      item.open = !item.open;
      this.$forceUpdate();
    },
    open2(item) {
      console.log(item);
      this.titleList = this.titleList3;
      item.open = !item.open;
      this.$forceUpdate();
    },
    getOldData(item) {
      this.titleList = this.titleList2;

      item.open = !item.open;
      this.$forceUpdate();
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
    this.clientHeight = `${document.documentElement.clientHeight}`; //document.body.clientWidth;
    // 获取浏览器可视区域宽度
    this.clientWidth = `${document.documentElement.clientWidth}`;
    window.onresize = function temp() {
      this.clientHeight = `${document.documentElement.clientHeight}`;
      this.clientWidth = `${document.documentElement.clientWidth}`;
    };
    this.readData();
  }
};
</script>

<style lang="scss" scoped>
.lefttree {
  float: left;
  width: 260px;
  padding-top: 20px;
  overflow-x: scroll;
}
.rightbox {
  // background: #f1f1f1;
  padding-top: 20px;
  float: left;
  margin-left: 10px;
}
.el-dialog {
  .el-form {
    margin-top: -20px;
    padding-top: 20px;
    border-top: 1px solid #ccc;
  }
}
.custom-tree-node {
  width: 100%;
}
.logo {
  margin-top: 6px;
}
</style>
<style lang="scss">
#voleft {
  margin-top: 30px;
}
#chart-container {
  overflow-x: scroll;
  overflow-y: hidden;
}
.basicleft {
  > div:last-child {
    min-height: 300px;
  }
}
.basicleft {
  > div:not(:last-child) {
    display: none;
  }
}
.tree-ul {
  // padding-left: 20px;
  p {
    cursor: pointer;
    &:hover {
      background-color: #ebf2f9;
    }
  }
}
.head-menu {
  cursor: pointer;
  &:hover {
    background-color: #ebf2f9;
  }
  > div {
    display: inline-block;
    overflow: hidden;
    width: 150px;
    margin: 0;
    padding: 0;
    &:nth-child(1) {
      width: 230px;
    }
    // &:nth-child(2) {
    //   width: 5%;
    // }
    // &:nth-child(3) {
    //   width: 10%;
    // }
  }
}
</style>
